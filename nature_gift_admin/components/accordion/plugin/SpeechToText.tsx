import React, { useCallback, useState, useMemo, useRef, useEffect } from 'react'
import { Mic, MicOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import debounce from 'lodash/debounce'

interface SpeechToTextProps {
  onTranscript: (text: string) => void
}

const SpeechToText: React.FC<SpeechToTextProps> = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<any>(null)

  const createRecognition = useCallback(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        console.log('Transcript:', transcript)
        onTranscript(transcript)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      return recognition
    }
    return null
  }, [onTranscript])

  const debouncedStartListening = useMemo(
    () =>
      debounce(() => {
        if (recognitionRef.current) {
          recognitionRef.current.start()
          setIsListening(true)
        }
      }, 300),
    [],
  )

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      recognitionRef.current = createRecognition()
    }

    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser')
      return
    }

    debouncedStartListening()
  }, [createRecognition, debouncedStartListening])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  if (!('webkitSpeechRecognition' in window)) {
    return null
  }

  return (
    <Button
      type="button"
      onClick={isListening ? stopListening : startListening}
      className={`px-3 py-2 text-sm rounded ${
        isListening
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : 'bg-green-500 hover:bg-green-600 text-white'
      }`}
    >
      {isListening ? (
        <>
          <MicOff size={16} className="mr-2" />
          Stop Recording
        </>
      ) : (
        <>
          <Mic size={16} className="mr-2" />
          Start Recording
        </>
      )}
    </Button>
  )
}

export default SpeechToText
