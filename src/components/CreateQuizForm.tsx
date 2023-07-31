"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { CreateQuizFormSchema } from "@/schemas/form/quiz";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { languages } from "@/data/languages";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {}

type Input = z.infer<typeof CreateQuizFormSchema>;

function CreateQuizForm({}: Props) {
  const form = useForm<Input>({
    resolver: zodResolver(CreateQuizFormSchema),
    defaultValues: {
      language: "",
      difficulty: "novice",
      amount: 5,
    },
  });

  function onSubmit(input: Input) {
    alert(JSON.stringify(input, null, 2));
  }

  form.watch();

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Start new quiz</CardTitle>
        <CardDescription>
          Choose a programming language, amount of questions and a difficulty
          level to start the quiz.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Programming language</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a programming language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem
                          key={language.label}
                          value={language.value}
                          className="cursor-pointer"
                        >
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of questions</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Type an amount"
                      min={1}
                      max={10}
                      onChange={(e) =>
                        form.setValue("amount", parseInt(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
              <FormField
                name="difficulty"
                render={({ field }) => (
                  <div className="flex justify-between">
                    <Button
                      className="w-1/3 rounded-none rounded-l-md"
                      onClick={() => form.setValue("difficulty", "novice")}
                      variant={
                        form.getValues("difficulty") === "novice"
                          ? "default"
                          : "outline"
                      }
                      type="button"
                    >
                      Novice
                    </Button>

                    <Button
                      className="w-1/3 rounded-none border-l-0 border-r-0"
                      onClick={() =>
                        form.setValue("difficulty", "intermediate")
                      }
                      variant={
                        form.getValues("difficulty") === "intermediate"
                          ? "default"
                          : "outline"
                      }
                      type="button"
                    >
                      Intermediate
                    </Button>

                    <Button
                      className="w-1/3 rounded-none rounded-r-md"
                      onClick={() => form.setValue("difficulty", "advanced")}
                      variant={
                        form.getValues("difficulty") === "advanced"
                          ? "default"
                          : "outline"
                      }
                      type="button"
                    >
                      Advanced
                    </Button>
                  </div>
                )}
              />
            </FormItem>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { CreateQuizForm };
