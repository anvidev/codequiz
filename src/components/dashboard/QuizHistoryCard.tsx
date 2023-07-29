"use client";

import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { HistoryIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {}

function QuizHistoryCard({}: Props) {
  const router = useRouter();

  return (
    <Card
      className="group hover:border-zinc-50 cursor-pointer transition-all duration-300"
      onClick={() => router.push("/history")}
    >
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">Quiz history</CardTitle>
          <HistoryIcon className="w-8 h-8" />
        </div>
        <CardDescription>
          View your previous quizzes and see how you've improved over time.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export { QuizHistoryCard };
