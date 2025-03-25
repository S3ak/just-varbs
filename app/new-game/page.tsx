import Form from "next/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewGameAction } from "./actions";

const genres = [
  { value: "pop", label: "Pop" },
  { value: "rock", label: "Rock" },
  { value: "hip-hop", label: "Hip Hop" },
  { value: "r&b", label: "R&B" },
  { value: "electronic", label: "Electronic" },
  { value: "jazz", label: "Jazz" },
  { value: "classical", label: "Classical" },
  { value: "country", label: "Country" },
  { value: "metal", label: "Metal" },
  { value: "folk", label: "Folk" },
];

export default function NewGame() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="container mx-auto px-4 py-12 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Main content */}
        <div className="relative max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Start a New Game
          </h1>

          <Form action={createNewGameAction} className="space-y-12">
            {/* Player 1 Section */}
            <div className="space-y-6 bg-zinc-800/50 backdrop-blur-sm p-8 rounded-xl border border-zinc-700 shadow-lg">
              <h2 className="text-2xl font-bold text-purple-400">Player 1</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="player1Name"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Name *
                  </label>
                  <Input
                    data-testid="player1-name"
                    id="player1Name"
                    name="player1Name"
                    required
                    className="bg-zinc-900 border-zinc-700 text-white focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="player1Email"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Email *
                  </label>
                  <Input
                    data-testid="player1-email"
                    id="player1Email"
                    name="player1Email"
                    type="email"
                    required
                    className="bg-zinc-900 border-zinc-700 text-white focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="player1Instagram"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Instagram Handle
                  </label>
                  <Input
                    data-testid="player1-instagram"
                    id="player1Instagram"
                    name="player1Instagram"
                    className="bg-zinc-900 border-zinc-700 text-white focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Player 2 Section */}
            <div className="space-y-6 bg-zinc-800/50 backdrop-blur-sm p-8 rounded-xl border border-zinc-700 shadow-lg">
              <h2 className="text-2xl font-bold text-blue-400">Player 2</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="player2Name"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Name
                  </label>
                  <Input
                    data-testid="player2-name"
                    id="player2Name"
                    name="player2Name"
                    className="bg-zinc-900 border-zinc-700 text-white focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="player2Email"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Email
                  </label>
                  <Input
                    data-testid="player2-email"
                    id="player2Email"
                    name="player2Email"
                    type="email"
                    className="bg-zinc-900 border-zinc-700 text-white focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="player2Instagram"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Instagram Handle
                  </label>
                  <Input
                    data-testid="player2-instagram"
                    id="player2Instagram"
                    name="player2Instagram"
                    className="bg-zinc-900 border-zinc-700 text-white focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Game Settings Section */}
            <div className="space-y-6 bg-zinc-800/50 backdrop-blur-sm p-8 rounded-xl border border-zinc-700 shadow-lg">
              <h2 className="text-2xl font-bold text-green-400">
                Game Settings
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="genre"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Genre
                  </label>
                  <select
                    data-testid="genre-select"
                    id="genre"
                    name="genre"
                    defaultValue="hip-hop"
                    className="w-full rounded-md bg-zinc-900 border-zinc-700 text-white focus:border-green-500 focus:ring-green-500 px-3 py-2"
                  >
                    <option value="">Select a genre</option>
                    {genres.map((genre) => (
                      <option key={genre.value} value={genre.value}>
                        {genre.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="gameMode"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Game Mode
                  </label>
                  <select
                    data-testid="game-mode-select"
                    id="gameMode"
                    name="gameMode"
                    defaultValue="best-ever"
                    className="w-full rounded-md bg-zinc-900 border-zinc-700 text-white focus:border-green-500 focus:ring-green-500 px-3 py-2"
                  >
                    <option value="">Select a game mode</option>
                    <option value="best-ever">Best Ever</option>
                    <option value="top3">Top 3</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="question"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Question *
                  </label>
                  <select
                    data-testid="question-select"
                    id="question"
                    name="question"
                    required
                    className="w-full rounded-md bg-zinc-900 border-zinc-700 text-white focus:border-green-500 focus:ring-green-500 px-3 py-2"
                  >
                    <option value="">Select a question</option>
                    <option value="What song best captures the feeling of summer?">
                      What song best captures the feeling of summer?
                    </option>
                    <option value="Which artist has the most iconic album cover?">
                      Which artist has the most iconic album cover?
                    </option>
                    <option value="What song would be perfect for a road trip?">
                      What song would be perfect for a road trip?
                    </option>
                    <option value="Which artist has the most consistent discography?">
                      Which artist has the most consistent discography?
                    </option>
                    <option value="What song would be perfect for a workout playlist?">
                      What song would be perfect for a workout playlist?
                    </option>
                    <option value="Which album has the strongest opening track?">
                      Which album has the strongest opening track?
                    </option>
                    <option value="What song would be perfect for a romantic dinner?">
                      What song would be perfect for a romantic dinner?
                    </option>
                    <option value="Which artist has evolved the most throughout their career?">
                      Which artist has evolved the most throughout their career?
                    </option>
                    <option value="What song best represents the 90s?">
                      What song best represents the 90s?
                    </option>
                    <option value="Which album tells the most compelling story?">
                      Which album tells the most compelling story?
                    </option>
                    <option value="custom">Custom Question</option>
                  </select>
                </div>

                <div id="custom-question" className="space-y-2">
                  <label
                    htmlFor="customQuestion"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Custom Question
                  </label>
                  <Input
                    data-testid="custom-question-input"
                    id="customQuestion"
                    name="customQuestion"
                    placeholder="Enter your custom question"
                    className="bg-zinc-900 border-zinc-700 text-white focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            <Button
              data-testid="submit-button"
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Start Game
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
