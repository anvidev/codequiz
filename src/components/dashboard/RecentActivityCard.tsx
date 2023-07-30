"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { ActivitySquare } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {}

function RecentActivityCard({}: Props) {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">Recent activity</CardTitle>
          <ActivitySquare className="w-8 h-8" />
        </div>
        <CardDescription>Here is your last five quizzes.</CardDescription>
      </CardHeader>
      <CardContent className="max-h-96 overflow-y-auto">Quiz</CardContent>
    </Card>
  );
}

export { RecentActivityCard };
