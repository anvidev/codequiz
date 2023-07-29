import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

interface Props {
  user: Pick<import("next-auth").User, "name" | "image">;
}

function UserAvatar({ user }: Props) {
  return (
    <Avatar className="h-8 w-8 rounded-md">
      <AvatarImage
        src={
          user.image ||
          `https://ui-avatars.com/api/?name=${user.name?.substring(0, 2)}`
        }
        alt="User avatar image"
      />
      <AvatarFallback>{user.name?.substring(0, 2)}</AvatarFallback>
    </Avatar>
  );
}

export { UserAvatar };
