import { type BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import ThemeToggle from '@/components/theme-toggle';
import { useTranslation } from '@/hooks/useTranslation';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut } from 'lucide-react';

interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();
    const user = auth.user;

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
        <div
            className="min-h-screen font-sans"
            style={{
                backgroundColor: 'var(--page-bg)',
                color: 'var(--page-text)',
                '--tw-selection-bg': 'var(--page-selection-bg)',
            } as React.CSSProperties}
        >
            {/* Header */}
            <header
                className="sticky top-0 z-50 backdrop-blur-md border-b"
                style={{
                    backgroundColor: 'var(--page-header-bg)',
                    borderColor: 'var(--page-border)',
                }}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href={route('dashboard')} className="flex items-center gap-3">
                        <img 
                            src="/logo.png" 
                            alt="First Team Logo" 
                            className="w-10 h-10 object-contain drop-shadow-lg"
                            onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/40x40/000000/FFFFFF?text=FT';
                            }}
                        />
                        <span className="text-xl font-bold tracking-widest" style={{ color: 'var(--page-text)' }}>FT</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <LanguageSwitcher />

                        <DropdownMenu>
                            <DropdownMenuTrigger className="focus:outline-none">
                                <Avatar
                                    className="h-10 w-10 border-2 transition-colors cursor-pointer"
                                    style={{
                                        borderColor: 'var(--page-border)',
                                        backgroundColor: 'var(--page-bg-secondary)',
                                    }}
                                >
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=6b0f0f&textColor=f3b8b1`} alt={user.name} />
                                    <AvatarFallback
                                        className="font-bold"
                                        style={{
                                            backgroundColor: 'var(--page-btn-bg)',
                                            color: 'var(--page-accent)',
                                        }}
                                    >
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-56 shadow-2xl border"
                                style={{
                                    backgroundColor: 'var(--page-bg-secondary)',
                                    borderColor: 'var(--page-border)',
                                    color: 'var(--page-text)',
                                }}
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

            <main className="max-w-7xl mx-auto px-6 py-12">
                {children}
            </main>
        </div>
    );
}
