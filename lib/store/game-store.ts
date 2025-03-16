import { create } from 'zustand';
import type { Match, Round, Competitor } from '@/lib/supabase/types';

interface GameState {
  currentMatch: Match | null;
  currentRound: Round | null;
  competitors: Competitor[];
  isLoading: boolean;
  error: string | null;
  setCurrentMatch: (match: Match | null) => void;
  setCurrentRound: (round: Round | null) => void;
  setCompetitors: (competitors: Competitor[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentMatch: null,
  currentRound: null,
  competitors: [],
  isLoading: false,
  error: null,
  setCurrentMatch: (match) => set({ currentMatch: match }),
  setCurrentRound: (round) => set({ currentRound: round }),
  setCompetitors: (competitors) => set({ competitors }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set({
    currentMatch: null,
    currentRound: null,
    competitors: [],
    isLoading: false,
    error: null,
  }),
}));