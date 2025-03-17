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
import { Toaster } from "sonner";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: sessionData } = await supabase.auth.getSession();

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
              href={`/match/${crypto.randomUUID()}`}
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

      <footer className="py-6 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p className="mb-2">© 2025 Just-Varbs. All rights reserved.</p>
          <p className="text-sm">Powered by Spotify API.</p>
          <p className="text-sm">Made with 💖 by DJ SEAK</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/" className="text-gray-400 hover:text-white">
              Home
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-white">
              About
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white">
              Contact
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>

      {/* https://sonner.emilkowal.ski/ */}
      <Toaster />
    </div>
  );
}
