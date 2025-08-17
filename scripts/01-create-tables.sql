-- Create the questions table for RIASEC test
CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  question_text_en TEXT NOT NULL,
  question_text_es TEXT NOT NULL,
  riasec_type VARCHAR(1) NOT NULL CHECK (riasec_type IN ('R', 'I', 'A', 'S', 'E', 'C')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the jobs_traditional table
CREATE TABLE IF NOT EXISTS jobs_traditional (
  id SERIAL PRIMARY KEY,
  job_title_en VARCHAR(255) NOT NULL,
  job_title_es VARCHAR(255) NOT NULL,
  description_en TEXT,
  description_es TEXT,
  riasec_code VARCHAR(3) NOT NULL,
  salary_range VARCHAR(100),
  education_level VARCHAR(100),
  growth_outlook VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the jobs_future table
CREATE TABLE IF NOT EXISTS jobs_future (
  id SERIAL PRIMARY KEY,
  job_title_en VARCHAR(255) NOT NULL,
  job_title_es VARCHAR(255) NOT NULL,
  description_en TEXT,
  description_es TEXT,
  riasec_code VARCHAR(3) NOT NULL,
  ai_impact_level VARCHAR(20) CHECK (ai_impact_level IN ('Low', 'Medium', 'High')),
  automation_risk VARCHAR(20) CHECK (automation_risk IN ('Low', 'Medium', 'High')),
  future_demand VARCHAR(20) CHECK (future_demand IN ('Declining', 'Stable', 'Growing', 'High Growth')),
  required_skills TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the caen_codes table (Colombian economic activity codes)
CREATE TABLE IF NOT EXISTS caen_codes (
  id SERIAL PRIMARY KEY,
  code VARCHAR(10) NOT NULL UNIQUE,
  description_en TEXT NOT NULL,
  description_es TEXT NOT NULL,
  sector VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the skills_future table
CREATE TABLE IF NOT EXISTS skills_future (
  id SERIAL PRIMARY KEY,
  skill_name_en VARCHAR(255) NOT NULL,
  skill_name_es VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  importance_level INTEGER CHECK (importance_level BETWEEN 1 AND 5),
  growth_trend VARCHAR(20) CHECK (growth_trend IN ('Declining', 'Stable', 'Growing', 'High Growth')),
  related_jobs TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the companies table
CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  industry VARCHAR(100),
  size VARCHAR(50) CHECK (size IN ('Startup', 'Small', 'Medium', 'Large', 'Enterprise')),
  location VARCHAR(255),
  website VARCHAR(255),
  description_en TEXT,
  description_es TEXT,
  hiring_trends TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user test results table
CREATE TABLE IF NOT EXISTS user_test_results (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  riasec_scores JSONB NOT NULL, -- Store R,I,A,S,E,C scores
  top_personality_types VARCHAR(3)[] NOT NULL,
  test_completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_questions_riasec_type ON questions(riasec_type);
CREATE INDEX IF NOT EXISTS idx_jobs_traditional_riasec ON jobs_traditional(riasec_code);
CREATE INDEX IF NOT EXISTS idx_jobs_future_riasec ON jobs_future(riasec_code);
CREATE INDEX IF NOT EXISTS idx_user_test_results_user_id ON user_test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_companies_industry ON companies(industry);
