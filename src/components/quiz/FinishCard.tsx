import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface Props {
  correctAnswers: number;
  wrongAnswers: number;
  gameId: string;
}

function FinishCard({ correctAnswers, wrongAnswers, gameId }: Props) {
  const questionRatio = React.useMemo(() => {
    const total = correctAnswers + wrongAnswers;
    const ratio = (correctAnswers / total) * 100;

    return JSON.parse(ratio.toFixed(0));
  }, [correctAnswers, wrongAnswers]);

  return (
    <div className="md:absolute top-1/2 left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-96 flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>
            {questionRatio > 50 ? "Great job!" : "Better luck next time!"}
          </CardTitle>
          <CardDescription>
            You completed the quiz in 1m 12s with a {questionRatio}% success
            ratio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            className={buttonVariants({ variant: "default" })}
            href={`/statistics/${gameId}`}
          >
            View statistics
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export { FinishCard };
