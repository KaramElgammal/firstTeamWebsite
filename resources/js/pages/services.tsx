import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import ThemeToggle from '@/components/theme-toggle';
import { useTranslation } from '@/hooks/useTranslation';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut, Menu, X, CodeXml, Cpu, Box, Bot, MonitorIcon, PaletteIcon, ArrowRight } from 'lucide-react';

export default function Services() {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();
    const user = auth.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const getInitials = (name: string) =>
        name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

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

                        <DropdownMenu>
                            <DropdownMenuTrigger className="focus:outline-none">
                                <Avatar
                                    className="h-10 w-10 border-2 transition-colors cursor-pointer"
                                    style={{ borderColor: 'var(--page-border)', backgroundColor: 'var(--page-bg-secondary)' }}
                                >
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=6b0f0f&textColor=f3b8b1`} alt={user.name} />
                                    <AvatarFallback className="font-bold" style={{ backgroundColor: 'var(--page-btn-bg)', color: 'var(--page-accent)' }}>
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-56 shadow-2xl border"
                                style={{ backgroundColor: 'var(--page-bg-secondary)', borderColor: 'var(--page-border)', color: 'var(--page-text)' }}
                            >
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none" style={{ color: 'var(--page-text)' }}>{user.name}</p>
                                        <p className="text-xs leading-none" style={{ color: 'var(--page-text-muted)' }}>{user.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator style={{ backgroundColor: 'var(--page-border)' }} />
                                <DropdownMenuItem asChild className="cursor-pointer">
                                    <Link href={route('profile.edit')} className="flex items-center w-full">
                                        <User className="rtl:ml-2 ltr:mr-2 h-4 w-4" style={{ color: 'var(--page-accent)' }} />
                                        <span>{t('nav.my_profile')}</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator style={{ backgroundColor: 'var(--page-border)' }} />
                                <DropdownMenuItem asChild className="text-red-500 cursor-pointer">
                                    <Link href={route('logout')} method="post" as="button" className="flex items-center w-full">
                                        <LogOut className="rtl:ml-2 ltr:mr-2 h-4 w-4" />
                                        <span>{t('nav.log_out')}</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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

                    {/* Software Development – large card */}
                    <div
                        className="lg:col-span-2 relative rounded-2xl overflow-hidden border min-h-[340px] flex flex-col justify-end p-8 group"
                        style={{ borderColor: 'var(--page-border)', backgroundColor: 'var(--page-bg-secondary)' }}
                    >
                        {/* background image */}
                        <img
                            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400&auto=format&fit=crop"
                            alt="Software Development"
                            className="absolute inset-0 w-full h-full object-cover  transition-opacity duration-500"
                        />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--page-bg) 30%, transparent)' }} />
                        <div className="relative z-10">
                            <div className="mb-4 w-10 h-10 flex items-center justify-center rounded border" style={{ borderColor: 'var(--page-accent)', backgroundColor: 'var(--page-inner-box)' }}>
                                <CodeXml className="h-5 w-5" style={{ color: 'var(--page-accent)' }} />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'var(--page-text)' }}>
                                {t('services.sw_title')}
                            </h2>
                            <p className="text-sm leading-relaxed mb-5 max-w-md" style={{ color: 'var(--page-text-muted)' }}>
                                {t('services.sw_desc')}
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {[t('services.sw_tag1'), t('services.sw_tag2')].map(tag => (
                                    <span key={tag} className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded border" style={{ borderColor: 'var(--page-border)', color: 'var(--page-text-muted)', backgroundColor: 'var(--page-inner-box)' }}>{tag}</span>
                                ))}
                            </div>
                            <Link
                                href={route('service-request') + '?service=Software+Development'}
                                className="mt-5 inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-widest uppercase rounded transition-all duration-200 hover:opacity-90 hover:gap-3"
                                style={{ backgroundColor: 'var(--page-accent)', color: 'var(--page-bg)' }}
                            >
                                Request Service <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Hardware Solutions */}
                    <div
                        className="rounded-2xl border p-7 flex flex-col gap-4"
                        style={{ borderColor: 'var(--page-border)', backgroundColor: 'var(--page-bg-secondary)' }}
                    >
                        <div className="w-10 h-10 flex items-center justify-center rounded border" style={{ borderColor: 'var(--page-accent)', backgroundColor: 'var(--page-inner-box)' }}>
                            <Cpu className="h-5 w-5" style={{ color: 'var(--page-accent)' }} />
                        </div>
                        <h2 className="text-2xl font-bold" style={{ color: 'var(--page-text)' }}>{t('services.hw_title')}</h2>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--page-text-muted)' }}>
                            {t('services.hw_desc')}
                        </p>
                        <ul className="mt-auto space-y-2">
                            {[t('services.hw_item1'), t('services.hw_item2'), t('services.hw_item3')].map(item => (
                                <li key={item} className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--page-text-muted)' }}>
                                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--page-accent)' }} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link
                            href={route('service-request') + '?service=Hardware+Engineering'}
                            className="mt-5 inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-widest uppercase rounded transition-all duration-200 hover:opacity-90 hover:gap-3"
                            style={{ backgroundColor: 'var(--page-accent)', color: 'var(--page-bg)' }}
                        >
                            Request Service <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* 3D Modeling */}
                    <div
                        className="rounded-2xl border p-7 flex flex-col gap-4 relative overflow-hidden group"
                        style={{ borderColor: 'var(--page-border)', backgroundColor: 'var(--page-bg-secondary)' }}
                    >
                        <div className="w-10 h-10 flex items-center justify-center rounded border" style={{ borderColor: 'var(--page-accent)', backgroundColor: 'var(--page-inner-box)' }}>
                            <Box className="h-5 w-5" style={{ color: 'var(--page-accent)' }} />
                        </div>
                        <h2 className="text-2xl font-bold" style={{ color: 'var(--page-text)' }}>{t('services.3d_title_page')}</h2>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--page-text-muted)' }}>
                            {t('services.3d_desc_page')}
                        </p>
                        <img
                            src="/medical1.png"
                            alt="3D Printing"
                            className="w-full object-cover rounded-lg transition-opacity duration-500 mt-auto"
                        />
                        <Link
                            href={route('3d-request')}
                            className="mt-5 inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-widest uppercase rounded transition-all duration-200 hover:opacity-90 hover:gap-3"
                            style={{ backgroundColor: 'var(--page-accent)', color: 'var(--page-bg)' }}
                        >
                            Request Service <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Robotics – large card */}
                    <div
                        className="lg:col-span-1 rounded-2xl border p-7 flex flex-col gap-4 relative overflow-hidden group"
                        style={{ borderColor: 'var(--page-border)', backgroundColor: 'var(--page-bg-secondary)' }}
                    >
                        <div className="w-10 h-10 flex items-center justify-center rounded border" style={{ borderColor: 'var(--page-accent)', backgroundColor: 'var(--page-inner-box)' }}>
                            <Bot className="h-5 w-5" style={{ color: 'var(--page-accent)' }} />
                        </div>
                        <h2 className="text-3xl font-extrabold leading-tight" style={{ color: 'var(--page-text)' }}>{t('services.robotics_title_page')}</h2>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--page-text-muted)' }}>
                            {t('services.robotics_desc_page')}
                        </p>
                        <img
                            src="/dron1.jpg"
                            alt="Robotics"
                            className="w-full object-cover rounded-lg  transition-opacity duration-500 mt-auto"
                        />
                        <Link
                            href={route('robotics-request')}
                            className="mt-5 inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-widest uppercase rounded transition-all duration-200 hover:opacity-90 hover:gap-3"
                            style={{ backgroundColor: 'var(--page-accent)', color: 'var(--page-bg)' }}
                        >
                            Request Service <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Graphic Design */}
                    <div
                        className="rounded-2xl border p-7 flex flex-col gap-4"
                        style={{ borderColor: 'var(--page-border)', backgroundColor: 'var(--page-bg-secondary)' }}
                    >
                        <div className="w-10 h-10 flex items-center justify-center rounded border" style={{ borderColor: 'var(--page-accent)', backgroundColor: 'var(--page-inner-box)' }}>
                            <PaletteIcon className="h-5 w-5" style={{ color: 'var(--page-accent)' }} />
                        </div>
                        <h2 className="text-2xl font-bold" style={{ color: 'var(--page-text)' }}>{t('services.graphic_title_page')}</h2>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--page-text-muted)' }}>
                            {t('services.graphic_desc_page')}
                        </p>
                        <div className="mt-auto">
                            <img
                                src="/logo.png"
                                alt="Design"
                                className="w-20 h-20 object-contain mx-auto"
                                onError={(e) => { e.currentTarget.src = 'https://placehold.co/80x80/1a1a1a/FFFFFF?text=FT'; }}
                            />
                            <p className="text-center text-[10px] tracking-widest uppercase mt-2" style={{ color: 'var(--page-accent)' }}>{t('services.design_label')}</p>
                        </div>
                        <Link
                            href={route('service-request') + '?service=Graphic+Design+%26+Multimedia'}
                            className="mt-5 inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-widest uppercase rounded transition-all duration-200 hover:opacity-90 hover:gap-3"
                            style={{ backgroundColor: 'var(--page-accent)', color: 'var(--page-bg)' }}
                        >
                            Request Service <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Web Development */}
                    <div
                        className="rounded-2xl border p-7 flex flex-col gap-4"
                        style={{ borderColor: 'var(--page-border)', backgroundColor: 'var(--page-bg-secondary)' }}
                    >
                        <div className="w-10 h-10 flex items-center justify-center rounded border" style={{ borderColor: 'var(--page-accent)', backgroundColor: 'var(--page-inner-box)' }}>
                            <MonitorIcon className="h-5 w-5" style={{ color: 'var(--page-accent)' }} />
                        </div>
                        <h2 className="text-2xl font-bold" style={{ color: 'var(--page-text)' }}>{t('services.web_title_page')}</h2>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--page-text-muted)' }}>
                            {t('services.web_desc_page')}
                        </p>
                        <ul className="mt-auto space-y-2">
                            {[t('services.web_item1'), t('services.web_item2'), t('services.web_item3')].map(item => (
                                <li key={item} className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--page-text-muted)' }}>
                                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--page-accent)' }} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link
                            href={route('service-request') + '?service=Web+Development'}
                            className="mt-5 inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-widest uppercase rounded transition-all duration-200 hover:opacity-90 hover:gap-3"
                            style={{ backgroundColor: 'var(--page-accent)', color: 'var(--page-bg)' }}
                        >
                            Request Service <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

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
                    <div className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--page-text-muted)', opacity: 0.5 }}>
                        &copy; {new Date().getFullYear()} {t('footer.rights')}
                    </div>
                </div>
            </footer>
        </div>
    );
}
