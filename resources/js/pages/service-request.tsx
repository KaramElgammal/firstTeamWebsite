import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import ThemeToggle from '@/components/theme-toggle';
import { useTranslation } from '@/hooks/useTranslation';
import { useState, FormEventHandler } from 'react';
import SiteUserAvatarMenu from '@/components/site-user-avatar-menu';
import { Menu, X, Send, CheckCircle } from 'lucide-react';

export default function ServiceRequest() {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();
    const user = auth.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const params = new URLSearchParams(window.location.search);
    const serviceFromUrl = params.get('service') ?? '';

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        service: serviceFromUrl,
        request_type: 'ready',
        details: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('service-request.send'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: 'var(--page-bg)', color: 'var(--page-text)' }}>
            <Head title="Service Request — First Team" />

            {/* Header */}
            <header
                className="sticky top-0 z-50 backdrop-blur-md border-b"
                style={{ backgroundColor: 'var(--page-header-bg)', borderColor: 'var(--page-border)' }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src="/logo.png"
                            alt="First Team Logo"
                            className="w-10 object-contain drop-shadow-lg rounded-full"
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/40x40/000000/FFFFFF?text=FT'; }}
                        />
                        <span className="text-xl font-bold tracking-widest" style={{ color: 'var(--page-text)' }}>FT</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-bold" style={{ color: 'var(--page-text-muted)' }}>
                        <Link href={route('dashboard')} className="transition-colors hover:text-[var(--page-accent)]">{t('nav.home') || 'Home'}</Link>
                        <Link href={route('services')} className="transition-colors border-b-2 pb-1" style={{ color: 'var(--page-text)', borderColor: 'var(--page-accent)' }}>{t('nav.services') || 'Services'}</Link>
                        <Link href={route('dashboard') + '#about'} className="transition-colors hover:text-[var(--page-accent)]">{t('nav.about') || 'About'}</Link>
                        <Link href={route('contact')} className="transition-colors hover:text-[var(--page-accent)]">{t('nav.contact') || 'Contact'}</Link>
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <ThemeToggle />
                        <LanguageSwitcher />

                        <button
                            className="md:hidden p-2 rounded-md transition-colors"
                            style={{ color: 'var(--page-text)' }}
                            onClick={() => setMobileMenuOpen(prev => !prev)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>

                        <SiteUserAvatarMenu user={user} isAdmin={auth.isAdmin} />
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden fixed top-0 left-0 right-0 z-40 flex flex-col"
                    style={{ backgroundColor: 'var(--page-bg)' }}
                >
                    <div className="flex items-center justify-between px-4 py-4 border-b" style={{ borderColor: 'var(--page-border)' }}>
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="First Team Logo" className="w-10 object-contain drop-shadow-lg rounded-full" onError={(e) => { e.currentTarget.src = 'https://placehold.co/40x40/000000/FFFFFF?text=FT'; }} />
                            <span className="text-xl font-bold tracking-widest" style={{ color: 'var(--page-text)' }}>FT</span>
                        </div>
                        <button className="p-2 rounded-md" style={{ color: 'var(--page-text)' }} onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <nav className="flex flex-col gap-2 px-6 py-8 text-lg font-bold" style={{ color: 'var(--page-text-muted)' }}>
                        <Link href={route('dashboard')} onClick={() => setMobileMenuOpen(false)} className="py-4 border-b transition-colors hover:text-[var(--page-accent)]" style={{ borderColor: 'var(--page-border)' }}>{t('nav.home') || 'Home'}</Link>
                        <Link href={route('services')} onClick={() => setMobileMenuOpen(false)} className="py-4 border-b transition-colors" style={{ color: 'var(--page-accent)', borderColor: 'var(--page-border)' }}>{t('nav.services') || 'Services'}</Link>
                        <Link href={route('dashboard') + '#about'} onClick={() => setMobileMenuOpen(false)} className="py-4 border-b transition-colors hover:text-[var(--page-accent)]" style={{ borderColor: 'var(--page-border)' }}>{t('nav.about') || 'About'}</Link>
                        <Link href={route('contact')} onClick={() => setMobileMenuOpen(false)} className="py-4 transition-colors hover:text-[var(--page-accent)]">{t('nav.contact') || 'Contact'}</Link>
                    </nav>
                </div>
            )}

            {/* Page Hero */}
            <section className="py-16 px-4 sm:px-6 text-center border-b" style={{ borderColor: 'var(--page-border)' }}>
                <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: 'var(--page-accent)' }}>
                    First Team
                </p>
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: 'var(--page-text)' }}>
                    Request a Service
                </h1>
                <p className="max-w-md mx-auto text-base leading-relaxed" style={{ color: 'var(--page-text-muted)' }}>
                    Fill in the form below and we'll get back to you as soon as possible.
                </p>
            </section>

            {/* Form */}
            <section className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

                {recentlySuccessful && (
                    <div
                        className="mb-8 flex items-center gap-3 p-5 rounded-xl border"
                        style={{ borderColor: 'var(--page-accent)', backgroundColor: 'var(--page-bg-secondary)' }}
                    >
                        <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--page-accent)' }} />
                        <p className="text-sm font-bold" style={{ color: 'var(--page-text)' }}>
                            Your request has been sent successfully. We'll contact you soon.
                        </p>
                    </div>
                )}

                <form onSubmit={submit} className="flex flex-col gap-6">

                    {/* Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--page-text-muted)' }}>
                            Full Name <span style={{ color: 'var(--page-accent)' }}>*</span>
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            placeholder="Your full name"
                            className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors"
                            style={{
                                backgroundColor: 'var(--page-bg-secondary)',
                                borderColor: errors.name ? '#ef4444' : 'var(--page-border)',
                                color: 'var(--page-text)',
                            }}
                        />
                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--page-text-muted)' }}>
                            Email Address <span style={{ color: 'var(--page-accent)' }}>*</span>
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors"
                            style={{
                                backgroundColor: 'var(--page-bg-secondary)',
                                borderColor: errors.email ? '#ef4444' : 'var(--page-border)',
                                color: 'var(--page-text)',
                            }}
                        />
                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--page-text-muted)' }}>
                            Phone Number <span style={{ color: 'var(--page-accent)' }}>*</span>
                        </label>
                        <input
                            type="tel"
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            placeholder="+20 1XX XXX XXXX"
                            className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors"
                            style={{
                                backgroundColor: 'var(--page-bg-secondary)',
                                borderColor: errors.phone ? '#ef4444' : 'var(--page-border)',
                                color: 'var(--page-text)',
                            }}
                        />
                        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                    </div>

                    {/* Service */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--page-text-muted)' }}>
                            Service <span style={{ color: 'var(--page-accent)' }}>*</span>
                        </label>
                        <select
                            value={data.service}
                            onChange={e => setData('service', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors appearance-none"
                            style={{
                                backgroundColor: 'var(--page-bg-secondary)',
                                borderColor: errors.service ? '#ef4444' : 'var(--page-border)',
                                color: data.service ? 'var(--page-text)' : 'var(--page-text-muted)',
                            }}
                        >
                            <option value="" disabled>Select a service</option>
                            <option value="Software Development">Software Development</option>
                            <option value="Hardware Engineering">Hardware Engineering</option>
                            <option value="Graphic Design & Multimedia">Graphic Design &amp; Multimedia</option>
                            <option value="Web Development">Web Development</option>
                        </select>
                        {errors.service && <p className="text-xs text-red-500">{errors.service}</p>}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--page-text-muted)' }}>
                            Project Details <span style={{ color: 'var(--page-accent)' }}>*</span>
                        </label>
                        <textarea
                            value={data.details}
                            onChange={e => setData('details', e.target.value)}
                            placeholder="Describe your project or what you need..."
                            rows={6}
                            className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors resize-none"
                            style={{
                                backgroundColor: 'var(--page-bg-secondary)',
                                borderColor: errors.details ? '#ef4444' : 'var(--page-border)',
                                color: 'var(--page-text)',
                            }}
                        />
                        {errors.details && <p className="text-xs text-red-500">{errors.details}</p>}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold tracking-widest uppercase rounded-lg transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: 'var(--page-accent)', color: 'var(--page-bg)' }}
                    >
                        <Send className="h-4 w-4" />
                        {processing ? 'Sending...' : 'Send Request'}
                    </button>

                </form>
            </section>

            {/* Footer */}
            <footer className="border-t py-10 px-4 sm:px-6" style={{ borderColor: 'var(--page-border)', backgroundColor: 'var(--page-inner-box)' }}>
                <div className="max-w-7xl mx-auto flex flex-col items-center gap-5">
                    <div className="flex items-center gap-3">
                        <img
                            src="/logo.png"
                            alt="First Team Logo"
                            className="w-6 h-6 object-contain grayscale opacity-70"
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/24x24/000000/FFFFFF?text=FT'; }}
                        />
                        <span className="text-lg font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--page-text-muted)' }}>First Team</span>
                    </div>
                    <div className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--page-text-muted)', opacity: 0.5 }}>
                        &copy; {new Date().getFullYear()} First Team. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
