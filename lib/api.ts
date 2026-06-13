/**
 * API Client for BrainX
 * Handles all HTTP requests to the backend server
 */

import { FetchOptions, Listing, User, UserProfile, DashboardStats } from './types'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

/**
 * Base fetch wrapper with error handling
 */
async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { token, ...fetchOptions } = options

  // Try to get token from localStorage if not explicitly provided
  const authToken =
    token ||
    (typeof window !== 'undefined'
      ? localStorage.getItem('br_access_token')
      : null)

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((fetchOptions.headers as Record<string, string>) || {}),
  }

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
    credentials: 'include', // Include cookies for auth
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: 'An error occurred',
    }))

    // Auto-logout if token is expired or unauthorized
    if (response.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('br_access_token')

      // If the token explicitly expired, redirect to login
      if (error.code === 'TOKEN_EXPIRED') {
        const currentPath = window.location.pathname
        // Don't redirect from login page itself
        if (currentPath !== '/login') {
          window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}&expired=true`
        }
      }
    }

    // Handle 403 Forbidden (role mismatch) - don't redirect, let components handle it
    if (response.status === 403) {
      const apiError: any = new Error(error.error || 'Access forbidden')
      apiError.response = { data: error, status: response.status }
      apiError.status = 403
      apiError.isForbidden = true
      throw apiError
    }

    // Throw error with response data so it can be accessed in catch blocks
    const apiError: any = new Error(error.error || `HTTP ${response.status}`)
    apiError.response = { data: error, status: response.status }
    throw apiError
  }

  return response.json()
}

/**
 * Authentication API
 */
export const authApi = {
  /**
   * Login user
   */
  login: async (email: string, password: string) => {
    return apiFetch<{ user: any; accessToken: string; message: string }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      },
    )
  },

  /**
   * Register student
   */
  registerStudent: async (data: {
    name: string
    email: string
    studentEmail?: string
    password: string
    phoneNumber: string
    universityRollNo: string
    gender?: string
  }) => {
    return apiFetch<{ user: any; accessToken: string; message: string }>(
      '/auth/register',
      {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          studentEmail: data.studentEmail,
          password: data.password,
          phone: data.phoneNumber,
          universityRollNo: data.universityRollNo,
          gender: data.gender || 'other',
        }),
      },
    )
  },

  /**
   * Register owner
   */
  registerOwner: async (data: {
    name: string
    email: string
    password: string
    phoneNumber: string
  }) => {
    return apiFetch<{ user: any; accessToken: string; message: string }>(
      '/auth/owner/register',
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
    )
  },

  /**
   * Forgot password
   */
  forgotPassword: async (email: string) => {
    return apiFetch('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },

  /**
   * Reset password
   */
  resetPassword: async (email: string, otp: string, password: string) => {
    return apiFetch('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, otp, password }),
    })
  },

  /**
   * Logout
   */
  logout: async (token?: string) => {
    return apiFetch('/auth/logout', {
      method: 'POST',
      token,
    })
  },

  /**
   * Get current user
   */
  getCurrentUser: async (token?: string) => {
    return apiFetch<{ user: any }>('/auth/me', { token })
  },

  /**
   * Upgrade to owner
   */
  upgradeToOwner: async (
    data: {
      phone: string
      businessAddress: string
      nidNo: string
      bankDetails: {
        accountHolderName: string
        accountNumber: string
        ifsc: string
        bankName: string
      }
    },
    token?: string,
  ) => {
    return apiFetch('/auth/upgrade-to-owner', {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    })
  },

  /**
   * Check upgrade status
   */
  getUpgradeStatus: async (token?: string) => {
    return apiFetch<{ hasUpgradeRequest: boolean; upgradeRequest: any }>(
      '/auth/upgrade-status',
      { token },
    )
  },

  /**
   * Google OAuth authentication
   */
  googleAuth: async (idToken: string, gender?: string, phone?: string) => {
    return apiFetch<{ user: any; accessToken: string; message: string }>(
      '/auth/google',
      {
        method: 'POST',
        body: JSON.stringify({ idToken, gender, phone }),
      },
    )
  },

  /**
   * Verify email with OTP
   */
  verifyEmail: async (email: string, otp: string) => {
    return apiFetch<{ user: User; accessToken: string; message: string }>(
      '/auth/verify-email',
      {
        method: 'POST',
        body: JSON.stringify({ email, otp }),
      },
    )
  },

  /**
   * Resend verification OTP
   */
  resendOTP: async (email: string) => {
    return apiFetch('/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },

  /**
   * Resend student verification OTP
   */
  resendStudentOTP: async () => {
    return apiFetch('/auth/resend-student-otp', {
      method: 'POST',
    })
  },

  /**
   * Link student institutional email
   */
  linkStudentEmail: async (studentEmail: string) => {
    return apiFetch('/auth/link-student-email', {
      method: 'POST',
      body: JSON.stringify({ studentEmail }),
    })
  },

  /**
   * Verify student email with OTP
   */
  verifyStudentEmail: async (otp: string) => {
    return apiFetch<{ user: User; message: string }>(
      '/auth/verify-student-email',
      {
      method: 'POST',
      body: JSON.stringify({ otp }),
    })
  },
}

/**
 * Rooms/Listings API
 */
export const roomsApi = {
  /**
   * Get all listings (public)
   */
  getListings: async (params?: {
    search?: string
    roomType?: string
    minRent?: number
    maxRent?: number
    gender?: string
    amenities?: string[]
    distance?: number
    availableNow?: boolean
    rating?: number
    page?: number
    limit?: number
  }) => {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value))
        }
      })
    }
    return apiFetch(`/student/listings?${queryParams.toString()}`)
  },

  /**
   * Get categorized listings
   */
  getCategorizedListings: async () => {
    return apiFetch<{ categories: Record<string, any[]> }>('/student/listings/categories')
  },

  /**
   * Get listing by ID
   */
  getListingById: async (id: string) => {
    return apiFetch(`/student/listings/${id}`)
  },

  /**
   * Get booked date ranges for a listing
   */
  getListingBookedDates: async (id: string) => {
    return apiFetch<{
      bookedRanges: Array<{ start: string; end: string }>
      earliestAvailable: string
      availableStudents: number
      totalStudents: number
    }>(`/student/listings/${id}/booked-dates`)
  },

  /**
   * Create listing (owner only)
   */
  createListing: async (data: any, token?: string) => {
    return apiFetch('/owner/listings', {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    })
  },

  /**
   * Update listing (owner only)
   */
  updateListing: async (id: string, data: any, token?: string) => {
    return apiFetch(`/owner/listings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      token,
    })
  },

  /**
   * Delete listing (owner only)
   */
  deleteListing: async (id: string, token?: string) => {
    return apiFetch(`/owner/listings/${id}`, {
      method: 'DELETE',
      token,
    })
  },

  /**
   * Get owner's listings
   */
  getOwnerListings: async (
    params?: {
      status?: string
      page?: number
      limit?: number
    },
    token?: string,
  ) => {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value))
        }
      })
    }
    return apiFetch(`/owner/listings?${queryParams.toString()}`, { token })
  },

  /**
   * Submit listing for approval (owner only)
   */
  submitListing: async (id: string, token?: string) => {
    return apiFetch(`/owner/listings/${id}/submit`, {
      method: 'PATCH',
      token,
    })
  },
}

/**
 * Bookings API
 */
export const bookingsApi = {
  /**
   * Create booking request (student)
   */
  createBooking: async (
    listingId: string,
    moveInDate: string,
    durationMonths: number,
    message?: string,
    token?: string,
  ) => {
    return apiFetch('/student/bookings', {
      method: 'POST',
      body: JSON.stringify({ listingId, moveInDate, durationMonths, message }),
      token,
    })
  },

  /**
   * Get student bookings
   */
  getStudentBookings: async (token?: string) => {
    return apiFetch('/student/bookings', { token })
  },

  /**
   * Get booking by ID
   */
  getBookingById: async (bookingId: string, token?: string) => {
    return apiFetch(`/student/bookings/${bookingId}`, { token })
  },

  /**
   * Cancel booking (student)
   */
  cancelBooking: async (bookingId: string, token?: string) => {
    return apiFetch(`/student/bookings/${bookingId}/cancel`, {
      method: 'PATCH',
      token,
    })
  },

  /**
   * Get owner bookings
   */
  getOwnerBookings: async (token?: string) => {
    return apiFetch<{ bookings: any[]; pagination: any }>('/owner/bookings', { token })
  },

  /**
   * Accept booking (owner)
   */
  acceptBooking: async (bookingId: string, ownerReply?: string, token?: string) => {
    return apiFetch<{ booking: any; listing: any }>(`/owner/bookings/${bookingId}/accept`, {
      method: 'PATCH',
      body: ownerReply ? JSON.stringify({ ownerReply }) : undefined,
      token,
    })
  },

  /**
   * Reject booking (owner)
   */
  rejectBooking: async (bookingId: string, reason: string, token?: string) => {
    return apiFetch<{ booking: any }>(`/owner/bookings/${bookingId}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
      token,
    })
  },
}

/**
 * Owner API
 */
export const ownerApi = {
  /**
   * Update bank account details
   */
  updateBankDetails: async (data: {
    accountHolderName: string
    bankName?: string
    accountNumber: string
    ifsc: string
    upiId?: string
  }, token?: string) => {
    return apiFetch('/owner/bank-details', {
      method: 'PUT',
      body: JSON.stringify(data),
      token,
    })
  },

  /**
   * Get bank details
   */
  getBankDetails: async (token?: string) => {
    return apiFetch<{
      hasBankDetails: boolean
      bankDetails: any
    }>('/owner/bank-details', { token })
  },

  /**
   * Get payout history
   */
  getPayouts: async (params?: { page?: number; limit?: number; status?: string }, token?: string) => {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value))
        }
      })
    }
    return apiFetch<{
      transactions: any[]
      summary: { totalGross: number; totalServiceCharge: number; totalNet: number }
      pagination: any
    }>(`/owner/payouts?${queryParams.toString()}`, { token })
  },

  /**
   * Get analytics dashboard data
   */
  getAnalytics: async (token?: string) => {
    return apiFetch<{
      views: number
      avgRating: number
      totalListings: number
      totalBookingRequests: number
      acceptedBookings: number
      acceptanceRate: number
      completedBookings: number
      monthlyRevenue: Array<{
        _id: { month: number; year: number }
        gross: number
        serviceCharge: number
        net: number
      }>
      topPerformers: {
        byViews: {
          id: string
          title: string
          viewCount: number
          avgRating: number
        } | null
        byRevenue: {
          id: string
          title: string
          totalRevenue: number
          avgRating: number
        } | null
      }
    }>('/owner/analytics', { token })
  },
}

/**
 * Payment API
 */
export const paymentApi = {
  /**
   * Create Razorpay order
   */
  createOrder: async (bookingId: string, token?: string) => {
    return apiFetch('/payment/create-order', {
      method: 'POST',
      body: JSON.stringify({ bookingId }),
      token,
    })
  },

  /**
   * Verify payment
   */
  verifyPayment: async (
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string,
    token?: string,
  ) => {
    return apiFetch('/payment/verify-payment', {
      method: 'POST',
      body: JSON.stringify({ razorpayOrderId, razorpayPaymentId, razorpaySignature }),
      token,
    })
  },

  /**
   * Get payment history
   */
  getPaymentHistory: async (params?: { bookingId?: string; page?: number; limit?: number }, token?: string) => {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value))
        }
      })
    }
    return apiFetch<{ transactions: any[]; pagination: any }>(`/payment/my-payments?${queryParams.toString()}`, { token })
  },

  /**
   * Cancel booking with refund
   */
  cancelBooking: async (bookingId: string, token?: string) => {
    return apiFetch('/payment/cancel-booking', {
      method: 'POST',
      body: JSON.stringify({ bookingId }),
      token,
    })
  },

  /**
   * Get refund policy
   */
  getRefundPolicy: async (bookingId: string, token?: string) => {
    return apiFetch(`/payment/refund-policy?bookingId=${bookingId}`, { token })
  },

  /**
   * Get payment schedules
   */
  getPaymentSchedules: async (token?: string) => {
    return apiFetch('/payment/schedules', { token })
  },

  /**
   * Get payment schedule by booking ID
   */
  getPaymentScheduleByBooking: async (bookingId: string, token?: string) => {
    return apiFetch(`/payment/schedule/${bookingId}`, { token })
  },

  /**
   * Toggle auto-pay for payment schedule
   */
  toggleAutoPay: async (scheduleId: string, autoPayEnabled: boolean, token?: string) => {
    return apiFetch(`/payment/schedule/${scheduleId}/toggle-autopay`, {
      method: 'POST',
      body: JSON.stringify({ autoPayEnabled }),
      token,
    })
  },

  /**
   * Create order for monthly payment
   */
  createMonthlyPaymentOrder: async (scheduleId: string, month: number, token?: string) => {
    return apiFetch('/payment/schedule/' + scheduleId + '/pay-month', {
      method: 'POST',
      body: JSON.stringify({ month }),
      token,
    })
  },

  /**
   * Verify scheduled payment
   */
  verifyScheduledPayment: async (
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string,
    scheduleId: string,
    month: number,
    token?: string,
  ) => {
    return apiFetch('/payment/schedule/verify-payment', {
      method: 'POST',
      body: JSON.stringify({
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        scheduleId,
        month,
      }),
      token,
    })
  },
}

/**
 * User API
 */
export const userApi = {
  /**
   * Get user profile
   */
  getProfile: async (token?: string) => {
    return apiFetch('/users/profile', { token })
  },

  /**
   * Update profile (with email verification if email changes)
   */
  updateProfile: async (
    data: { name?: string; email?: string; phone?: string },
    token?: string,
  ) => {
    return apiFetch<{
      message: string
      requiresVerification?: boolean
      pendingEmail?: string
      user?: any
    }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
      token,
    })
  },

  /**
   * Verify email change
   */
  verifyEmailChange: async (otp: string, token?: string) => {
    return apiFetch<{ message: string; user: any }>(
      '/auth/verify-email-change',
      {
        method: 'POST',
        body: JSON.stringify({ otp }),
        token,
      },
    )
  },

  /**
   * Upload profile picture
   */
  uploadProfilePicture: async (file: File, token?: string) => {
    const authToken =
      token ||
      (typeof window !== 'undefined'
        ? localStorage.getItem('br_access_token')
        : null)

    const formData = new FormData()
    formData.append('profilePicture', file)

    const response = await fetch(`${API_BASE_URL}/auth/upload-profile-picture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: formData,
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: 'Failed to upload profile picture',
      }))
      throw new Error(error.error || 'Failed to upload profile picture')
    }

    return response.json()
  },

  /**
   * Delete profile picture
   */
  deleteProfilePicture: async (token?: string) => {
    return apiFetch<{ message: string }>('/auth/delete-profile-picture', {
      method: 'DELETE',
      token,
    })
  },

  /**
   * Get saved rooms (student)
   */
  getSavedRooms: async (token?: string) => {
    return apiFetch('/student/bookmarks', { token })
  },

  /**
   * Add room to saved (student)
   */
  saveRoom: async (listingId: string, token?: string) => {
    return apiFetch(`/student/bookmarks/${listingId}`, {
      method: 'POST',
      token,
    })
  },

  /**
   * Remove room from saved (student)
   */
  unsaveRoom: async (listingId: string, token?: string) => {
    return apiFetch(`/student/bookmarks/${listingId}`, {
      method: 'DELETE',
      token,
    })
  },

  /**
   * Change password
   */
  changePassword: async (
    data: { currentPassword: string; newPassword: string },
    token?: string,
  ) => {
    return apiFetch('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    })
  },
}

/**
 * Reviews API
 */
export const reviewsApi = {
  /**
   * Create review (student)
   */
  createReview: async (
    listingId: string,
    rating: number,
    comment: string,
    token?: string,
  ) => {
    return apiFetch('/reviews', {
      method: 'POST',
      body: JSON.stringify({ listingId, rating, comment }),
      token,
    })
  },

  /**
   * Get listing reviews (includes student's own review if authenticated)
   */
  getListingReviews: async (listingId: string, page = 1, limit = 10, token?: string) => {
    return apiFetch<{
      reviews: any[]
      myReview: any | null
      pagination: {
        page: number
        limit: number
        total: number
        pages: number
      }
    }>(`/reviews/listing/${listingId}?page=${page}&limit=${limit}`, { token })
  },

  /**
   * Get student's own reviews
   */
  getMyReviews: async (token?: string) => {
    return apiFetch<{ reviews: any[] }>('/reviews/my', { token })
  },

  /**
   * Update student's own review (only if not approved)
   */
  updateReview: async (reviewId: string, data: { rating?: number; comment?: string }, token?: string) => {
    return apiFetch(`/reviews/${reviewId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      token,
    })
  },

  /**
   * Delete student's own review (only if not approved)
   */
  deleteReview: async (reviewId: string, token?: string) => {
    return apiFetch(`/reviews/${reviewId}`, {
      method: 'DELETE',
      token,
    })
  },
}

/**
 * Admin API
 */
export const adminApi = {
  /**
   * Get dashboard stats
   */
  getDashboardStats: async (period: string = '30days', token?: string) => {
    return apiFetch<{ stats: DashboardStats }>(`/admin/dashboard/stats?period=${period}`, {
      token,
    })
  },

  /**
   * Get all listings
   */
  getAllListings: async (token?: string) => {
    return apiFetch<{ listings: Listing[] }>('/admin/listings', { token })
  },

  /**
   * Get pending listings
   */
  getPendingListings: async (token?: string) => {
    return apiFetch<{ listings: Listing[] }>('/admin/listings/pending-review', {
      token,
    })
  },

  /**
   * Get listing by ID (admin)
   */
  getListingById: async (listingId: string, token?: string) => {
    return apiFetch<{ listing: Listing }>(`/admin/listings/${listingId}`, { token })
  },

  /**
   * Approve listing
   */
  approveListing: async (listingId: string, token?: string) => {
    return apiFetch(`/admin/listings/${listingId}/approve`, {
      method: 'PATCH',
      token,
    })
  },

  /**
   * Reject listing
   */
  rejectListing: async (listingId: string, reason: string, token?: string) => {
    return apiFetch(`/admin/listings/${listingId}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
      token,
    })
  },

  /**
   * Delete listing (admin)
   */
  deleteListing: async (listingId: string, token?: string) => {
    return apiFetch(`/admin/listings/${listingId}`, {
      method: 'DELETE',
      token,
    })
  },

  /**
   * Unlist listing (mark as unavailable)
   */
  unlistListing: async (listingId: string, token?: string) => {
    return apiFetch(`/admin/listings/${listingId}/unlist`, {
      method: 'PATCH',
      token,
    })
  },

  /**
   * Re-list listing (mark as available)
   */
  relistListing: async (listingId: string, token?: string) => {
    return apiFetch(`/admin/listings/${listingId}/relist`, {
      method: 'PATCH',
      token,
    })
  },

  /**
   * Get all users
   */
  getUsers: async (role?: string, token?: string) => {
    const queryParams = role ? `?role=${role}` : ''
    return apiFetch<{ users: User[] }>(`/admin/users${queryParams}`, { token })
  },

  /**
   * Get user by ID
   */
  getUserById: async (userId: string, token?: string) => {
    return apiFetch<{ user: UserProfile }>(`/admin/users/${userId}`, { token })
  },

  /**
   * Update user status
   */
  updateUserStatus: async (
    userId: string,
    status: string,
    reason?: string,
    token?: string,
  ) => {
    return apiFetch(`/admin/users/${userId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, reason }),
      token,
    })
  },

  /**
   * Delete user
   */
  deleteUser: async (userId: string, reason: string, token?: string) => {
    return apiFetch(`/admin/users/${userId}`, {
      method: 'DELETE',
      body: JSON.stringify({ reason }),
      token,
    })
  },

  /**
   * Verify User Bank account
   */
  verifyUserBank: async (userId: string, token?: string) => {
    return apiFetch<{ message: string; user: UserProfile }>(`/admin/users/${userId}/verify-bank`, {
      method: 'PATCH',
      token,
    })
  },

  /**
   * Get all pending upgrade requests
   */
  getUpgradeRequests: async (status: string = 'pending') => {
    return apiFetch<{ upgradeRequests: UserProfile[] }>(
      `/admin/users/upgrade-requests?status=${status}`,
    )
  },

  /**
   * Approve owner upgrade request
   */
  approveUpgrade: async (userId: string) => {
    return apiFetch(`/admin/users/${userId}/approve-upgrade`, {
      method: 'PATCH',
    })
  },

  /**
   * Reject owner upgrade request
   */
  rejectUpgrade: async (userId: string, reason: string) => {
    return apiFetch(`/admin/users/${userId}/reject-upgrade`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    })
  },

  /**
   * Get service charge configuration
   */
  getServiceCharge: async (token?: string) => {
    return apiFetch<{ currentRate: number; history: any[] }>('/admin/service-charge', {
      token,
    })
  },

  /**
   * Update service charge rate
   */
  updateServiceCharge: async (rate: number, reason?: string, token?: string) => {
    return apiFetch('/admin/service-charge', {
      method: 'PATCH',
      body: JSON.stringify({ rate, reason }),
      token,
    })
  },

  /**
   * Get all owner payouts
   */
  getPayouts: async (params?: { status?: string; search?: string; page?: number; limit?: number }, token?: string) => {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value))
        }
      })
    }
    return apiFetch<{
      transactions: any[]
      stats: { totalPendingAmount: number; pendingCount: number; failedPayouts: number }
      pagination: any
    }>(`/admin/payouts?${queryParams.toString()}`, { token })
  },

  /**
   * Update payout status
   */
  updatePayoutStatus: async (transactionId: string, status: string, notes?: string, token?: string) => {
    return apiFetch(`/admin/payouts/${transactionId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
      token,
    })
  },

  /**
   * Get financial statistics for the dashboard
   */
  getFinancialStats: async (token?: string) => {
    return apiFetch<{
      kpis: {
        totalGross: number
        totalNetRevenue: number
        totalPayoutsSettled: number
        pendingPayoutsCount: number
      }
      trends: any[]
      topListings: any[]
      recentTransactions: any[]
    }>('/admin/financial/stats', { token })
  },

  /**
   * Get all platform bookings
   */
  getBookings: async (params?: { status?: string; page?: number; limit?: number }, token?: string) => {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value))
        }
      })
    }
    return apiFetch<{
      bookings: any[]
      pagination: {
        page: number
        limit: number
        total: number
        pages: number
      }
    }>(`/admin/bookings?${queryParams.toString()}`, { token })
  },

  /**
   * Get platform analytics and statistics
   */
  getAnalytics: async (token?: string) => {
    return apiFetch<{
      users: {
        total: number
        students: number
        owners: number
        newLast30Days: number
        newLast7Days: number
      }
      listings: {
        total: number
        approved: number
        pending: number
      }
      bookings: {
        total: number
        paymentConfirmed: number
        completed: number
        last30Days: number
      }
      revenue: any
      payouts: any
      recentTransactions: any[]
    }>('/admin/analytics', { token })
  },

  /**
   * Get all reviews with pagination and filters
   */
  getReviews: async (params?: { isApproved?: boolean; page?: number; limit?: number }, token?: string) => {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value))
        }
      })
    }
    return apiFetch<{
      reviews: any[]
      stats: {
        totalPending: number
        totalReviews: number
        avgApprovalTime: string
      }
      pagination: {
        page: number
        limit: number
        total: number
        pages: number
      }
    }>(`/admin/reviews?${queryParams.toString()}`, { token })
  },

  /**
   * Approve a review
   */
  approveReview: async (reviewId: string, token?: string) => {
    return apiFetch(`/admin/reviews/${reviewId}/approve`, {
      method: 'PATCH',
      token,
    })
  },

  /**
   * Delete a review permanently
   */
  deleteReview: async (reviewId: string, token?: string) => {
    return apiFetch(`/admin/reviews/${reviewId}`, {
      method: 'DELETE',
      token,
    })
  },
}

/**
 * Notifications API
 */
export const notificationsApi = {
  /**
   * Get all notifications for authenticated user
   */
  getNotifications: async (limit: number = 50, skip: number = 0) => {
    return apiFetch<{ notifications: any[]; unreadCount: number }>(
      `/notifications?limit=${limit}&skip=${skip}`,
    )
  },

  /**
   * Get unread notification count
   */
  getUnreadCount: async () => {
    return apiFetch<{ count: number }>('/notifications/unread-count')
  },

  /**
   * Mark notification as read
   */
  markAsRead: async (notificationId: string) => {
    return apiFetch<{ notification: any }>(
      `/notifications/${notificationId}/read`,
      {
        method: 'PATCH',
      },
    )
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: async () => {
    return apiFetch<{ message: string }>('/notifications/read-all', {
      method: 'PATCH',
    })
  },

  /**
   * Delete a notification
   */
  deleteNotification: async (notificationId: string) => {
    return apiFetch<{ message: string }>(`/notifications/${notificationId}`, {
      method: 'DELETE',
    })
  },
}

export default {
  auth: authApi,
  rooms: roomsApi,
  bookings: bookingsApi,
  payment: paymentApi,
  user: userApi,
  owner: ownerApi,
  reviews: reviewsApi,
  admin: adminApi,
  notifications: notificationsApi,
}
