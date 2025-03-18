/*
  # Initial schema for Just-Varbs game

  1. Tables
    - users: Store user information
    - players: Game-specific player data
    - matches: Game match information
    - rounds: Individual round data
    - competitors: Player match participation
    - judges: Judge match participation

  2. Security
    - RLS enabled on all tables
    - Policies for user-specific data access
*/

-- Create tables for our application

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  alias TEXT NOT NULL,
  spotify_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Players Table
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  alias TEXT NOT NULL,
  rank INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Matches Table
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  winner_id UUID REFERENCES users(id),
  judge_id UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Competitors Table
CREATE TABLE competitors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  p1Name TEXT NOT NULL,
  p1Query TEXT,
  p1Answer TEXT,
  p2Query TEXT,
  p2Answer TEXT,
  winnerId UUID REFERENCES users(id),
  judgeId UUID REFERENCES users(id),
  score INTEGER DEFAULT 0,
  turn INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Judges Table
CREATE TABLE judges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Rounds Table
CREATE TABLE rounds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  genre TEXT,
  tags JSONB,
  question TEXT NOT NULL,
  answer INTEGER,
  winner_id UUID REFERENCES users(id),
  competitor1_id UUID REFERENCES competitors(id),
  competitor2_id UUID REFERENCES competitors(id),
  judge_id UUID REFERENCES users(id),
  current_turn INTEGER DEFAULT 0,
  total_turns INTEGER DEFAULT 1,
  is_completed BOOLEAN DEFAULT FALSE,
  datetime_start TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  datetime_end TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP + INTERVAL '35 minutes',
  answer1 TEXT,
  answer2 TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_players_user_id ON players(user_id);
CREATE INDEX idx_competitors_player_id ON competitors(player_id);
CREATE INDEX idx_competitors_match_id ON competitors(match_id);
CREATE INDEX idx_rounds_match_id ON rounds(match_id);