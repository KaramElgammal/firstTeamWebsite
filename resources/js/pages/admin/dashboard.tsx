import AdminLayout from '@/layouts/admin-layout';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, ShieldCheck, Newspaper, FolderKanban, Wrench } from 'lucide-react';

interface RecentUser {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    created_at: string;
}

interface Props {
    stats: {
        users: number;
        admins: number;
        news: number;
        projects: number;
        services: number;
    };
    recentUsers: RecentUser[];
}

export default function AdminDashboard({ stats, recentUsers }: Props) {
    const { t, locale } = useTranslation();

    const statCards = [
        { label: t('admin.total_users'), value: stats.users, icon: Users },
        { label: t('admin.total_admins'), value: stats.admins, icon: ShieldCheck },
        { label: t('admin.total_news'), value: stats.news, icon: Newspaper },
        { label: t('admin.total_projects'), value: stats.projects, icon: FolderKanban },
        { label: t('admin.total_services'), value: stats.services, icon: Wrench },
    ];

    return (
        <AdminLayout title={t('admin.dashboard')}>
            <div className="mb-6">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--page-text)' }}>{t('admin.overview')}</h2>
                <p className="text-sm" style={{ color: 'var(--page-text-muted)' }}>{t('admin.overview_desc')}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <Card
                            key={card.label}
                            style={{ backgroundColor: 'var(--page-bg-secondary)', borderColor: 'var(--page-border)' }}
                        >
                            <CardContent className="p-4 flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <Icon className="h-5 w-5" style={{ color: 'var(--page-accent)' }} />
                                    <span className="text-2xl font-extrabold" style={{ color: 'var(--page-text)' }}>{card.value}</span>
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--page-text-muted)' }}>
                                    {card.label}
                                </span>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Recent Users */}
            <Card style={{ backgroundColor: 'var(--page-bg-secondary)', borderColor: 'var(--page-border)' }}>
                <CardHeader>
                    <CardTitle style={{ color: 'var(--page-text)' }}>{t('admin.recent_users')}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-t" style={{ borderColor: 'var(--page-border)' }}>
                                    <th className="text-start p-4 font-semibold" style={{ color: 'var(--page-text-muted)' }}>{t('admin.name')}</th>
                                    <th className="text-start p-4 font-semibold" style={{ color: 'var(--page-text-muted)' }}>{t('admin.email')}</th>
                                    <th className="text-start p-4 font-semibold" style={{ color: 'var(--page-text-muted)' }}>{t('admin.role')}</th>
                                    <th className="text-start p-4 font-semibold" style={{ color: 'var(--page-text-muted)' }}>{t('admin.joined')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-6 text-center" style={{ color: 'var(--page-text-muted)' }}>
                                            {t('admin.no_users')}
                                        </td>
                                    </tr>
                                ) : (
                                    recentUsers.map((u) => (
                                        <tr key={u.id} className="border-t" style={{ borderColor: 'var(--page-border)' }}>
                                            <td className="p-4 font-medium" style={{ color: 'var(--page-text)' }}>{u.name}</td>
                                            <td className="p-4" style={{ color: 'var(--page-text-muted)' }}>{u.email}</td>
                                            <td className="p-4">
                                                <Badge variant={u.is_admin ? 'default' : 'secondary'}>
                                                    {u.is_admin ? t('admin.admin_badge') : t('admin.user_badge')}
                                                </Badge>
                                            </td>
                                            <td className="p-4" style={{ color: 'var(--page-text-muted)' }}>
                                                {new Date(u.created_at).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US')}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
