'use server';

import { createClient } from '@supabase/supabase-js';
import { getSession } from '@/lib/session';
import { EventFormData } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
});

async function requireAdmin() {
    const session = await getSession();
    if (!session || !['admin', 'superuser'].includes(session.role)) {
        throw new Error('Unauthorized');
    }
    return session;
}

export async function createEventAction(event: EventFormData) {
    await requireAdmin();
    const { data, error } = await supabase
        .from('events')
        .insert([{ ...event, spots_remaining: event.capacity }])
        .select()
        .single();

    if (error) return { error: error.message };
    return { data };
}

export async function updateEventAction(id: string, event: Partial<EventFormData>) {
    await requireAdmin();
    const { data, error } = await supabase
        .from('events')
        .update(event)
        .eq('id', id)
        .select()
        .single();

    if (error) return { error: error.message };
    return { data };
}

export async function deleteEventAction(id: string) {
    await requireAdmin();
    const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

    if (error) return { error: error.message };
    return { success: true };
}

export async function togglePublishAction(id: string, currentState: boolean) {
    await requireAdmin();
    const { data, error } = await (supabase as any)
        .from('events')
        .update({ is_published: !currentState })
        .eq('id', id)
        .select()
        .single();

    if (error) return { error: error.message };
    return { data };
}

export async function toggleFeaturedAction(id: string, currentState: boolean) {
    await requireAdmin();
    const { data, error } = await (supabase as any)
        .from('events')
        .update({ is_featured: !currentState })
        .eq('id', id)
        .select()
        .single();

    if (error) return { error: error.message };
    return { data };
}
