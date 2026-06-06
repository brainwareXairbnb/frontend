// Room type — decoupled from static data, represents both API and legacy shapes
export interface Room {
  id: string | number
  title: string
  location: string
  area?: string
  distanceToCampus?: string
  transportMode?: 'walk' | 'bus'
  price: number
  type?: string
  gender?: string
  genderPref?: string
  verified?: boolean
  rating: number
  reviewCount: number
  badge?: string
  amenities: string[]
  description?: string
  images: string[]
  photos?: string[]
  isBookmarked?: boolean
  createdAt?: string | Date
  owner: {
    _id?: string
    name: string
    rating?: number
    responseTime?: string
    profilePicUrl?: string
    phone?: string
    email?: string
  }
  deposit?: number
  rent?: number
  adminFee?: number
  features?: { icon: string; label: string }[]
  reviews?: {
    author: string
    initials: string
    institution: string
    date: string
    content: string
  }[]
}

// ============================================================================
// Domain Models
// ============================================================================

export type UserRole = 'student' | 'owner' | 'admin'

export interface User {
  _id: string
  id?: string
  name: string
  email: string
  role: UserRole | string
  avatar?: string
  phone?: string
  phoneNumber?: string
  universityRollNo?: string
  bankDetails?: BankDetails
  profilePicUrl?: string
  isStudentVerified?: boolean
  studentEmail?: string
  isApproved?: boolean
  createdAt?: string
  updatedAt?: string
  lastLogin?: string
}

export interface UserProfile extends User {
  bankDetails?: BankDetails
  totalListings?: number
  totalBookings?: number
  totalRevenue?: number
  businessAddress?: string
  nidNo?: string
  isApproved?: boolean
  upgradeRequest?: {
    requestedAt: string
    status: string
  }
}

export interface BankDetails {
  accountHolderName?: string
  accountNumber?: string
  bankName?: string
  ifscCode?: string
  ifsc?: string
  upiId?: string
  isVerified?: boolean
}

export interface DashboardStats {
  totalUsers: number
  totalRevenue: number
  totalBookings: number
  totalRooms: number
}

export interface Listing {
  _id: string
  title: string
  description: string
  // Pricing
  price?: number
  rent?: number
  deposit?: number
  // Location (flexible for different backend structures)
  location?: {
    address?: string
    city?: string
    state?: string
    pincode?: string
    coordinates?:
      | {
          lat?: number
          lng?: number
        }
      | number[]
  }
  address?: {
    street?: string
    city?: string
    state?: string
    pincode?: string
    landmark?: string
  }
  // Amenities and Features
  amenities: string[]
  images?: string[]
  photos?: string[]
  availableFrom?: string
  // Room Details
  roomType: string | 'single' | 'double' | 'shared'
  gender?: 'male' | 'female' | 'any'
  genderPref?: string
  // Capacity fields
  totalStudents?: number
  availableStudents?: number
  totalBedrooms?: number
  totalBeds?: number
  availableBeds?: number
  totalBathrooms?: number
  // Legacy fields
  bedrooms?: number
  bathrooms?: number
  totalArea?: number
  genderPreference?: string
  // Status and Availability
  status: ListingStatus
  isAvailable?: boolean
  // Owner Information
  owner?: {
    _id: string
    name: string
    email: string
    phone?: string
  }
  // Metrics
  viewCount?: number
  avgRating?: number
  totalReviews?: number
  // Timestamps
  createdAt: string
  updatedAt?: string
  // Additional Fields
  rejectionReason?: string
  houseRules?: string[]
}

export type ListingStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'changes_required'
  | 'inactive'


// ============================================================================
// Component Props
// ============================================================================

export interface AuthPromptProps {
  title: string
  description: string
}

export interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (inputValue?: string) => Promise<void>
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'danger' | 'success' | 'warning' | 'info'
  requiresInput?: boolean
  inputPlaceholder?: string
  inputLabel?: string
}

export interface RoomCardProps {
  room: Room | any
  imageIndex?: number
  subtitle?: React.ReactNode
  dateStr?: React.ReactNode
  priceSuffix?: React.ReactNode
  showReviewCount?: boolean
}

export interface PhoneFrameProps {
  children: React.ReactNode
  screen: string
  setScreen: (screen: string) => void
}

// For components/OwnerLayout.tsx (legacy component with screen state)
export interface OwnerLayoutComponentProps {
  children: React.ReactNode
  screen: string
  setScreen: (screen: string) => void
}

// For app/owner/layout.tsx (Next.js app router layout)
export interface OwnerLayoutProps {
  children: React.ReactNode
}

export interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  fallbackPath?: string
}

export interface EmptyStateProps {
  icon?: any // LucideIcon type
  title: string
  message: string
  action?: {
    label: string
    onClick: () => void
  }
}

export interface StatusBadgeProps {
  s: string // status
}

export interface ChipProps {
  label: string
  bg?: string
  color?: string
  border?: string
}

export interface AvatarProps {
  name: string
  size?: number
}

export interface StarsProps {
  v: number
  size?: number
}

export interface CreateListingDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  editingListing?: Listing | null
  viewMode?: boolean
}

export interface OwnerListingCardProps {
  listing: Listing
  onDelete: (id: string) => void
  onEdit: (listing: Listing) => void
  onView: (listing: Listing) => void
}

export interface AdminLayoutProps {
  children: React.ReactNode
}

export interface StudentLayoutProps {
  children: React.ReactNode
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (role: 'student' | 'owner', data: any) => Promise<void>
  loginWithGoogle: (idToken: string) => Promise<User>
  verifyEmail: (email: string, otp: string) => Promise<{ user: User; accessToken: string; message: string }>
  verifyStudentEmail: (otp: string) => Promise<{ user: User; message: string }>
  refreshUser: () => Promise<User>
}

export interface FetchOptions extends RequestInit {
  token?: string
}

// ============================================================================
// API Response Types
// ============================================================================

export interface LoginResponse {
  token: string
  user: User
}

export interface RegisterResponse {
  token: string
  user: User
}

export interface ListingResponse {
  listing: Listing
}

export interface ListingsResponse {
  listings: Listing[]
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface ApiError {
  message: string
  code?: string
  errors?: Record<string, string>
}

// ============================================================================
// Form & State Types
// ============================================================================

export interface LoginFormData {
  email: string
  password: string
  role: UserRole
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  phone?: string
  role: UserRole
}

export interface ListingFormData {
  title: string
  description: string
  price: number
  location: {
    address: string
    city: string
    state: string
    pincode: string
  }
  amenities: string[]
  images: string[]
  availableFrom: string
  roomType: 'single' | 'double' | 'shared'
  gender: 'male' | 'female' | 'any'
  houseRules?: string[]
}

export interface ModalConfig {
  isOpen: boolean
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
  requireInput?: boolean
  inputPlaceholder?: string
  onConfirm: () => void
}

// ============================================================================
// Utility Types
// ============================================================================

export type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected'

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface SearchParams {
  query?: string
  status?: FilterStatus
  city?: string
  minPrice?: number
  maxPrice?: number
  roomType?: string
  gender?: string
}

// ============================================================================
// Payment & Notification Types
// ============================================================================

export interface PaymentSchedule {
  _id: string
  listing: {
    _id: string
    title: string
    photos: string[]
  }
  owner: {
    _id: string
    name: string
  }
  monthlyRent: number
  schedules: Array<{
    month: number
    dueDate: string
    amount: number
    status: 'pending' | 'processing' | 'paid' | 'failed'
    failedAttempts: number
  }>
  autoPayEnabled: boolean
  monthsPaid: number
  totalMonths: number
}

export type NotificationType =
  | 'booking_request'
  | 'booking_accepted'
  | 'booking_rejected'
  | 'booking_cancelled'
  | 'payment_confirmed'
  | 'payout_processing'
  | 'payout_settled'
  | 'payout_failed'
  | 'listing_approved'
  | 'listing_rejected'
  | 'listing_changes_required'
  | 'listing_submitted'
  | 'listing_resubmitted'
  | 'listing_deleted'
  | 'listing_unlisted'
  | 'listing_relisted'
  | 'owner_approved'
  | 'owner_rejected'
  | 'owner_upgrade_approved'
  | 'owner_upgrade_rejected'
  | 'owner_upgrade_requested'
  | 'new_review'
  | 'review_flagged'
  | 'account_warned'
  | 'account_suspended'
  | 'account_banned'
  | 'bookmark_unavailable'
  | 'payment_failed'
  | 'booking_dispute'
  | 'refund_request'
  | 'new_user_registered'
  | 'system_alert'

export interface Notification {
  _id: string
  user: string
  type: NotificationType
  title: string
  message: string
  reference?: {
    model: string
    id: string
  }
  isRead: boolean
  createdAt: string
  updatedAt?: string
}

export interface NotificationConfig {
  icon: any // LucideIcon type
  color: string
  bg: string
}

// ============================================================================
// Booking Types
// ============================================================================

export type BookingStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'cancelled'
  | 'payment_confirmed'
  | 'completed'

export interface Booking {
  _id: string
  student: {
    _id: string
    name: string
    email: string
    phone: string
    isStudentVerified?: boolean
    studentEmail?: string
  }
  listing: {
    _id: string
    title: string
    photos: string[]
    address: {
      street: string
      city: string
      state?: string
    }
    rent: number
    deposit?: number
  }
  moveInDate: string
  durationMonths: number
  message: string
  status: BookingStatus
  createdAt: string
  updatedAt?: string
  ownerReply?: string
  paymentId?: string
  hasReview?: boolean
}

// ============================================================================
// Additional Component Props Types
// ============================================================================

export interface GoogleSignInButtonProps {
  onSuccess: (credential: string) => void
  onError?: (error: any) => void
}

export interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  initialIndex?: number
}

export interface PhotoUploadProps {
  photos: string[]
  onPhotosChange: (photos: string[]) => void
  maxPhotos?: number
}

export interface SplashScreenProps {
  onComplete?: () => void
}

export interface AppInitializerProps {
  children: React.ReactNode
}

// Notification Component Props
export interface NotificationCardProps {
  notification: Notification
  onClick?: () => void
}

export interface NotificationEmptyStateProps {
  message?: string
}

export interface NotificationFilterHeaderProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
  unreadCount?: number
}

export interface NotificationListProps {
  notifications: Notification[]
  onNotificationClick?: (notification: Notification) => void
}

// Profile Component Props
export interface PersonalInfoFormProps {
  user: User
  onSuccess?: () => void
}

export interface ChangePasswordFormProps {
  onSuccess?: () => void
}
