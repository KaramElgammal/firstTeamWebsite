import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation';

const getSidebarNavItems = (t: any): NavItem[] => [
    {
        title: t('settings.profile') || 'Profile',
        url: '/settings/profile',
        icon: null,
    },
    {
        title: t('settings.password') || 'Password',
        url: '/settings/password',
        icon: null,
    },
    {
        title: t('settings.appearance') || 'Appearance',
        url: '/settings/appearance',
        icon: null,
    },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const currentPath = window.location.pathname;
    const { t } = useTranslation();
    const sidebarNavItems = getSidebarNavItems(t);

    return (
        <div className="px-4 py-6 bg-[#171110] rounded-2xl shadow-2xl border border-white/5 text-start">
            <div className="mb-8 border-b border-white/5 pb-4">
                <h1 className="text-2xl font-bold text-white tracking-wide">{t('settings.title') || 'Settings'}</h1>
                <p className="text-[#a39997] text-sm mt-1">{t('settings.desc') || 'Manage your profile and account settings'}</p>
            </div>

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:gap-12">
                <aside className="w-full max-w-xl lg:w-56">
                    <nav className="flex flex-col space-y-2">
                        {sidebarNavItems.map((item) => (
                            <Link 
                                key={item.url}
                                href={item.url} 
                                prefetch
                                className={cn('px-4 py-2.5 rounded-lg text-sm font-medium transition-all w-full text-start', {
                                    'bg-[#6b0f0f] text-white shadow-lg': currentPath === item.url,
                                    'text-[#a39997] hover:text-[#f3b8b1] hover:bg-white/5': currentPath !== item.url,
                                })}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 md:hidden bg-white/10" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12
                        [&_label]:text-[#f3b8b1] [&_label]:font-medium
                        [&_input]:bg-[#110c0b] [&_input]:border-[#f3b8b1]/30 [&_input]:text-white [&_input]:placeholder:text-[#a39997]/50
                        focus-within:[&_input]:border-[#f3b8b1] focus-within:[&_input]:ring-1 focus-within:[&_input]:ring-[#f3b8b1]
                        [&_button]:bg-[#6b0f0f] [&_button]:text-white [&_button]:hover:bg-[#8b1414] [&_button]:font-bold [&_button]:border-none [&_button]:shadow-lg
                        [&_.text-muted-foreground]:text-[#a39997]
                        [&_h2]:text-white [&_p]:text-[#a39997]
                    ">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
