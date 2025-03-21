import { z } from "zod";

export const judgeFormSchema = z.object({
  judgeName: z
    .string()
    .min(2, {
      message: "Your name is required",
    })
    .max(50),
  vote: z.enum(["p0", "p1", "p2"]),
});

export const p1FormSchema = z.object({
  p1Query: z
    .string()
    .min(2, {
      message: "Song is required",
    })
    .max(50),
  p1Name: z
    .string()
    .min(2, {
      message: "Your name is required",
    })
    .max(50),
});

export const p2FormSchema = z.object({
  p2Query: z
    .string()
    .min(2, {
      message: "Song is required",
    })
    .max(50),
  p2Name: z
    .string()
    .min(2, {
      message: "Your name is required",
    })
    .max(50),
});
