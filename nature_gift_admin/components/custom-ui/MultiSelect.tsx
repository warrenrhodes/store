'use client'

import * as React from 'react'
import { X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Command as CommandPrimitive } from 'cmdk'

interface MultiSelectProps {
  placeholder: string
  values: SelectValue[]
  selectedValues: SelectValue[]
  onChange: (value: SelectValue[]) => void
}
interface SelectValue {
  value: string
  label: string
}
export const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  values,
  onChange,
  selectedValues,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<SelectValue[]>(selectedValues)
  const [inputValue, setInputValue] = React.useState('')

  React.useEffect(() => {
    onChange(selected)
  }, [selected])

  const handleUnselect = React.useCallback((data: SelectValue) => {
    setSelected(prev => prev.filter(s => s.value !== data.value))
  }, [])

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '') {
          setSelected(prev => {
            const newSelected = [...prev]
            newSelected.pop()
            return newSelected
          })
        }
      }
      if (e.key === 'Escape') {
        input.blur()
      }
    }
  }, [])

  const selectTableData = values.filter(value => !selected.includes(value))

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map(value => {
            return (
              <Badge key={value.value} variant="secondary">
                {value.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleUnselect(value)
                    }
                  }}
                  onMouseDown={e => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(value)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onKeyDown={handleKeyDown}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectTableData.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectTableData.map(_value => {
                  return (
                    <CommandItem
                      key={_value.value}
                      onMouseDown={e => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onSelect={value => {
                        const selects = selected.find(
                          e => e.label.toLocaleLowerCase() === value.toLocaleLowerCase(),
                        )
                        setInputValue('')
                        if (!selects) {
                          setSelected(prev => [...prev, _value])
                        }
                      }}
                      className={'cursor-pointer'}
                    >
                      {_value.label}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  )
}

export default MultiSelect
