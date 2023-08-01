import { NextResponse } from "next/server";
import { CreateQuizFormSchema } from "@/schemas/form/quiz";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";

// POST: /api/questions
export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { language, amount, difficulty } = CreateQuizFormSchema.parse(body);

    let questions: any;

    questions = await strict_output(
      "You are a helpful AI that is able to generate a pair of question and answers about a programming language, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array. You will also receive a difficulty level and a language as input. The difficulty levels are novice, intermediate and advanced. Think of a novice of someone that is a beginner with limitid experience, intermediate as someone considered a junior developer with some experience and and advanced as someone who is a senior developer with a lot of experience.",
      new Array(amount).fill(
        `You are to generate a random hard multiple choice question about ${language} with difficulty of ${difficulty}`
      ),
      {
        question: "question without using double quotation marks",
        answer:
          "answer with max length of 15 words and without using double quotation marks",
        option1:
          "option1 with max length of 15 words and without using double quotation marks",
        option2:
          "option2 with max length of 15 words and without using double quotation marks",
        option3:
          "option3 with max length of 15 words and without using double quotation marks",
      }
    );

    return NextResponse.json(
      {
        questions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
        },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json(
        {
          error: error,
        },
        {
          status: 500,
        }
      );
    }
  }
}
