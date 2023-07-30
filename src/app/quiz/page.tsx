import { CreateQuizForm } from "@/components/CreateQuizForm";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Quiz - CodeQuiz",
};

export default async function QuizPage() {
  const session = await getAuthSession();

  if (!session?.user) redirect("/");

  return (
    <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CreateQuizForm />
    </main>
  );
}
