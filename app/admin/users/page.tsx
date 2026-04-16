'use client';

import { useState, useEffect } from 'react';
import { adminApi } from '@/lib/api';
import {
  CheckCircle2,
  XCircle,
  Eye,
  MoreVertical,
  User as UserIcon,
  Building2,
  Phone,
  CreditCard,
  MapPin,
  Fingerprint,
  Loader2,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState('all-personnel');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [upgradeRequests, setUpgradeRequests] = useState<any[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Modal State
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: 'success' | 'danger' | 'warning' | 'info';
    title: string;
    message: string;
    confirmText: string;
    requiresInput: boolean;
    userId: string | null;
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    confirmText: 'Confirm',
    requiresInput: false,
    userId: null,
  });

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    students: 0,
    owners: 0,
    pendingUpgrades: 0
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'upgrade-requests') {
        const response = await adminApi.getUpgradeRequests();
        setUpgradeRequests(response.upgradeRequests);
        setStats(prev => ({ ...prev, pendingUpgrades: response.upgradeRequests.length }));
      } else {
        const role = activeTab === 'students' ? 'student' : activeTab === 'owners' ? 'owner' : undefined;
        const response = await adminApi.getUsers(role);
        setUsers(response.users);

        if (activeTab === 'all-personnel') {
          const sCount = response.users.filter((u: any) => u.role === 'student').length;
          const oCount = response.users.filter((u: any) => u.role === 'owner').length;
          setStats(prev => ({ ...prev, total: response.users.length, students: sCount, owners: oCount }));
        }
      }
    } catch (err: any) {
      toast.error('Network Protocol Error', { description: err.message || 'Failed to fetch records' });
    } finally {
      setLoading(false);
    }
  };

  const handleApproveClick = (userId: string, userName: string) => {
    setModalConfig({
      isOpen: true,
      type: 'success',
      title: 'Approve Owner Upgrade',
      message: `Are you sure you want to promote ${userName} to an Owner? This will allow them to list and manage properties.`,
      confirmText: 'Approve Upgrade',
      requiresInput: false,
      userId
    });
  };

  const handleRejectClick = (userId: string, userName: string) => {
    setModalConfig({
      isOpen: true,
      type: 'danger',
      title: 'Reject Upgrade Request',
      message: `Please provide a reason for rejecting ${userName}'s owner upgrade request. This message will be sent to the user.`,
      confirmText: 'Reject Request',
      requiresInput: true,
      userId
    });
  };

  const handleConfirmAction = async (inputValue?: string) => {
    if (!modalConfig.userId) return;

    if (modalConfig.type === 'success') {
      // Approve logic
      await adminApi.approveUpgrade(modalConfig.userId);
      toast.success('Upgrade Authorized', { description: 'Personnel promoted to Owner status' });
      setUpgradeRequests(prev => prev.filter(req => req.id !== modalConfig.userId));
      setStats(prev => ({ ...prev, pendingUpgrades: Math.max(0, prev.pendingUpgrades - 1) }));
    } else if (modalConfig.type === 'danger') {
      // Reject logic
      await adminApi.rejectUpgrade(modalConfig.userId, inputValue || 'No reason provided');
      toast.warning('Upgrade Refused', { description: 'Identity request has been terminated' });
      setUpgradeRequests(prev => prev.filter(req => req.id !== modalConfig.userId));
      setStats(prev => ({ ...prev, pendingUpgrades: Math.max(0, prev.pendingUpgrades - 1) }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'approved':
        return 'bg-green-100 text-green-700 font-bold';
      case 'pending':
      case 'submitted':
        return 'bg-orange-100 text-orange-700 font-bold';
      case 'suspended':
      case 'banned':
      case 'rejected':
        return 'bg-red-100 text-red-700 font-bold';
      default:
        return 'bg-gray-100 text-gray-700 font-bold';
    }
  };

  return (
    <div className="px-4 md:px-12 py-6 pb-24 max-w-[1600px] mx-auto min-h-screen">
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmAction}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        requiresInput={modalConfig.requiresInput}
        confirmText={modalConfig.confirmText}
        inputPlaceholder="Reason for rejection..."
        inputLabel="Rejection Reason"
      />

      {/* Header Section */}
      <header className="mb-6 md:mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface mb-1">User Management</h1>
        <p className="text-on-surface-variant text-xs md:text-sm max-w-2xl">
          Overview of registered users and role upgrade requests.
        </p>
      </header>

      {/* KPI Cards - Better Mobile Layout */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
        {[
          { label: 'TOTAL', value: stats.total, icon: UserIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'STUDENTS', value: stats.students, icon: UserIcon, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'OWNERS', value: stats.owners, icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'UPGRADES', value: stats.pendingUpgrades, icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((kpi, index) => (
          <div key={index} className="bg-white p-4 md:p-6 rounded-2xl border border-outline-variant/10 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className={`p-2 rounded-lg ${kpi.bg} ${kpi.color}`}>
                <kpi.icon className="w-4 h-4 md:w-5 md:h-5" />
              </span>
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{kpi.label}</p>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-on-surface">{kpi.value}</h3>
          </div>
        ))}
      </section>

      {/* Tabs - Mobile Scrollable */}
      <div className="mb-6 border-b border-outline-variant/10 overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max">
          {[
            { id: 'all-personnel', label: 'All Personnel' },
            { id: 'students', label: 'Students' },
            { id: 'owners', label: 'Owners' },
            { id: 'upgrade-requests', label: 'Upgrade Requests', count: stats.pendingUpgrades },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 md:px-6 py-6 h-auto text-xs md:text-sm font-bold transition-all relative flex items-center gap-2 rounded-none hover:bg-transparent ${activeTab === tab.id
                ? 'text-primary'
                : 'text-on-surface-variant hover:text-on-surface'
                }`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[9px] md:text-[10px] font-black ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'}`}>
                  {tab.count}
                </span>
              )}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
              )}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-on-surface-variant font-medium">Fetching records...</p>
        </div>
      ) : activeTab === 'upgrade-requests' ? (
        /* Upgrade Requests Card View */
        <div className="space-y-4">
          {upgradeRequests.length === 0 ? (
            <EmptyState
              icon={CheckCircle2}
              title="Queue Clear"
              message="No pending partner upgrade requests found in the ecosystem."
            />
          ) : (
            upgradeRequests.map((req) => (
              <div key={req.id} className="bg-white rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* User Profile Hook */}
                  <div className="p-4 md:p-6 lg:w-[35%] border-b lg:border-b-0 lg:border-r border-outline-variant/10 bg-surface-container-lowest/20">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg md:text-xl">
                        {req.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-base md:text-lg truncate">{req.name}</h4>
                        <p className="text-xs text-on-surface-variant truncate">{req.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-3 gap-x-4">
                      <div className="flex items-center gap-3 text-xs md:text-sm">
                        <Phone className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
                        <span className="font-medium truncate">{req.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs md:text-sm">
                        <Fingerprint className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
                        <span className="font-medium truncate">{req.nidNo || 'N/A'}</span>
                      </div>
                      <div className="flex items-start gap-3 text-xs md:text-sm sm:col-span-2 lg:col-span-1">
                        <MapPin className="w-3.5 h-3.5 text-on-surface-variant mt-0.5 shrink-0" />
                        <span className="font-medium line-clamp-2 md:line-clamp-none">{req.businessAddress}</span>
                      </div>
                    </div>
                  </div>

                  {/* Verification & Bank Side */}
                  <div className="p-4 md:p-6 flex-1 flex flex-col justify-between gap-6">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                          <h5 className="font-bold text-sm md:text-base">Banking Verification</h5>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full text-[10px] font-black uppercase text-on-surface-variant w-fit">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(req.upgradeRequest.requestedAt), 'MMM dd, yyyy')}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-surface-container-lowest/50 p-4 rounded border border-outline-variant/10">
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-60">Bank</p>
                          <p className="text-xs md:text-sm font-bold break-all">{req.bankDetails?.bankName || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-60">IFSC</p>
                          <p className="text-xs md:text-sm font-bold uppercase break-all">{req.bankDetails?.ifsc || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-60">Holder</p>
                          <p className="text-xs md:text-sm font-bold break-all">{req.bankDetails?.accountHolderName || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row gap-3">
                      <Button
                        onClick={() => handleApproveClick(req.id, req.name)}
                        className="flex-[2] h-12 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800"
                        rounded="xl"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Approve Upgrade
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => handleRejectClick(req.id, req.name)}
                        className="flex-1 h-12 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                        rounded="xl"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Standard Users - Mobile Cards & Table */
        <div className="space-y-3">
          {users.length === 0 ? (
            <div className="text-center py-20 bg-surface-container/20 rounded-3xl border-2 border-dashed border-outline-variant/10">
              <UserIcon className="w-10 h-10 text-on-surface-variant/20 mx-auto mb-3" />
              <p className="font-bold text-on-surface-variant italic">No {activeTab} found</p>
            </div>
          ) : (
            <>
              {/* Table for Desktop */}
              <div className="hidden md:block bg-white rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-outline-variant/10 bg-surface-container-lowest">
                      <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">User</th>
                      <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Role</th>
                      <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Status</th>
                      <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Joined</th>
                      <th className="text-right px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-surface-container-lowest transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant font-black">
                              {user.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-on-surface truncate">{user.name}</p>
                              <p className="text-[10px] text-on-surface-variant truncate">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-bold capitalize">{user.role}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-tighter ${getStatusColor(user.status || 'active')}`}>
                            {user.status || 'Active'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-on-surface-variant font-medium">
                          {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-surface-container text-on-surface-variant">
                              <Eye size={18} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-surface-container text-on-surface-variant">
                              <MoreVertical size={18} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cards for Mobile */}
              <div className="md:hidden space-y-3">
                {users.map((user) => (
                  <div key={user._id} className="bg-white p-4 rounded-2xl border border-outline-variant/10 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant font-black shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-on-surface truncate">{user.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-bold capitalize text-on-surface-variant">{user.role}</span>
                          <div className="w-1 h-1 rounded-full bg-outline-variant/30"></div>
                          <span className={`text-[9px] uppercase font-black ${getStatusColor(user.status || 'active').split(' ')[1]}`}>
                            {user.status || 'Active'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-surface-container shrink-0">
                      <MoreVertical className="w-4 h-4 text-on-surface-variant" />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
