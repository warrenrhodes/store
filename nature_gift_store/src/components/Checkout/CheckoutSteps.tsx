'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

interface Step {
  id: string
  title: string
}

interface StepsProps {
  steps: Step[]
  currentStep: string
}

export function CheckoutSteps({ steps, currentStep }: StepsProps) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep)

  return (
    <div className="relative">
      <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2" />
      <div className="relative z-10 flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex
          const isCurrent = index === currentStepIndex

          return (
            <motion.div
              key={step.id}
              className="flex flex-col items-center"
              initial={false}
              animate={{
                opacity: index <= currentStepIndex ? 1 : 0.5,
              }}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted || isCurrent ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}
              >
                {isCompleted ? <CheckCircle className="w-5 h-5" /> : <span>{index + 1}</span>}
              </div>
              <span className="mt-2 text-sm font-medium">{step.title}</span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
