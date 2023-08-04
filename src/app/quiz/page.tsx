import { CreateQuizForm } from "@/components/dashboard/CreateQuizForm";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "New Quiz - CodeQuiz",
};

export default async function QuizPage() {
  const session = await getAuthSession();

  if (!session?.user) redirect("/");

  return (
    <main className="px-4 py-2">
      <CreateQuizForm />
    </main>
  );
}
