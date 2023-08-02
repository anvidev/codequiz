import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { CreateQuizFormSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import axios from "axios";
import { MultipleChoiceQuestion } from "@/lib/types";

// POST: /api/game
export async function POST(req: Request, res: Response) {
  const session = await getAuthSession();

  if (!session?.user)
    return NextResponse.json(
      { error: "Unauthorized. You must sign in to play a game." },
      { status: 401 }
    );

  try {
    const body = await req.json();
    const { language, amount, difficulty } = CreateQuizFormSchema.parse(body);

    console.log("Creating game...");
    const game = await prisma.game.create({
      data: {
        userId: session.user.id,
        progLanguage: language,
        difficulty: difficulty,
        timeStarted: new Date(),
      },
    });
    console.log("Game created!");

    console.log("Fetching questions...");
    const { data } = await axios.post(`${process.env.BASE_URL}/api/questions`, {
      language,
      amount,
      difficulty,
    });

    let questions = data.questions.map((q: MultipleChoiceQuestion) => {
      let options = [q.answer, q.option1, q.option2, q.option3].sort(
        () => Math.random() - 0.5
      );

      return {
        question: q.question,
        correctAnswer: q.answer,
        options: JSON.stringify(options),
        gameId: game.id,
        difficulty: difficulty,
        timeAsked: new Date(),
      };
    });
    console.log(`Questions fetched (${questions.length})!`);

    console.log("Creating questions in db...");
    await prisma.question.createMany({
      data: questions,
    });
    console.log("Questions created in db!");

    return NextResponse.json({ gameId: game.id }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
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
