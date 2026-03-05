import * as jose from 'jose';
import { cookies } from 'next/headers';

// Make sure to define JWT_SECRET in .env.local
const secretKey = process.env.JWT_SECRET || 'fallback_not_secure_change_me_in_production';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d') // 1 day expiry
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    try {
        const { payload } = await jose.jwtVerify(input, key, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

export async function createSession(userId: string, email: string, role: string) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
    const session = await encrypt({ userId, email, role, expires });

    const cookieStore = await cookies();
    cookieStore.set('session', session, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    if (!session) return null;

    const decryptedSession = await decrypt(session);
    return decryptedSession;
}

export async function destroySession() {
    const cookieStore = await cookies();
    cookieStore.set('session', '', {
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });
}
