'use client';

import React from 'react';
import { LucideIcon, Search, PackageOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ 
  icon: Icon = PackageOpen, 
  title, 
  message, 
  action 
}: EmptyStateProps) {
  return (
    <div className="w-full py-24 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-700">
      <div className="w-24 h-24 bg-surface-container-lowest border border-outline-variant/10 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-sm group hover:scale-110 transition-transform duration-500">
        <Icon className="w-10 h-10 text-on-surface-variant/20 group-hover:text-primary transition-colors" strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl font-headline font-black text-on-surface tracking-tighter mb-3 uppercase">
        {title}
      </h3>
      <p className="text-sm font-medium text-on-surface-variant opacity-60 max-w-sm leading-relaxed mb-10">
        {message}
      </p>
      {action && (
        <Button
          onClick={action.onClick}
          rounded="2xl"
          className="h-14 px-10"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
