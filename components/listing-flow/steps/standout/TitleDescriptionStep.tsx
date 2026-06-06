'use client'

import { useState } from 'react'
import { Plus, Trash } from 'lucide-react'
import type { ListingFormData } from '@/lib/listing-flow/steps'

interface TitleDescriptionStepProps {
  formData: ListingFormData
  onChange: (data: Partial<ListingFormData>) => void
  disabled?: boolean
}

export function TitleDescriptionStep({
  formData,
  onChange,
  disabled = false,
}: TitleDescriptionStepProps) {
  const [ruleInput, setRuleInput] = useState('')
  const SUGGESTED_RULES = [
    'No smoking',
    'No alcohol consumption',
    'No drugs or illegal substances',
    'No loud music or parties',
    'Maintain silence during quiet hours',
    'Curfew at 10 PM',
    'Curfew at 11 PM',
    'No pets allowed',
    'No overnight guests',
    'Visitors allowed only during specified hours',
    'No unauthorized occupants',
    'Keep common areas clean',
    'Clean your room regularly',
    'Dispose of waste properly',
    'No cooking inside rooms',
    'Kitchen usage only during designated hours',
    'Switch off lights and fans when not in use',
    'Conserve water',
    'No damage to property',
    'Report maintenance issues immediately',
    'Parking available only in designated areas',
    'No commercial activities from premises',
    'Respect fellow residents',
    'Valid ID required for visitors',
    'Monthly rent must be paid on time',
    'Security deposit rules apply',
    'Follow hostel management instructions',
    'No gambling',
    'No weapons allowed',
    'CCTV monitored premises',
    'Separate accommodation rules for male/female guests',
    'Laundry area usage only during permitted hours',
    'Use Wi-Fi responsibly',
    'No illegal downloads or activities on network',
    'Entry register/sign-in required',
    'Room inspections may be conducted periodically',
  ]

  const handleToggleSuggested = (rule: string) => {
    const rules = formData.houseRules || []
    if (rules.includes(rule)) {
      onChange({ houseRules: rules.filter((r) => r !== rule) })
    } else {
      onChange({ houseRules: [...rules, rule] })
    }
  }

  const handleAddCustom = () => {
    if (!ruleInput.trim()) return
    const trimmed = ruleInput.trim()
    const rules = formData.houseRules || []
    if (!rules.includes(trimmed)) {
      onChange({ houseRules: [...rules, trimmed] })
    }
    setRuleInput('')
  }

  const handleRemoveRule = (rule: string) => {
    const rules = formData.houseRules || []
    onChange({ houseRules: rules.filter((r) => r !== rule) })
  }
  const maxTitleLength = 100
  const currentTitleLength = formData.title?.length || 0

  return (
    <div className='max-w-2xl mx-auto py-8 px-4'>
      {/* Title Section */}
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-on-surface mb-2'>
          {"Now, let's give your place a title"}
        </h1>
        <p className='text-on-surface-variant mb-6'>
          Short titles work best. Have fun with it—you can always change it
          later.
        </p>

        <div className='space-y-2'>
          <textarea
            value={formData.title}
            onChange={(e) =>
              onChange({ title: e.target.value.slice(0, maxTitleLength) })
            }
            disabled={disabled}
            maxLength={maxTitleLength}
            rows={3}
            placeholder='e.g., Cozy room near Brainware University'
            className='w-full px-4 py-3 text-lg border-2 border-outline-variant/30 rounded-2xl resize-none focus:border-on-surface outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed'
          />
          <div className='flex justify-between text-sm text-on-surface-variant'>
            <span>
              {currentTitleLength} / {maxTitleLength}
            </span>
            {currentTitleLength > 0 && (
              <span
                className={
                  currentTitleLength >= maxTitleLength ? 'text-error' : ''
                }
              >
                {maxTitleLength - currentTitleLength} characters left
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div>
        <h2 className='text-xl md:text-2xl font-bold text-on-surface mb-2'>
          Create your description
        </h2>
        <p className='text-on-surface-variant mb-6'>
          Share what makes your place special
        </p>

        <div className='space-y-2'>
          <textarea
            value={formData.description}
            onChange={(e) => onChange({ description: e.target.value })}
            disabled={disabled}
            rows={8}
            placeholder='Describe your place, the neighborhood, and what guests can expect...'
            className='w-full px-4 py-3 text-base border-2 border-outline-variant/30 rounded-2xl resize-none focus:border-on-surface outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed'
          />
        </div>

        {/* Tips */}
        <div className='mt-6 bg-blue-50/50 border border-blue-200 rounded p-4'>
          <p className='text-sm font-bold text-blue-900 mb-2'>
            What to include:
          </p>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• What makes your space unique</li>
            <li>• Nearby facilities and landmarks</li>
            <li>• Transportation options</li>
            <li>• House rules or special features</li>
          </ul>
        </div>
      </div>

      {/* House Rules Section */}
      <div className='mt-8 pt-8 border-t border-outline-variant/20'>
        <h2 className='text-xl md:text-2xl font-bold text-on-surface mb-2'>
          Set your house rules
        </h2>
        <p className='text-on-surface-variant mb-6'>
          Specify what is allowed or forbidden in your space
        </p>

        {/* Suggested Rules Badges Grouped by Category */}
        <div className='space-y-6 mb-6'>
          <div className='flex flex-wrap gap-2'>
            {SUGGESTED_RULES.map((rule) => {
              const isSelected = (formData.houseRules || []).includes(rule)
              return (
                <button
                  key={rule}
                  type='button'
                  disabled={disabled}
                  onClick={() => handleToggleSuggested(rule)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${isSelected
                    ? 'bg-red-50 border-red-500 text-red-700'
                    : 'bg-surface-container border-outline-variant/20 text-on-surface-variant hover:bg-white hover:border-red-200'
                    } disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  {rule}
                </button>
              )
            })}
          </div>
        </div>

        {/* Custom Rule Input */}
        {!disabled && (
          <div className='flex gap-2 mb-4'>
            <input
              type='text'
              value={ruleInput}
              onChange={(e) => setRuleInput(e.target.value)}
              placeholder='Add a custom house rule...'
              className='flex-1 h-12 px-4 bg-surface-container border border-outline-variant/20 rounded-xl text-sm text-on-surface focus:border-red-500 focus:bg-white outline-none transition-all'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddCustom()
                }
              }}
            />
            <button
              type='button'
              onClick={handleAddCustom}
              className='h-12 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center gap-1.5 text-sm font-semibold transition-colors'
            >
              <Plus className='w-4 h-4' /> Add
            </button>
          </div>
        )}

        {/* Active Rules List */}
        {(formData.houseRules || []).length > 0 && (
          <div className='bg-surface-container rounded-2xl p-4 border border-outline-variant/10 space-y-2'>
            <p className='text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2'>
              Active Rules
            </p>
            <div className='space-y-2'>
              {(formData.houseRules || []).map((rule, index) => (
                <div key={index} className='flex items-center justify-between gap-3 bg-white px-3 py-2 rounded-xl border border-outline-variant/5 shadow-sm'>
                  <span className='text-xs font-medium text-on-surface'>{rule}</span>
                  {!disabled && (
                    <button
                      type='button'
                      onClick={() => handleRemoveRule(rule)}
                      className='text-red-500 hover:text-red-700 transition-colors p-1 rounded hover:bg-red-50'
                      title='Remove rule'
                    >
                      <Trash className='w-3.5 h-3.5' />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
