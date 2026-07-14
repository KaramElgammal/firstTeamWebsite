import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/theme-toggle';
import SiteAdminLink from '@/components/site-admin-link';
import { useTranslation } from '@/hooks/useTranslation';
import { useEffect, useRef, useState } from 'react';

interface Project {
    id: number;
    name_en: string;    
    name_ar: string;
    description_en: string;
    description_ar: string;
    images: string[] | null;
}

interface Props {
    projects: Project[];
}

function ImageSlider({ images, name }: { images: string[]; name: string }) {
    const [current, setCurrent] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 4000);
    };

    useEffect(() => {
        if (images.length > 1) startTimer();
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [images.length]);

    const goTo = (index: number) => {
        setCurrent(index);
        startTimer();
    };

    const prev = () => goTo((current - 1 + images.length) % images.length);
    const next = () => goTo((current + 1) % images.length);

    if (images.length === 1) {
        return (
            <div className="w-full h-52 sm:h-64 overflow-hidden">
                <img src={images[0]} alt={name} className="w-full h-full object-cover" />
            </div>
        );
    }

    return (
        <div className="relative w-full h-52 sm:h-64 overflow-hidden group">
            {images.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt={`${name} ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{ opacity: i === current ? 1 : 0 }}
                />
            ))}

            {/* Prev / Next buttons */}
            <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff' }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff' }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{ backgroundColor: i === current ? '#fff' : 'rgba(255,255,255,0.4)' }}
                    />
                ))}
            </div>
        </div>
    );
}

export default function Projects({ projects }: Props) {
    const { auth } = usePage<SharedData>().props;
    const { t, locale } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <Head title="Our Projects" />
            <div
                className="relative min-h-screen font-sans"
                style={{
                    backgroundColor: 'var(--page-bg)',
                    color: 'var(--page-text)',
                }}
            >
                {/* Navigation */}
                <header className="absolute top-0 w-full p-4 sm:p-6 z-20">
                    <nav className="flex items-center justify-between gap-2 sm:gap-3 max-w-7xl mx-auto">
                        {/* Logo / FT + nav buttons */}
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="First Team Logo" className="w-8 h-8 rounded-lg object-contain"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                            <span className="font-extrabold text-lg tracking-widest" style={{ color: 'var(--page-accent)' }}>FT</span>
                            <Link href={route('projects')}
                                className="hidden sm:inline-flex font-semibold transition duration-300 ease-in-out px-3 py-1.5 sm:px-4 sm:py-2 rounded-md border text-sm sm:text-base"
                                style={{ color: 'var(--page-accent)', borderColor: 'var(--page-accent)' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--page-accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--page-bg)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = ''; (e.currentTarget as HTMLElement).style.color = 'var(--page-accent)'; }}>
                                {t('welcome.projects')}
                            </Link>
                            <Link href={route('news')}
                                className="hidden sm:inline-flex font-semibold transition duration-300 ease-in-out px-3 py-1.5 sm:px-4 sm:py-2 rounded-md border text-sm sm:text-base"
                                style={{ color: 'var(--page-text)', borderColor: 'var(--page-border)' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--page-accent)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--page-accent)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--page-text)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--page-border)'; }}>
                                {t('welcome.news')}
                            </Link>
                            {/* Mobile menu icon */}
                            <div className="relative sm:hidden">
                                <button onClick={() => setMenuOpen(p => !p)}
                                    className="p-1.5 rounded-md border transition-colors"
                                    style={{ color: 'var(--page-accent)', borderColor: 'var(--page-accent)' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                                {menuOpen && (
                                    <div className="absolute top-10 left-0 rounded-xl shadow-2xl border py-2 min-w-[160px] z-30"
                                        style={{ backgroundColor: 'var(--page-bg-secondary)', borderColor: 'var(--page-border)' }}>
                                        <Link href={route('projects')} onClick={() => setMenuOpen(false)}
                                            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors"
                                            style={{ color: 'var(--page-accent)' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--page-accent)20'; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = ''; }}>
                                            {t('welcome.projects')}
                                        </Link>
                                        <Link href={route('news')} onClick={() => setMenuOpen(false)}
                                            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors"
                                            style={{ color: 'var(--page-text)' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--page-accent)20'; (e.currentTarget as HTMLElement).style.color = 'var(--page-accent)'; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = ''; (e.currentTarget as HTMLElement).style.color = 'var(--page-text)'; }}>
                                            {t('welcome.news')}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                        <ThemeToggle />
                        <LanguageSwitcher />
                        {auth.user ? (
                            <>
                                <Link
                                    href={route('dashboard')}
                                    className="font-semibold transition duration-300 ease-in-out px-3 py-1.5 sm:px-4 sm:py-2 rounded-md border text-sm sm:text-base"
                                    style={{
                                        color: 'var(--page-accent)',
                                        borderColor: 'var(--page-accent)',
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.color = 'var(--page-text)';
                                        (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--page-accent)20';
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.color = 'var(--page-accent)';
                                        (e.currentTarget as HTMLElement).style.backgroundColor = '';
                                    }}
                                >
                                    {t('welcome.dashboard')}
                                </Link>
                                {auth.isAdmin && <SiteAdminLink />}
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="font-semibold transition duration-300 ease-in-out text-sm sm:text-base"
                                    style={{ color: 'var(--page-text)' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--page-accent)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--page-text)'; }}
                                >
                                    {t('welcome.login')}
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="font-semibold text-white transition duration-300 ease-in-out px-4 py-1.5 sm:px-5 sm:py-2 rounded-md shadow-lg text-sm sm:text-base"
                                    style={{ backgroundColor: 'var(--page-btn-bg)' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--page-btn-hover)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--page-btn-bg)'; }}
                                >
                                    {t('welcome.register')}
                                </Link>
                            </>
                        )}
                        </div>
                    </nav>
                </header>

                {/* Main Content */}
                <main className="flex flex-col items-center min-h-screen pt-24 pb-12 px-4 sm:pt-28 sm:pb-16 sm:px-6">
                    <div className="w-full max-w-6xl">
                        {/* Page Header */}
                        <div className="text-center mb-8 sm:mb-12">
                            <Link
                                href={route('home')}
                                className="inline-flex items-center gap-2 mb-4 sm:mb-6 text-sm transition duration-200"
                                style={{ color: 'var(--page-text-muted)' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--page-accent)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--page-text-muted)'; }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                {locale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
                            </Link>
                            <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3" style={{ color: 'var(--page-text)' }}>
                                {locale === 'ar' ? 'مشاريعنا' : 'Our'}{' '}
                                {locale !== 'ar' && <span style={{ color: 'var(--page-accent)' }}>Projects</span>}
                                {locale === 'ar' && <span style={{ color: 'var(--page-accent)' }}> </span>}
                            </h1>
                            <p className="text-base sm:text-lg" style={{ color: 'var(--page-text-muted)' }}>
                                {locale === 'ar'
                                    ? 'نماذج من أعمال وإنجازات فريق First Team'
                                    : 'A showcase of what First Team has built and delivered.'}
                            </p>
                        </div>

                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="rounded-2xl overflow-hidden border shadow-xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col"
                                    style={{
                                        backgroundColor: 'var(--page-bg-secondary)',
                                        borderColor: 'var(--page-border)',
                                    }}
                                >
                                    {project.images && project.images.length > 0 && (
                                        <ImageSlider
                                            images={project.images}
                                            name={locale === 'ar' ? project.name_ar : project.name_en}
                                        />
                                    )}
                                    <div className="p-4 sm:p-6 flex flex-col gap-3 flex-1" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                                        <h2 className="text-lg sm:text-xl font-bold" style={{ color: 'var(--page-accent)' }}>
                                            {locale === 'ar' ? project.name_ar : project.name_en}
                                        </h2>
                                        <p
                                            className="text-sm leading-relaxed whitespace-pre-line"
                                            style={{ color: 'var(--page-text-muted)' }}
                                        >
                                            {locale === 'ar' ? project.description_ar : project.description_en}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="w-full py-8 px-4 sm:px-6 border-t" style={{ backgroundColor: 'var(--page-bg-secondary)', borderColor: 'var(--page-border)' }}>
                    <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 sm:gap-10">
                        <a href="https://www.youtube.com/@firstteam7713" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm transition-colors"
                            style={{ color: 'var(--page-text-muted)' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#FF0000'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--page-text-muted)'; }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            YouTube
                        </a>
                        <a href="https://www.facebook.com/FirstTeamRobots" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm transition-colors"
                            style={{ color: 'var(--page-text-muted)' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1877F2'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--page-text-muted)'; }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Facebook
                        </a>
                        <a href="https://www.tiktok.com/@first.team.robots" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm transition-colors"
                            style={{ color: 'var(--page-text-muted)' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--page-text)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--page-text-muted)'; }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                            </svg>
                            TikTok
                        </a>
                        <a href="https://wa.me/201070291846" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm transition-colors"
                            style={{ color: 'var(--page-text-muted)' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#25D366'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--page-text-muted)'; }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            WhatsApp
                        </a>
                    </div>
                    <div className="text-center mt-5 text-xs" style={{ color: 'var(--page-text-muted)', opacity: 0.6 }}>
                        &copy; {new Date().getFullYear()} First Team. {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
                    </div>
                </footer>
            </div>
        </>
    );
}
