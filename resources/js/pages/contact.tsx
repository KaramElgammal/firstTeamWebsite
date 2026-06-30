import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import ThemeToggle from '@/components/theme-toggle';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';
import { Send, Mail, MessageSquare, ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Contact() {
    const { t, locale } = useTranslation();
    const { ziggy } = usePage().props as any;

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        email: '',
        message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('contact.send'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div
            className="min-h-screen font-sans"
            style={{ backgroundColor: 'var(--page-bg)', color: 'var(--page-text)' }}
        >
            <Head title={t('contact.page_title') || 'Contact Us — First Team'} />

            {/* Header */}
            <header
                className="sticky top-0 z-50 backdrop-blur-md border-b"
                style={{ backgroundColor: 'var(--page-header-bg)', borderColor: 'var(--page-border)' }}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        href={route('dashboard')}
                        className="flex items-center gap-2 text-sm font-medium transition-colors"
                        style={{ color: 'var(--page-text-muted)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--page-accent)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--page-text-muted)'; }}
                    >
                        {locale === 'ar' ? (
                            <>
                                <span>{t('contact.back') || 'العودة'}</span>
                                <ArrowLeft className="w-4 h-4 rotate-180" />
                            </>
                        ) : (
                            <>
                                <ArrowLeft className="w-4 h-4" />
                                <span>{t('contact.back') || 'Back'}</span>
                            </>
                        )}
                    </Link>

                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <LanguageSwitcher />
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)] px-6 py-16">
                <div
                    className="w-full max-w-xl rounded-2xl shadow-2xl border overflow-hidden"
                    style={{
                        backgroundColor: 'var(--page-bg-secondary)',
                        borderColor: 'var(--page-border)',
                    }}
                >
                    {/* Card Header */}
                    <div
                        className="px-8 py-6 border-b"
                        style={{ borderColor: 'var(--page-border)', backgroundColor: 'var(--page-inner-box)' }}
                    >
                        <div className="flex items-center gap-3 mb-1">
                            <Mail className="w-5 h-5" style={{ color: 'var(--page-accent)' }} />
                            <h1 className="text-xl font-bold tracking-wide" style={{ color: 'var(--page-text)' }}>
                                {t('contact.title') || 'Contact Us'}
                            </h1>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--page-text-muted)' }}>
                            {t('contact.subtitle') || 'Send us a message and we will get back to you.'}
                        </p>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-8">
                        {/* Success message */}
                        {recentlySuccessful && (
                            <div
                                className="mb-6 px-4 py-3 rounded-lg border text-sm font-medium"
                                style={{
                                    backgroundColor: 'color-mix(in srgb, var(--page-accent) 10%, transparent)',
                                    borderColor: 'var(--page-accent)',
                                    color: 'var(--page-accent)',
                                }}
                            >
                                {t('contact.success') || 'Your message has been sent successfully!'}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            {/* Email field */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium"
                                    style={{ color: 'var(--page-text)' }}
                                >
                                    {t('contact.email_label') || 'Your Email'}
                                </label>
                                <div className="relative">
                                    <Mail
                                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                                        style={{
                                            color: 'var(--page-text-muted)',
                                            [locale === 'ar' ? 'right' : 'left']: '12px',
                                        }}
                                    />
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder={t('contact.email_placeholder') || 'your@email.com'}
                                        required
                                        className="w-full h-10 rounded-md border text-sm transition-colors focus:outline-none focus:ring-2"
                                        style={{
                                            backgroundColor: 'var(--page-bg)',
                                            borderColor: errors.email ? '#ef4444' : 'var(--page-border)',
                                            color: 'var(--page-text)',
                                            paddingLeft: locale === 'ar' ? '12px' : '36px',
                                            paddingRight: locale === 'ar' ? '36px' : '12px',
                                        }}
                                        onFocus={e => { (e.target as HTMLElement).style.borderColor = 'var(--page-accent)'; (e.target as HTMLElement).style.boxShadow = '0 0 0 2px color-mix(in srgb, var(--page-accent) 20%, transparent)'; }}
                                        onBlur={e => { (e.target as HTMLElement).style.borderColor = errors.email ? '#ef4444' : 'var(--page-border)'; (e.target as HTMLElement).style.boxShadow = 'none'; }}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-xs text-red-500">{errors.email}</p>
                                )}
                            </div>

                            {/* Message field */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium"
                                    style={{ color: 'var(--page-text)' }}
                                >
                                    {t('contact.message_label') || 'Message'}
                                </label>
                                <div className="relative">
                                    <MessageSquare
                                        className="absolute top-3 w-4 h-4 pointer-events-none"
                                        style={{
                                            color: 'var(--page-text-muted)',
                                            [locale === 'ar' ? 'right' : 'left']: '12px',
                                        }}
                                    />
                                    <textarea
                                        id="message"
                                        rows={5}
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        placeholder={t('contact.message_placeholder') || 'Write your message or question here...'}
                                        required
                                        className="w-full rounded-md border text-sm transition-colors focus:outline-none resize-none"
                                        style={{
                                            backgroundColor: 'var(--page-bg)',
                                            borderColor: errors.message ? '#ef4444' : 'var(--page-border)',
                                            color: 'var(--page-text)',
                                            paddingTop: '10px',
                                            paddingBottom: '10px',
                                            paddingLeft: locale === 'ar' ? '12px' : '36px',
                                            paddingRight: locale === 'ar' ? '36px' : '12px',
                                        }}
                                        onFocus={e => { (e.target as HTMLElement).style.borderColor = 'var(--page-accent)'; (e.target as HTMLElement).style.boxShadow = '0 0 0 2px color-mix(in srgb, var(--page-accent) 20%, transparent)'; }}
                                        onBlur={e => { (e.target as HTMLElement).style.borderColor = errors.message ? '#ef4444' : 'var(--page-border)'; (e.target as HTMLElement).style.boxShadow = 'none'; }}
                                    />
                                </div>
                                {errors.message && (
                                    <p className="text-xs text-red-500">{errors.message}</p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 h-10 rounded-md font-semibold text-sm tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                style={{
                                    backgroundColor: 'var(--page-accent)',
                                    color: 'var(--page-bg)',
                                }}
                                onMouseEnter={e => { if (!processing) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--page-btn-hover)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--page-accent)'; }}
                            >
                                <Send className="w-4 h-4" />
                                {processing
                                    ? (t('contact.sending') || 'Sending...')
                                    : (t('contact.send_btn') || 'Send Message')}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
