import React from "react";
import { User } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import UserRow from "./user-row";

const CustomersRows = ({
  loading,
  users,
}: {
  loading: boolean;
  users: User[];
}) => {
  return (
    <Table>
      <TableCaption>List of customers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Avatar</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>is Admin</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          ? Array.from({ length: 4 }).map((_, index) => {
              return (
                <TableRow key={index + 1}>
                  <TableCell colSpan={4}>
                    <Skeleton className="h-[80px]" />
                  </TableCell>
                </TableRow>
              );
            })
          : users.map((user) => {
              return (
                <UserRow
                  key={user.username.toLowerCase().replace(" ", "-")}
                  user={user}
                />
              );
            })}
      </TableBody>
    </Table>
  );
};

export default CustomersRows;
