'use client'

import { cn } from '@/lib/utils/utils'
import type { FC } from 'react'
import { useState } from 'react'

interface ProductSizeButtonProps {
  disabled?: boolean
  size: string
}

const ProductSizeButton: FC<ProductSizeButtonProps> = ({ disabled, size }) => {
  const [isDisabled, setIsDisabled] = useState(disabled)
  const [selected, setSelected] = useState(false)

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => setSelected(!selected)}
      className={cn(
        {
          'border-primary': selected,
        },
        'w-10 h-10 border-2 hover:border-primary font-semibold text-sm rounded-full flex items-center justify-center shrink-0',
      )}
    >
      {size}
    </button>
  )
}

export default ProductSizeButton
