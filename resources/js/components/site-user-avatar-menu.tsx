import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslation } from '@/hooks/useTranslation';
import { type User } from '@/types';
import { Link } from '@inertiajs/react';
import { LogOut, ShieldCheck, User as UserIcon } from 'lucide-react';

interface SiteUserAvatarMenuProps {
    user: User;
    isAdmin?: boolean;
}

function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

export default function SiteUserAvatarMenu({ user, isAdmin = false }: SiteUserAvatarMenuProps) {
    const { t } = useTranslation();

    return (
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
                        <UserIcon className="rtl:ml-2 ltr:mr-2 h-4 w-4" style={{ color: 'var(--page-accent)' }} />
                        <span>{t('nav.my_profile')}</span>
                    </Link>
                </DropdownMenuItem>
                {isAdmin && (
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href={route('admin.dashboard')} className="flex items-center w-full">
                            <ShieldCheck className="rtl:ml-2 ltr:mr-2 h-4 w-4" style={{ color: 'var(--page-accent)' }} />
                            <span>{t('admin.panel')}</span>
                        </Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator style={{ backgroundColor: 'var(--page-border)' }} />
                <DropdownMenuItem asChild className="text-red-500 cursor-pointer">
                    <Link href={route('logout')} method="post" as="button" className="flex items-center w-full">
                        <LogOut className="rtl:ml-2 ltr:mr-2 h-4 w-4" />
                        <span>{t('nav.log_out')}</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
