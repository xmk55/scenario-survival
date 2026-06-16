import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useGame } from './hooks/useGame';
import { useSound } from './context/SoundContext';
import TitleScreen from './components/TitleScreen';
import GameScreen from './components/GameScreen';
import SettingsPanel from './components/SettingsPanel';
import FloatingEmojis from './components/FloatingEmojis';

export default function App() {
  const themeHook = useTheme();
  const game = useGame();
  const { play } = useSound();
  const [showSettings, setShowSettings] = useState(false);

  const handleStart = (mode) => {
    setShowSettings(false);
    game.startGame(mode);
  };

  return (
    <div className="app">
      <div className="app-bg" />
      <FloatingEmojis theme={themeHook.theme} />
      {game.phase === 'menu' ? (
        <TitleScreen
          onStart={handleStart}
          onSettings={() => setShowSettings(true)}
        />
      ) : (
        <GameScreen
          phase={game.phase}
          modeConfig={game.modeConfig}
          scenario={game.scenario}
          round={game.round}
          health={game.health}
          score={game.score}
          combo={game.combo}
          timeLeft={game.timeLeft}
          lastResult={game.lastResult}
          loading={game.loading}
          error={game.error}
          newRecord={game.newRecord}
          onSelectOption={game.selectOption}
          onContinue={game.continueGame}
          onMenu={game.goToMenu}
        />
      )}

      <button
        className="floating-settings-btn"
        onClick={() => { play('click'); setShowSettings(true); }}
        aria-label="Settings"
        title="Settings & Themes"
      >
        ⚙
      </button>

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
          saveApiSettings={game.saveApiSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
