// app/page.tsx
// import { redirect } from "next/navigation";
// import { auth } from "@clerk/nextjs";
import Button from "@components/button";
import Card from "@components/card";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FaMusic, FaTrophy, FaUserFriends } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import { buttonVariants } from "@components/ui/button";
import createClient from "@lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const { data: sessionData } = await supabase.auth.getSession();
  console.warn("sessionData >>>", sessionData);
  console.warn("user >>>", user);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-green-500 to-green-700 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Just-Varbs</h1>
          <p className="text-xl mb-8">
            The ultimate music battle game where your taste is put to the test!
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full">
              <Link href="/sign-in" className="flex items-center gap-2">
                Login <BsArrowRight />
              </Link>
            </Button>
            <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full">
              <Link href="/sign-up" className="flex items-center gap-2">
                Sign Up <BsArrowRight />
              </Link>
            </Button>
          </div>
          <Link
            href={`/match/${crypto.randomUUID()}`}
            className={buttonVariants({ variant: "default" })}
          >
            Start a new Game
          </Link>
        </div>
      </header>

      <main className="flex-1 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How it Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
                  <FaMusic className="text-2xl" />
                </div>
                <CardTitle>Battle with Music</CardTitle>
                <CardDescription>
                  Select the perfect track or artist to answer a random music
                  challenge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Each round presents a unique challenge. Choose wisely to
                  impress the judge and advance your rank!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
                  <FaUserFriends className="text-2xl" />
                </div>
                <CardTitle>Judge or Compete</CardTitle>
                <CardDescription>
                  Play as a competitor or be the judge who decides the winner
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Two players compete while a third judges their selections. The
                  game is asynchronous, so you can play on your schedule.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
                  <FaTrophy className="text-2xl" />
                </div>
                <CardTitle>Climb the Ranks</CardTitle>
                <CardDescription>
                  Win matches to increase your rank and unlock new titles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Start as an NPC and work your way up to become a music
                  tastemaker legend with each victory.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-full">
              <Link href="/signup" className="flex items-center gap-2">
                Get Started Now <BsArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="py-6 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p className="mb-2">© 2025 Just-Varbs. All rights reserved.</p>
          <p className="text-sm">Powered by Spotify API.</p>
        </div>
      </footer>
    </div>
  );
}
