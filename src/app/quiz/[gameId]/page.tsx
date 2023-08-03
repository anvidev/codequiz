import { Quiz } from "@/components/quiz/Quiz";
import prisma from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

interface Props {
  params: {
    gameId: string;
  };
}

export const metadata = {
  title: "Quiz - CodeQuiz",
};

export default async function QuizPage({ params: { gameId } }: Props) {
  const session = await getAuthSession();

  if (!session?.user) redirect("/");

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          options: true,
        },
      },
    },
  });

  if (!game) redirect("/quiz");

  return (
    <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-4/5 max-w-4xl w-[90vw]">
      <Quiz game={game} />
    </main>
  );
}
