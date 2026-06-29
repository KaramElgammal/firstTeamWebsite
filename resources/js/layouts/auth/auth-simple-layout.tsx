import { Link } from '@inertiajs/react';
import LanguageSwitcher from '@/Components/LanguageSwitcher';

interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-[#171110] text-[#ffffff] selection:bg-[#f3b8b1] selection:text-[#171110] relative">
            <div className="absolute top-6 right-6">
                <LanguageSwitcher />
            </div>
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8 bg-[#251c1a] p-8 rounded-2xl shadow-2xl border border-[#f3b8b1]/20">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium transition-transform hover:scale-105">
                            <div className="mb-2 flex items-center justify-center rounded-md bg-black/20 p-3 border border-[#f3b8b1]/10 shadow-inner">
                                {/* First Team Logo replacing Laravel Logo */}
                                <img 
                                    src="/logo.png" 
                                    alt="First Team Logo" 
                                    className="w-32 h-auto drop-shadow-xl"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/200x100/000000/FFFFFF?text=First+Team';
                                    }}
                                />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-bold text-white tracking-wide">{title}</h1>
                            <p className="text-[#a39997] text-center text-sm">{description}</p>
                        </div>
                    </div>
                    
                    {/* Scope styling overrides for Shadcn UI children (Login/Register Forms) */}
                    <div className="
                        [&_label]:text-[#f3b8b1] [&_label]:font-medium
                        [&_input]:bg-[#171110] [&_input]:border-[#f3b8b1]/30 [&_input]:text-white [&_input]:placeholder:text-[#a39997]/50
                        focus-within:[&_input]:border-[#f3b8b1] focus-within:[&_input]:ring-1 focus-within:[&_input]:ring-[#f3b8b1]
                        [&_button[type='submit']]:bg-[#6b0f0f] [&_button[type='submit']]:text-white [&_button[type='submit']]:hover:bg-[#8b1414] [&_button[type='submit']]:font-bold [&_button[type='submit']]:border-none [&_button[type='submit']]:shadow-lg
                        [&_button[role='checkbox']]:border-[#f3b8b1]/50 [&_button[role='checkbox'][data-state='checked']]:bg-[#f3b8b1] [&_button[role='checkbox'][data-state='checked']]:text-[#171110]
                        [&_a]:text-[#f3b8b1] [&_a]:hover:text-white [&_a]:transition-colors [&_a]:underline-offset-4
                        [&_.text-muted-foreground]:text-[#a39997]
                    ">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
