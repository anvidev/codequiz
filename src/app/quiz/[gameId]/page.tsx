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
    <main className="px-4 py-3">
      <Quiz game={game} />
    </main>
  );
}
