import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const { t, locale } = useTranslation();

    return (
        <>
            <Head title="Welcome to First Team" />
            
            {/* Main Background based on previous color theme */}
            <div className="relative min-h-screen bg-[#171110] text-[#ffffff] font-sans selection:bg-[#f3b8b1] selection:text-[#171110]">
                
                {/* Navigation */}
                <header className="absolute top-0 w-full p-6 z-10">
                    <nav className="flex items-center justify-end gap-4 max-w-7xl mx-auto">
                        <LanguageSwitcher />
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="font-semibold text-[#f3b8b1] hover:text-white transition duration-300 ease-in-out px-4 py-2 rounded-md border border-[#f3b8b1] hover:bg-[#f3b8b1]/10"
                            >
                                {t('welcome.dashboard')}
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-white hover:text-[#f3b8b1] transition duration-300 ease-in-out"
                                >
                                    {t('welcome.login')}
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="font-semibold text-[#ffffff] bg-[#6b0f0f] hover:bg-[#8b1414] transition duration-300 ease-in-out px-5 py-2 rounded-md shadow-lg"
                                >
                                    {t('welcome.register')}
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Main Content Area */}
                <main className="flex flex-col items-center justify-center min-h-screen p-6">
                    <div className="w-full max-w-3xl bg-[#251c1a] rounded-2xl shadow-2xl overflow-hidden border border-[#f3b8b1]/10 transform transition-all hover:scale-[1.01] duration-500">
                        
                        <div className="p-10 md:p-14 text-center flex flex-col items-center">
                            
                            {/* Logo */}
                            {/* Ensure you save the provided logo image as "logo.png" (or .jpg) in your public folder */}
                            <div className="mb-8 p-4 bg-black rounded-xl shadow-inner border border-white/5">
                                <img 
                                    src="/logo.png" 
                                    alt="First Team Logo" 
                                    className="w-48 h-auto object-contain md:w-64 drop-shadow-2xl"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/400x200/000000/FFFFFF?text=First+Team+Logo';
                                    }}
                                />
                            </div>

                            {/* Welcome Text Content */}
                            <div className="space-y-6 text-lg leading-relaxed text-[#a39997]">
                                {locale === 'ar' ? (
                                    <>
                                        <p className="text-xl md:text-2xl font-medium text-white">
                                            في <span className="text-[#f3b8b1] font-bold">First Team</span> لم يكن دورنا مجرد المساعدة في إنجاز المشاريع، بل كنا وما زلنا شركاء في التعلم والتطوير والإبداع. ❤️
                                        </p>
                                        <p>
                                            نشكر كل من كان جزءًا من رحلتنا، ونتطلع إلى المزيد من النجاحات والإنجازات في الأعوام القادمة بإذن الله.
                                        </p>
                                        <div className="p-5 bg-[#171110] rounded-lg border border-[#f3b8b1]/20 my-6 shadow-inner">
                                            <p className="text-[#f3b8b1] flex items-start gap-3 text-right">
                                                <span className="text-2xl">📌</span>
                                                <span>
                                                    مستمرون في دعمكم، ومواصلة تقديم المساعدة في المشاريع، وتنمية المهارات البرمجية والتقنية والتصميمية.
                                                </span>
                                            </p>
                                        </div>
                                        <p className="text-white italic">
                                            الرحلة لا تنتهي هنا... بل هذه مجرد بداية جديدة نحو المزيد من التقدم والتميز
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-xl md:text-2xl font-medium text-white">
                                            At <span className="text-[#f3b8b1] font-bold">First Team</span>, our role went beyond merely helping to complete projects; we were—and remain—partners in learning, development, and creativity. ❤️
                                        </p>
                                        <p>
                                            We thank everyone who has been part of our journey and look forward to further successes and achievements in the years ahead, God willing.
                                        </p>
                                        <div className="p-5 bg-[#171110] rounded-lg border border-[#f3b8b1]/20 my-6 shadow-inner">
                                            <p className="text-[#f3b8b1] flex items-start gap-3 text-left">
                                                <span className="text-2xl">📌</span>
                                                <span>
                                                    We remain committed to supporting you, assisting with projects, and fostering the growth of programming, technical, and design skills.
                                                </span>
                                            </p>
                                        </div>
                                        <p className="text-white italic">
                                            The journey doesn't end here; rather, this is just a new beginning toward greater progress and excellence.
                                        </p>
                                    </>
                                )}
                            </div>
                            
                            {/* Action Button */}
                            <div className="mt-12">
                                <Link
                                    href={route('register')}
                                    className="inline-block font-bold text-[#171110] bg-[#f3b8b1] hover:bg-white transition duration-300 ease-in-out px-8 py-3 rounded-full shadow-[0_0_20px_rgba(243,184,177,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1"
                                >
                                    {t('welcome.join')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
