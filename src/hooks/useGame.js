import { useState, useCallback, useEffect, useRef } from 'react';
import {
  generateLocalScenario,
  resolveChoice,
  generateAiScenario,
  resolveAiChoice,
  getScenarioFingerprint,
} from '../services/scenarioGenerator';
import {
  generateModeScenario,
  resolveModeChoice,
  applyLetThemInChoice,
  getModeScenarioOptions,
} from '../services/modeScenarios';
import { getScenarioAsciiFingerprint } from '../data/asciiViews';
import { saveHighScore, GAME_MODES } from '../data/gameModes';

export function useGame() {
  const [phase, setPhase] = useState('menu');
  const [gameMode, setGameMode] = useState('survival');
  const [scenario, setScenario] = useState(null);
  const [round, setRound] = useState(0);
  const [strikes, setStrikes] = useState(0);
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
  const [stayOnScenario, setStayOnScenario] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('scenario-survival-api-key') || '');
  const [useAi, setUseAi] = useState(() => localStorage.getItem('scenario-survival-use-ai') === 'true');
  const [allowRepeats, setAllowRepeats] = useState(
    () => localStorage.getItem('scenario-survival-allow-repeats') === 'true'
  );
  const [playedFingerprints, setPlayedFingerprints] = useState([]);
  const [playedAsciiFingerprints, setPlayedAsciiFingerprints] = useState([]);
  const playedHistoryRef = useRef({ fingerprints: [], ascii: [] });
  const scenariosThisRunRef = useRef(0);
  const timerRef = useRef(null);
  const timedOutRef = useRef(false);

  const modeConfig = GAME_MODES[gameMode] || GAME_MODES.survival;
  const maxStrikes = modeConfig.maxStrikes ?? 3;
  const isSpecialMode = modeConfig.modeType && modeConfig.modeType !== 'standard';

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

  const saveApiSettings = useCallback((key, ai, repeats) => {
    setApiKey(key);
    setUseAi(ai);
    if (repeats !== undefined) {
      setAllowRepeats(repeats);
      localStorage.setItem('scenario-survival-allow-repeats', String(repeats));
    }
    localStorage.setItem('scenario-survival-api-key', key);
    localStorage.setItem('scenario-survival-use-ai', String(ai));
  }, []);

  const registerScenario = useCallback((next) => {
    setScenario(next);
    const fingerprint = getScenarioFingerprint(next);
    const asciiFingerprint = getScenarioAsciiFingerprint(next);

    if (fingerprint && !playedHistoryRef.current.fingerprints.includes(fingerprint)) {
      playedHistoryRef.current.fingerprints.push(fingerprint);
    }
    if (asciiFingerprint && !playedHistoryRef.current.ascii.includes(asciiFingerprint)) {
      playedHistoryRef.current.ascii.push(asciiFingerprint);
    }

    setPlayedFingerprints([...playedHistoryRef.current.fingerprints]);
    setPlayedAsciiFingerprints([...playedHistoryRef.current.ascii]);
    scenariosThisRunRef.current += 1;
    setUsedCategories((prev) => [...prev, next.category]);
  }, []);

  const loadScenario = useCallback(async (currentRound, categories, history, mode) => {
    setLoading(true);
    setError(null);
    setStayOnScenario(false);
    const config = GAME_MODES[mode] || GAME_MODES.survival;
    const genOptions = {
      mode,
      playedFingerprints: [...playedHistoryRef.current.fingerprints],
      playedAsciiFingerprints: [...playedHistoryRef.current.ascii],
      allowRepeats,
    };
    try {
      let next;
      if (config.modeType && config.modeType !== 'standard') {
        next = generateModeScenario(config.modeType, currentRound, genOptions);
      } else if (useAi && apiKey) {
        next = await generateAiScenario(apiKey, currentRound, history, genOptions);
      } else {
        next = generateLocalScenario(currentRound, categories, genOptions);
      }
      registerScenario(next);
    } catch (err) {
      setError(err.message || 'Failed to generate scenario. Using local generator.');
      const fallback = isSpecialMode
        ? generateModeScenario(config.modeType, currentRound, genOptions)
        : generateLocalScenario(currentRound, categories, genOptions);
      registerScenario(fallback);
    } finally {
      setLoading(false);
    }
  }, [useAi, apiKey, allowRepeats, registerScenario, isSpecialMode]);

  const finishGame = useCallback((finalScore, finalRound, finalCombo) => {
    clearTimer();
    const isRecord = saveHighScore(gameMode, finalScore, { rounds: finalRound + 1, combo: finalCombo });
    setNewRecord(isRecord);
  }, [gameMode, clearTimer]);

  const startGame = useCallback(async (mode = 'survival') => {
    setGameMode(mode);
    setPhase('playing');
    setRound(0);
    setStrikes(0);
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
    setStayOnScenario(false);
    playedHistoryRef.current = { fingerprints: [], ascii: [] };
    scenariosThisRunRef.current = 0;
    setPlayedFingerprints([]);
    setPlayedAsciiFingerprints([]);
    timedOutRef.current = false;
    await loadScenario(0, [], [], mode);
    startRoundTimer();
  }, [loadScenario, startRoundTimer]);

  const failRun = useCallback((optionText, result, ctxScenario, cause, finalScore, finalCombo) => {
    setDeathInfo({
      cause,
      choice: optionText,
      outcome: result.outcome,
      scenarioSetup: ctxScenario?.setup,
      asciiKey: ctxScenario?.asciiKey,
      viewType: ctxScenario?.viewType,
      category: ctxScenario?.category,
      tone: ctxScenario?.tone,
    });
    finishGame(finalScore, round, finalCombo);
    setTimeout(() => setPhase('gameover'), 0);
  }, [round, finishGame]);

  const applyResult = useCallback((result, optionText, context = {}) => {
    const {
      scenario: ctxScenario,
      forcedTimeout = false,
      keepScenario = false,
      nextScenario = null,
    } = context;

    const newScore = score + (result.scoreDelta || 0);
    const newCombo = result.resultType === 'good' ? combo + 1 : 0;
    const newStrikes = result.addStrike ? strikes + 1 : strikes;
    const newRunStats = {
      ...runStats,
      [result.resultType]: (runStats[result.resultType] || 0) + 1,
    };

    setScore(newScore);
    setCombo(newCombo);
    setStrikes(newStrikes);
    setRunStats(newRunStats);
    setLastResult({ ...result, chosenOption: optionText });
    setChoiceHistory((prev) => [...prev, optionText]);
    if (ctxScenario) setLastScenario(ctxScenario);
    setStayOnScenario(keepScenario);
    if (nextScenario) setScenario(nextScenario);
    setPhase('result');
    clearTimer();

    const outOfStrikes = newStrikes >= maxStrikes;
    const fatal = !result.survived || outOfStrikes;

    if (fatal) {
      const cause = forcedTimeout
        ? 'timeout'
        : outOfStrikes
          ? 'strikes_out'
          : 'fatal_choice';
      failRun(optionText, result, ctxScenario, cause, newScore, newCombo);
      return false;
    }

    const config = GAME_MODES[gameMode];
    const nextRound = round + 1;
    if (!config.endless && config.maxRounds && nextRound >= config.maxRounds && !keepScenario) {
      finishGame(newScore, round, newCombo);
      setTimeout(() => setPhase('victory'), 0);
      return false;
    }

    if (!keepScenario) setRound(nextRound);
    return true;
  }, [score, combo, strikes, round, gameMode, maxStrikes, runStats, clearTimer, finishGame, failRun]);

  const selectOption = useCallback(async (optionIndex, forcedTimeout = false) => {
    if (!scenario || loading) return;

    const optionText = forcedTimeout
      ? '[TIME OUT — frozen in fear]'
      : (getModeScenarioOptions(scenario) || scenario.options)[optionIndex];

    setLoading(true);
    setPhase('resolving');
    clearTimer();

    try {
      let result;
      let keepScenario = false;
      let nextScenario = null;

      if (forcedTimeout) {
        result = {
          resultType: 'bad',
          outcome: 'Time ran out. Paralysis takes hold as the scenario closes in — you hesitated too long.',
          scoreDelta: 0,
          survived: Math.random() > 0.4,
          addStrike: true,
        };
      } else if (scenario.modeType === 'let_them_in') {
        const action = applyLetThemInChoice(scenario, optionIndex);
        if (action.kind === 'question') {
          result = action.result;
          nextScenario = action.scenario;
          keepScenario = true;
        } else if (action.kind === 'verdict_phase') {
          result = action.result;
          nextScenario = action.scenario;
          keepScenario = true;
        } else {
          result = action.result;
        }
      } else if (scenario.modeType) {
        result = resolveModeChoice(scenario, optionIndex);
        if (!result) throw new Error('Mode resolution failed');
      } else if (useAi && apiKey && scenario.isAi) {
        result = await resolveAiChoice(apiKey, scenario, optionText, round);
        result.addStrike = result.resultType === 'bad' && !result.survived;
      } else if (scenario.template) {
        result = resolveChoice(scenario, optionIndex, round, gameMode, combo);
        if (result.resultType === 'bad') {
          result.addStrike = true;
          result.survived = true;
        }
      } else {
        result = resolveChoice(
          { ...scenario, template: { outcomes: { good: ['You made it.'], neutral: ['Close call.'], bad: ['That hurt.'] } } },
          optionIndex,
          round,
          gameMode,
          combo
        );
        result.addStrike = result.resultType === 'bad';
      }

      applyResult(result, optionText, { scenario, forcedTimeout, keepScenario, nextScenario });
    } catch (err) {
      setError(err.message);
      const fallback = resolveModeChoice(scenario, optionIndex) || resolveChoice(
        scenario.template
          ? scenario
          : { template: { outcomes: { good: ['You survive.'], neutral: ['You press on.'], bad: ['You\'re hurt.'] } } },
        optionIndex,
        round,
        gameMode,
        combo
      );
      fallback.addStrike = fallback.resultType === 'bad';
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
    if (stayOnScenario) {
      setStayOnScenario(false);
      startRoundTimer();
      return;
    }
    await loadScenario(round, usedCategories, choiceHistory, gameMode);
    startRoundTimer();
  }, [phase, round, usedCategories, choiceHistory, gameMode, loadScenario, startRoundTimer, stayOnScenario]);

  const goToMenu = useCallback(() => {
    clearTimer();
    setPhase('menu');
    setScenario(null);
    setLastResult(null);
    setError(null);
    setTimeLeft(null);
    setCombo(0);
    setDeathInfo(null);
    setStayOnScenario(false);
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
    strikes,
    maxStrikes,
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
    stayOnScenario,
    apiKey,
    useAi,
    allowRepeats,
    startGame,
    selectOption,
    continueGame,
    goToMenu,
    retryGame,
    saveApiSettings,
  };
}
