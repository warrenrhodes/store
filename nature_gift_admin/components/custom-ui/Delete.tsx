'use client'

import { Trash } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

interface DeleteProps {
  item: string
  handleDelete: () => Promise<boolean>
}

const Delete: React.FC<DeleteProps> = ({ item, handleDelete }) => {
  const { toast } = useToast()
  const router = useRouter()

  const onDelete = async () => {
    try {
      const result = await handleDelete()

      if (result) {
        toast({ description: `${item} deleted` })
        router.refresh()
      } else {
        toast({ variant: 'destructive', description: `Could not delete this item.` })
      }
    } catch (err) {
      console.log(err)
      toast({
        variant: 'destructive',
        description: 'Something went wrong! Please try again.',
      })
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Delete">
          <Trash className="h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-500/40 text-white hover:bg-red-500 hover:bg-red-500/40/70 "
            onClick={onDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Delete
