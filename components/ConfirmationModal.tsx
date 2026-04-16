'use client';

import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Loader2 } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (inputValue?: string) => Promise<void>;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'success' | 'warning' | 'info';
  requiresInput?: boolean;
  inputPlaceholder?: string;
  inputLabel?: string;
}

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
  inputLabel = 'Reason'
}: ConfirmationModalProps) {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (requiresInput && !inputValue.trim()) {
      setError(`${inputLabel} is required`);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await onConfirm(requiresInput ? inputValue : undefined);
      onClose();
      setInputValue('');
    } catch (err: any) {
      setError(err.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const getThemeColors = () => {
    switch (type) {
      case 'danger':
        return {
          bg: 'bg-red-600',
          hover: 'hover:bg-red-700',
          light: 'bg-red-50',
          text: 'text-red-600',
          icon: 'text-red-600',
          border: 'border-red-100'
        };
      case 'success':
        return {
          bg: 'bg-emerald-600',
          hover: 'hover:bg-emerald-700',
          light: 'bg-emerald-50',
          text: 'text-emerald-600',
          icon: 'text-emerald-600',
          border: 'border-emerald-100'
        };
      case 'warning':
        return {
          bg: 'bg-orange-600',
          hover: 'hover:bg-orange-700',
          light: 'bg-orange-50',
          text: 'text-orange-600',
          icon: 'text-orange-600',
          border: 'border-orange-100'
        };
      default:
        return {
          bg: 'bg-primary',
          hover: 'hover:opacity-90',
          light: 'bg-blue-50',
          text: 'text-primary',
          icon: 'text-primary',
          border: 'border-blue-100'
        };
    }
  };

  const colors = getThemeColors();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-on-surface/60 backdrop-blur-[2px] transition-opacity"
        onClick={loading ? undefined : onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-[440px] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300">
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className={`p-3.5 rounded-2xl ${colors.light}`}>
              <AlertTriangle className={`w-6 h-6 ${colors.icon}`} />
            </div>
            <button
              onClick={onClose}
              disabled={loading}
              className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant/40 hover:text-on-surface disabled:opacity-30"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-extrabold text-on-surface mb-2.5 tracking-tight">{title}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">{message}</p>
          </div>

          {requiresInput && (
            <div className="mb-8">
              <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2.5 px-1">
                {inputLabel}
              </label>
              <textarea
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (error) setError(null);
                }}
                disabled={loading}
                autoFocus
                placeholder={inputPlaceholder}
                className={`w-full bg-surface-container-lowest border-2 ${error ? 'border-red-500' : 'border-outline-variant/10 focus:border-primary'} rounded-2xl p-4 text-sm focus:outline-none transition-all resize-none min-h-[120px]`}
              />
              {error && <p className="text-red-600 text-[10px] font-bold mt-2.5 ml-1 uppercase">{error}</p>}
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex flex-row gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 order-2 sm:order-1 h-14 md:h-12 rounded-xl font-bold text-sm text-on-surface bg-surface-container hover:bg-surface-container-high transition-all active:scale-95 disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className={`flex-[1.5] order-1 sm:order-2 h-14 md:h-12 rounded-xl font-bold text-sm text-white px-8 ${colors.bg} ${colors.hover} transition-all active:scale-95 shadow-md flex items-center justify-center gap-2.5 disabled:opacity-50`}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
