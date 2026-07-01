import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import ThemeToggle from '@/components/theme-toggle';
import { useTranslation } from '@/hooks/useTranslation';
import { useState, useRef, FormEventHandler } from 'react';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut, Menu, X, Send, CheckCircle, UploadCloud, FileCheck2 } from 'lucide-react';

interface Props {
    service: '3d' | 'robotics';
    routeName: string;
}

function ServiceFormPage({ service, routeName }: Props) {
    const { auth } = usePage<SharedData>().props;
    const { t, locale } = useTranslation();
    const user = auth.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [requestType, setRequestType] = useState<'ready' | 'designer' | ''>('');
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const isRtl = locale === 'ar';
    const serviceName = service === '3d' ? '3D Design & Printing' : 'Robotics Systems';

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm<{
        name: string; email: string; phone: string; service: string;
        request_type: string; details: string; file: File | null; image: File | null; image_note: string;
    }>({
        name: '', email: '', phone: '',
        service: serviceName,
        request_type: '',
        details: '', file: null, image: null, image_note: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route(routeName), { forceFormData: true, onSuccess: () => { reset(); setRequestType(''); } });
    };

    const getInitials = (name: string) =>
        name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    const inputStyle = (hasError: boolean) => ({
        backgroundColor: 'var(--page-bg-secondary)',
        borderColor: hasError ? '#ef4444' : 'var(--page-border)',
        color: 'var(--page-text)',
    });

    const subtitleKey = service === '3d' ? '3d_req.subtitle' : 'rob_req.subtitle';
    const headingKey  = service === '3d' ? '3d_req.heading'  : 'rob_req.heading';
    const descKey     = service === '3d' ? '3d_req.desc'     : 'rob_req.desc';

    return (
        <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen font-sans" style={{ backgroundColor: 'var(--page-bg)', color: 'var(--page-text)' }}>
            <Head title={t(service === '3d' ? '3d_req.page_title' : 'rob_req.page_title')} />

            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'var(--page-header-bg)', borderColor: 'var(--page-border)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="First Team Logo" className="w-10 object-contain drop-shadow-lg rounded-full" onError={(e) => { e.currentTarget.src = 'https://placehold.co/40x40/000000/FFFFFF?text=FT'; }} />
                        <span className="text-xl font-bold tracking-widest" style={{ color: 'var(--page-text)' }}>FT</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8 text-sm font-bold" style={{ color: 'var(--page-text-muted)' }}>
                        <Link href={route('dashboard')} className="transition-colors hover:text-[var(--page-accent)]">{t('nav.home') || 'Home'}</Link>
                        <Link href={route('services')} className="transition-colors border-b-2 pb-1" style={{ color: 'var(--page-text)', borderColor: 'var(--page-accent)' }}>{t('nav.services') || 'Services'}</Link>
                        <Link href={route('dashboard') + '#about'} className="transition-colors hover:text-[var(--page-accent)]">{t('nav.about') || 'About'}</Link>
                        <Link href={route('contact')} className="transition-colors hover:text-[var(--page-accent)]">{t('nav.contact') || 'Contact'}</Link>
                    </nav>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <ThemeToggle />
                        <LanguageSwitcher />
                        <button className="md:hidden p-2 rounded-md" style={{ color: 'var(--page-text)' }} onClick={() => setMobileMenuOpen(p => !p)} aria-label="Toggle menu">
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="focus:outline-none">
                                <Avatar className="h-10 w-10 border-2 cursor-pointer" style={{ borderColor: 'var(--page-border)', backgroundColor: 'var(--page-bg-secondary)' }}>
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=6b0f0f&textColor=f3b8b1`} alt={user.name} />
                                    <AvatarFallback className="font-bold" style={{ backgroundColor: 'var(--page-btn-bg)', color: 'var(--page-accent)' }}>{getInitials(user.name)}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 shadow-2xl border" style={{ backgroundColor: 'var(--page-bg-secondary)', borderColor: 'var(--page-border)', color: 'var(--page-text)' }}>
                                <DropdownMenuLabel className="font-normal">
                                    <p className="text-sm font-medium" style={{ color: 'var(--page-text)' }}>{user.name}</p>
                                    <p className="text-xs" style={{ color: 'var(--page-text-muted)' }}>{user.email}</p>
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

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex flex-col" style={{ backgroundColor: 'var(--page-bg)' }}>
                    <div className="flex items-center justify-between px-4 py-4 border-b" style={{ borderColor: 'var(--page-border)' }}>
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" className="w-10 object-contain rounded-full" onError={(e) => { e.currentTarget.src = 'https://placehold.co/40x40/000000/FFFFFF?text=FT'; }} alt="logo" />
                            <span className="text-xl font-bold tracking-widest" style={{ color: 'var(--page-text)' }}>FT</span>
                        </div>
                        <button className="p-2 rounded-md" style={{ color: 'var(--page-text)' }} onClick={() => setMobileMenuOpen(false)}><X className="h-6 w-6" /></button>
                    </div>
                    <nav className="flex flex-col gap-2 px-6 py-8 text-lg font-bold" style={{ color: 'var(--page-text-muted)' }}>
                        <Link href={route('dashboard')} onClick={() => setMobileMenuOpen(false)} className="py-4 border-b hover:text-[var(--page-accent)]" style={{ borderColor: 'var(--page-border)' }}>{t('nav.home') || 'Home'}</Link>
                        <Link href={route('services')} onClick={() => setMobileMenuOpen(false)} className="py-4 border-b" style={{ color: 'var(--page-accent)', borderColor: 'var(--page-border)' }}>{t('nav.services') || 'Services'}</Link>
                        <Link href={route('dashboard') + '#about'} onClick={() => setMobileMenuOpen(false)} className="py-4 border-b hover:text-[var(--page-accent)]" style={{ borderColor: 'var(--page-border)' }}>{t('nav.about') || 'About'}</Link>
                        <Link href={route('contact')} onClick={() => setMobileMenuOpen(false)} className="py-4 hover:text-[var(--page-accent)]">{t('nav.contact') || 'Contact'}</Link>
                    </nav>
                </div>
            )}

            {/* Hero */}
            <section className="py-16 px-4 sm:px-6 text-center border-b" style={{ borderColor: 'var(--page-border)' }}>
                <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: 'var(--page-accent)' }}>{t(subtitleKey)}</p>
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: 'var(--page-text)' }}>{t(headingKey)}</h1>
                <p className="max-w-md mx-auto text-base leading-relaxed" style={{ color: 'var(--page-text-muted)' }}>{t(descKey)}</p>
            </section>

            {/* Form */}
            <section className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20">

                {recentlySuccessful && (
                    <div className="mb-8 flex items-center gap-3 p-5 rounded-xl border" style={{ borderColor: 'var(--page-accent)', backgroundColor: 'var(--page-bg-secondary)' }}>
                        <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--page-accent)' }} />
                        <p className="text-sm font-bold" style={{ color: 'var(--page-text)' }}>{t('sreq.success')}</p>
                    </div>
                )}

                <form onSubmit={submit} className="flex flex-col gap-7">

                    {/* Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--page-text-muted)' }}>{t('sreq.name')} <span style={{ color: 'var(--page-accent)' }}>*</span></label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} placeholder={t('sreq.name_ph')} className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors" style={inputStyle(!!errors.name)} />
                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--page-text-muted)' }}>{t('sreq.email')} <span style={{ color: 'var(--page-accent)' }}>*</span></label>
                        <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} placeholder={t('sreq.email_ph')} className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors" style={inputStyle(!!errors.email)} />
                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--page-text-muted)' }}>{t('sreq.phone')} <span style={{ color: 'var(--page-accent)' }}>*</span></label>
                        <input type="tel" value={data.phone} onChange={e => setData('phone', e.target.value)} placeholder={t('sreq.phone_ph')} className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors" style={inputStyle(!!errors.phone)} />
                        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                    </div>

                    {/* Do you have a ready design? */}
                    <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--page-text-muted)' }}>{t('sreq.q_design')} <span style={{ color: 'var(--page-accent)' }}>*</span></label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {(['ready', 'designer'] as const).map(opt => (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => { setRequestType(opt); setData('request_type', opt); }}
                                    className="flex items-center gap-3 px-4 py-4 rounded-xl border-2 text-sm font-bold text-start transition-all duration-200"
                                    style={{
                                        borderColor: requestType === opt ? 'var(--page-accent)' : 'var(--page-border)',
                                        backgroundColor: requestType === opt ? 'color-mix(in srgb, var(--page-accent) 10%, var(--page-bg-secondary))' : 'var(--page-bg-secondary)',
                                        color: requestType === opt ? 'var(--page-text)' : 'var(--page-text-muted)',
                                    }}
                                >
                                    <span className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors"
                                        style={{ borderColor: requestType === opt ? 'var(--page-accent)' : 'var(--page-border)' }}>
                                        {requestType === opt && <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--page-accent)' }} />}
                                    </span>
                                    {opt === 'ready' ? t('sreq.opt_ready') : t('sreq.opt_designer')}
                                </button>
                            ))}
                        </div>
                        {errors.request_type && <p className="text-xs text-red-500">{errors.request_type}</p>}
                    </div>

                    {/* Ready Design — file upload */}
                    {requestType === 'ready' && (
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--page-text-muted)' }}>{t('sreq.file_label')} <span style={{ color: 'var(--page-accent)' }}>*</span></label>
                            <div
                                className="relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200"
                                style={{ borderColor: dragOver ? 'var(--page-accent)' : 'var(--page-border)', backgroundColor: dragOver ? 'color-mix(in srgb, var(--page-accent) 5%, var(--page-bg-secondary))' : 'var(--page-bg-secondary)' }}
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) setData('file', f); }}
                            >
                                <input ref={fileInputRef} type="file" accept="*/*" className="hidden" onChange={e => { if (e.target.files?.[0]) setData('file', e.target.files[0]); }} />
                                {data.file ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <FileCheck2 className="h-10 w-10" style={{ color: 'var(--page-accent)' }} />
                                        <p className="text-sm font-bold" style={{ color: 'var(--page-text)' }}>{data.file.name}</p>
                                        <p className="text-xs" style={{ color: 'var(--page-text-muted)' }}>{(data.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        <button type="button" onClick={e => { e.stopPropagation(); setData('file', null); }} className="text-xs underline mt-1" style={{ color: 'var(--page-text-muted)' }}>Remove</button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-3">
                                        <UploadCloud className="h-12 w-12" style={{ color: 'var(--page-accent)' }} />
                                        <p className="font-bold text-sm" style={{ color: 'var(--page-text)' }}>{t('sreq.file_hint')}</p>
                                        <p className="text-xs leading-relaxed max-w-xs" style={{ color: 'var(--page-text-muted)' }}>{t('sreq.file_formats')}</p>
                                    </div>
                                )}
                            </div>
                            {errors.file && <p className="text-xs text-red-500">{errors.file}</p>}
                        </div>
                    )}

                    {/* Needs Designer — image + note */}
                    {requestType === 'designer' && (
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--page-text-muted)' }}>{t('sreq.image_label')}</label>
                                <div
                                    className="relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200"
                                    style={{ borderColor: 'var(--page-border)', backgroundColor: 'var(--page-bg-secondary)' }}
                                    onClick={() => imageInputRef.current?.click()}
                                    onDragOver={e => { e.preventDefault(); }}
                                    onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) setData('image', f); }}
                                >
                                    <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) setData('image', e.target.files[0]); }} />
                                    {data.image ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <img src={URL.createObjectURL(data.image)} alt="preview" className="max-h-48 mx-auto rounded-lg object-contain" />
                                            <p className="text-xs mt-2" style={{ color: 'var(--page-text-muted)' }}>{data.image.name}</p>
                                            <button type="button" onClick={e => { e.stopPropagation(); setData('image', null); }} className="text-xs underline" style={{ color: 'var(--page-text-muted)' }}>Remove</button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-3">
                                            <UploadCloud className="h-12 w-12" style={{ color: 'var(--page-accent)' }} />
                                            <p className="font-bold text-sm" style={{ color: 'var(--page-text)' }}>{t('sreq.image_hint')}</p>
                                            <p className="text-xs" style={{ color: 'var(--page-text-muted)' }}>JPG, PNG, GIF, WebP, SVG</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--page-text-muted)' }}>{t('sreq.image_note_label')}</label>
                                <textarea value={data.image_note} onChange={e => setData('image_note', e.target.value)} placeholder={t('sreq.image_note_ph')} rows={3} className="w-full px-4 py-3 rounded-lg border text-sm outline-none resize-none transition-colors" style={inputStyle(false)} />
                            </div>
                        </div>
                    )}

                    {/* Project Description */}
                    {requestType !== '' && (
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--page-text-muted)' }}>{t('sreq.details')} <span style={{ color: 'var(--page-accent)' }}>*</span></label>
                            <textarea value={data.details} onChange={e => setData('details', e.target.value)} placeholder={t('sreq.details_ph')} rows={5} className="w-full px-4 py-3 rounded-lg border text-sm outline-none resize-none transition-colors" style={inputStyle(!!errors.details)} />
                            {errors.details && <p className="text-xs text-red-500">{errors.details}</p>}
                        </div>
                    )}

                    {/* Submit */}
                    {requestType !== '' && (
                        <button type="submit" disabled={processing} className="w-full flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold tracking-widest uppercase rounded-lg transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundColor: 'var(--page-accent)', color: 'var(--page-bg)' }}>
                            <Send className="h-4 w-4" />
                            {processing ? t('sreq.sending') : t('sreq.submit')}
                        </button>
                    )}

                </form>
            </section>

            {/* Footer */}
            <footer className="border-t py-10 px-4 sm:px-6" style={{ borderColor: 'var(--page-border)', backgroundColor: 'var(--page-inner-box)' }}>
                <div className="max-w-7xl mx-auto flex flex-col items-center gap-5">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" className="w-6 h-6 object-contain grayscale opacity-70" onError={(e) => { e.currentTarget.src = 'https://placehold.co/24x24/000000/FFFFFF?text=FT'; }} alt="logo" />
                        <span className="text-lg font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--page-text-muted)' }}>First Team</span>
                    </div>
                    <div className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--page-text-muted)', opacity: 0.5 }}>
                        &copy; {new Date().getFullYear()} First Team. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default function ThreeDRequest() {
    return <ServiceFormPage service="3d" routeName="3d-request.send" />;
}
