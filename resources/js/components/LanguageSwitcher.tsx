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
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#f3b8b1]/30 hover:bg-[#f3b8b1]/10 text-white transition-all text-sm font-semibold shadow-sm ${className}`}
            title="Switch Language"
        >
            <Globe className="w-4 h-4 text-[#f3b8b1]" />
            <span>{locale === 'ar' ? 'EN' : 'عربي'}</span>
        </button>
    );
}
