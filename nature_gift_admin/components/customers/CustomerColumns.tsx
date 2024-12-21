'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Prisma } from '@naturegift/models'

export const columns: ColumnDef<Prisma.UserGetPayload<{}>>[] = [
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
