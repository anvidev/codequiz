import { NextResponse } from "next/server";
import { CreateQuizFormSchema } from "@/schemas/form/quiz";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";

// POST: /api/questions
export async function POST(req: Request, res: Response) {
  // const session = await getAuthSession();

  // if (!session?.user)
  //   return NextResponse.json(
  //     {
  //       error: "Unauthorized. You must login to generate questions for a quiz.",
  //     },
  //     { status: 401 }
  //   );

  try {
    const body = await req.json();
    const { language, amount, difficulty } = CreateQuizFormSchema.parse(body);

    let questions: any;

    questions = await strict_output(
      `You are an AI language model, and I want you to generate valid JSON data. The data you are going to generate are pairs of questions and answers about a programming language, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array like this\n\n[{"question": "question value","answer": "answer value","option1": "option1 value","option2": "option2 value","option3": "option3 value"}]. You will also receive a difficulty level and a language as input. The difficulty levels are novice, intermediate and advanced. Think of a novice as someone who is a beginner with limitid experience, intermediate as someone considered a junior developer with some experience and and advanced as someone who is a senior developer with a lot of experience.`,
      new Array(amount).fill(
        `You are to generate a random hard multiple choice question about ${language} with difficulty of ${difficulty}.`
      ),
      {
        question: "question with max length of 15 words",
        answer: "answer with max length of 15 words",
        option1: "option1 with max length of 15 words",
        option2: "option2 with max length of 15 words",
        option3: "option3 with max length of 15 words",
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
