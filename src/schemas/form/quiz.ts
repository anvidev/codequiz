import { z } from "zod";
import { languages } from "@/data/languages";

export const CreateQuizFormSchema = z
  .object({
    language: z.string(),
    amount: z.number().int().min(1).max(10),
    difficulty: z.enum(["NOVICE", "INTERMEDIATE", "ADVANCED"]),
  })
  .required()
  .refine(
    (input) => {
      return languages.some((option) => option.value === input.language);
    },
    {
      message: "Programming language is not supported yet.",
    }
  );

export const checkAnswerSchema = z
  .object({
    answer: z.string().nonempty(),
  })
  .required();
