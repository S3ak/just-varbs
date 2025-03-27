import MainNav from "@/components/main-menu";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">{children}</main>
      <footer className="py-4 text-center text-gray-400 text-sm border-t border-gray-800">
        © 2025 Just-Varbs. All rights reserved.
      </footer>
    </div>
  );
}
