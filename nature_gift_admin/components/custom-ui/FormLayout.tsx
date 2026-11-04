'use client'

// The layout of the long admin forms (blog, product, promotion): titled cards in two columns, and
// the actions in a bar that stays at the bottom of the screen.
import { Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

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
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'

/** The main column (children) and the side column, which stays in view on large screens. */
export function FormColumns({ side, children }: { side: ReactNode; children: ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 space-y-6">{children}</div>
      <aside className="space-y-6 lg:sticky lg:top-[4.5rem] lg:self-start">{side}</aside>
    </div>
  )
}

/** A titled card; `action` sits on the right of its title (a switch). */
export function FormSection(props: {
  title: string
  description?: string
  action?: ReactNode
  children?: ReactNode
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-base">{props.title}</CardTitle>
          {props.description && <CardDescription>{props.description}</CardDescription>}
        </div>
        {props.action}
      </CardHeader>
      {props.children && <CardContent className="space-y-5">{props.children}</CardContent>}
    </Card>
  )
}

/** An on/off field on one bordered row, its explanation under the label. */
export function SwitchField<T extends FieldValues>(props: {
  control: Control<T>
  name: FieldPath<T>
  label: string
  hint?: string
}) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="flex items-center justify-between gap-2 space-y-0 rounded-md border p-3">
          <div>
            <FormLabel className="!mt-0">{props.label}</FormLabel>
            {props.hint && <p className="text-xs text-muted-foreground">{props.hint}</p>}
          </div>
          <FormControl>
            <Switch checked={!!field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

/**
 * Delete (asks first), Cancel (back to `cancelHref`) and save. Without `onSubmit` the save button
 * submits the surrounding <form>.
 */
export function FormActionBar(props: {
  isLoading: boolean
  submitLabel: string
  cancelHref: string
  onSubmit?: () => void
  submitDisabled?: boolean
  onDelete?: () => void
  deleteTitle?: string
  deleteWarning?: string
}) {
  const router = useRouter()
  return (
    <div className="sticky bottom-0 z-40 -mx-4 mt-6 border-t bg-background/90 backdrop-blur sm:-mx-6">
      <div className="flex w-full items-center gap-3 px-4 py-3 sm:px-6">
        {props.onDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="text-destructive"
                disabled={props.isLoading}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{props.deleteTitle}</AlertDialogTitle>
                <AlertDialogDescription>{props.deleteWarning}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={props.onDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <div className="ml-auto flex gap-3">
          <Button type="button" variant="outline" onClick={() => router.push(props.cancelHref)}>
            Cancel
          </Button>
          <Button
            type={props.onSubmit ? 'button' : 'submit'}
            onClick={props.onSubmit}
            disabled={props.isLoading || props.submitDisabled}
          >
            {props.isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {props.submitLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
