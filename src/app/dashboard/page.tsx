import { HotTopicsCard } from "@/components/dashboard/HotTopicsCard";
import { QuizHistoryCard } from "@/components/dashboard/QuizHistoryCard";
import { QuizStartCard } from "@/components/dashboard/QuizStartCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard - CodeQuiz",
};

export default async function Dashboard() {
  const session = await getAuthSession();

  if (!session?.user) redirect("/");

  return (
    <main className="p-4 mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <QuizStartCard />
        <QuizHistoryCard />
      </div>
      <div className=" mt-4 grid gap-4 lg:grid-cols-2">
        <HotTopicsCard />
        <RecentActivityCard />
      </div>
    </main>
  );
}
