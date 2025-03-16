import Link from "next/link";
// import { UserButton } from "@clerk/nextjs";
import { FaMusic } from "react-icons/fa";

export default function PrimaryNav() {
  return (
    <nav className="bg-black py-4 px-6 flex justify-between items-center border-b border-gray-800">
      <Link href="/" className="flex items-center gap-2">
        <FaMusic className="text-green-500 text-2xl" />
        <span className="text-white font-bold text-xl">Just-Varbs</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link
          href="/new-game"
          className="text-white hover:text-green-500 transition-colors"
        >
          New Game
        </Link>
        {/* <UserButton afterSignOutUrl="/" /> */}
      </div>
    </nav>
  );
}
