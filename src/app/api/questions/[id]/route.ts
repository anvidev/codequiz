import prisma from "@/lib/db";
import { checkAnswerSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

// POST: /api/questions/{id}
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { answer } = checkAnswerSchema.parse(await req.json());

    const question = await prisma.question.findUnique({
      where: {
        id,
      },
    });

    if (!question)
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );

    const isCorrect =
      question.correctAnswer.toLowerCase().trim() ===
      answer.toLowerCase().trim();

    const updateQuestion = await prisma.question.update({
      where: {
        id,
      },
      data: {
        userAnswer: answer,
        isCorrect,
      },
    });

    return NextResponse.json({ isCorrect }, { status: 200 });
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
