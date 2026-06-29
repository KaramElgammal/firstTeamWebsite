import { useAppearance } from '@/hooks/use-appearance';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
    const { appearance, updateAppearance } = useAppearance();

    const toggle = () => {
        updateAppearance(appearance === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="
                inline-flex items-center justify-center
                h-9 w-9 rounded-full
                transition-all duration-200
                text-[var(--page-text-muted)]
                hover:text-[var(--page-accent)]
                hover:bg-[var(--page-accent)]/10
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--page-accent)]
            "
        >
            {appearance === 'dark' ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </button>
    );
}
