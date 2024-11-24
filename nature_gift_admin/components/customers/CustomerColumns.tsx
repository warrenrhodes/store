"use client";

import { ICustomer } from "@/lib/models/Customer";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: "clerkId",
    header: "Clerk ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
