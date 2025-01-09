import { Locale, localization } from '@/lib/localizations'
import { cn } from '@/lib/utils/utils'
import { buttonVariants } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useLocale } from '@/hooks/useLocale'

export const LocaleSelector = () => {
  const { locale, setLocale } = useLocale()

  const handleLocaleSelection = (newLocale: Locale) => {
    if (locale === newLocale) return
    setLocale(newLocale)
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'relative  group-hover:bg-transparent backdrop-blur-sm cursor-pointer ',
          )}
        >
          {locale.toUpperCase()}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-12 p-0">
        <div className="flex w-full flex-col space-y-2 p-1">
          {localization.locales.map(i => (
            <div
              key={i}
              onClick={() => handleLocaleSelection(i)}
              className={cn(
                { 'bg-primary/15': locale == i },
                'w-full cursor-pointer hover:bg-primary/30 flex items-center justify-center text-sm',
              )}
            >
              {i.toUpperCase()}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
