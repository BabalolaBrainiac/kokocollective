'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, ArrowLeft, ShieldAlert, KeyRound, Copy, CheckCircle } from 'lucide-react'
import { getAdminUsersAction, createAdminUserAction, deleteAdminUserAction } from '@/app/admin/users/actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface AdminUsersProps {
    session: any
}

export function AdminUsers({ session }: AdminUsersProps) {
    const [users, setUsers] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

    const router = useRouter()

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        setIsLoading(true)
        const result = await getAdminUsersAction()
        if (result.data) {
            setUsers(result.data)
        }
        setIsLoading(false)
    }

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsCreating(true)

        const result = await createAdminUserAction(newEmail)
        if (result.error) {
            setError(result.error)
        } else if (result.data) {
            setNewPassword(result.data.plaintextPassword)
            setUsers([...users, {
                id: result.data.id,
                email: result.data.email,
                role: result.data.role,
                created_at: result.data.created_at
            }])
            setNewEmail('')
        }
        setIsCreating(false)
    }

    const handleDelete = async (id: string) => {
        const result = await deleteAdminUserAction(id)
        if (result.success) {
            setUsers(users.filter(u => u.id !== id))
            setDeleteConfirm(null)
        } else if (result.error) {
            alert(result.error)
            setDeleteConfirm(null)
        }
    }

    const copyToClipboard = () => {
        if (newPassword) {
            navigator.clipboard.writeText(newPassword)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="min-h-screen bg-cream dark:bg-dark-cream">
            {/* header */}
            <header className="bg-white dark:bg-dark-warm-beige shadow-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16">
                        <Link href="/admin" className="text-soft-brown/60 dark:text-warm-beige/60 hover:text-terracotta transition-colors flex items-center gap-2 mr-6 border-r border-warm-beige dark:border-dark-warm-beige pr-6">
                            <ArrowLeft size={18} />
                            Dashboard
                        </Link>
                        <h1 className="font-serif text-xl font-semibold text-mocha-brown dark:text-warm-beige">
                            User Management
                        </h1>
                    </div>
                </div>
            </header>

            {/* main content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Create User Form */}
                <div className="bg-white dark:bg-dark-warm-beige rounded-xl p-6 mb-8 shadow-sm">
                    <h2 className="font-serif text-lg font-semibold text-mocha-brown dark:text-warm-beige mb-4 flex items-center gap-2">
                        <ShieldAlert size={20} className="text-terracotta" />
                        Add New Admin
                    </h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {!newPassword ? (
                        <form onSubmit={handleCreateUser} className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                            <div className="flex-1 w-full">
                                <label htmlFor="email" className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                                    Admin Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-cream dark:bg-dark-cream text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                                    placeholder="admin@kokokollective.com"
                                    required
                                    disabled={isCreating}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn-primary w-full sm:w-auto justify-center disabled:opacity-50"
                                disabled={isCreating || !newEmail}
                            >
                                <Plus size={18} className="mr-2" />
                                {isCreating ? 'Creating...' : 'Create Admin'}
                            </button>
                        </form>
                    ) : (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-xl p-6">
                            <h3 className="text-green-800 dark:text-green-200 font-medium mb-2 flex items-center gap-2">
                                <CheckCircle size={18} />
                                Admin created successfully!
                            </h3>
                            <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                                Please save this password securely and share it with the user. <strong>It will not be shown again.</strong>
                            </p>
                            <div className="flex items-center gap-2 bg-white dark:bg-black/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                                <KeyRound size={16} className="text-green-600" />
                                <code className="text-lg font-mono flex-1 text-mocha-brown dark:text-warm-beige select-all">
                                    {newPassword}
                                </code>
                                <button
                                    onClick={copyToClipboard}
                                    className={`p-2 rounded-md transition-colors ${copied ? 'bg-green-100 text-green-700' : 'bg-warm-beige text-soft-brown hover:bg-terracotta hover:text-white'}`}
                                >
                                    {copied ? 'Copied!' : <Copy size={16} />}
                                </button>
                            </div>
                            <button
                                onClick={() => setNewPassword(null)}
                                className="mt-4 text-sm font-medium text-green-700 hover:text-green-800 underline"
                            >
                                Create another admin
                            </button>
                        </div>
                    )}
                </div>

                {/* Users Table */}
                <div className="bg-white dark:bg-dark-warm-beige rounded-xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-warm-beige dark:border-dark-warm-beige">
                        <h2 className="font-serif text-lg font-semibold text-mocha-brown dark:text-warm-beige">
                            Active Admins
                        </h2>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta" />
                        </div>
                    ) : users.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-soft-brown/60 dark:text-warm-beige/60">
                                No active admins found.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-warm-beige/50 dark:bg-dark-warm-beige/50">
                                    <tr>
                                        <th className="text-left text-xs font-medium text-soft-brown/60 dark:text-warm-beige/60 uppercase tracking-wider px-6 py-3">
                                            Email
                                        </th>
                                        <th className="text-left text-xs font-medium text-soft-brown/60 dark:text-warm-beige/60 uppercase tracking-wider px-6 py-3">
                                            Role
                                        </th>
                                        <th className="text-left text-xs font-medium text-soft-brown/60 dark:text-warm-beige/60 uppercase tracking-wider px-6 py-3">
                                            Created
                                        </th>
                                        <th className="text-right text-xs font-medium text-soft-brown/60 dark:text-warm-beige/60 uppercase tracking-wider px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-warm-beige dark:divide-dark-warm-beige">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-warm-beige/20 dark:hover:bg-dark-warm-beige/20">
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-mocha-brown dark:text-warm-beige">
                                                    {user.email}
                                                    {user.email === session.email && <span className="ml-2 text-[10px] bg-terracotta/10 text-terracotta px-2 py-0.5 rounded-full">YOU</span>}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider ${user.role === 'superuser' ? 'bg-amber-100 text-amber-800' : 'bg-sage-green/20 text-muted-olive'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-soft-brown/70 dark:text-warm-beige/70">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {user.role !== 'superuser' && user.email !== session.email && (
                                                    <button
                                                        onClick={() => setDeleteConfirm(user.id)}
                                                        className="p-2 inline-flex rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-soft-brown/60 dark:text-warm-beige/60 hover:text-red-500 transition-colors"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </main>

            {/* delete confirmation */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-dark-warm-beige rounded-2xl p-6 max-w-sm w-full shadow-xl">
                        <h3 className="font-serif text-xl font-semibold text-mocha-brown dark:text-warm-beige mb-2">
                            Revoke Admin Access?
                        </h3>
                        <p className="text-sm text-soft-brown/70 dark:text-warm-beige/70 mb-6 font-medium">
                            Are you sure you want to delete this user? They will immediately lose access to the admin dashboard. This cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 py-2.5 rounded-xl border border-warm-beige dark:border-dark-warm-beige text-soft-brown dark:text-warm-beige font-medium hover:bg-warm-beige/50 dark:hover:bg-dark-warm-beige/50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
