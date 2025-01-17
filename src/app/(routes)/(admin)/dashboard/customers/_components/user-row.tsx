import React from "react";
import { User } from "@prisma/client";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserRow = ({ user }: { user: User }) => {
  const { id, avatarUrl, username, email, isAdmin } = user;

  return (
    <TableRow>
      <TableCell>
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>{username}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{isAdmin ? "Yes" : "No"}</TableCell>
    </TableRow>
  );
};

export default UserRow;
