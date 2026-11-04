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
  handleDelete: () => Promise<boolean>
}

const Delete: React.FC<DeleteProps> = ({ handleDelete }) => {
  const { toast } = useToast()
  const router = useRouter()

  const onDelete = async () => {
    try {
      const result = await handleDelete()

      if (result) {
        toast({ description: 'Deleted' })
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
          <AlertDialogTitle>Delete this item?</AlertDialogTitle>
          <AlertDialogDescription>This can&apos;t be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
