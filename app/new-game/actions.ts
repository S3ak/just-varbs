"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const gameModes = ["best-ever", "top3"] as const;
const genres = [
  "pop",
  "rock",
  "hip-hop",
  "r&b",
  "electronic",
  "jazz",
  "classical",
  "country",
  "metal",
  "folk",
] as const;

const formSchema = z.object({
  player1Name: z.string().min(1, "Name is required"),
  player1Email: z.string().email("Invalid email address"),
  player1Instagram: z.string().optional(),
  player2Name: z.string().optional(),
  player2Email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  player2Instagram: z.string().optional(),
  genre: z.enum(genres).optional().or(z.literal("")),
  gameMode: z.enum(gameModes).optional().or(z.literal("")),
  question: z.string().min(1, "Question is required"),
});

export async function createNewGameAction(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const result = formSchema.safeParse(data);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          errors[error.path[0].toString()] = error.message;
        }
      });
      throw new Error(JSON.stringify(errors));
    }

    const params = new URLSearchParams();
    Object.entries(result.data).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    const gameId = uuidv4();
    redirect(`/match/${gameId}?${params.toString()}`);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
}
