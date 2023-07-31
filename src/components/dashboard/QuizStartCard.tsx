"use client";

import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCapIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {}

function QuizStartCard({}: Props) {
  const router = useRouter();

  return (
    <Card
      className="group hover:border-zinc-50 cursor-pointer transition-all duration-300"
      onClick={() => router.push("/quiz")}
    >
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">Start new quiz</CardTitle>
          <GraduationCapIcon className="w-8 h-8" />
        </div>
        <CardDescription>
          Challenge yourself with a quiz on your favorite programming language.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export { QuizStartCard };
