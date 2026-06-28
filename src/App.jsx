import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useGame } from './hooks/useGame';
import { useAuth } from './context/AuthContext';
import TitleScreen from './components/TitleScreen';
import GameScreen from './components/GameScreen';
import SignInScreen from './components/SignInScreen';
import SettingsPanel from './components/SettingsPanel';
import FloatingEmojis from './components/FloatingEmojis';
import { getAchievementById } from './data/achievements';

function AchievementToast({ ids, onDismiss }) {
  if (!ids.length) return null;
  return (
    <div className="achievement-toast-stack">
      {ids.map((id) => {
        const a = getAchievementById(id);
        if (!a) return null;
        return (
          <div key={id} className="achievement-toast">
            <span className="achievement-toast-icon">{a.icon}</span>
            <div>
              <strong>Achievement unlocked</strong>
              <p>{a.title} — {a.description}</p>
            </div>
            <button type="button" className="achievement-toast-close" onClick={onDismiss}>×</button>
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const themeHook = useTheme();
  const game = useGame();
  const { user, newAchievements, clearNewAchievements } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleStart = (mode) => {
    setShowSettings(false);
    setShowSignIn(false);
    game.startGame(mode);
  };

  return (
    <div className="app">
      <div className="app-bg" />
      <FloatingEmojis theme={themeHook.theme} />
      <AchievementToast ids={newAchievements} onDismiss={clearNewAchievements} />

      {showSignIn ? (
        <SignInScreen
          onContinue={() => setShowSignIn(false)}
          onBack={() => setShowSignIn(false)}
        />
      ) : game.phase === 'menu' ? (
        <TitleScreen
          onStart={handleStart}
          onSettings={() => setShowSettings(true)}
          onSignIn={() => setShowSignIn(true)}
          user={user}
        />
      ) : (
        <GameScreen
          phase={game.phase}
          modeConfig={game.modeConfig}
          scenario={game.scenario}
          round={game.round}
          strikes={game.strikes}
          maxStrikes={game.maxStrikes}
          score={game.score}
          combo={game.combo}
          timeLeft={game.timeLeft}
          lastResult={game.lastResult}
          loading={game.loading}
          error={game.error}
          newRecord={game.newRecord}
          deathInfo={game.deathInfo}
          runStats={game.runStats}
          stayOnScenario={game.stayOnScenario}
          onSelectOption={game.selectOption}
          onContinue={game.continueGame}
          onMenu={game.goToMenu}
          onRetry={game.retryGame}
        />
      )}

      {showSettings && (
        <SettingsPanel
          theme={themeHook.theme}
          allThemes={themeHook.allThemes}
          applyTheme={themeHook.applyTheme}
          saveCustomTheme={themeHook.saveCustomTheme}
          updateCustomTheme={themeHook.updateCustomTheme}
          deleteCustomTheme={themeHook.deleteCustomTheme}
          apiKey={game.apiKey}
          useAi={game.useAi}
          allowRepeats={game.allowRepeats}
          saveApiSettings={game.saveApiSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
