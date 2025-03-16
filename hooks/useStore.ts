// app/store/useStore.ts
import { create } from "zustand";
import { DateTime } from "luxon";
import { User, Match, Round, Player } from "@types";
import supabase from "@lib/supabase/client";

interface GameState {
  currentUser: User | null;
  currentMatch: Match | null;
  currentRound: Round | null;
  isJudge: boolean;
  isCompetitor: boolean;
  countdown: number;
  selectedTrack: {
    id: string;
    name: string;
    artist: string;
    image: string;
  } | null;

  // Actions
  setCurrentUser: (user: User | null) => void;
  setCurrentMatch: (match: Match | null) => void;
  setCurrentRound: (round: Round | null) => void;
  setIsJudge: (isJudge: boolean) => void;
  setIsCompetitor: (isCompetitor: boolean) => void;
  setCountdown: (countdown: number) => void;
  setSelectedTrack: (
    track: { id: string; name: string; artist: string; image: string } | null
  ) => void;

  // Game actions
  createNewMatch: (
    competitor1: Player,
    competitor2: Player,
    judge: Player
  ) => Promise<Match | null>;
  submitAnswer: (
    roundId: string,
    competitorId: string,
    answer: string
  ) => Promise<void>;
  submitJudgment: (roundId: string, winnerId: string) => Promise<void>;
  generateQuestion: () => Promise<string>;
  checkRoundStatus: (roundId: string) => Promise<Round | null>;
}

const useGameStore = create<GameState>((set, get) => ({
  currentUser: null,
  currentMatch: null,
  currentRound: null,
  isJudge: false,
  isCompetitor: false,
  countdown: 0,
  selectedTrack: null,

  setCurrentUser: (user) => set({ currentUser: user }),
  setCurrentMatch: (match) => set({ currentMatch: match }),
  setCurrentRound: (round) => set({ currentRound: round }),
  setIsJudge: (isJudge) => set({ isJudge }),
  setIsCompetitor: (isCompetitor) => set({ isCompetitor }),
  setCountdown: (countdown) => set({ countdown }),
  setSelectedTrack: (track) => set({ selectedTrack: track }),

  // Create a new match
  createNewMatch: async (competitor1, competitor2, judge) => {
    try {
      // Create a new match
      const { data: matchData, error: matchError } = await supabase
        .from("matches")
        .insert({
          judge_id: judge.user.id,
        })
        .select()
        .single();

      if (matchError) throw matchError;

      // Create competitors
      const { data: competitor1Data, error: competitor1Error } = await supabase
        .from("competitors")
        .insert({
          player_id: competitor1.id,
          match_id: matchData.id,
          score: 0,
          turn: 0,
        })
        .select()
        .single();

      if (competitor1Error) throw competitor1Error;

      const { data: competitor2Data, error: competitor2Error } = await supabase
        .from("competitors")
        .insert({
          player_id: competitor2.id,
          match_id: matchData.id,
          score: 0,
          turn: 0,
        })
        .select()
        .single();

      if (competitor2Error) throw competitor2Error;

      // Generate question
      const question = await get().generateQuestion();

      // Create round
      const startTime = DateTime.now();
      const endTime = startTime.plus({ minutes: 35 });

      const { data: roundData, error: roundError } = await supabase
        .from("rounds")
        .insert({
          match_id: matchData.id,
          category: "Music",
          question,
          competitor1_id: competitor1Data.id,
          competitor2_id: competitor2Data.id,
          judge_id: judge.user.id,
          current_turn: 0,
          total_turns: 1,
          is_completed: false,
          datetime_start: startTime.toISO(),
          datetime_end: endTime.toISO(),
        })
        .select()
        .single();

      if (roundError) throw roundError;

      // Construct the match object
      const match: Match = {
        id: matchData.id,
        rounds: [roundData],
        competitor1: {
          id: competitor1Data.id,
          player: competitor1,
          score: 0,
          turn: 0,
          matches: [],
        },
        competitor1Score: 0,
        competitor2: {
          id: competitor2Data.id,
          player: competitor2,
          score: 0,
          turn: 0,
          matches: [],
        },
        competitor2Score: 0,
        judge1: judge.user,
      };

      set({ currentMatch: match, currentRound: roundData });
      return match;
    } catch (error) {
      console.error("Error creating match:", error);
      return null;
    }
  },

  // Submit competitor's answer
  submitAnswer: async (roundId, competitorId, answer) => {
    try {
      const currentRound = get().currentRound;
      if (!currentRound) throw new Error("No active round");

      const isCompetitor1 = currentRound.competitor1.id === competitorId;
      const answerField = isCompetitor1 ? "answer1" : "answer2";

      const { error } = await supabase
        .from("rounds")
        .update({ [answerField]: answer })
        .eq("id", roundId);

      if (error) throw error;

      // Check if both competitors have submitted
      const { data: updatedRound } = await supabase
        .from("rounds")
        .select("*")
        .eq("id", roundId)
        .single();

      if (updatedRound.answer1 && updatedRound.answer2) {
        // Both competitors have submitted, update current_turn
        await supabase
          .from("rounds")
          .update({ current_turn: 1 })
          .eq("id", roundId);
      }

      // Update local state
      set({ currentRound: await get().checkRoundStatus(roundId) });
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  },

  // Submit judge's decision
  submitJudgment: async (roundId, winnerId) => {
    try {
      const { error } = await supabase
        .from("rounds")
        .update({
          winner_id: winnerId,
          is_completed: true,
          current_turn: 2,
        })
        .eq("id", roundId);

      if (error) throw error;

      // Update match winner
      const currentMatch = get().currentMatch;
      if (currentMatch) {
        const matchWinner =
          winnerId === currentMatch.competitor1.player.user.id
            ? currentMatch.competitor1.player.user
            : currentMatch.competitor2.player.user;

        await supabase
          .from("matches")
          .update({ winner_id: winnerId })
          .eq("id", currentMatch.id);

        // Update player rank
        await supabase
          .from("players")
          .update({
            rank: supabase.rpc("increment_rank", { row_id: matchWinner.id }),
          })
          .eq("user_id", winnerId);
      }

      // Update local state
      set({ currentRound: await get().checkRoundStatus(roundId) });
    } catch (error) {
      console.error("Error submitting judgment:", error);
    }
  },

  // Generate a random question
  generateQuestion: async () => {
    // To be implemented with AI integration
    const questions = [
      "What song best captures the feeling of summer?",
      "Which artist has the most iconic album cover?",
      "What song would be perfect for a road trip?",
      "Which artist has the most consistent discography?",
      "What song would be perfect for a workout playlist?",
      "Which album has the strongest opening track?",
      "What song would be perfect for a romantic dinner?",
      "Which artist has evolved the most throughout their career?",
      "What song best represents the 90s?",
      "Which album tells the most compelling story?",
    ];

    return questions[Math.floor(Math.random() * questions.length)];
  },

  // Check round status
  checkRoundStatus: async (roundId) => {
    try {
      const { data, error } = await supabase
        .from("rounds")
        .select(
          `
          *,
          competitor1:competitor1_id(*),
          competitor2:competitor2_id(*)
        `
        )
        .eq("id", roundId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error checking round status:", error);
      return null;
    }
  },
}));

export default useGameStore;
