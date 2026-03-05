'use server';

import { createClient } from '@supabase/supabase-js';
import { verifyPassword } from '@/lib/auth';
import { createSession, destroySession } from '@/lib/session';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// We use service_role here because admin_users requires RLS bypass to read safely in a pure backend context
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
});

export async function loginAction(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'Email and password are required' };
    }

    const { data: user, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single();

    if (error || !user) {
        return { error: 'Invalid email or password' };
    }

    const isValid = await verifyPassword(user.password_hash, password);
    if (!isValid) {
        return { error: 'Invalid email or password' };
    }

    await createSession(user.id, user.email, user.role);

    return { success: true };
}

export async function logoutAction() {
    await destroySession();
    return { success: true };
}
