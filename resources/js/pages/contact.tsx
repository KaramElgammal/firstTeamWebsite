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
            {/* Social Links */}
            <div className="flex flex-wrap mb-10 justify-center gap-4 sm:gap-6">
                <a href="https://www.youtube.com/@firstteam7713" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{ color: 'var(--page-text-muted)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#FF0000'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--page-text-muted)'; }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube
                </a>
                <a href="https://www.facebook.com/FirstTeamRobots" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{ color: 'var(--page-text-muted)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1877F2'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--page-text-muted)'; }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                </a>
                <a href="https://www.tiktok.com/@first.team.robots" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{ color: 'var(--page-text-muted)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--page-text)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--page-text-muted)'; }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                    TikTok
                </a>
                <a href="https://wa.me/201070291846" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{ color: 'var(--page-text-muted)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#25D366'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--page-text-muted)'; }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                </a>
            </div>
        </div>
    );
}
