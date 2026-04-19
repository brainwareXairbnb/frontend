import { useEffect, useState } from 'react'

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')

    const listener = () => setIsMobile(media.matches)
    listener()

    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  return isMobile
}
