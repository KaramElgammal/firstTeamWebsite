import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import ThemeToggle from '@/components/theme-toggle';
import { useTranslation } from '@/hooks/useTranslation';
import { useState } from 'react';
import SiteUserAvatarMenu from '@/components/site-user-avatar-menu';
import {
    Menu, X, CodeXml, Cpu, Box, Bot, MonitorIcon, PaletteIcon, ArrowRight,
    type LucideIcon,
} from 'lucide-react';

interface ServiceItem {
    id: number;
    icon: string;
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
    image: string | null;
    request_route: string;
    sort_order: number | null;
}

interface Props {
    services: ServiceItem[];
}

const iconMap: Record<string, LucideIcon> = {
    CodeXml,
    Cpu,
    Box,
    Bot,
    MonitorIcon,
    PaletteIcon,
};

export default function Services({ services }: Props) {
    const { auth } = usePage<SharedData>().props;
    const { t, locale } = useTranslation();
    const user = auth.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: 'var(--page-bg)', color: 'var(--page-text)' }}>
            <Head title={t('services.page_title')} />

            {/* ── Header ── */}
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

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-bold" style={{ color: 'var(--page-text-muted)' }}>
                        <Link href={route('dashboard')} className="transition-colors hover:text-[var(--page-accent)]">{t('nav.home') || 'Home'}</Link>
                        <Link href={route('services')} className="transition-colors border-b-2 pb-1" style={{ color: 'var(--page-text)', borderColor: 'var(--page-accent)' }}>{t('nav.services') || 'Services'}</Link>
                        <Link href={route('dashboard') + '#about'} className="transition-colors hover:text-[var(--page-accent)]">{t('nav.about') || 'About'}</Link>
                        <Link href={route('contact')} className="transition-colors hover:text-[var(--page-accent)]">{t('nav.contact') || 'Contact'}</Link>
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <ThemeToggle />
                        <LanguageSwitcher />

                        {/* Hamburger */}
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

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden fixed top-0 left-0 right-0 z-40 flex flex-col"
                    style={{ backgroundColor: 'var(--page-bg)' }}
                >
                    <div
                        className="flex items-center justify-between px-4 py-4 border-b"
                        style={{ borderColor: 'var(--page-border)' }}
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src="/logo.png"
                                alt="First Team Logo"
                                className="w-10 object-contain drop-shadow-lg rounded-full"
                                onError={(e) => { e.currentTarget.src = 'https://placehold.co/40x40/000000/FFFFFF?text=FT'; }}
                            />
                            <span className="text-xl font-bold tracking-widest" style={{ color: 'var(--page-text)' }}>FT</span>
                        </div>
                        <button
                            className="p-2 rounded-md"
                            style={{ color: 'var(--page-text)' }}
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
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

            {/* ── Page Hero ── */}
            <section className="py-20 px-4 sm:px-6 text-center border-b" style={{ borderColor: 'var(--page-border)' }}>
                <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: 'var(--page-accent)' }}>
                    {t('services.page_subtitle')}
                </p>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6" style={{ color: 'var(--page-text)' }}>
                    {t('services.page_heading')}
                </h1>
                <p className="max-w-xl mx-auto text-base sm:text-lg leading-relaxed" style={{ color: 'var(--page-text-muted)' }}>
                    {t('services.page_desc')}
                </p>
            </section>

            {/* ── Services Grid ── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {services.map((service, idx) => {
                        const Icon = iconMap[service.icon] || CodeXml;
                        const isFeatured = idx === 0;
                        const title = locale === 'ar' ? service.title_ar : service.title_en;
                        const description = locale === 'ar' ? service.description_ar : service.description_en;
                        const requestHref = service.request_route === 'service-request'
                            ? route('service-request') + '?service=' + encodeURIComponent(service.title_en)
                            : route(service.request_route);

                        if (isFeatured) {
                            return (
                                <div
                                    key={service.id}
                                    className="lg:col-span-2 relative rounded-2xl overflow-hidden border min-h-[340px] flex flex-col justify-end p-8 group"
                                    style={{ borderColor: 'var(--page-border)', backgroundColor: 'var(--page-bg-secondary)' }}
                                >
                                    {service.image && (
                                        <img
                                            src={service.image}
                                            alt={title}
                                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                                        />
                                    )}
                                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--page-bg) 30%, transparent)' }} />
                                    <div className="relative z-10">
                                        <div className="mb-4 w-10 h-10 flex items-center justify-center rounded border" style={{ borderColor: 'var(--page-accent)', backgroundColor: 'var(--page-inner-box)' }}>
                                            <Icon className="h-5 w-5" style={{ color: 'var(--page-accent)' }} />
                                        </div>
                                        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'var(--page-text)' }}>
                                            {title}
                                        </h2>
                                        <p className="text-sm leading-relaxed mb-5 max-w-md whitespace-pre-line" style={{ color: 'var(--page-text-muted)' }}>
                                            {description}
                                        </p>
                                        <Link
                                            href={requestHref}
                                            className="mt-5 inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-widest uppercase rounded transition-all duration-200 hover:opacity-90 hover:gap-3"
                                            style={{ backgroundColor: 'var(--page-accent)', color: 'var(--page-bg)' }}
                                        >
                                            {t('services.cta_btn1')} <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div
                                key={service.id}
                                className="rounded-2xl border p-7 flex flex-col gap-4"
                                style={{ borderColor: 'var(--page-border)', backgroundColor: 'var(--page-bg-secondary)' }}
                            >
                                <div className="w-10 h-10 flex items-center justify-center rounded border" style={{ borderColor: 'var(--page-accent)', backgroundColor: 'var(--page-inner-box)' }}>
                                    <Icon className="h-5 w-5" style={{ color: 'var(--page-accent)' }} />
                                </div>
                                <h2 className="text-2xl font-bold" style={{ color: 'var(--page-text)' }}>{title}</h2>
                                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--page-text-muted)' }}>
                                    {description}
                                </p>
                                {service.image && (
                                    <img
                                        src={service.image}
                                        alt={title}
                                        className="w-full object-cover rounded-lg transition-opacity duration-500 mt-auto"
                                    />
                                )}
                                <Link
                                    href={requestHref}
                                    className="mt-5 inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-widest uppercase rounded transition-all duration-200 hover:opacity-90 hover:gap-3"
                                    style={{ backgroundColor: 'var(--page-accent)', color: 'var(--page-bg)' }}
                                >
                                    {t('services.cta_btn1')} <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="border-t py-20 px-4 sm:px-6 text-center" style={{ borderColor: 'var(--page-border)' }}>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'var(--page-text)' }}>{t('services.cta_title')}</h2>
                <p className="max-w-md mx-auto text-base mb-10" style={{ color: 'var(--page-text-muted)' }}>
                    {t('services.cta_desc')}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href={route('projects')}
                        className="w-full sm:w-auto px-8 py-3 text-sm font-bold tracking-widest uppercase border transition-colors"
                        style={{ borderColor: 'var(--page-border)', color: 'var(--page-text-muted)', backgroundColor: 'transparent' }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.borderColor = 'var(--page-text)';
                            (e.currentTarget as HTMLElement).style.color = 'var(--page-text)';
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.borderColor = 'var(--page-border)';
                            (e.currentTarget as HTMLElement).style.color = 'var(--page-text-muted)';
                        }}
                    >
                        {t('services.cta_btn2')}
                    </Link>
                </div>
            </section>

            {/* ── Footer ── */}
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
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--page-text-muted)' }}>
                        <a href="#" className="transition-colors hover:text-[var(--page-text)]">{t('footer.privacy_policy')}</a>
                        <a href="#" className="transition-colors hover:text-[var(--page-text)]">{t('footer.terms_service')}</a>
                        <Link href={route('contact')} className="transition-colors hover:text-[var(--page-text)]">{t('footer.contact')}</Link>
                    </div>
                    {/* Social Links */}
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
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
                    <div className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--page-text-muted)', opacity: 0.5 }}>
                        &copy; {new Date().getFullYear()} {t('footer.rights')}
                    </div>
                </div>
            </footer>
        </div>
    );
}
