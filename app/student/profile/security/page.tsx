import { ChangePasswordForm } from '@/components/profile/ChangePasswordForm'

export default function StudentSecurityPage() {
  return <ChangePasswordForm backPath='/student/profile' userRole='student' />
}
