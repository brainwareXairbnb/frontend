'use client'

import React, { useState } from 'react'
import { AlertTriangle, Loader2, CheckCircle, Info } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ConfirmationModalProps } from '@/lib/types'

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info',
  requiresInput = false,
  inputPlaceholder = 'Enter reason...',
  inputLabel = 'Reason',
}: ConfirmationModalProps) {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConfirm = async () => {
    if (requiresInput && !inputValue.trim()) {
      setError(`${inputLabel} is required`)
      return
    }

    setLoading(true)
    setError(null)
    try {
      await onConfirm(requiresInput ? inputValue : undefined)
      setInputValue('')
      onClose()
    } catch (err: any) {
      setError(err.message || 'Operation failed')
    } finally {
      setLoading(false)
    }
  }

  const getTypeConfig = () => {
    switch (type) {
      case 'danger':
        return {
          icon: AlertTriangle,
          iconBg: 'bg-red-50',
          iconColor: 'text-red-600',
          buttonClass: 'bg-red-600 hover:bg-red-700 text-white',
        }
      case 'success':
        return {
          icon: CheckCircle,
          iconBg: 'bg-emerald-50',
          iconColor: 'text-emerald-600',
          buttonClass: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        }
      case 'warning':
        return {
          icon: AlertTriangle,
          iconBg: 'bg-orange-50',
          iconColor: 'text-orange-600',
          buttonClass: 'bg-orange-600 hover:bg-orange-700 text-white',
        }
      default:
        return {
          icon: Info,
          iconBg: 'bg-blue-50',
          iconColor: 'text-blue-600',
          buttonClass: 'bg-primary hover:bg-primary/90 text-white',
        }
    }
  }

  const config = getTypeConfig()
  const Icon = config.icon

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-[calc(100%-2rem)] sm:w-full sm:max-w-[440px] max-h-[90vh] overflow-hidden rounded-3xl p-0 gap-0'>
        <div className='p-6 sm:p-8 overflow-y-auto'>
          <DialogHeader className='space-y-0 mb-6'>
            <div className='flex items-start justify-between'>
              <div className={`p-3.5 rounded-2xl ${config.iconBg} mb-4`}>
                <Icon className={`w-6 h-6 ${config.iconColor}`} />
              </div>
            </div>
            <DialogTitle className='text-xl font-extrabold text-on-surface tracking-tight text-left'>
              {title}
            </DialogTitle>
            <DialogDescription className='text-on-surface-variant text-sm leading-relaxed text-left mt-2.5'>
              {message}
            </DialogDescription>
          </DialogHeader>

          {requiresInput && (
            <div className='mb-6'>
              <label className='block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2.5 px-1'>
                {inputLabel}
              </label>
              <textarea
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  if (error) setError(null)
                }}
                disabled={loading}
                autoFocus
                placeholder={inputPlaceholder}
                className={`w-full bg-surface-container-lowest border-2 ${
                  error
                    ? 'border-red-500'
                    : 'border-outline-variant/10 focus:border-primary'
                } rounded-2xl p-4 text-sm focus:outline-none transition-all resize-none min-h-[120px]`}
              />
              {error && (
                <p className='text-red-600 text-[10px] font-bold mt-2.5 ml-1 uppercase'>
                  {error}
                </p>
              )}
            </div>
          )}

          <DialogFooter className='flex-col sm:flex-row gap-3'>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              disabled={loading}
              className='w-full sm:flex-1 h-12 rounded-xl font-bold text-sm'
            >
              {cancelText}
            </Button>
            <Button
              type='button'
              onClick={handleConfirm}
              disabled={loading}
              className={`w-full sm:flex-[1.5] h-12 rounded-xl font-bold text-sm ${config.buttonClass} shadow-md`}
            >
              {loading ? (
                <>
                  <Loader2 className='w-4 h-4 animate-spin mr-2' />
                  Loading...
                </>
              ) : (
                confirmText
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
