import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

// Components...
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import HeadingSmall from '@/components/heading-small';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/useTranslation';

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({ password: '' });
    const { t } = useTranslation();

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <div className="space-y-6 text-start">
            <HeadingSmall 
                title={t('settings.delete_account_title') || 'Delete account'} 
                description={t('settings.delete_account_desc') || 'Delete your account and all of its resources'} 
            />
            <div className="space-y-4 rounded-lg border border-red-900/50 bg-red-950/20 p-4">
                <div className="relative space-y-0.5 text-red-400">
                    <p className="font-bold tracking-wide">{t('settings.warning') || 'Warning'}</p>
                    <p className="text-sm">{t('settings.warning_desc') || 'Please proceed with caution, this cannot be undone.'}</p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive">{t('settings.delete_account_btn') || 'Delete account'}</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#251c1a] border-[#f3b8b1]/20 text-white">
                        <DialogTitle>{t('settings.delete_confirm_title') || 'Are you sure you want to delete your account?'}</DialogTitle>
                        <DialogDescription className="text-[#a39997]">
                            {t('settings.delete_confirm_desc') || 'Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm.'}
                        </DialogDescription>
                        <form className="space-y-6" onSubmit={deleteUser}>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="sr-only">
                                    Password
                                </Label>

                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                    autoComplete="current-password"
                                />

                                <InputError message={errors.password} />
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="secondary" onClick={closeModal} className="bg-white/10 text-white hover:bg-white/20 border-0">
                                        {t('settings.cancel') || 'Cancel'}
                                    </Button>
                                </DialogClose>

                                <Button variant="destructive" disabled={processing} asChild>
                                    <button type="submit">{t('settings.delete_account_btn') || 'Delete account'}</button>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
