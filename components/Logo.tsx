import { Building2 } from 'lucide-react'
import Link from 'next/link'

const Logo = ({ heading }: any) => {
  return (
    <Link href='/' className='flex items-center gap-3 mb-8 md:mb-10 group'>
      <div className='w-14 h-14 bg-primary flex items-center justify-center rounded-[1.2rem] shadow-2xl shadow-primary/20 group-hover:rotate-12 transition-all duration-500'>
        <Building2 className='w-6 h-6 text-white' />
      </div>
      <div className='flex flex-col'>
        <span className='font-headline font-black text-2xl tracking-tighter text-on-surface uppercase leading-none'>
          Brain <span className='text-primary/40 text-3xl'>X</span>
        </span>
        {heading && (
          <span className='text-[8px] font-black text-primary uppercase tracking-[0.5em] mt-1 opacity-60'>
            {heading}
          </span>
        )}
      </div>
    </Link>
  )
}

export default Logo
