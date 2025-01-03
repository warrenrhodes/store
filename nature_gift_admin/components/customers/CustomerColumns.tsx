'use client'

import { Prisma } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Prisma.UserGetPayload<object>>[] = [
  {
    accessorKey: 'clerkId',
    header: 'Clerk ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
]
