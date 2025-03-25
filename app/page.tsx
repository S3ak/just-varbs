import Button from "@/components/button";
import Card from "@/components/card";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FaMusic, FaTrophy, FaUserFriends } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import createClient from "@/lib/supabase/server";
import DJSeakStream from "@/components/dj-seak-stream";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-green-500 to-green-700 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Welcome {user?.confirmed_at ? "back" : ""} to Just-Varbs
          </h1>
          <p className="text-xl mb-8">
            The ultimate music battle game where your taste is put to the test!
          </p>
          <div className="flex justify-center gap-4">
            <Button>
              <Link href="/sign-in" className="flex items-center gap-2">
                Login <BsArrowRight />
              </Link>
            </Button>
            <Button>
              <Link href="/sign-up" className="flex items-center gap-2">
                Sign Up <BsArrowRight />
              </Link>
            </Button>
          </div>
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
            <Link
              href={`/new-game`}
              className={buttonVariants({ variant: "default" })}
            >
              Start a new Game
            </Link>
          </div>

          <section>
            <DJSeakStream />
          </section>
        </div>
      </main>
    </div>
  );
}
