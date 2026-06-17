import { useState, useCallback, useEffect, useRef } from 'react';
import {
  generateLocalScenario,
  resolveChoice,
  generateAiScenario,
  resolveAiChoice,
} from '../services/scenarioGenerator';
import { GAME_MODES, saveHighScore } from '../data/gameModes';

const STARTING_HEALTH = 100;

export function useGame() {
  const [phase, setPhase] = useState('menu');
  const [gameMode, setGameMode] = useState('survival');
  const [scenario, setScenario] = useState(null);
  const [round, setRound] = useState(0);
  const [health, setHealth] = useState(STARTING_HEALTH);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [lastResult, setLastResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usedCategories, setUsedCategories] = useState([]);
  const [choiceHistory, setChoiceHistory] = useState([]);
  const [newRecord, setNewRecord] = useState(false);
  const [deathInfo, setDeathInfo] = useState(null);
  const [runStats, setRunStats] = useState({ good: 0, neutral: 0, bad: 0 });
  const [lastScenario, setLastScenario] = useState(null);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('scenario-survival-api-key') || '');
  const [useAi, setUseAi] = useState(() => localStorage.getItem('scenario-survival-use-ai') === 'true');
  const timerRef = useRef(null);
  const timedOutRef = useRef(false);

  const modeConfig = GAME_MODES[gameMode] || GAME_MODES.survival;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startRoundTimer = useCallback(() => {
    clearTimer();
    if (!modeConfig.timed) {
      setTimeLeft(null);
      return;
    }
    setTimeLeft(modeConfig.timePerRound);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearTimer();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [modeConfig.timed, modeConfig.timePerRound, clearTimer]);

  const saveApiSettings = useCallback((key, ai) => {
    setApiKey(key);
    setUseAi(ai);
    localStorage.setItem('scenario-survival-api-key', key);
    localStorage.setItem('scenario-survival-use-ai', String(ai));
  }, []);

  const loadScenario = useCallback(async (currentRound, categories, history, mode) => {
    setLoading(true);
    setError(null);
    const genOptions = { mode };
    try {
      let next;
      if (useAi && apiKey) {
        next = await generateAiScenario(apiKey, currentRound, history, genOptions);
      } else {
        next = generateLocalScenario(currentRound, categories, genOptions);
      }
      setScenario(next);
      setUsedCategories((prev) => [...prev, next.category]);
    } catch (err) {
      setError(err.message || 'Failed to generate scenario. Using local generator.');
      const fallback = generateLocalScenario(currentRound, categories, genOptions);
      setScenario(fallback);
      setUsedCategories((prev) => [...prev, fallback.category]);
    } finally {
      setLoading(false);
    }
  }, [useAi, apiKey]);

  const startGame = useCallback(async (mode = 'survival') => {
    const config = GAME_MODES[mode] || GAME_MODES.survival;
    setGameMode(mode);
    setPhase('playing');
    setRound(0);
    setHealth(config.startingHealth);
    setScore(0);
    setCombo(0);
    setLastResult(null);
    setUsedCategories([]);
    setChoiceHistory([]);
    setError(null);
    setNewRecord(false);
    setDeathInfo(null);
    setRunStats({ good: 0, neutral: 0, bad: 0 });
    setLastScenario(null);
    timedOutRef.current = false;
    await loadScenario(0, [], [], mode);
    startRoundTimer();
  }, [loadScenario, startRoundTimer]);

  const finishGame = useCallback((finalScore, finalRound, finalCombo) => {
    clearTimer();
    const isRecord = saveHighScore(gameMode, finalScore, { rounds: finalRound + 1, combo: finalCombo });
    setNewRecord(isRecord);
  }, [gameMode, clearTimer]);

  const applyResult = useCallback((result, optionText, context = {}) => {
    const { scenario: ctxScenario, forcedTimeout = false } = context;
    const newHealth = Math.max(0, Math.min(100, health + (result.healthDelta || 0)));
    const newScore = score + (result.scoreDelta || 0);
    const newCombo = result.resultType === 'good' ? combo + 1 : 0;

    setHealth(newHealth);
    setScore(newScore);
    setCombo(newCombo);
    setRunStats((s) => ({
      ...s,
      [result.resultType]: (s[result.resultType] || 0) + 1,
    }));
    setLastResult({ ...result, chosenOption: optionText });
    setChoiceHistory((prev) => [...prev, optionText]);
    if (ctxScenario) setLastScenario(ctxScenario);
    setPhase('result');
    clearTimer();

    if (!result.survived || newHealth <= 0) {
      const cause = forcedTimeout
        ? 'timeout'
        : newHealth <= 0
          ? 'health_depleted'
          : 'fatal_choice';

      setDeathInfo({
        cause,
        choice: optionText,
        outcome: result.outcome,
        scenarioSetup: ctxScenario?.setup,
        asciiKey: ctxScenario?.asciiKey,
        category: ctxScenario?.category,
        tone: ctxScenario?.tone,
      });
      finishGame(newScore, round, newCombo);
      setTimeout(() => setPhase('gameover'), 0);
      return false;
    }

    const config = GAME_MODES[gameMode];
    const nextRound = round + 1;
    if (!config.endless && config.maxRounds && nextRound >= config.maxRounds) {
      finishGame(newScore, round, newCombo);
      setTimeout(() => setPhase('victory'), 0);
      return false;
    }

    setRound(nextRound);
    return true;
  }, [health, score, combo, round, gameMode, clearTimer, finishGame]);

  const selectOption = useCallback(async (optionIndex, forcedTimeout = false) => {
    if (!scenario || loading) return;

    const optionText = forcedTimeout
      ? '[TIME OUT — frozen in fear]'
      : scenario.options[optionIndex];

    setLoading(true);
    setPhase('resolving');
    clearTimer();

    try {
      let result;
      if (forcedTimeout) {
        result = {
          resultType: 'bad',
          outcome: 'Time ran out. Paralysis takes hold as the scenario closes in — you hesitated too long.',
          healthDelta: -30,
          scoreDelta: 0,
          survived: Math.random() > 0.4,
        };
      } else if (useAi && apiKey && scenario.isAi) {
        result = await resolveAiChoice(apiKey, scenario, optionText, round);
      } else if (scenario.template) {
        result = resolveChoice(scenario, optionIndex, round, gameMode, combo);
      } else {
        result = resolveChoice(
          { ...scenario, template: { outcomes: { good: ['You made it.'], neutral: ['Close call.'], bad: ['That hurt.'] } } },
          optionIndex,
          round,
          gameMode,
          combo
        );
      }

      applyResult(result, optionText, { scenario, forcedTimeout });
    } catch (err) {
      setError(err.message);
      const fallback = resolveChoice(
        scenario.template
          ? scenario
          : { template: { outcomes: { good: ['You survive.'], neutral: ['You press on.'], bad: ['You\'re hurt.'] } } },
        optionIndex,
        round,
        gameMode,
        combo
      );
      applyResult(fallback, optionText, { scenario, forcedTimeout });
    } finally {
      setLoading(false);
    }
  }, [scenario, loading, useAi, apiKey, round, gameMode, combo, clearTimer, applyResult]);

  const continueGame = useCallback(async () => {
    if (phase === 'gameover' || phase === 'victory') return;
    setPhase('playing');
    setLastResult(null);
    timedOutRef.current = false;
    await loadScenario(round, usedCategories, choiceHistory, gameMode);
    startRoundTimer();
  }, [phase, round, usedCategories, choiceHistory, gameMode, loadScenario, startRoundTimer]);

  const goToMenu = useCallback(() => {
    clearTimer();
    setPhase('menu');
    setScenario(null);
    setLastResult(null);
    setError(null);
    setTimeLeft(null);
    setCombo(0);
    setDeathInfo(null);
  }, [clearTimer]);

  const retryGame = useCallback(() => {
    startGame(gameMode);
  }, [startGame, gameMode]);

  useEffect(() => {
    if (timeLeft === 0 && phase === 'playing' && !loading && scenario && !timedOutRef.current) {
      timedOutRef.current = true;
      selectOption(0, true);
    }
  }, [timeLeft, phase, loading, scenario, selectOption]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  return {
    phase,
    gameMode,
    modeConfig,
    scenario,
    round,
    health,
    score,
    combo,
    timeLeft,
    lastResult,
    loading,
    error,
    newRecord,
    deathInfo,
    runStats,
    lastScenario,
    apiKey,
    useAi,
    startGame,
    selectOption,
    continueGame,
    goToMenu,
    retryGame,
    saveApiSettings,
  };
}
