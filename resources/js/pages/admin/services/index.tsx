import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface ServiceRow {
    id: number;
    icon: string;
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
    image: string | null;
    request_route: string;
    sort_order: number | null;
}

interface Props {
    items: ServiceRow[];
    requestRoutes: string[];
}

const emptyForm = {
    icon: '',
    title_en: '',
    title_ar: '',
    description_en: '',
    description_ar: '',
    request_route: '',
    sort_order: '' as string | number,
    image: null as File | null,
};

export default function AdminServicesIndex({ items, requestRoutes }: Props) {
    const { t } = useTranslation();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ServiceRow | null>(null);
    const [deletingItem, setDeletingItem] = useState<ServiceRow | null>(null);

    const form = useForm(emptyForm);

    const openCreate = () => {
        setEditingItem(null);
        form.reset();
        form.clearErrors();
        setDialogOpen(true);
    };

    const openEdit = (item: ServiceRow) => {
        setEditingItem(item);
        form.setData({
            icon: item.icon,
            title_en: item.title_en,
            title_ar: item.title_ar,
            description_en: item.description_en,
            description_ar: item.description_ar,
            request_route: item.request_route,
            sort_order: item.sort_order ?? '',
            image: null,
        });
        form.clearErrors();
        setDialogOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            form.transform((data) => ({ ...data, _method: 'put' }));
            form.post(route('admin.services.update', editingItem.id), {
                forceFormData: true,
                onSuccess: () => setDialogOpen(false),
            });
        } else {
            form.transform((data) => data);
            form.post(route('admin.services.store'), {
                forceFormData: true,
                onSuccess: () => setDialogOpen(false),
            });
        }
    };

    const confirmDelete = () => {
        if (!deletingItem) return;
        form.delete(route('admin.services.destroy', deletingItem.id), {
            onFinish: () => setDeletingItem(null),
        });
    };

    return (
        <AdminLayout title={t('admin.services')}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--page-text)' }}>{t('admin.services')}</h2>
                <Button onClick={openCreate} style={{ backgroundColor: 'var(--page-accent)', color: 'var(--page-bg)' }}>
                    <Plus className="h-4 w-4 rtl:ml-2 ltr:mr-2" />
                    {t('admin.add_service')}
                </Button>
            </div>

            <Card style={{ backgroundColor: 'var(--page-bg-secondary)', borderColor: 'var(--page-border)' }}>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-t" style={{ borderColor: 'var(--page-border)' }}>
                                    <th className="text-start p-4 font-semibold" style={{ color: 'var(--page-text-muted)' }}>{t('admin.image')}</th>
                                    <th className="text-start p-4 font-semibold" style={{ color: 'var(--page-text-muted)' }}>{t('admin.title_en')}</th>
                                    <th className="text-start p-4 font-semibold" style={{ color: 'var(--page-text-muted)' }}>{t('admin.title_ar')}</th>
                                    <th className="text-start p-4 font-semibold" style={{ color: 'var(--page-text-muted)' }}>{t('admin.request_route')}</th>
                                    <th className="text-end p-4 font-semibold" style={{ color: 'var(--page-text-muted)' }}>{t('admin.actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-6 text-center" style={{ color: 'var(--page-text-muted)' }}>
                                            {t('admin.no_items')}
                                        </td>
                                    </tr>
                                ) : (
                                    items.map((item) => (
                                        <tr key={item.id} className="border-t" style={{ borderColor: 'var(--page-border)' }}>
                                            <td className="p-4">
                                                {item.image ? (
                                                    <img src={item.image} alt="" className="h-12 w-12 rounded object-cover" />
                                                ) : (
                                                    <span style={{ color: 'var(--page-text-muted)' }}>—</span>
                                                )}
                                            </td>
                                            <td className="p-4 font-medium" style={{ color: 'var(--page-text)' }}>{item.title_en}</td>
                                            <td className="p-4" style={{ color: 'var(--page-text-muted)' }}>{item.title_ar}</td>
                                            <td className="p-4" style={{ color: 'var(--page-text-muted)' }}>{item.request_route}</td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => setDeletingItem(item)}>
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
                <DialogContent
                    className="max-h-[85vh] overflow-y-auto sm:max-w-lg"
                    style={{ backgroundColor: 'var(--page-bg-secondary)', borderColor: 'var(--page-border)', color: 'var(--page-text)' }}
                >
                    <DialogHeader>
                        <DialogTitle>{editingItem ? t('admin.edit_service') : t('admin.add_service')}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="icon">{t('admin.icon')}</Label>
                            <Input id="icon" value={form.data.icon} onChange={(e) => form.setData('icon', e.target.value)} required />
                            {form.errors.icon && <p className="text-xs text-red-500">{form.errors.icon}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="title_en">{t('admin.title_en')}</Label>
                            <Input id="title_en" value={form.data.title_en} onChange={(e) => form.setData('title_en', e.target.value)} required />
                            {form.errors.title_en && <p className="text-xs text-red-500">{form.errors.title_en}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="title_ar">{t('admin.title_ar')}</Label>
                            <Input id="title_ar" value={form.data.title_ar} onChange={(e) => form.setData('title_ar', e.target.value)} required />
                            {form.errors.title_ar && <p className="text-xs text-red-500">{form.errors.title_ar}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="description_en">{t('admin.desc_en')}</Label>
                            <textarea
                                id="description_en"
                                value={form.data.description_en}
                                onChange={(e) => form.setData('description_en', e.target.value)}
                                required
                                rows={3}
                                className="w-full rounded-md border px-3 py-2 text-sm"
                                style={{ backgroundColor: 'var(--page-bg)', borderColor: 'var(--page-border)', color: 'var(--page-text)' }}
                            />
                            {form.errors.description_en && <p className="text-xs text-red-500">{form.errors.description_en}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="description_ar">{t('admin.desc_ar')}</Label>
                            <textarea
                                id="description_ar"
                                value={form.data.description_ar}
                                onChange={(e) => form.setData('description_ar', e.target.value)}
                                required
                                rows={3}
                                className="w-full rounded-md border px-3 py-2 text-sm"
                                style={{ backgroundColor: 'var(--page-bg)', borderColor: 'var(--page-border)', color: 'var(--page-text)' }}
                            />
                            {form.errors.description_ar && <p className="text-xs text-red-500">{form.errors.description_ar}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="request_route">{t('admin.request_route')}</Label>
                            <Select
                                value={form.data.request_route}
                                onValueChange={(value) => form.setData('request_route', value)}
                            >
                                <SelectTrigger id="request_route">
                                    <SelectValue placeholder={t('admin.request_route')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {requestRoutes.map((routeName) => (
                                        <SelectItem key={routeName} value={routeName}>
                                            {routeName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.errors.request_route && <p className="text-xs text-red-500">{form.errors.request_route}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="sort_order">{t('admin.sort_order')}</Label>
                            <Input
                                id="sort_order"
                                type="number"
                                value={form.data.sort_order}
                                onChange={(e) => form.setData('sort_order', e.target.value)}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="image">{t('admin.image')}</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => form.setData('image', e.target.files ? e.target.files[0] : null)}
                            />
                            {form.errors.image && <p className="text-xs text-red-500">{form.errors.image}</p>}
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
            <Dialog open={!!deletingItem} onOpenChange={(open) => !open && setDeletingItem(null)}>
                <DialogContent style={{ backgroundColor: 'var(--page-bg-secondary)', borderColor: 'var(--page-border)', color: 'var(--page-text)' }}>
                    <DialogHeader>
                        <DialogTitle>{t('admin.delete')}</DialogTitle>
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
