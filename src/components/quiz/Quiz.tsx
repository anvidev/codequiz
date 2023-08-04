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
  const { toast } = useToast();

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
        setQuestionIndex((prev) => prev + 1);
      },
    });
  }, [checkAnswer, toast, isChecking]);

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

  return (
    <div className="flex flex-col gap-4">
      {/* Quiz meta data */}
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
            00:24
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
      {/* Quiz question */}
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
      {/* Quiz options */}
      {currentOptions?.map((option, index) => (
        <Button
          key={index}
          variant={selectedOption === index ? "default" : "outline"}
          onClick={() => setSelectedOption(index)}
          className="justify-start w-full py-8 space-y-4 text-base group"
        >
          <div className="flex items-center justify-start">
            <div className="p-2 px-4 mr-4 border border-b-2 rounded-md transition-all font-mono group-hover:border-zinc-950 duration-300">
              <kbd className="text-sm text-muted-foreground">{index + 1}</kbd>
            </div>
            <div className="text-start">{option}</div>
          </div>
        </Button>
      ))}
      {/* Next button */}
      <Button
        disabled={selectedOption === null || isChecking}
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
