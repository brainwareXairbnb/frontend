"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { notificationsApi } from "@/lib/api";
import {
  Bell,
  MessageCircle,
  Tag,
  Calendar,
  CheckCircle2,
  XCircle,
  CreditCard,
  AlertCircle,
  Home,
  Star
} from "lucide-react";
import { AuthPrompt } from "@/components/AuthPrompt";
import NotificationSkeleton from "@/components/skeletons/NotificationSkeleton";
import { toast } from "sonner";
import { Notification, NotificationType, NotificationConfig } from "@/lib/types";

// Helper function to get notification icon and styling based on type
const getNotificationConfig = (type: NotificationType): NotificationConfig => {
  const configs: Record<NotificationType, NotificationConfig> = {
    booking_request: { icon: Calendar, color: "text-blue-500", bg: "bg-blue-50" },
    booking_accepted: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    booking_rejected: { icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
    booking_cancelled: { icon: XCircle, color: "text-orange-500", bg: "bg-orange-50" },
    payment_confirmed: { icon: CreditCard, color: "text-emerald-500", bg: "bg-emerald-50" },
    payment_failed: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
    payout_processing: { icon: CreditCard, color: "text-blue-500", bg: "bg-blue-50" },
    payout_settled: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    payout_failed: { icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
    listing_approved: { icon: Home, color: "text-emerald-500", bg: "bg-emerald-50" },
    listing_rejected: { icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
    listing_changes_required: { icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-50" },
    listing_submitted: { icon: Home, color: "text-blue-500", bg: "bg-blue-50" },
    listing_resubmitted: { icon: Home, color: "text-blue-500", bg: "bg-blue-50" },
    listing_deleted: { icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
    listing_unlisted: { icon: AlertCircle, color: "text-orange-500", bg: "bg-orange-50" },
    listing_relisted: { icon: Home, color: "text-emerald-500", bg: "bg-emerald-50" },
    owner_approved: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    owner_rejected: { icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
    owner_upgrade_approved: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    owner_upgrade_rejected: { icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
    owner_upgrade_requested: { icon: AlertCircle, color: "text-blue-500", bg: "bg-blue-50" },
    new_review: { icon: Star, color: "text-[#FF385C]", bg: "bg-[#FF385C]/5" },
    review_flagged: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
    account_warned: { icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-50" },
    account_suspended: { icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
    account_banned: { icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
    bookmark_unavailable: { icon: AlertCircle, color: "text-orange-500", bg: "bg-orange-50" },
    booking_dispute: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
    refund_request: { icon: CreditCard, color: "text-blue-500", bg: "bg-blue-50" },
    new_user_registered: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    system_alert: { icon: AlertCircle, color: "text-blue-500", bg: "bg-blue-50" },
  };

  return configs[type] || { icon: Bell, color: "text-slate-500", bg: "bg-slate-50" };
};

// Helper function to format date and time
const formatDateTime = (date: string) => {
  const notifDate = new Date(date);

  const dateStr = notifDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const timeStr = notifDate.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return `${dateStr} • ${timeStr}`;
};

export default function StudentNotificationsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationsApi.getNotifications(50, 0);
      setNotifications(response.notifications);
      setUnreadCount(response.unreadCount);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await notificationsApi.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(n => n._id === notificationId ? { ...n, isRead: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationsApi.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Failed to mark all as read:', error);
      toast.error('Failed to mark notifications as read');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="px-5 md:px-10 pb-32 pt-6 max-w-2xl mx-auto">
          <NotificationSkeleton />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-white min-h-screen">
      <div className="px-5 md:px-10 pb-32 pt-2 max-w-2xl mx-auto">
            {/* Header with Mark All as Read */}
            {notifications.length > 0 && unreadCount > 0 && (
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/10">
                <p className="text-sm text-on-surface-variant">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-sm font-bold text-[#FF385C] hover:underline"
                >
                  Mark all as read
                </button>
              </div>
            )}

            {notifications.length > 0 ? (
              <div className="divide-y divide-outline-variant/5">
                {notifications.map((n) => {
                  const config = getNotificationConfig(n.type);
                  const Icon = config.icon;
                  return (
                    <div
                      key={n._id}
                      onClick={() => !n.isRead && handleMarkAsRead(n._id)}
                      className={`flex gap-4 py-6 hover:bg-slate-50 transition-colors cursor-pointer group ${
                        !n.isRead ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${config.bg} ${config.color}`}>
                        <Icon className="w-5 h-5" strokeWidth={2.5} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[15px] font-bold text-on-surface leading-tight">
                            {n.title}
                          </h3>
                          {!n.isRead && (
                            <div className="w-2 h-2 bg-[#FF385C] rounded-full" />
                          )}
                        </div>
                        <span className="text-[11px] font-medium text-on-surface-variant opacity-60 block mb-2">
                          {formatDateTime(n.createdAt)}
                        </span>
                        <p className="text-[14px] text-on-surface-variant leading-relaxed opacity-80">
                          {n.message}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-20 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bell className="w-8 h-8 opacity-20" />
                </div>
                <h2 className="text-lg font-bold mb-2">No notifications yet</h2>
                <p className="text-sm text-on-surface-variant opacity-60">
                  We'll notify you when something important happens.
                </p>
              </div>
            )}
      </div>
    </div>
  );
}
