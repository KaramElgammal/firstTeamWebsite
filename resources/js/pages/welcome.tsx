import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import ThemeToggle from '@/components/theme-toggle';
import { useTranslation } from '@/hooks/useTranslation';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const { t, locale } = useTranslation();

    return (
        <>  
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

                {/* Main Content Area */}
                <main className="flex flex-col items-center justify-center min-h-screen px-4 py-24 sm:px-6 md:p-20">
                    <div
                        className="w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border transform transition-all hover:scale-[1.01] duration-500"
                        style={{
                            backgroundColor: 'var(--page-bg-secondary)',
                            borderColor: 'var(--page-border)',
                        }}
                    >
                        <div className="p-6 sm:p-10 md:p-14 text-center flex flex-col items-center">
                            
                            {/* Logo */}
                            <div
                                className="mb-6 p-3 sm:p-4 rounded-4xl shadow-inner border"
                                style={{
                                    backgroundColor: 'var(--page-inner-box)',
                                    borderColor: 'var(--page-border)',
                                }}
                            >
                                <img 
                                    src="/logo.png" 
                                    alt="First Team Logo" 
                                    className="w-32 sm:w-48 md:w-64 h-auto rounded-4xl object-contain drop-shadow-2xl"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/400x200/000000/FFFFFF?text=First+Team+Logo';
                                    }}
                                />
                            </div>

                            {/* Welcome Text Content */}
                            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed" style={{ color: 'var(--page-text-muted)' }}>
                                {locale === 'ar' ? (
                                    <>
                                        <p className="text-lg sm:text-xl md:text-2xl font-medium" style={{ color: 'var(--page-text)' }}>
                                            في <span className="font-bold" style={{ color: 'var(--page-accent)' }}>First Team</span> لم يكن دورنا مجرد المساعدة في إنجاز المشاريع، بل كنا وما زلنا شركاء في التعلم والتطوير والإبداع. ❤️
                                        </p>
                                        <p>
                                            نشكر كل من كان جزءًا من رحلتنا، ونتطلع إلى المزيد من النجاحات والإنجازات في الأعوام القادمة بإذن الله.
                                        </p>
                                        <div
                                            className="p-4 sm:p-5 rounded-lg border my-4 sm:my-6 shadow-inner"
                                            style={{
                                                backgroundColor: 'var(--page-inner-box)',
                                                borderColor: 'var(--page-border)',
                                            }}
                                        >
                                            <p className="flex items-start gap-3 text-right" style={{ color: 'var(--page-accent)' }}>
                                                <span>
                                                    مستمرون في دعمكم، ومواصلة تقديم المساعدة في المشاريع، وتنمية المهارات البرمجية والتقنية والتصميمية.
                                                </span>
                                            </p>
                                        </div>
                                        <p className="italic" style={{ color: 'var(--page-text)' }}>
                                            الرحلة لا تنتهي هنا... بل هذه مجرد بداية جديدة نحو المزيد من التقدم والتميز
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-lg sm:text-xl md:text-2xl font-medium" style={{ color: 'var(--page-text)' }}>
                                            At <span className="font-bold" style={{ color: 'var(--page-accent)' }}>First Team</span>, our role went beyond merely helping to complete projects; we were—and remain—partners in learning, development, and creativity. ❤️
                                        </p>
                                        <p>
                                            We thank everyone who has been part of our journey and look forward to further successes and achievements in the years ahead, God willing.
                                        </p>
                                        <div
                                            className="p-4 sm:p-5 rounded-lg border my-4 sm:my-6 shadow-inner"
                                            style={{
                                                backgroundColor: 'var(--page-inner-box)',
                                                borderColor: 'var(--page-border)',
                                            }}
                                        >
                                            <p className="flex items-start gap-3 text-left" style={{ color: 'var(--page-accent)' }}>
                                                <span>
                                                    We remain committed to supporting you, assisting with projects, and fostering the growth of programming, technical, and design skills.
                                                </span>
                                            </p>
                                        </div>
                                        <p className="italic" style={{ color: 'var(--page-text)' }}>
                                            The journey doesn't end here; rather, this is just a new beginning toward greater progress and excellence.
                                        </p>
                                    </>
                                )}
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
                                <Link
                                    href={route('register')}
                                    className="w-full sm:w-auto text-center font-bold transition duration-300 ease-in-out px-8 py-3 rounded-full transform hover:-translate-y-1"
                                    style={{
                                        backgroundColor: 'var(--page-accent)',
                                        color: 'var(--page-bg)',
                                        boxShadow: '0 0 20px color-mix(in srgb, var(--page-accent) 40%, transparent)',
                                    }}
                                >
                                    {t('welcome.join')}
                                </Link>
                                <Link
                                    href={route('projects')}
                                    className="w-full sm:w-auto text-center font-bold transition duration-300 ease-in-out px-8 py-3 rounded-full border transform hover:-translate-y-1"
                                    style={{
                                        color: 'var(--page-accent)',
                                        borderColor: 'var(--page-accent)',
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--page-accent)';
                                        (e.currentTarget as HTMLElement).style.color = 'var(--page-bg)';
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.backgroundColor = '';
                                        (e.currentTarget as HTMLElement).style.color = 'var(--page-accent)';
                                    }}
                                >
                                    Our Projects
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
