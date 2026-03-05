import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { AdminUsers } from '@/components/admin-users'

export default async function AdminUsersPage() {
    const session = await getSession()

    if (!session) {
        redirect('/admin')
    }

    if (session.role !== 'superuser') {
        redirect('/admin')
    }

    return <AdminUsers session={session} />
}
