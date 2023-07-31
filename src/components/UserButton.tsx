"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut, LayoutDashboard, User, GraduationCapIcon } from "lucide-react";
import { UserAvatar } from "@/components/UserAvatar";

interface Props {
  user: Pick<import("next-auth").User, "name" | "email" | "image">;
}

function UserButton({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-md">
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-50 dark:bg-zinc-950" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-48 truncate text-sm text-zinc-500">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <div className="cursor-pointer flex items-center justify-between">
            <Link href={"/quiz"}>New quiz</Link>
            <GraduationCapIcon size={16} />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <div className="cursor-pointer flex items-center justify-between">
            <Link href={"/dashboard"}>Dashboard</Link>
            <LayoutDashboard size={16} />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <div className="cursor-pointer flex items-center justify-between">
            <Link href={"/profile"}>Profile</Link>
            <User size={16} />
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer flex items-center justify-between"
          onClick={() => signOut()}
        >
          <span className="text-red-600">Sign out</span>
          <LogOut size={16} color="#dc2626" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { UserButton };
