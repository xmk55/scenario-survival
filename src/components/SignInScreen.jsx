import { useSound } from '../context/SoundContext';
import { useAuth } from '../context/AuthContext';
import { getHighScores } from '../data/gameModes';

export default function SignInScreen({ onContinue, onBack }) {
  const { play, unlock } = useSound();
  const {
    user,
    loading,
    authError,
    isFirebaseConfigured,
    signInWithGoogle,
    signOut,
    unlockedAchievements,
    progress,
  } = useAuth();

  const localScores = getHighScores();
  const totalLocalScore = Object.values(localScores).reduce((sum, s) => sum + (s.score || 0), 0);
  const unlockedCount = unlockedAchievements.filter((a) => a.unlocked).length;

  const handleGoogleSignIn = async () => {
    unlock();
    play('click');
    await signInWithGoogle();
  };

  const handleContinue = () => {
    play('continue');
    onContinue?.();
  };

  const handleBack = () => {
    play('click');
    onBack?.();
  };

  const handleSignOut = async () => {
    play('click');
    await signOut();
  };

  if (loading) {
    return (
      <div className="signin-screen">
        <div className="signin-card">
          <p className="signin-loading">Checking account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="signin-screen">
      <div className="signin-card">
        <pre className="signin-ascii">{`
  ╔══════════════════════════════════════╗
  ║         SCENARIO SURVIVAL            ║
  ║            CLOUD SAVE                ║
  ╚══════════════════════════════════════╝`}</pre>

        {user ? (
          <>
            <div className="signin-user">
              {user.photoURL && (
                <img src={user.photoURL} alt="" className="signin-avatar" referrerPolicy="no-referrer" />
              )}
              <div>
                <h2 className="signin-title">Welcome back</h2>
                <p className="signin-subtitle">{user.displayName || user.email}</p>
              </div>
            </div>

            <div className="signin-stats">
              <div className="signin-stat">
                <span className="signin-stat-value">{unlockedCount}</span>
                <span className="signin-stat-label">Achievements</span>
              </div>
              <div className="signin-stat">
                <span className="signin-stat-value">{Object.keys(progress?.scores || localScores).length}</span>
                <span className="signin-stat-label">Modes scored</span>
              </div>
              <div className="signin-stat">
                <span className="signin-stat-value">{totalLocalScore.toLocaleString()}</span>
                <span className="signin-stat-label">Total pts</span>
              </div>
            </div>

            <section className="signin-achievements">
              <h3>Achievements</h3>
              <div className="achievement-grid">
                {unlockedAchievements.map((a) => (
                  <div
                    key={a.id}
                    className={`achievement-card ${a.unlocked ? 'unlocked' : 'locked'}`}
                    title={a.description}
                  >
                    <span className="achievement-icon">{a.icon}</span>
                    <span className="achievement-name">{a.title}</span>
                    <span className="achievement-desc">{a.description}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="signin-actions">
              <button type="button" className="btn btn-primary" onClick={handleContinue}>
                Continue to Game
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleSignOut}>
                Sign Out
              </button>
              {onBack && (
                <button type="button" className="btn btn-ghost" onClick={handleBack}>
                  Back
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="signin-title">Save scores & unlock achievements</h2>
            <p className="signin-subtitle">
              Sign in with Google to sync high scores across devices and track achievements.
            </p>

            {!isFirebaseConfigured && (
              <div className="signin-notice">
                Cloud save is not configured yet. You can still play as a guest — scores stay on this device.
              </div>
            )}

            {authError && <div className="error-banner">{authError}</div>}

            <div className="signin-actions">
              {isFirebaseConfigured && (
                <button type="button" className="btn btn-google" onClick={handleGoogleSignIn}>
                  <span className="google-icon">G</span>
                  Sign in with Google
                </button>
              )}
              <button type="button" className="btn btn-primary" onClick={handleContinue}>
                {isFirebaseConfigured ? 'Play as Guest' : 'Continue as Guest'}
              </button>
              {onBack && (
                <button type="button" className="btn btn-ghost" onClick={handleBack}>
                  Back to Menu
                </button>
              )}
            </div>

            <p className="signin-hint">
              Guest mode keeps scores locally. Sign in anytime to back them up.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
