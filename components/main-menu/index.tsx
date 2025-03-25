"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/lib/constants/navigation";

export default function MainMenu() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm transition-colors hover:text-white ${
              pathname === link.href ? "text-white" : "text-gray-400"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-800">
        <Link
          href="/sign-up"
          className="block w-full px-4 py-2 text-sm text-center text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
