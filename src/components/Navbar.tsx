import React from "react";
import Link from "next/link";
import { getAuthSession } from "@/lib/nextauth";
import { SignInButton } from "@/components/SignInButton";
import { UserButton } from "@/components/UserButton";
import { ThemeToggle } from "@/components/ThemeToggle";

type Props = {};

async function Navbar({}: Props) {
  const session = await getAuthSession();
  return (
    <header className="fixed inset-0 top-0 bg-zinc-50 h-14 dark:bg-zinc-950 z-10 border-b border-zinc-200 dark:border-zinc-800 py-2">
      <div className="flex items-center justify-between h-full gap-2 px-4 mx-auto max-w-7xl">
        <Link href={"/"}>
          <span className="font-mono text-sm rounded-lg border-2 border-b-4 border-r-4 hover:border-r-2 hover:border-b-2 border-zinc-800 dark:border-zinc-900 px-2 py-1 font-bold transition-all hover:-translate-y-[-2px] md:block">
            CodeQuiz
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {session?.user && <UserButton user={session.user} />}
          {!session?.user && <SignInButton />}
        </div>
      </div>
    </header>
  );
}

export { Navbar };
