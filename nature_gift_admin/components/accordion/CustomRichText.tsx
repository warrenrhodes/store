'use client'

import { memo, useCallback, useState } from 'react'

import { PreviewText } from './rich_text/PreviewText'
import React from 'react'
import { Button } from '../ui/button'
import RichTextV1 from './rich_text/RichTextV1'
import RichTextV3 from './rich_text/RichTextV3'
import { contentSizeError, isPuckContent } from './rich_text/puck/serialize'
import { toast } from '@/hooks/use-toast'

// Component props
interface CustomRichTextProps {
  content: string
  onSave: (value: string) => void
}

function CustomRichTextEditor(props: CustomRichTextProps) {
  const { onSave } = props
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isBuilderOpen, setIsBuilderOpen] = useState(false)
  const isBuilderPage = isPuckContent(props.content)
  const handleSave = useCallback(
    (value: string) => {
      // Jodit saves on blur, so warn instead of dropping what was typed.
      const sizeError = contentSizeError(value)
      if (sizeError)
        toast({ variant: 'destructive', title: 'Content too large', description: sizeError })
      onSave(value)
    },
    [onSave],
  )

  return (
    <div>
      <div className="flex gap-3">
        {!isBuilderPage && <FullscreenButton onClick={() => setIsFullscreen(true)} />}
        <Button
          type="button"
          variant={isBuilderPage ? 'default' : 'outline'}
          onClick={() => setIsBuilderOpen(true)}
          title={
            props.content && !isBuilderPage
              ? 'Existing HTML is imported as a Raw HTML block'
              : 'Build the page visually'
          }
        >
          Page Builder
        </Button>

        <PreviewText content={props.content} />
      </div>

      {isFullscreen && (
        <RichTextV1
          content={props.content}
          onClose={() => setIsFullscreen(false)}
          onSave={handleSave}
        />
      )}

      {isBuilderOpen && (
        <RichTextV3
          content={props.content}
          onClose={() => setIsBuilderOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

interface FullscreenButtonProps {
  onClick: () => void
}

const FullscreenButton: React.FC<FullscreenButtonProps> = ({ onClick }) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      className=" p-3 rounded-lg shadow-lg"
      title="Open Fullscreen Editor"
    >
      Editor Content
    </Button>
  )
}

export default memo(CustomRichTextEditor)
