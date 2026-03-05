'use server';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Use service role to insert even if API is public, since we want to ensure robustness.
// Actually, the RLS policy allows public insert, so anon key would work too. 
// However, since this is a server action, using service_role is fine and avoids exposing anon key in this specific server context if we don't want to. 
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
});

export async function submitContactForm(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !subject || !message) {
        return { error: 'All fields are required.' };
    }

    const { error } = await supabase
        .from('contact_messages')
        .insert([{ name, email, subject, message, status: 'unread' }]);

    if (error) {
        console.error('Error inserting contact message:', error);
        return { error: 'Failed to send message. Please try again later.' };
    }

    return { success: true };
}
