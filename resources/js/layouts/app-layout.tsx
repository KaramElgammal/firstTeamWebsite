import { type BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
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
        <div className="min-h-screen bg-[#110c0b] text-[#ffffff] font-sans selection:bg-[#f3b8b1] selection:text-[#171110]">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#110c0b]/90 backdrop-blur-md border-b border-white/5">
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
                        <span className="text-xl font-bold tracking-widest text-white">FT</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />

                        <DropdownMenu>
                            <DropdownMenuTrigger className="focus:outline-none">
                                <Avatar className="h-10 w-10 border-2 border-[#f3b8b1]/30 hover:border-[#f3b8b1] transition-colors cursor-pointer bg-[#251c1a]">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=6b0f0f&textColor=f3b8b1`} alt={user.name} />
                                    <AvatarFallback className="bg-[#6b0f0f] text-[#f3b8b1] font-bold">
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-[#251c1a] border-[#f3b8b1]/20 text-white shadow-2xl">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none text-white">{user.name}</p>
                                        <p className="text-xs leading-none text-[#a39997]">{user.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem asChild className="hover:bg-[#f3b8b1]/10 focus:bg-[#f3b8b1]/10 focus:text-white cursor-pointer">
                                    <Link href={route('profile.edit')} className="flex items-center w-full">
                                        <User className="rtl:ml-2 ltr:mr-2 h-4 w-4 text-[#f3b8b1]" />
                                        <span>{t('nav.my_profile')}</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem asChild className="text-red-400 hover:bg-red-400/10 focus:bg-red-400/10 focus:text-red-400 cursor-pointer">
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
