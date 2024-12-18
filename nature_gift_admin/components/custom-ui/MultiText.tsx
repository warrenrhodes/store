'use client'

import { toast } from '@/hooks/use-toast'
import { X } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'

interface MultiTextProps {
  placeholder: string
  value: string[]
  onChange: (value: string) => void
  onRemove: (value: string) => void
}

const MultiText: React.FC<MultiTextProps> = ({ placeholder, value, onChange, onRemove }) => {
  return (
    <>
      <Input
        placeholder={placeholder}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault()
            if (!e.currentTarget.value.trim()) return
            if (
              value.map(item => item.toLowerCase()).includes(e.currentTarget.value.toLowerCase())
            ) {
              toast({
                title: 'Error',
                description: `${e.currentTarget.value} already exists`,
                variant: 'destructive',
              })
              return
            }
            onChange(e.currentTarget.value)
            const target = e.currentTarget
            target.value = ''
          }
        }}
      />

      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((item, index) => (
          <Badge key={index} className="bg-grey-1" variant={'outline'}>
            {item}
            <button
              className="ml-1 rounded-full outline-none hover:bg-red-500/15 text-red-500 bg-red-500/10"
              onClick={() => onRemove(item)}
              type="button"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </>
  )
}

export default MultiText
