import { ChangePasswordForm } from '@/components/profile/ChangePasswordForm'

export default function OwnerSecurityPage() {
  return <ChangePasswordForm backPath='/owner/profile' userRole='owner' />
}
