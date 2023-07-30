"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { FlameIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { CustomBarChart } from "@/components/dashboard/CustomBarChart";

interface Props {}

const data = [
  {
    language: "JavaScript",
    amount: 10,
  },
  {
    language: "Python",
    amount: 5,
  },
  {
    language: "Java",
    amount: 3,
  },
  {
    language: "C++",
    amount: 2,
  },
];

function HotTopicsCard({}: Props) {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">Hottest languages</CardTitle>
          <FlameIcon className="w-8 h-8" />
        </div>
        <CardDescription>
          Click on a language to start a quiz on it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CustomBarChart data={data} />
      </CardContent>
    </Card>
  );
}

export { HotTopicsCard };
