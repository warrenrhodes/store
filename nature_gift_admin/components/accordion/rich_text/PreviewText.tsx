import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'

export const PreviewText = (props: { content: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="Preview" disabled={props.content.length === 0}>
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-none h-full overflow-scroll">
        <DialogHeader>
          <DialogTitle>Preview</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: props.content }} />
      </DialogContent>
    </Dialog>
  )
}
