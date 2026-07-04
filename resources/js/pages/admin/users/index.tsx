import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface UserRow {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    email_verified_at: string | null;
    created_at: string;
}

interface Props {
    users: UserRow[];
}

export default function AdminUsersIndex({ users }: Props) {
    const { t, locale } = useTranslation();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserRow | null>(null);
    const [deletingUser, setDeletingUser] = useState<UserRow | null>(null);

    const form = useForm({
        name: '',
        email: '',
        password: '',
        is_admin: false as boolean,
    });

    const openCreate = () => {
        setEditingUser(null);
        form.reset();
        form.clearErrors();
        setDialogOpen(true);
    };

    const openEdit = (user: UserRow) => {
        setEditingUser(user);
        form.setData({
            name: user.name,
            email: user.email,
            password: '',
            is_admin: user.is_admin,
        });
        form.clearErrors();
        setDialogOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingUser) {
            form.transform((data) => ({ ...data, _method: 'put' }));
            form.post(route('admin.users.update', editingUser.id), {
                onSuccess: () => setDialogOpen(false),
            });
        } else {
            form.transform((data) => data);
            form.post(route('admin.users.store'), {
                onSuccess: () => setDialogOpen(false),
            });
        }
    };

    const confirmDelete = () => {
        if (!deletingUser) return;
        form.delete(route('admin.users.destroy', deletingUser.id), {
            onSuccess: () => setDeletingUser(null),
            onFinish: () => setDeletingUser(null),
        });
    };

    return (
        <AdminLayout title={t('admin.users')}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--page-text)' }}>{t('admin.users')}</h2>
                <Button onClick={openCreate} style={{ backgroundColor: 'var(--page-accent)', color: 'var(--page-bg)' }}>
                    <Plus className="h-4 w-4 rtl:ml-2 ltr:mr-2" />
                    {t('admin.add_user')}
                </Button>
            </div>

            <Card style={{ backgroundColor: 'var(--page-bg-secondary)', borderColor: 'var(--page-border)' }}>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-t" style={{ borderColor: 'var(--page-border)' }}>
                                    <th className="text-start p-4 font-semibold" style={{ color: 'var(--page-text-muted)' }}>{t('admin.name')}</th>
                                    <th className="text-start p-4 font-semibold" style={{ color: 'var(--page-text-muted)' }}>{t('admin.email')}</th>
                                    <th className="text-start p-4 font-semibold" style={{ color: 'var(--page-text-muted)' }}>{t('admin.role')}</th>
                                    <th className="text-start p-4 font-semibold" style={{ color: 'var(--page-text-muted)' }}>{t('admin.joined')}</th>
                                    <th className="text-end p-4 font-semibold" style={{ color: 'var(--page-text-muted)' }}>{t('admin.actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-6 text-center" style={{ color: 'var(--page-text-muted)' }}>
                                            {t('admin.no_users')}
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((u) => (
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
                                            <td className="p-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => openEdit(u)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => setDeletingUser(u)}>
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Create / Edit dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent style={{ backgroundColor: 'var(--page-bg-secondary)', borderColor: 'var(--page-border)', color: 'var(--page-text)' }}>
                    <DialogHeader>
                        <DialogTitle>{editingUser ? t('admin.edit_user') : t('admin.add_user')}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="name">{t('admin.name')}</Label>
                            <Input
                                id="name"
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                required
                            />
                            {form.errors.name && <p className="text-xs text-red-500">{form.errors.name}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="email">{t('admin.email')}</Label>
                            <Input
                                id="email"
                                type="email"
                                value={form.data.email}
                                onChange={(e) => form.setData('email', e.target.value)}
                                required
                            />
                            {form.errors.email && <p className="text-xs text-red-500">{form.errors.email}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="password">{t('admin.password')}</Label>
                            <Input
                                id="password"
                                type="password"
                                value={form.data.password}
                                onChange={(e) => form.setData('password', e.target.value)}
                                placeholder={editingUser ? t('admin.password_hint') : ''}
                                required={!editingUser}
                            />
                            {form.errors.password && <p className="text-xs text-red-500">{form.errors.password}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="is_admin"
                                checked={form.data.is_admin}
                                onCheckedChange={(checked) => form.setData('is_admin', checked === true)}
                            />
                            <Label htmlFor="is_admin" className="cursor-pointer">{t('admin.make_admin')}</Label>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">{t('admin.cancel')}</Button>
                            </DialogClose>
                            <Button type="submit" disabled={form.processing} style={{ backgroundColor: 'var(--page-accent)', color: 'var(--page-bg)' }}>
                                {t('admin.save')}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete confirm dialog */}
            <Dialog open={!!deletingUser} onOpenChange={(open) => !open && setDeletingUser(null)}>
                <DialogContent style={{ backgroundColor: 'var(--page-bg-secondary)', borderColor: 'var(--page-border)', color: 'var(--page-text)' }}>
                    <DialogHeader>
                        <DialogTitle>{t('admin.delete_user')}</DialogTitle>
                    </DialogHeader>
                    <p style={{ color: 'var(--page-text-muted)' }}>{t('admin.confirm_delete')}</p>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">{t('admin.cancel')}</Button>
                        </DialogClose>
                        <Button type="button" onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
                            {t('admin.delete')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
