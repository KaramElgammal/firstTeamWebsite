import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface ProjectRow {
    id: number;
    name_en: string;
    name_ar: string;
    description_en: string;
    description_ar: string;
    images: string[] | null;
    sort_order: number | null;
}

interface Props {
    items: ProjectRow[];
}

const emptyForm = {
    name_en: '',
    name_ar: '',
    description_en: '',
    description_ar: '',
    sort_order: '' as string | number,
    images: [] as File[],
};

export default function AdminProjectsIndex({ items }: Props) {
    const { t } = useTranslation();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ProjectRow | null>(null);
    const [deletingItem, setDeletingItem] = useState<ProjectRow | null>(null);

    const form = useForm(emptyForm);

    const openCreate = () => {
        setEditingItem(null);
        form.reset();
        form.clearErrors();
        setDialogOpen(true);
    };

    const openEdit = (item: ProjectRow) => {
        setEditingItem(item);
        form.setData({
            name_en: item.name_en,
            name_ar: item.name_ar,
            description_en: item.description_en,
            description_ar: item.description_ar,
            sort_order: item.sort_order ?? '',
            images: [],
        });
        form.clearErrors();
        setDialogOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            form.transform((data) => ({ ...data, _method: 'put' }));
            form.post(route('admin.projects.update', editingItem.id), {
                forceFormData: true,
                onSuccess: () => setDialogOpen(false),
            });
        } else {
            form.transform((data) => data);
            form.post(route('admin.projects.store'), {
                forceFormData: true,
                onSuccess: () => setDialogOpen(false),
            });
        }
    };

    const confirmDelete = () => {
        if (!deletingItem) return;
        form.delete(route('admin.projects.destroy', deletingItem.id), {
            onFinish: () => setDeletingItem(null),
        });
    };

    return (
        <AdminLayout title={t('admin.projects')}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--page-text)' }}>{t('admin.projects')}</h2>
                <Button onClick={openCreate} style={{ backgroundColor: 'var(--page-accent)', color: 'var(--page-bg)' }}>
                    <Plus className="h-4 w-4 rtl:ml-2 ltr:mr-2" />
                    {t('admin.add_project')}
                </Button>
            </div>

            <Card style={{ backgroundColor: 'var(--page-bg-secondary)', borderColor: 'var(--page-border)' }}>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-t" style={{ borderColor: 'var(--page-border)' }}>
                                    <th className="text-start p-4 font-semibold" style={{ color: 'var(--page-text-muted)' }}>{t('admin.images')}</th>
                                    <th className="text-start p-4 font-semibold" style={{ color: 'var(--page-text-muted)' }}>{t('admin.name_en')}</th>
                                    <th className="text-start p-4 font-semibold" style={{ color: 'var(--page-text-muted)' }}>{t('admin.name_ar')}</th>
                                    <th className="text-end p-4 font-semibold" style={{ color: 'var(--page-text-muted)' }}>{t('admin.actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-6 text-center" style={{ color: 'var(--page-text-muted)' }}>
                                            {t('admin.no_items')}
                                        </td>
                                    </tr>
                                ) : (
                                    items.map((item) => (
                                        <tr key={item.id} className="border-t" style={{ borderColor: 'var(--page-border)' }}>
                                            <td className="p-4">
                                                {item.images && item.images[0] ? (
                                                    <img src={item.images[0]} alt="" className="h-12 w-12 rounded object-cover" />
                                                ) : (
                                                    <span style={{ color: 'var(--page-text-muted)' }}>—</span>
                                                )}
                                            </td>
                                            <td className="p-4 font-medium" style={{ color: 'var(--page-text)' }}>{item.name_en}</td>
                                            <td className="p-4" style={{ color: 'var(--page-text-muted)' }}>{item.name_ar}</td>
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
                        <DialogTitle>{editingItem ? t('admin.edit_project') : t('admin.add_project')}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="name_en">{t('admin.name_en')}</Label>
                            <Input id="name_en" value={form.data.name_en} onChange={(e) => form.setData('name_en', e.target.value)} required />
                            {form.errors.name_en && <p className="text-xs text-red-500">{form.errors.name_en}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="name_ar">{t('admin.name_ar')}</Label>
                            <Input id="name_ar" value={form.data.name_ar} onChange={(e) => form.setData('name_ar', e.target.value)} required />
                            {form.errors.name_ar && <p className="text-xs text-red-500">{form.errors.name_ar}</p>}
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
                            <Label htmlFor="sort_order">{t('admin.sort_order')}</Label>
                            <Input
                                id="sort_order"
                                type="number"
                                value={form.data.sort_order}
                                onChange={(e) => form.setData('sort_order', e.target.value)}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="images">{t('admin.images')}</Label>
                            <Input
                                id="images"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => form.setData('images', e.target.files ? Array.from(e.target.files) : [])}
                            />
                            {form.errors.images && <p className="text-xs text-red-500">{form.errors.images}</p>}
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
