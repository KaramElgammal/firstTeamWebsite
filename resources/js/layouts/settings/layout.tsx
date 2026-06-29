import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation';

const getSidebarNavItems = (t: any): NavItem[] => [
    { title: t('settings.profile') || 'Profile', url: '/settings/profile', icon: null },
    { title: t('settings.password') || 'Password', url: '/settings/password', icon: null },
    { title: t('settings.appearance') || 'Appearance', url: '/settings/appearance', icon: null },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const currentPath = window.location.pathname;
    const { t } = useTranslation();
    const sidebarNavItems = getSidebarNavItems(t);

    return (
        <div
            className="px-4 py-6 rounded-2xl shadow-2xl border text-start"
            style={{ backgroundColor: 'var(--page-bg-secondary)', borderColor: 'var(--page-border)' }}
        >
            <div className="mb-8 border-b pb-4" style={{ borderColor: 'var(--page-border)' }}>
                <h1 className="text-2xl font-bold tracking-wide" style={{ color: 'var(--page-text)' }}>{t('settings.title') || 'Settings'}</h1>
                <p className="text-sm mt-1" style={{ color: 'var(--page-text-muted)' }}>{t('settings.desc') || 'Manage your profile and account settings'}</p>
            </div>

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:gap-12">
                <aside className="w-full max-w-xl lg:w-56">
                    <nav className="flex flex-col space-y-2">
                        {sidebarNavItems.map((item) => (
                            <Link 
                                key={item.url}
                                href={item.url} 
                                prefetch
                                className={cn('px-4 py-2.5 rounded-lg text-sm font-medium transition-all w-full text-start')}
                                style={currentPath === item.url
                                    ? { backgroundColor: 'var(--page-btn-bg)', color: 'var(--page-text)', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }
                                    : { color: 'var(--page-text-muted)' }
                                }
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 md:hidden" style={{ backgroundColor: 'var(--page-border)' }} />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">
                        <style>{`
                            .settings-scope label { color: var(--page-accent); font-weight: 500; }
                            .settings-scope input { background-color: var(--page-inner-box); border-color: var(--page-border); color: var(--page-text); }
                            .settings-scope input:focus { border-color: var(--page-accent); box-shadow: 0 0 0 1px var(--page-accent); }
                            .settings-scope input::placeholder { color: var(--page-text-muted); opacity: 0.6; }
                            .settings-scope button { background-color: var(--page-btn-bg); color: white; font-weight: bold; border: none; }
                            .settings-scope button:hover { background-color: var(--page-btn-hover); }
                            .settings-scope .text-muted-foreground { color: var(--page-text-muted); }
                            .settings-scope h2, .settings-scope h3 { color: var(--page-text); }
                            .settings-scope p { color: var(--page-text-muted); }
                        `}</style>
                        <div className="settings-scope">
                            {children}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
