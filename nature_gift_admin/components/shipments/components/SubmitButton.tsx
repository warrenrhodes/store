'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export const SubmitButton = (props: { label: string; isLoading: boolean }) => {
  return (
    <Button disabled={props.isLoading} type="submit">
      {props.isLoading && <Loader2 className="animate-spin" />}
      {props.label}
    </Button>
  )
}
