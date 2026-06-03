'use client'

import { useState } from 'react'

interface UserAvatarProps {
  src?: string | null
  name: string
  size?: 'sm' | 'md'
}

export function UserAvatar({ src, name, size = 'sm' }: UserAvatarProps) {
  const [hasError, setHasError] = useState(false)
  const initial = name?.trim()?.charAt(0)?.toUpperCase() || '?'

  const containerClasses = size === 'md'
    ? 'w-12 h-12 rounded-xl bg-primary/10 text-primary font-bold text-lg shrink-0 flex items-center justify-center'
    : 'w-10 h-10 rounded-full bg-surface-container text-on-surface-variant font-black shrink-0 flex items-center justify-center'

  const imgClasses = size === 'md'
    ? 'w-12 h-12 rounded-xl object-cover shrink-0'
    : 'w-10 h-10 rounded-full object-cover shrink-0'

  if (src && !hasError) {
    return (
      <img
        src={src}
        alt={name}
        className={imgClasses}
        onError={() => setHasError(true)}
      />
    )
  }

  return (
    <div className={containerClasses}>
      {initial}
    </div>
  )
}
