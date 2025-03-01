'use client'

import { memo, useCallback, useState } from 'react'

import { PreviewText } from './rich_text/PreviewText'
import React from 'react'
import { Button } from '../ui/button'
import RichTextV1 from './rich_text/RichTextV1'

// Component props
interface CustomRichTextProps {
  content: string
  onSave: (value: string) => void
}

function CustomRichTextEditor(props: CustomRichTextProps) {
  const { onSave } = props
  const [isFullscreen, setIsFullscreen] = useState(false)
  const handleSave = useCallback(
    (value: string) => {
      onSave(value)
    },
    [onSave],
  )

  return (
    <div>
      <div className="flex gap-3">
        <FullscreenButton onClick={() => setIsFullscreen(true)} />

        <PreviewText content={props.content} />
      </div>

      {isFullscreen && (
        <RichTextV1
          content={props.content}
          onClose={() => setIsFullscreen(false)}
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
