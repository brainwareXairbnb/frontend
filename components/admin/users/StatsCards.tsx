'use client'

import { User as UserIcon, Building2, AlertCircle } from 'lucide-react'

interface StatsCardsProps {
  stats: {
    total: number
    students: number
    owners: number
    pendingUpgrades: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const kpiData = [
    {
      label: 'TOTAL',
      value: stats.total,
      icon: UserIcon,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'STUDENTS',
      value: stats.students,
      icon: UserIcon,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      label: 'OWNERS',
      value: stats.owners,
      icon: Building2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'UPGRADES',
      value: stats.pendingUpgrades,
      icon: AlertCircle,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ]

  return (
    <section className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8'>
      {kpiData.map((kpi, index) => (
        <div
          key={index}
          className='bg-white p-4 md:p-6 rounded-2xl border border-outline-variant/10 shadow-sm'
        >
          <div className='flex items-center justify-between mb-2'>
            <span className={`p-2 rounded-lg ${kpi.bg} ${kpi.color}`}>
              <kpi.icon className='w-4 h-4 md:w-5 md:h-5' />
            </span>
            <p className='text-[10px] font-black uppercase tracking-widest text-on-surface-variant'>
              {kpi.label}
            </p>
          </div>
          <h3 className='text-xl md:text-2xl font-bold text-on-surface'>
            {kpi.value}
          </h3>
        </div>
      ))}
    </section>
  )
}
