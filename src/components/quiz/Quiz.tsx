"use client";

import { Game, Question } from "@prisma/client";
import React, { useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { checkAnswerSchema } from "@/schemas/form/quiz";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { FinishCard } from "@/components/quiz/FinishCard";
import { differenceInSeconds } from "date-fns";
import { formatTimeDelta } from "@/lib/utils";

interface Props {
  game: Game & { questions: Pick<Question, "id" | "question" | "options">[] };
}

function Quiz({ game }: Props) {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(
    null
  );
  const [correctAnswers, setCorrectAnswers] = React.useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = React.useState<number>(0);
  const [isFinished, setIsFinished] = React.useState<boolean>(false);
  const [now, setNow] = React.useState(new Date());
  const { toast } = useToast();

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!isFinished) setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [isFinished]);

  const currentQuestion = React.useMemo(
    () => game.questions[questionIndex],
    [questionIndex, game.questions]
  );
  const currentOptions = React.useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];

    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof checkAnswerSchema> = {
        answer: currentOptions[selectedOption as number],
      };
      const { data } = await axios.post(
        `/api/questions/${currentQuestion.id}`,
        payload
      );

      return data;
    },
  });

  const handleNext = useCallback(() => {
    if (isChecking) return;

    checkAnswer(undefined, {
      onSuccess: ({ isCorrect }) => {
        if (isCorrect) {
          setCorrectAnswers((prev) => prev + 1);
          setSelectedOption(null);
          toast({
            variant: "success",
            title: "Well done!",
            description: "You answered correctly.",
          });
        } else {
          setWrongAnswers((prev) => prev + 1);
          setSelectedOption(null);
          toast({
            variant: "destructive",
            title: "Oh no!",
            description:
              "You answered incorrectly. Better luck on next question!",
          });
        }

        if (questionIndex === game.questions.length - 1) {
          setIsFinished(true);
          return;
        }

        setQuestionIndex((prev) => prev + 1);
      },
    });
  }, [checkAnswer, toast, isChecking, questionIndex, game.questions.length]);

  React.useEffect(() => {
    function keyDown(e: KeyboardEvent) {
      if (e.key === "1") setSelectedOption(0);
      if (e.key === "2") setSelectedOption(1);
      if (e.key === "3") setSelectedOption(2);
      if (e.key === "4") setSelectedOption(3);
      if (e.key === "Enter") handleNext();
    }

    document.addEventListener("keydown", keyDown);

    return () => document.removeEventListener("keydown", keyDown);
  }, [handleNext]);

  if (isFinished) {
    return (
      <FinishCard
        correctAnswers={correctAnswers}
        wrongAnswers={wrongAnswers}
        gameId={game.id}
      />
    );
  }

  // console.log({ now: now, gameStarted: game.timeStarted });

  return (
    <div className="md:absolute top-1/2 left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-10/12 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-base">
            {game.progLanguage.charAt(0).toUpperCase() +
              game.progLanguage.slice(1)}
          </Badge>
          <Badge variant="outline" className="text-base">
            {game.difficulty.charAt(0).toUpperCase() +
              game.difficulty.slice(1).toLowerCase()}
          </Badge>
          <Badge variant="outline" className="text-base">
            {game.questions.length} Questions
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-base space-x-2">
            {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
          </Badge>
          <Badge
            variant="outline"
            className="text-base dark:border-green-950 border-green-500"
          >
            {correctAnswers}
          </Badge>
          <Badge
            variant="outline"
            className="text-base dark:border-red-950 border-red-500"
          >
            {wrongAnswers}
          </Badge>
        </div>
      </div>
      <div className="flex items-start rounded-md border p-6 flex-col gap-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>{questionIndex + 1}</span>
          of
          <span>{game.questions.length}</span>
        </div>
        <h1 className="text-xl text-start">
          {game.questions[questionIndex].question}
        </h1>
      </div>
      {currentOptions?.map((option, index) => (
        <Button
          key={index}
          variant={selectedOption === index ? "default" : "outline"}
          onClick={() => setSelectedOption(index)}
          className="justify-start w-full py-4 space-y-4 text-base group h-fit"
        >
          <div className="flex items-center justify-start">
            <div className="p-2 px-4 mr-4 border border-b-2 rounded-md transition-all font-mono group-hover:border-zinc-950 duration-300">
              <kbd className="text-sm text-muted-foreground">{index + 1}</kbd>
            </div>
            <div className="text-start">{option}</div>
          </div>
        </Button>
      ))}
      <Button
        disabled={selectedOption === null || isChecking}
        size="lg"
        className="w-fit flex gap-2 self-end"
        onClick={handleNext}
      >
        {isChecking ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
        {questionIndex === game.questions.length - 1 ? "Finish" : "Next"}
      </Button>
    </div>
  );
}

export { Quiz };
