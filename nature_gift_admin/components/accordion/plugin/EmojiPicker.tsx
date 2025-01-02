import React, { useState } from 'react'
import { Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'

const smileys = [
  '😀',
  '😃',
  '😄',
  '😁',
  '😆',
  '😅',
  '😂',
  '🤣',
  '😊',
  '😇',
  '🙂',
  '🙃',
  '😉',
  '😌',
  '😍',
  '🥰',
  '😘',
  '😗',
  '😙',
  '😚',
  '😋',
  '😛',
  '😝',
  '😜',
  '🤪',
  '🤨',
  '🧐',
  '🤓',
  '😎',
  '🤩',
  '🥳',
  '😏',
  '😒',
  '😞',
  '😔',
  '😟',
  '😕',
  '🙁',
  '🤑',
  '🤗',
  '🤭',
  '🤫',
  '🤔',
  '🤐',
  '🤨',
  '😐',
  '😑',
  '😶',
  '😏',
  '😒',
  '🙄',
  '😬',
  '🤥',
  '😌',
  '😔',
  '😪',
  '🤤',
  '😴',
  '😷',
  '🤒',
  '🤕',
  '🤢',
  '🤮',
  '🤧',
  '😵',
  '🤯',
  '🤠',
  '🥳',
  '🥺',
  '😳',
  '😡',
  '😠',
  '🤬',
  '😤',
  '😩',
  '😫',
  '😰',
  '😱',
  '🥵',
  '🥶',
  '😓',
  '😥',
  '😢',
  '😭',
  '😤',
  '😮',
  '🤯',
  '😲',
  '🤥',
  '😏',
  '😜',
  '😛',
  '🧑',
  '👩',
  '👨',
  '👧',
  '👦',
  '👶',
  '🧒',
  '👩‍🦱',
  '👨‍🦱',
  '👩‍🦰',
  '👨‍🦰',
  '👩‍🦳',
  '👨‍🦳',
  '👩‍🦲',
  '👨‍🦲',
  '🧔',
  '🧔‍♂️',
  '🧔‍♀️',
  '👳',
  '👳‍♂️',
  '👳‍♀️',
  '👲',
  '🧕',
  '🧙',
  '🧚',
  '🧛',
  '🧜',
  '🧝',
  '🧞',
  '🧟',
  '💆',
  '💇',
  '🧖',
  '🧗',
  '🧘',
]
const animals = [
  '🐶',
  '🐱',
  '🐭',
  '🐹',
  '🐰',
  '🦊',
  '🐻',
  '🐼',
  '🐨',
  '🐯',
  '🦁',
  '🐮',
  '🐷',
  '🐽',
  '🐸',
  '🐵',
  '🙈',
  '🙉',
  '🙊',
  '🐒',
  '🐔',
  '🐧',
  '🐦',
  '🐤',
  '🐣',
  '🐥',
  '🦆',
  '🦅',
  '🦉',
  '🦇',
  '🐺',
  '🐗',
  '🐴',
  '🦄',
  '🐝',
  '🐛',
  '🦋',
  '🐌',
  '🐞',
  '🐜',
  '🪲',
  '🪳',
]

const food = [
  '🍏',
  '🍎',
  '🍐',
  '🍊',
  '🍋',
  '🍌',
  '🍉',
  '🍇',
  '🍓',
  '🫐',
  '🥝',
  '🍒',
  '🍑',
  '🥭',
  '🍍',
  '🥥',
  '🥑',
  '🍆',
  '🥔',
  '🥕',
  '🌽',
  '🌶',
  '🥒',
  '🥬',
  '🥦',
  '🧄',
  '🧅',
  '🍄',
  '🥜',
  '🌰',
  '🍞',
  '☹️',
  '😣',
  '❤️',
  '🧡',
  '💛',
  '💚',
  '💙',
  '💜',
  '🤎',
  '🖤',
  '🤍',
  '💔',
  '✨',
  '💫',
  '🌟',
  '⭐',
  '🎉',
  '🎊',
  '🎈',
  '🎂',
  '🎄',
  '🎃',
  '🥖',
  '🥨',
  '🥯',
  '🧇',
  '🧀',
  '🥗',
  '🥘',
  '🥙',
  '🥪',
  '🌮',
  '🌯',
]
const vehicles = [
  '🚗',
  '🚕',
  '🚙',
  '🚌',
  '🚎',
  '🏎',
  '🚓',
  '🚑',
  '🚒',
  '🚐',
  '🛻',
  '🚚',
  '🚛',
  '🚜',
  '🛵',
  '🏍',
  '🛺',
  '🚲',
  '🛴',
  '🚨',
  '🚔',
  '🚍',
  '🚘',
  '🚖',
  '🚡',
  '🚠',
  '🚟',
  '🚃',
  '🚋',
  '🚞',
  '🚝',
  '🚄',
  '🚅',
  '🚈',
  '🚂',
  '🚆',
  '🚇',
  '🚊',
  '🚉',
  '✈️',
  '🛫',
  '🛬',
  '⌚',
  '📱',
  '📲',
  '💻',
  '⌨️',
  '🖥️',
  '🖨️',
  '🖱️',
  '🖲️',
  '🕹️',
  '🗜️',
  '💽',
  '💾',
  '💿',
  '📀',
  '📼',
  '📷',
  '📸',
  '📹',
  '🎥',
  '📽️',
  '🎞️',
  '📞',
  '☎️',
  '📟',
  '📠',
  '🇺🇸',
  '🇨🇦',
  '🇬🇧',
  '🇫🇷',
  '🇩🇪',
  '🇮🇮',
  '🇪🇸',
  '🇯🇵',
  '🇨🇳',
  '🇷🇺',
  '🇧🇷',
  '🇮🇳',
  '🇰🇷',
  '🇲🇽',
  '🇿🇦',
  '🇦🇺',
  '🇳🇬',
  '🇦🇪',
  '🇸🇦',
  '🇹🇷',
  '🇮🇷',
]

const symbols = [
  '🚫',
  '🚪',
  '🚭',
  '🚮',
  '🚯',
  '🚰',
  '🚱',
  '🚲',
  '🚳',
  '🚴',
  '🚵',
  '🚶',
  '🚷',
  '🚸',
  '🚹',
  '🚺',
  '🚻',
  '🚼',
  '🚽',
  '🚾',
  '🚿',
  '🛀',
  '🛁',
  '🛂',
  '🛃',
  '🛄',
  '🛅',
  '🛆',
  '🛇',
  '🛈',
  '🛉',
  '🛊',
  '🛋',
  '🛌',
  '🛍',
  '🛎',
  '🛏',
  '🛐',
  '🛑',
  '🛒',
  '🛓',
  '🛔',
  '🛕',
  '🛖',
  '🛗',
  '🛘',
  '🛙',
  '🛚',
  '🛛',
  '🛜',
  '🛝',
  '🛞',
  '🛟',
  '🛠',
  '🛡',
  '🛢',
  '🛣',
  '🛤',
  '🛥',
  '🛦',
  '🛧',
  '🛨',
  '🛩',
  '🛪',
  '🛫',
  '🛬',
  '🛭',
  '🛮',
  '🛯',
  '🛰',
  '🛱',
  '🛲',
  '🛳',
  '🛴',
  '🛵',
  '🛶',
  '🛷',
  '🛸',
  '🛹',
  '🛺',
  '🛻',
  '🛼',
  '🛽',
  '🛾',
  '🛿',
]

interface EmojiPickerProps {
  onSelect: (emoji: string) => void
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 bg-transparent hover:bg-transparent text-blue-600 rounded b"
        title="Insert emoji"
      >
        <Smile size={28} />
      </Button>

      {isOpen && (
        <div className="absolute z-50 bg-white border rounded-lg shadow-lg p-2 w-64 max-h-48 overflow-y-auto grid grid-cols-8 gap-1">
          {[...smileys, ...symbols, ...animals, ...food, ...vehicles].map((emoji, index) => (
            <Button
              type="button"
              key={index}
              onClick={() => {
                onSelect(emoji)
                setIsOpen(false)
              }}
              className="hover:bg-gray-100 rounded p-1 text-lg bg-transparent "
            >
              {emoji}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

export default EmojiPicker
