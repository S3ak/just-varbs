// app/dashboard/page.tsx
import GameLayout from "../game-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import Button from "@/components/button";
import Link from "next/link";
import {
  FaUser,
  FaStar,
  FaTrophy,
  FaGamepad,
  FaChevronLeft,
} from "react-icons/fa";
import { getRank } from "@/lib/game/utils";
import supabase from "@/lib/supabase/server";

async function getPlayerStats(userId: string) {
  const supabaseClient = await supabase();
  const { data: player } = await supabaseClient
    .from("players")
    .select("*")
    .eq("user_id", userId)
    .single();

  const { data: matchesAsCompetitor } = await supabaseClient
    .from("competitors")
    .select("*")
    .eq("player_id", player?.id);

  const { data: matchesAsJudge } = await supabaseClient
    .from("matches")
    .select("*")
    .eq("judge_id", userId);

  const { data: wins } = await supabaseClient
    .from("matches")
    .select("*")
    .eq("winner_id", userId);

  return {
    rank: player?.rank || 1,
    gamesPlayed: matchesAsCompetitor?.length || 0,
    gamesJudged: matchesAsJudge?.length || 0,
    wins: wins?.length || 0,
  };
}

export default async function Dashboard() {
  const supabaseClient = await supabase();
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    return null;
  }

  const stats = await getPlayerStats(user.id);
  const rankTitle = getRank(stats.rank);

  return (
    <GameLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {user.user_metadata?.full_name || user.email}
            </h1>
            <p className="text-gray-400 mt-1">
              Ready to battle with your music taste?
            </p>
          </div>
          <Button>
            <Link href="/match/new" className="flex items-center gap-2">
              <FaChevronLeft /> Start New Battle
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-2 p-3 bg-green-500/10 text-green-500 rounded-full">
                <FaUser size={24} />
              </div>
              <CardTitle className="text-xl mb-1">Rank</CardTitle>
              <p className="text-2xl font-bold">{rankTitle}</p>
              <p className="text-sm text-gray-400">Level {stats.rank}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-2 p-3 bg-green-500/10 text-green-500 rounded-full">
                <FaGamepad size={24} />
              </div>
              <CardTitle className="text-xl mb-1">Battles</CardTitle>
              <p className="text-2xl font-bold">{stats.gamesPlayed}</p>
              <p className="text-sm text-gray-400">Games played</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-2 p-3 bg-green-500/10 text-green-500 rounded-full">
                <FaTrophy size={24} />
              </div>
              <CardTitle className="text-xl mb-1">Wins</CardTitle>
              <p className="text-2xl font-bold">{stats.wins}</p>
              <p className="text-sm text-gray-400">Victories</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-2 p-3 bg-green-500/10 text-green-500 rounded-full">
                <FaStar size={24} />
              </div>
              <CardTitle className="text-xl mb-1">Judged</CardTitle>
              <p className="text-2xl font-bold">{stats.gamesJudged}</p>
              <p className="text-sm text-gray-400">Games judged</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Recent Battles</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.gamesPlayed > 0 ? (
                <div className="space-y-4">
                  {/* Placeholder for recent battles */}
                  <p className="text-gray-400">Loading recent battles...</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">
                    You haven&apos;t played any battles yet.
                  </p>
                  <Button>
                    <Link href="/new-game">Start Your First Battle</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Judging Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.gamesJudged > 0 ? (
                <div className="space-y-4">
                  {/* Placeholder for judging requests */}
                  <p className="text-gray-400">Loading judging requests...</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">
                    You haven&apos;t judged any battles yet.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </GameLayout>
  );
}
