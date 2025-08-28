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
    </div>
  );
}
