'use client'

import { ColumnDef } from '@tanstack/react-table'
import Delete from '../custom-ui/Delete'
import Image from 'next/image'
import { Prisma } from '@prisma/client'
export const mediColumns: ColumnDef<Prisma.MediaGetPayload<object>>[] = [
  {
    accessorKey: 'url',
    header: 'Media',
    cell: ({ row }) => (
      <div className="h-[50px] relative w-[50px]">
        {row.original.type === 'IMAGE' ? (
          <Image
            src={`${row.original.url}`}
            alt="media"
            fill
            style={{ objectFit: 'fill' }}
            sizes="(max-width: 120px) 100vw, (max-width: 120px) 50vw, 33vw"
          />
        ) : (
          <video
            src={`${row.original.url}`}
            className="w-full h-full object-cover"
            onLoadedMetadata={() => URL.revokeObjectURL(`${row.original.url}`)}
          />
        )}
      </div>
    ),
  },
  {
    accessorKey: 'fileName',
    header: 'File Name',
    cell: ({ row }) => <p>{row.original.fileName}</p>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const media = row.original
      const onDelete = async (): Promise<boolean> => {
        const res = await fetch(`/api/media/${media.id}`, {
          method: 'DELETE',
        })
        return res.ok
      }

      return (
        <div className="flex gap-3 items-center cursor-pointer">
          <Delete item="medias" handleDelete={onDelete} />
        </div>
      )
    },
  },
]
