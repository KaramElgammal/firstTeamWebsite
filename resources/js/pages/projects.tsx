import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import ThemeToggle from '@/components/theme-toggle';
import { useTranslation } from '@/hooks/useTranslation';

interface Project {
    id: number;
    name: string;
    description: string;
    image: string;
}

const projects: Project[] = [
    {
        id: 1,
        name: 'Project Alpha',
        description: 'A full-stack web application built with Laravel and React.',
        image: 'https://placehold.co/600x400/1a1a1a/FFFFFF?text=Project+Alpha',
    },
    {
        id: 2,
        name: 'Project Beta',
        description: 'A mobile-first design system for modern web apps.',
        image: 'https://placehold.co/600x400/1a1a1a/FFFFFF?text=Project+Beta',
    },
    {
        id: 3,
        name: 'Project Gamma',
        description: 'An e-commerce platform with advanced analytics dashboard.',
        image: 'https://placehold.co/600x400/1a1a1a/FFFFFF?text=Project+Gamma',
    },
    {
        id: 4,
        name: 'Project Delta',
        description: 'A real-time collaboration tool for remote teams.',
        image: 'https://placehold.co/600x400/1a1a1a/FFFFFF?text=Project+Delta',
    },
    {
        id: 5,
        name: 'Project Epsilon',
        description: 'A graphic design portfolio showcase with animation effects.',
        image: 'https://placehold.co/600x400/1a1a1a/FFFFFF?text=Project+Epsilon',
    },
    {
        id: 6,
        name: 'Project Zeta',
        description: 'An educational platform for programming and technical skills.',
        image: 'https://placehold.co/600x400/1a1a1a/FFFFFF?text=Project+Zeta',
    },
];

export default function Projects() {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();

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
                <header className="absolute top-0 w-full p-4 sm:p-6 z-10">
                    <nav className="flex items-center justify-end gap-2 sm:gap-3 max-w-7xl mx-auto">
                        <ThemeToggle />
                        <LanguageSwitcher />
                        {auth.user ? (
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
                                Back to Home
                            </Link>
                            <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3" style={{ color: 'var(--page-text)' }}>
                                Our <span style={{ color: 'var(--page-accent)' }}>Projects</span>
                            </h1>
                            <p className="text-base sm:text-lg" style={{ color: 'var(--page-text-muted)' }}>
                                A showcase of what First Team has built and delivered.
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
                                    <div className="overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.name}
                                            className="w-full h-40 sm:h-48 object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-4 sm:p-6 flex flex-col gap-2 flex-1">
                                        <h2 className="text-lg sm:text-xl font-bold" style={{ color: 'var(--page-text)' }}>
                                            {project.name}
                                        </h2>
                                        <p className="text-sm leading-relaxed" style={{ color: 'var(--page-text-muted)' }}>
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
