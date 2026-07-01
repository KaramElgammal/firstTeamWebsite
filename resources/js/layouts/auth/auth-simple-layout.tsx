import { Link } from '@inertiajs/react';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import ThemeToggle from '@/components/theme-toggle';

interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div
            className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 relative"
            style={{
                backgroundColor: 'var(--page-bg)',
                color: 'var(--page-text)',
            }}
        >
            {/* Top-right controls */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
                <ThemeToggle />
                <LanguageSwitcher />
            </div>

            <div className="w-full max-w-sm">
                <div
                    className="flex flex-col gap-8 p-8 rounded-2xl shadow-2xl border"
                    style={{
                        backgroundColor: 'var(--page-bg-secondary)',
                        borderColor: 'var(--page-border)',
                    }}
                >
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium transition-transform hover:scale-105">
                            <div
                                className="mb-2 flex items-center justify-center rounded-4xl p-3 shadow-inner border"
                                style={{
                                    backgroundColor: 'var(--page-inner-box)',
                                    borderColor: 'var(--page-border)',
                                }}
                            >
                                <img 
                                    src="/logo.png" 
                                    alt="First Team Logo" 
                                    className="w-32 h-auto drop-shadow-xl rounded-4xl"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/200x100/000000/FFFFFF?text=First+Team';
                                    }}
                                />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-bold tracking-wide" style={{ color: 'var(--page-text)' }}>{title}</h1>
                            <p className="text-center text-sm" style={{ color: 'var(--page-text-muted)' }}>{description}</p>
                        </div>
                    </div>
                    
                    {/* Scoped overrides for Shadcn form elements */}
                    <div
                        className="
                            [&_label]:font-medium
                            [&_input]:text-sm
                            [&_input]:placeholder:opacity-50
                            [&_button[type='submit']]:font-bold [&_button[type='submit']]:border-none [&_button[type='submit']]:shadow-lg
                        "
                        style={{
                            '--label-color': 'var(--page-accent)',
                            '--input-bg': 'var(--page-inner-box)',
                            '--input-border': 'var(--page-border)',
                            '--input-text': 'var(--page-text)',
                            '--btn-bg': 'var(--page-btn-bg)',
                            '--btn-hover': 'var(--page-btn-hover)',
                        } as React.CSSProperties}
                    >
                        <style>{`
                            .auth-form-scope label { color: var(--page-accent); }
                            .auth-form-scope input { background-color: var(--page-inner-box); border-color: var(--page-border); color: var(--page-text); }
                            .auth-form-scope input:focus { border-color: var(--page-accent); box-shadow: 0 0 0 1px var(--page-accent); }
                            .auth-form-scope input::placeholder { color: var(--page-text-muted); }
                            .auth-form-scope button[type='submit'] { background-color: var(--page-btn-bg); color: white; }
                            .auth-form-scope button[type='submit']:hover { background-color: var(--page-btn-hover); }
                            .auth-form-scope a { color: var(--page-accent); text-underline-offset: 4px; }
                            .auth-form-scope a:hover { color: var(--page-text); }
                            .auth-form-scope .text-muted-foreground { color: var(--page-text-muted); }
                            .auth-form-scope [role='checkbox'] { border-color: var(--page-accent); }
                            .auth-form-scope [role='checkbox'][data-state='checked'] { background-color: var(--page-accent); color: var(--page-bg); }
                        `}</style>
                        <div className="auth-form-scope">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
