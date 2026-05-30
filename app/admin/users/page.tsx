'use client'

import { useState, useEffect } from 'react'
import { adminApi } from '@/lib/api'
import { CheckCircle2, User as UserIcon } from 'lucide-react'
import { toast } from 'sonner'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { EmptyState } from '@/components/EmptyState'
import { UserDetailModal } from '@/components/admin/UserDetailModal'
import { User, UserProfile } from '@/lib/types'
import AdminUsersSkeleton from '@/components/skeletons/AdminUsersSkeleton'
import { StatsCards } from '@/components/admin/users/StatsCards'
import { TabNavigation } from '@/components/admin/users/TabNavigation'
import { UserTable } from '@/components/admin/users/UserTable'
import { UserCards } from '@/components/admin/users/UserCards'
import { UpgradeRequestsList } from '@/components/admin/users/UpgradeRequestsList'

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState('all-personnel')
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [upgradeRequests, setUpgradeRequests] = useState<UserProfile[]>([])
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // User Detail Modal
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false)

  // Modal State
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean
    type: 'success' | 'danger' | 'warning' | 'info'
    title: string
    message: string
    confirmText: string
    requiresInput: boolean
    userId: string | null
    action?: 'suspend' | 'ban' | 'delete' | 'approve' | 'reject' | 'activate'
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    confirmText: 'Confirm',
    requiresInput: false,
    userId: null,
    action: undefined,
  })

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    students: 0,
    owners: 0,
    pendingUpgrades: 0,
  })

  useEffect(() => {
    fetchData()
  }, [activeTab])

  useEffect(() => {
    const fetchInitialStats = async () => {
      try {
        const res = await adminApi.getUpgradeRequests()
        setStats((prev) => ({
          ...prev,
          pendingUpgrades: res.upgradeRequests.length,
        }))
      } catch (err) {
        console.error('Failed to fetch initial upgrade requests count', err)
      }
    }

    if (activeTab !== 'upgrade-requests') {
      fetchInitialStats()
    }
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'upgrade-requests') {
        const response = await adminApi.getUpgradeRequests()
        setUpgradeRequests(response.upgradeRequests)
        setStats((prev) => ({
          ...prev,
          pendingUpgrades: response.upgradeRequests.length,
        }))
      } else {
        const role =
          activeTab === 'students'
            ? 'student'
            : activeTab === 'owners'
              ? 'owner'
              : undefined
        const response = await adminApi.getUsers(role)
        setUsers(response.users)

        if (activeTab === 'all-personnel') {
          const sCount = response.users.filter(
            (u: any) => u.role === 'student',
          ).length
          const oCount = response.users.filter(
            (u: any) => u.role === 'owner',
          ).length
          setStats((prev) => ({
            ...prev,
            total: response.users.length,
            students: sCount,
            owners: oCount,
          }))
        }
      }
    } catch (err: any) {
      toast.error('Network Protocol Error', {
        description: err.message || 'Failed to fetch records',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApproveClick = (userId: string, userName: string) => {
    setModalConfig({
      isOpen: true,
      type: 'success',
      title: 'Approve Owner Upgrade',
      message: `Are you sure you want to promote ${userName} to an Owner? This will allow them to list and manage properties.`,
      confirmText: 'Approve Upgrade',
      requiresInput: false,
      userId,
      action: 'approve',
    })
  }

  const handleRejectClick = (userId: string, userName: string) => {
    setModalConfig({
      isOpen: true,
      type: 'danger',
      title: 'Reject Upgrade Request',
      message: `Please provide a reason for rejecting ${userName}'s owner upgrade request. This message will be sent to the user.`,
      confirmText: 'Reject Request',
      requiresInput: true,
      userId,
      action: 'reject',
    })
  }

  const handleConfirmAction = async (inputValue?: string) => {
    if (!modalConfig.userId) return

    try {
      setActionLoading(modalConfig.userId)

      if (modalConfig.action === 'approve') {
        await adminApi.approveUpgrade(modalConfig.userId)
        toast.success('Upgrade Authorized', {
          description: 'Personnel promoted to Owner status',
        })
        setUpgradeRequests((prev) =>
          prev.filter(
            (req) => (req._id || req.id || '') !== modalConfig.userId,
          ),
        )
        setStats((prev) => ({
          ...prev,
          pendingUpgrades: Math.max(0, prev.pendingUpgrades - 1),
        }))
      } else if (modalConfig.action === 'reject') {
        await adminApi.rejectUpgrade(
          modalConfig.userId,
          inputValue || 'No reason provided',
        )
        toast.warning('Upgrade Refused', {
          description: 'Identity request has been terminated',
        })
        setUpgradeRequests((prev) =>
          prev.filter(
            (req) => (req._id || req.id || '') !== modalConfig.userId,
          ),
        )
        setStats((prev) => ({
          ...prev,
          pendingUpgrades: Math.max(0, prev.pendingUpgrades - 1),
        }))
      } else if (modalConfig.action === 'suspend') {
        await adminApi.updateUserStatus(
          modalConfig.userId,
          'suspended',
          inputValue,
        )
        toast.warning('User Suspended', {
          description: 'User account has been suspended',
        })
      } else if (modalConfig.action === 'ban') {
        await adminApi.updateUserStatus(
          modalConfig.userId,
          'banned',
          inputValue,
        )
        toast.error('User Banned', {
          description: 'User account has been permanently banned',
        })
      } else if (modalConfig.action === 'delete') {
        await adminApi.deleteUser(
          modalConfig.userId,
          inputValue || 'No reason provided',
        )
        toast.error('User Deleted', {
          description: 'User account has been deleted',
        })
      } else if (modalConfig.action === 'activate') {
        await adminApi.updateUserStatus(modalConfig.userId, 'active')
        toast.success('User Activated', {
          description: 'User account has been activated',
        })
      }

      setModalConfig((prev) => ({ ...prev, isOpen: false }))
      await fetchData()
    } catch (error: any) {
      toast.error('Action Failed', {
        description: error.message || 'Could not process request',
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId)
    setIsUserDetailOpen(true)
  }

  const handleSuspendUser = (userId: string, userName: string) => {
    setModalConfig({
      isOpen: true,
      type: 'warning',
      title: 'Suspend User Account',
      message: `Are you sure you want to suspend ${userName}? They will not be able to access their account until unsuspended.`,
      confirmText: 'Suspend Account',
      requiresInput: true,
      userId,
      action: 'suspend',
    })
  }

  const handleBanUser = (userId: string, userName: string) => {
    setModalConfig({
      isOpen: true,
      type: 'danger',
      title: 'Ban User Account',
      message: `Are you sure you want to permanently ban ${userName}? This action will prevent them from accessing the platform.`,
      confirmText: 'Ban Account',
      requiresInput: true,
      userId,
      action: 'ban',
    })
  }

  const handleDeleteUser = (userId: string, userName: string) => {
    setModalConfig({
      isOpen: true,
      type: 'danger',
      title: 'Delete User Account',
      message: `Are you sure you want to delete ${userName}? This is a permanent action and cannot be undone.`,
      confirmText: 'Delete Account',
      requiresInput: true,
      userId,
      action: 'delete',
    })
  }

  const handleActivateUser = (userId: string, userName: string) => {
    setModalConfig({
      isOpen: true,
      type: 'success',
      title: 'Activate User Account',
      message: `Are you sure you want to activate ${userName}'s account? They will regain access to the platform.`,
      confirmText: 'Activate Account',
      requiresInput: false,
      userId,
      action: 'activate',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'approved':
        return 'bg-green-100 text-green-700 font-bold'
      case 'pending':
      case 'submitted':
        return 'bg-orange-100 text-orange-700 font-bold'
      case 'suspended':
      case 'banned':
      case 'rejected':
        return 'bg-red-100 text-red-700 font-bold'
      default:
        return 'bg-gray-100 text-gray-700 font-bold'
    }
  }

  return (
    <div className='px-4 sm:px-6 lg:px-8 py-6 pb-20 bg-gray-50 min-h-screen'>
      <UserDetailModal
        userId={selectedUserId}
        isOpen={isUserDetailOpen}
        onClose={() => {
          setIsUserDetailOpen(false)
          setSelectedUserId(null)
        }}
      />

      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmAction}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        requiresInput={modalConfig.requiresInput}
        confirmText={modalConfig.confirmText}
        inputPlaceholder='Reason for rejection...'
        inputLabel='Rejection Reason'
      />

      {/* Header Section */}
      <header className='mb-8'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
          User Management
        </h1>
        <p className='text-sm text-gray-600'>
          Overview of registered users and role upgrade requests
        </p>
      </header>

      {loading ? (
        <AdminUsersSkeleton />
      ) : (
        <>
          <StatsCards stats={stats} />

          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            pendingUpgradesCount={stats.pendingUpgrades}
          />

          {activeTab === 'upgrade-requests' ? (
            upgradeRequests.length === 0 ? (
              <EmptyState
                icon={CheckCircle2}
                title='Queue Clear'
                message='No pending partner upgrade requests found in the ecosystem.'
              />
            ) : (
              <UpgradeRequestsList
                upgradeRequests={upgradeRequests}
                onApprove={handleApproveClick}
                onReject={handleRejectClick}
                actionLoading={actionLoading}
              />
            )
          ) : (
            <div className='space-y-3'>
              {users.length === 0 ? (
                <div className='text-center py-20 bg-surface-container/20 rounded-3xl border-2 border-dashed border-outline-variant/10'>
                  <UserIcon className='w-10 h-10 text-on-surface-variant/20 mx-auto mb-3' />
                  <p className='font-bold text-on-surface-variant italic'>
                    No {activeTab} found
                  </p>
                </div>
              ) : (
                <>
                  <UserTable
                    users={users}
                    onViewUser={handleViewUser}
                    onSuspendUser={handleSuspendUser}
                    onBanUser={handleBanUser}
                    onActivateUser={handleActivateUser}
                    onDeleteUser={handleDeleteUser}
                    getStatusColor={getStatusColor}
                  />

                  <UserCards
                    users={users}
                    onViewUser={handleViewUser}
                    onSuspendUser={handleSuspendUser}
                    onBanUser={handleBanUser}
                    onActivateUser={handleActivateUser}
                    onDeleteUser={handleDeleteUser}
                    getStatusColor={getStatusColor}
                  />
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
