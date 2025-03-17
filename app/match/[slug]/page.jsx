import { createMatch } from "@/lib/game/match";

export default async function Page({ params }) {
  const { slug } = await params;

  const matchId = await createMatch();
  console.log("matchId", matchId);
  return (
    <div>
      <h2>New Game Settings</h2>
      <p>Please select your players</p>

      <section>
        <div>
          <input />
        </div>
      </section>
    </div>
  );
}
