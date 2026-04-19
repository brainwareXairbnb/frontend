'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Users,
  IndianRupee,
  Calendar,
  Eye,
  CheckCircle2,
  X,
  Loader2,
  AlertCircle,
  Home,
} from 'lucide-react'
import { format } from 'date-fns'

export function AdminListingCard({
  listing,
  handleApproveClick,
  handleRejectClick,
  actionLoading,
}: any) {
  const router = useRouter()
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-200'
      case 'under_review':
      case 'pending':
        return 'bg-orange-50 text-orange-600 border border-orange-200'
      case 'rejected':
        return 'bg-red-50 text-red-600 border border-red-200'
      case 'draft':
        return 'bg-gray-50 text-gray-600 border border-gray-200'
      default:
        return 'bg-blue-50 text-blue-600 border border-blue-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return <CheckCircle2 className='w-3.5 h-3.5' />
      case 'under_review':
      case 'pending':
        return <AlertCircle className='w-3.5 h-3.5' />
      case 'rejected':
        return <X className='w-3.5 h-3.5' />
      default:
        return <AlertCircle className='w-3.5 h-3.5' />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'under_review':
        return 'Pending Review'
      case 'approved':
        return 'Approved'
      case 'rejected':
        return 'Rejected'
      case 'draft':
        return 'Draft'
      case 'changes_required':
        return 'Changes Required'
      default:
        return status || 'Unknown'
    }
  }

  return (
    <Card className='group overflow-hidden rounded-2xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 bg-white'>
      {/* Image */}
      <div
        className='relative aspect-[4/3] overflow-hidden cursor-pointer'
        onClick={() => router.push(`/admin/listings/${listing._id}`)}
      >
        {listing.photos?.length > 0 ? (
          <img
            src={listing.photos[0]}
            alt={listing.title}
            className='w-full h-full object-cover group-hover:scale-105 transition duration-500'
          />
        ) : (
          <div className='w-full h-full flex flex-col items-center justify-center bg-muted'>
            <Home className='w-10 h-10 text-muted-foreground/40' />
            <span className='text-xs text-muted-foreground mt-1'>No Image</span>
          </div>
        )}

        {/* Price Badge */}
        <div className='absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-sm font-semibold shadow'>
          ₹{listing.rent?.toLocaleString()} / mo
        </div>

        {/* Status */}
        <div className='absolute top-3 right-3'>
          <span
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold ${getStatusColor(
              listing.status,
            )}`}
          >
            {getStatusIcon(listing.status)}
            {getStatusLabel(listing.status)}
          </span>
        </div>
      </div>

      {/* Content */}
      <CardContent className='p-4 space-y-3'>
        {/* Title */}
        <h3
          className='font-semibold text-sm line-clamp-1 cursor-pointer hover:text-primary transition-colors'
          onClick={() => router.push(`/admin/listings/${listing._id}`)}
        >
          {listing.title}
        </h3>

        {/* Location */}
        <div className='flex items-center gap-1 text-xs text-muted-foreground'>
          <MapPin className='w-3.5 h-3.5' />
          <span>
            {listing.address.city}
            {listing.address.state && `, ${listing.address.state}`}
          </span>
        </div>

        {/* Info Grid */}
        <div className='grid grid-cols-2 gap-3 text-xs'>
          <div className='flex items-center gap-1'>
            <Users className='w-3.5 h-3.5 text-muted-foreground' />
            <span className='truncate'>{listing.owner?.name}</span>
          </div>

          <div className='flex items-center justify-end gap-1 font-medium'>
            <IndianRupee className='w-3.5 h-3.5 text-primary' />
            {listing.rent?.toLocaleString()}
          </div>

          <div className='capitalize'>{listing.roomType}</div>

          <div className='flex items-center justify-end gap-1'>
            <Calendar className='w-3.5 h-3.5 text-muted-foreground' />
            {format(new Date(listing.createdAt), 'MMM dd')}
          </div>
        </div>

        {/* Actions */}
        <div className='flex gap-2 pt-2'>
          {listing.status === 'under_review' ? (
            <>
              <Button
                size='sm'
                className='flex-1'
                onClick={() => handleApproveClick(listing._id, listing.title)}
                disabled={actionLoading === listing._id}
              >
                {actionLoading === listing._id ? (
                  <Loader2 className='w-4 h-4 animate-spin' />
                ) : (
                  <>
                    <CheckCircle2 className='w-4 h-4 mr-1' />
                    Approve
                  </>
                )}
              </Button>

              <Button
                size='sm'
                variant='outline'
                className='flex-1'
                onClick={() => handleRejectClick(listing._id, listing.title)}
                disabled={actionLoading === listing._id}
              >
                <X className='w-4 h-4 mr-1' />
                Reject
              </Button>
            </>
          ) : (
            <Button
              size='sm'
              variant='outline'
              className='w-full'
              onClick={() => router.push(`/admin/listings/${listing._id}`)}
            >
              <Eye className='w-4 h-4 mr-1' />
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
