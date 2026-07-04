import { useTranslation } from '@/hooks/useTranslation';
import { Link } from '@inertiajs/react';

interface SiteAdminLinkProps {
    className?: string;
    onClick?: () => void;
}

export default function SiteAdminLink({ className, onClick }: SiteAdminLinkProps) {
    const { t } = useTranslation();

    return (
        <Link
            href={route('admin.dashboard')}
            onClick={onClick}
            className={className ?? 'font-semibold transition duration-300 ease-in-out px-3 py-1.5 sm:px-4 sm:py-2 rounded-md border text-sm sm:text-base'}
            style={{ color: 'var(--page-text)', borderColor: 'var(--page-border)' }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--page-accent)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--page-accent)';
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--page-text)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--page-border)';
            }}
        >
            {t('admin.panel')}
        </Link>
    );
}
