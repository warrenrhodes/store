'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface ProductSearchProps {
  value: string
  onChange: (value: string) => void
}

export function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <div className="relative w-full sm:w-[300px]">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search products..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  )
}
