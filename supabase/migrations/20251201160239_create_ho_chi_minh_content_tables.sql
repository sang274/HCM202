/*
  # Create Ho Chi Minh Content Tables

  1. New Tables
    - `timeline_events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `date` (text)
      - `description` (text)
      - `category` (text)
      - `order_index` (integer)
      - `created_at` (timestamp)
    
    - `map_locations`
      - `id` (uuid, primary key)
      - `name` (text)
      - `latitude` (numeric)
      - `longitude` (numeric)
      - `description` (text)
      - `category` (text)
      - `created_at` (timestamp)
    
    - `cooperation_fields`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `icon_name` (text)
      - `order_index` (integer)
      - `created_at` (timestamp)
    
    - `quiz_questions`
      - `id` (uuid, primary key)
      - `question` (text)
      - `options` (jsonb)
      - `correct_answer` (integer)
      - `explanation` (text)
      - `order_index` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (educational content)
*/

CREATE TABLE IF NOT EXISTS timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date text NOT NULL,
  description text NOT NULL,
  category text DEFAULT 'general',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS map_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  description text NOT NULL,
  category text DEFAULT 'general',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cooperation_fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon_name text DEFAULT 'target',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  options jsonb NOT NULL,
  correct_answer integer NOT NULL,
  explanation text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE map_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cooperation_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view timeline events"
  ON timeline_events FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view map locations"
  ON map_locations FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view cooperation fields"
  ON cooperation_fields FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view quiz questions"
  ON quiz_questions FOR SELECT
  TO anon, authenticated
  USING (true);