'use client'

import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/third_party/embedly.min.js'
import 'froala-editor/js/plugins/image.min.js'
import 'froala-editor/js/plugins/save.min.js'
import 'froala-editor/js/third_party/font_awesome.min.js'
import 'froala-editor/js/third_party/image_tui.min.js'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'
import { Card, CardContent } from '@/components/ui/card'
import RichTextV1 from './rich_text/RichTextV1'
import { memo, useCallback, useState } from 'react'

// Component props
interface CustomRichTextProps {
  content: string
  onSave: (value: string) => void
  token: string
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

  if (process.env.NEXT_PUBLIC_RICH_TEXT_VERSION === 'v_1') {
    return (
      <Card className="w-full p-0">
        <CardContent className="p-0">
          <RichTextV1 {...props} ref={null} />
        </CardContent>
      </Card>
    )
  }
  return (
    <div>
      <div className="flex gap-3">
        <FullscreenButton onClick={() => setIsFullscreen(true)} />

        <PreviewText content={props.content} />
      </div>

      {isFullscreen && (
        <RichTextV2
          content={props.content}
          onClose={() => setIsFullscreen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

import { PreviewText } from './rich_text/PreviewText'
import React from 'react'
import RichTextV2 from './rich_text/RichTextV2'
import { Button } from '../ui/button'

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
