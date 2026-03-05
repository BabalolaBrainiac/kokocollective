'use client'

import { useState, useTransition } from 'react'
import { submitContactForm } from '@/app/contact/actions'

export function ContactForm() {
    const [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        const formData = new FormData(e.currentTarget)

        startTransition(async () => {
            const result = await submitContactForm(formData)
            if (result.error) {
                setError(result.error)
            } else {
                setSuccess(true)
                // Reset the form
                const form = e.target as HTMLFormElement;
                form.reset();
            }
        })
    }

    if (success) {
        return (
            <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-8 rounded-2xl text-center border border-green-200 dark:border-green-800/30">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800/40 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">Message Sent!</h3>
                <p>Thank you for reaching out. We&apos;ll get back to you within 48 hours.</p>
                <button
                    onClick={() => setSuccess(false)}
                    className="mt-6 text-sm font-medium hover:underline"
                >
                    Send another message
                </button>
            </div>
        )
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm">
                    {error}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-white dark:bg-dark-warm-beige text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                        placeholder="Your name"
                        required
                        disabled={isPending}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-white dark:bg-dark-warm-beige text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                        placeholder="your@email.com"
                        required
                        disabled={isPending}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                    Subject
                </label>
                <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-white dark:bg-dark-warm-beige text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                    disabled={isPending}
                >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Event Question">Event Question</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Press">Press</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-mocha-brown dark:text-warm-beige mb-2">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-warm-beige dark:border-dark-warm-beige bg-white dark:bg-dark-warm-beige text-soft-brown dark:text-warm-beige focus:outline-none focus:ring-2 focus:ring-terracotta/50 resize-none"
                    placeholder="How can we help?"
                    required
                    disabled={isPending}
                />
            </div>

            <button
                type="submit"
                className="btn-primary w-full justify-center disabled:opacity-50"
                disabled={isPending}
            >
                {isPending ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    )
}
