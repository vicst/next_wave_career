-- New script to add Romanian columns to existing tables
-- Add Romanian columns to existing tables if they don't exist

-- Add Romanian column to questions table
ALTER TABLE questions 
ADD COLUMN IF NOT EXISTS question_text_ro TEXT;

-- Add Romanian columns to jobs_traditional table
ALTER TABLE jobs_traditional 
ADD COLUMN IF NOT EXISTS job_title_ro VARCHAR(255),
ADD COLUMN IF NOT EXISTS description_ro TEXT;

-- Add Romanian columns to jobs_future table
ALTER TABLE jobs_future 
ADD COLUMN IF NOT EXISTS job_title_ro VARCHAR(255),
ADD COLUMN IF NOT EXISTS description_ro TEXT;

-- Add Romanian column to caen_codes table
ALTER TABLE caen_codes 
ADD COLUMN IF NOT EXISTS description_ro TEXT;

-- Add Romanian column to skills_future table
ALTER TABLE skills_future 
ADD COLUMN IF NOT EXISTS skill_name_ro VARCHAR(255);

-- Add Romanian column to companies table
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS description_ro TEXT;
