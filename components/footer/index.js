import React from "react";
import Link from "next/link";

const defaultState = {
  links: [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "About",
      url: "/about",
    },
    {
      label: "Contact",
      url: "/contact",
    },
    {
      label: "privacy policy",
      url: "/(policy)/privacy",
    },
    {
      label: "Terms of Service",
      url: "/(policy)/terms",
    },
  ],
};

export default function Footer({ initialState = defaultState }) {
  const linkEls = initialState;

  return (
    <footer className="py-6 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto text-center text-gray-400">
        <p className="mb-2">© 2025 Just-Varbs. All rights reserved.</p>
        <p className="text-sm">Powered by Spotify API.</p>
        <p className="text-sm">Made with 💖 by DJ SEAK</p>
        <div className="flex justify-center gap-4 mt-4">
          {linkEls.map(({ label, url }) => (
            <Link
              key={url}
              href={url}
              className="text-gray-400 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
