import { cn } from '@/lib/utils/utils'
import { PropsWithChildren } from 'react'

export const Section = (props: PropsWithChildren<{ className?: string }>) => (
  <section className={cn('max-w-5xl m-auto', props.className)}>{props.children}</section>
)
