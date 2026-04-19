import { PersonalInfoForm } from '@/components/profile/PersonalInfoForm'

export default function AdminPersonalInfoPage() {
  return <PersonalInfoForm backPath='/admin/profile' userRole='admin' />
}
