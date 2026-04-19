import { ChangePasswordForm } from '@/components/profile/ChangePasswordForm'

export default function AdminSecurityPage() {
  return <ChangePasswordForm backPath='/admin/profile' userRole='admin' />
}
