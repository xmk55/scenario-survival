-- User profiles linked to Google accounts
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  google_id TEXT UNIQUE NOT NULL,
  email TEXT,
  display_name TEXT,
  photo_url TEXT,
  achievements JSONB NOT NULL DEFAULT '[]'::jsonb,
  stats JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Best scores per mode per user
CREATE TABLE IF NOT EXISTS public.user_scores (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  mode_id TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  rounds INTEGER NOT NULL DEFAULT 0,
  combo INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, mode_id)
);

CREATE INDEX IF NOT EXISTS idx_user_scores_user ON public.user_scores(user_id);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_scores ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS; anon users cannot read others' data directly
CREATE POLICY "users read own profile" ON public.user_profiles
  FOR SELECT USING (false);

CREATE POLICY "users read own scores" ON public.user_scores
  FOR SELECT USING (false);
