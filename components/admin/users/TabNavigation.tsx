'use client'

import { Button } from '@/components/ui/button'

interface Tab {
  id: string
  label: string
  count?: number
}

interface TabNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  pendingUpgradesCount: number
}

export function TabNavigation({
  activeTab,
  setActiveTab,
  pendingUpgradesCount,
}: TabNavigationProps) {
  const tabs: Tab[] = [
    { id: 'all-personnel', label: 'All Personnel' },
    { id: 'students', label: 'Students' },
    { id: 'owners', label: 'Owners' },
    {
      id: 'upgrade-requests',
      label: 'Upgrade Requests',
      count: pendingUpgradesCount,
    },
  ]

  return (
    <div className='mb-6 border-b border-outline-variant/10 overflow-x-auto scrollbar-hide'>
      <div className='flex min-w-max'>
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant='ghost'
            onClick={() => setActiveTab(tab.id)}
            className={`!w-auto shrink-0 whitespace-nowrap px-4 md:px-6 py-6 h-auto text-xs md:text-sm font-bold transition-all relative flex items-center gap-2 rounded-none hover:bg-transparent ${
              activeTab === tab.id
                ? '!text-[#b6212f]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-[9px] md:text-[10px] font-black ${
                  activeTab === tab.id
                    ? 'bg-[#b6212f] text-white'
                    : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-[#b6212f]'></div>
            )}
          </Button>
        ))}
      </div>
    </div>
  )
}
