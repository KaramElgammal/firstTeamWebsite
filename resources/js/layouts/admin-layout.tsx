import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import ThemeToggle from '@/components/theme-toggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LayoutDashboard, Users, Newspaper, FolderKanban, Wrench, ArrowLeft, User, LogOut, Menu, X } from 'lucide-react';
import { ReactNode, useState } from 'react';

export default function AdminLayout({ children, title }: { children: ReactNode; title: string }) {
    const { auth } = usePage<SharedData>().props;
    const { t, locale } = useTranslation();
    const user = auth.user;
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const getInitials = (name: string) =>
        name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    const navItems = [
        { href: route('admin.dashboard'), label: t('admin.dashboard'), icon: LayoutDashboard, active: route().current('admin.dashboard') },
        { href: route('admin.users.index'), label: t('admin.users'), icon: Users, active: route().current('admin.users.*') },
        { href: route('admin.news.index'), label: t('admin.news'), icon: Newspaper, active: route().current('admin.news.*') },
        { href: route('admin.projects.index'), label: t('admin.projects'), icon: FolderKanban, active: route().current('admin.projects.*') },
        { href: route('admin.services.index'), label: t('admin.services'), icon: Wrench, active: route().current('admin.services.*') },
    ];

    const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
        <>
            {navItems.map((item) => {
                const Icon = item.icon;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                        style={{
                            backgroundColor: item.active ? 'var(--page-accent)' : 'transparent',
                            color: item.active ? 'var(--page-bg)' : 'var(--page-text-muted)',
                        }}
                        onMouseEnter={(e) => {
                            if (!item.active) (e.currentTarget as HTMLElement).style.backgroundColor = 'color-mix(in srgb, var(--page-accent) 12%, transparent)';
                        }}
                        onMouseLeave={(e) => {
                            if (!item.active) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                        }}
                    >
                        <Icon className="h-4 w-4 shrink-0" />
                        {item.label}
                    </Link>
                );
            })}
            <div className="h-px my-2" style={{ backgroundColor: 'var(--page-border)' }} />
            <Link
                href={route('dashboard')}
                onClick={onNavigate}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                style={{ color: 'var(--page-text-muted)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--page-accent)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--page-text-muted)'; }}
            >
                <ArrowLeft className="h-4 w-4 shrink-0 rtl:rotate-180" />
                {t('admin.back_to_site')}
            </Link>
        </>
    );

    return (
        <div
            className="min-h-screen font-sans flex"
            style={{ backgroundColor: 'var(--page-bg)', color: 'var(--page-text)' }}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
        >
            <Head title={`${title} — ${t('admin.panel')}`} />

            {/* Sidebar (desktop) */}
            <aside
                className="w-64 shrink-0 border-e hidden md:flex flex-col"
                style={{ borderColor: 'var(--page-border)', backgroundColor: 'var(--page-bg-secondary)' }}
            >
                <div className="p-5 flex items-center gap-3 border-b" style={{ borderColor: 'var(--page-border)' }}>
                    <img
                        src="/logo.png"
                        alt="First Team Logo"
                        className="w-9 h-9 rounded-lg object-contain"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <span className="font-extrabold tracking-widest text-sm" style={{ color: 'var(--page-accent)' }}>
                        {t('admin.panel')}
                    </span>
                </div>
                <nav className="flex-1 p-3 flex flex-col gap-1">
                    <NavLinks />
                </nav>
            </aside>

            {/* Mobile nav overlay */}
            {mobileNavOpen && (
                <div className="md:hidden fixed inset-0 z-40 flex flex-col" style={{ backgroundColor: 'var(--page-bg)' }}>
                    <div className="flex items-center justify-between px-4 py-4 border-b" style={{ borderColor: 'var(--page-border)' }}>
                        <span className="font-extrabold tracking-widest text-sm" style={{ color: 'var(--page-accent)' }}>
                            {t('admin.panel')}
                        </span>
                        <button
                            className="p-2 rounded-md"
                            style={{ color: 'var(--page-text)' }}
                            onClick={() => setMobileNavOpen(false)}
                            aria-label="Close menu"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <nav className="flex-1 p-3 flex flex-col gap-1">
                        <NavLinks onNavigate={() => setMobileNavOpen(false)} />
                    </nav>
                </div>
            )}

            {/* Main column */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header
                    className="sticky top-0 z-30 backdrop-blur-md border-b"
                    style={{ backgroundColor: 'var(--page-header-bg)', borderColor: 'var(--page-border)' }}
                >
                    <div className="px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                            <button
                                className="md:hidden p-2 rounded-md transition-colors shrink-0"
                                style={{ color: 'var(--page-text)' }}
                                onClick={() => setMobileNavOpen(true)}
                                aria-label="Open menu"
                            >
                                <Menu className="h-5 w-5" />
                            </button>
                            <h1 className="text-lg sm:text-xl font-bold truncate" style={{ color: 'var(--page-text)' }}>
                                {title}
                            </h1>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                            <ThemeToggle />
                            <LanguageSwitcher />

                            <DropdownMenu>
                                <DropdownMenuTrigger className="focus:outline-none">
                                    <Avatar
                                        className="h-9 w-9 border-2 transition-colors cursor-pointer"
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

                {/* Page content */}
                <main className="flex-1 p-4 sm:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
