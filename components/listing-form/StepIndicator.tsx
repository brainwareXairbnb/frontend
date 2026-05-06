'use client'

import { CheckCircle, LucideIcon } from 'lucide-react'

interface Step {
  number: number
  title: string
  icon: LucideIcon
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className='flex items-center justify-between gap-2'>
      {steps.map((step, index) => {
        const StepIcon = step.icon
        const isActive = currentStep === step.number
        const isCompleted = currentStep > step.number

        return (
          <div key={step.number} className='flex items-center flex-1'>
            <div className='flex flex-col items-center flex-1'>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all mb-1 ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/30'
                    : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className='w-5 h-5' />
                ) : (
                  <StepIcon className='w-5 h-5' />
                )}
              </div>
              <span
                className={`text-xs font-semibold ${
                  isActive
                    ? 'text-primary'
                    : isCompleted
                      ? 'text-emerald-600'
                      : 'text-on-surface-variant'
                } hidden md:block`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 transition-all ${
                  isCompleted ? 'bg-emerald-500' : 'bg-outline-variant/20'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
