'use server';

import { createClient } from '@supabase/supabase-js';
import { getSession } from '@/lib/session';
import { hashPassword } from '@/lib/auth';
import crypto from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
});

async function requireSuperuser() {
    const session = await getSession();
    if (!session || session.role !== 'superuser') {
        throw new Error('Unauthorized');
    }
    return session;
}

export async function getAdminUsersAction() {
    await requireSuperuser();

    const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, role, created_at')
        .order('created_at', { ascending: true });

    if (error) return { error: error.message };
    return { data };
}

export async function createAdminUserAction(email: string) {
    await requireSuperuser();

    // Check if email exists
    const { data: existingUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', email)
        .single();

    if (existingUser) {
        return { error: 'A user with this email already exists.' };
    }

    // Generate a secure random 12-character password
    const plaintextPassword = crypto.randomBytes(9).toString('base64').replace(/[\+\/\=]/g, '').slice(0, 12);

    // Hash it for storage
    const hashedPassword = await hashPassword(plaintextPassword);

    const { data, error } = await supabase
        .from('admin_users')
        .insert([{
            email,
            password_hash: hashedPassword,
            role: 'admin'
        }])
        .select('id, email, role, created_at')
        .single();

    if (error) return { error: error.message };

    // Return the plaintext password exactly once so the superuser can share it securely
    return { data: { ...data, plaintextPassword } };
}

export async function deleteAdminUserAction(id: string) {
    const session = await requireSuperuser();

    // Prevent deleting oneself
    const { data: userToDelete } = await supabase
        .from('admin_users')
        .select('email, role')
        .eq('id', id)
        .single();

    if (!userToDelete) {
        return { error: 'User not found' };
    }
    if (userToDelete.email === session.email || userToDelete.role === 'superuser') {
        return { error: 'Cannot delete the superuser account' };
    }

    const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', id);

    if (error) return { error: error.message };
    return { success: true };
}
