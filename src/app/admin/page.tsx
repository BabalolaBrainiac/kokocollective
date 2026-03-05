import { getSession } from '@/lib/session'
import { AdminLogin } from '@/components/admin-login'
import { AdminDashboard } from '@/components/admin-dashboard'

export default async function AdminPage() {
  const session = await getSession()

  if (!session) {
    return <AdminLogin />
  }

  // Pass session context to dashboard if needed
  return <AdminDashboard session={session} />
}

