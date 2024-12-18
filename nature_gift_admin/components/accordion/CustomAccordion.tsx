import { cn } from '@/lib/utils'
import { Accordion, AccordionTrigger, AccordionContent, AccordionItem } from '../ui/accordion'

const CustomAccordion = ({
  className,
  title,
  children,
}: {
  className?: string
  title: string
  children: React.ReactNode
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn('py-2 text-left text-sm font-medium text-muted-foreground')}
    >
      <AccordionItem value={title}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent className={className}>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default CustomAccordion
