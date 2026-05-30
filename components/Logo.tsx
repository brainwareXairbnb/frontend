import { Building2 } from 'lucide-react'
import Link from 'next/link'

interface LogoProps {
  heading?: string
  asLink?: boolean
  noMargin?: boolean
  compact?: boolean
}

const Logo = ({ heading, asLink = true, noMargin = false, compact = false }: LogoProps) => {
  const content = (
    <div className={`flex items-center ${compact ? 'gap-2' : 'gap-3'} group ${noMargin ? '' : 'mb-8 md:mb-10'}`}>
      <div className={`bg-primary flex items-center justify-center shadow-2xl shadow-primary/20 group-hover:rotate-12 transition-all duration-500 ${compact ? 'w-10 h-10 rounded-lg' : 'w-14 h-14 rounded-[1.2rem]'}`}>
        <Building2 className={`text-white ${compact ? 'w-5 h-5' : 'w-6 h-6'}`} />
      </div>
      <div className='flex flex-col'>
        <span className={`font-headline font-black tracking-tighter text-on-surface uppercase leading-none ${compact ? 'text-lg' : 'text-2xl'}`}>
          Brain <span className={`text-primary/40 ${compact ? 'text-xl' : 'text-3xl'}`}>X</span>
        </span>
        {heading && (
          <span className='text-[8px] font-black text-primary uppercase tracking-[0.5em] mt-1 opacity-60'>
            {heading}
          </span>
        )}
      </div>
    </div>
  )

  if (asLink) {
    return <Link href='/'>{content}</Link>
  }

  return content
}

export default Logo
