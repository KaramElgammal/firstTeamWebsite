import { usePage, router } from '@inertiajs/react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
    const { locale } = usePage().props as any;

    const toggleLanguage = () => {
        const nextLocale = locale === 'ar' ? 'en' : 'ar';
        router.get(route('lang.switch', nextLocale), {}, { preserveScroll: true });
    };

    return (
        <button 
            onClick={toggleLanguage} 
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-sm font-semibold shadow-sm ${className}`}
            style={{ borderColor: 'var(--page-border)', color: 'var(--page-text)', backgroundColor: 'transparent' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'color-mix(in srgb, var(--page-accent) 10%, transparent)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
            title="Switch Language"
        >
            <Globe className="w-4 h-4" style={{ color: 'var(--page-accent)' }} />
            <span>{locale === 'ar' ? 'EN' : 'عربي'}</span>
        </button>
    );
}
