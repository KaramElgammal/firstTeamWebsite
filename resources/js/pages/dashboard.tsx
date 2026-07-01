import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import ThemeToggle from '@/components/theme-toggle';
import { useTranslation } from '@/hooks/useTranslation';
import { useState } from 'react';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut, CodeXml, Cpu, Box, Bot, MonitorIcon, PaletteIcon, Menu, X } from 'lucide-react';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();
    const user = auth.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
        <div
            className="min-h-screen font-sans"
            style={{ backgroundColor: 'var(--page-bg)', color: 'var(--page-text)' }}
        >
            <Head title="First Team | Home" />

            {/* Header */}
            <header
                className="sticky top-0 z-50 backdrop-blur-md border-b"
                style={{ backgroundColor: 'var(--page-header-bg)', borderColor: 'var(--page-border)' }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img 
                            src="/logo.png" 
                            alt="First Team Logo" 
                            className="w-10 object-contain drop-shadow-lg rounded-full"
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/40x40/000000/FFFFFF?text=FT'; }}
                        />
                        <span className="text-xl font-bold tracking-widest" style={{ color: 'var(--page-text)' }}>FT</span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-bold" style={{ color: 'var(--page-text-muted)' }}>
                        <a href="#home" className="transition-colors border-b-2 pb-1" style={{ color: 'var(--page-text)', borderColor: 'var(--page-accent)' }}>{t('nav.home') || 'Home'}</a>
                        <Link href={route('services')} className="transition-colors hover:text-[var(--page-accent)]">{t('nav.services') || 'Services'}</Link>
                        <a href="#about" className="transition-colors hover:text-[var(--page-accent)]">{t('nav.about') || 'About'}</a>
                        <Link href={route('contact')} className="transition-colors hover:text-[var(--page-accent)]">{t('nav.contact') || 'Contact'}</Link>
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <ThemeToggle />
                        <LanguageSwitcher />

                        {/* Hamburger - mobile only */}
                        <button
                            className="md:hidden p-2 rounded-md transition-colors"
                            style={{ color: 'var(--page-text)' }}
                            onClick={() => setMobileMenuOpen(prev => !prev)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="focus:outline-none">
                                <Avatar
                                    className="h-10 w-10 border-2 transition-colors cursor-pointer"
                                    style={{ borderColor: 'var(--page-border)', backgroundColor: 'var(--page-bg-secondary)' }}
                                >
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=6b0f0f&textColor=f3b8b1`} alt={user.name} />
                                    <AvatarFallback className="font-bold" style={{ backgroundColor: 'var(--page-btn-bg)', color: 'var(--page-accent)' }}>
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-56 shadow-2xl border"
                                style={{ backgroundColor: 'var(--page-bg-secondary)', borderColor: 'var(--page-border)', color: 'var(--page-text)' }}
                            >
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none" style={{ color: 'var(--page-text)' }}>{user.name}</p>
                                        <p className="text-xs leading-none" style={{ color: 'var(--page-text-muted)' }}>{user.email}</p>
                                    </div>
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

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden fixed top-0 left-0 right-0 z-40 flex flex-col"
                    style={{ backgroundColor: 'var(--page-bg)' }}
                >
                    {/* Overlay Header */}
                    <div
                        className="flex items-center justify-between px-4 py-4 border-b"
                        style={{ borderColor: 'var(--page-border)' }}
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src="/logo.png"
                                alt="First Team Logo"
                                className="w-10 object-contain drop-shadow-lg rounded-full"
                                onError={(e) => { e.currentTarget.src = 'https://placehold.co/40x40/000000/FFFFFF?text=FT'; }}
                            />
                            <span className="text-xl font-bold tracking-widest" style={{ color: 'var(--page-text)' }}>FT</span>
                        </div>
                        <button
                            className="p-2 rounded-md"
                            style={{ color: 'var(--page-text)' }}
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Overlay Links */}
                    <nav className="flex flex-col gap-2 px-6 py-8 text-lg font-bold" style={{ color: 'var(--page-text-muted)' }}>
                        <a href="#home" onClick={() => setMobileMenuOpen(false)} className="py-4 border-b transition-colors" style={{ color: 'var(--page-accent)', borderColor: 'var(--page-border)' }}>{t('nav.home') || 'Home'}</a>
                        <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-4 border-b transition-colors hover:text-[var(--page-accent)]" style={{ borderColor: 'var(--page-border)' }}>{t('nav.services') || 'Services'}</a>
                        <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-4 border-b transition-colors hover:text-[var(--page-accent)]" style={{ borderColor: 'var(--page-border)' }}>{t('nav.about') || 'About'}</a>
                        <Link href={route('contact')} onClick={() => setMobileMenuOpen(false)} className="py-4 transition-colors hover:text-[var(--page-accent)]">{t('nav.contact') || 'Contact'}</Link>
                    </nav>
                </div>
            )}

            {/* Hero Section */}
            <section id="home" className="py-16 px-4 sm:py-24 sm:px-6 relative flex flex-col items-center justify-center text-center min-h-[70vh]">
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, color-mix(in srgb, var(--page-btn-bg) 15%, transparent), var(--page-bg))' }}></div>
                
                <div className="mb-6 animate-pulse">
                    <img 
                        src="/logo.png" 
                        alt="First Team Icon" 
                        className="w-40 object-contain mx-auto rounded-full"
                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/80x80/000000/FFFFFF?text=FT'; }}
                    />
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight" style={{ color: 'var(--page-text)' }}>
                    {t('hero.title1') || 'First Team: '}<span className="italic" style={{ color: 'var(--page-accent)' }}>{t('hero.title2') || 'Excellence'}</span>{t('hero.title3') || ' in Action'}
                </h1>
                
                <p className="text-lg md:text-xl max-w-2xl mb-12 leading-relaxed" style={{ color: 'var(--page-text-muted)' }}>
                    {t('hero.desc') || 'High-performance solutions for elite organizations. We design, develop, and engineer with tactical precision to drive your team toward absolute dominance.'}
                </p>
                
                
            </section>

            {/* Core Services Section */}
            <section id="services" className="py-16 px-4 sm:py-24 sm:px-6 max-w-7xl mx-auto border-t" style={{ borderColor: 'var(--page-border)' }}>
                <div className="mb-8 sm:mb-12">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--page-accent)' }}>{t('services.subtitle') || 'Operational Capabilities'}</p>
                    <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--page-text)' }}>{t('services.title') || 'Core Services'}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {[
                        { icon: <CodeXml style={{ color: 'var(--page-accent)' }} />, titleKey: 'services.sw_title', descKey: 'services.sw_desc', titleFb: 'Software Development', descFb: 'Hard-coded excellence using modern tech stacks. Scalable architectures built for mission-critical reliability.' },
                        { icon: <MonitorIcon style={{ color: 'var(--page-accent)' }} />, titleKey: 'services.web_title', descKey: 'services.web_desc', titleFb: 'Web Development', descFb: 'High-performance websites and web applications tailored for speed, security, and exceptional user experience.' },
                        { icon: <Cpu style={{ color: 'var(--page-accent)' }} />, titleKey: 'services.hw_title', descKey: 'services.hw_desc', titleFb: 'Hardware Engineering', descFb: 'Custom circuitry and robust electronic design for high-stress operational environments.' },
                        { icon: <Box style={{ color: 'var(--page-accent)' }} />, titleKey: 'services.3d_title', descKey: 'services.3d_desc', titleFb: '3D Design & Printing', descFb: 'Rapid prototyping and precision manufacturing using advanced additive technologies and modeling.' },
                        { icon: <PaletteIcon style={{ color: 'var(--page-accent)' }} />, titleKey: 'services.graphic_title', descKey: 'services.graphic_desc', titleFb: 'Graphic Design & Multimedia', descFb: 'Professional branding, photo editing, video montage, and documentation to visually dominate your market.' },
                        { icon: <Bot style={{ color: 'var(--page-accent)' }} />, titleKey: 'services.robotics_title', descKey: 'services.robotics_desc', titleFb: 'Robotics', descFb: 'Automated strike systems and autonomous agents engineered for precision movement and execution.' },
                    ].map((svc, i) => (
                        <Link
                            key={i}
                            href={route('services')}
                            className="p-5 sm:p-8 rounded-lg border transition-colors group cursor-pointer block"
                            style={{ backgroundColor: 'var(--page-inner-box)', borderColor: 'var(--page-border)' }}
                        >
                            <div className="w-12 h-12 rounded flex items-center justify-center mb-6 transition-colors" style={{ backgroundColor: 'var(--page-bg-secondary)' }}>
                                {svc.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--page-text)' }}>{t(svc.titleKey) || svc.titleFb}</h3>
                            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--page-text-muted)' }}>
                                {t(svc.descKey) || svc.descFb}
                            </p>
                            <div className="h-0.5 w-12 group-hover:w-full transition-all duration-300" style={{ backgroundColor: 'var(--page-btn-bg)' }}></div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 px-4 sm:py-24 sm:px-6 border-y" style={{ backgroundColor: 'var(--page-bg-secondary)', borderColor: 'var(--page-border)' }}>
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                    <div className="lg:w-1/2 relative">
                        <div className="absolute -inset-4 blur-2xl rounded-full" style={{ backgroundColor: 'color-mix(in srgb, var(--page-btn-bg) 20%, transparent)' }}></div>
                        <div className="relative border rounded-xl overflow-hidden aspect-[16/10]" style={{ backgroundColor: 'var(--page-inner-box)', borderColor: 'var(--page-border)' }}>
                            <img 
                                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" 
                                alt="Command Center" 
                                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute bottom-6 rtl:left-6 ltr:right-6 border p-4 rounded shadow-2xl flex flex-col items-center" style={{ backgroundColor: 'var(--page-bg-secondary)', borderColor: 'var(--page-border)' }}>
                                <span className="text-3xl font-bold mb-1" style={{ color: 'var(--page-text)' }}>120+</span>
                                <span className="text-[10px] tracking-widest font-bold uppercase" style={{ color: 'var(--page-accent)' }}>{t('about.missions') || 'Missions Completed'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:w-1/2">
                        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--page-accent)' }}>{t('about.subtitle') || 'Our Doctrine'}</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: 'var(--page-text)' }}>
                            {t('about.title1') || 'Built by Experts,'}<br/>{t('about.title2') || 'Focused on '}<span className="italic" style={{ color: 'var(--page-accent)' }}>{t('about.title3') || 'Results'}</span>
                        </h2>
                        <div className="space-y-6 leading-relaxed mb-8" style={{ color: 'var(--page-text-muted)' }}>
                            <p>{t('about.desc1') || 'First Team was founded on the principle that average is unacceptable. We operate as a high-performance strike team for your business, bridging the gap between complex technical problems and elegant, aggressive solutions.'}</p>
                            <p>{t('about.desc2') || 'Our personnel are veterans of the digital and physical engineering landscapes, battle-tested across industries and dedicated to the mission of elevating our clients to the next level of operational excellence.'}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t py-10 px-4 sm:py-12 sm:px-6 mt-8 sm:mt-12" style={{ borderColor: 'var(--page-border)', backgroundColor: 'var(--page-inner-box)' }}>
                <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-5 sm:gap-6">
                    <div className="flex items-center gap-3">
                        <img 
                            src="/logo.png" 
                            alt="First Team Logo" 
                            className="w-6 h-6 object-contain grayscale opacity-70"
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/24x24/000000/FFFFFF?text=FT'; }}
                        />
                        <span className="text-lg font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--page-text-muted)' }}>First Team</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--page-text-muted)' }}>
                        <a href="#" className="transition-colors hover:text-[var(--page-text)]">{t('footer.privacy') || 'Privacy Policy'}</a>
                        <a href="#" className="transition-colors hover:text-[var(--page-text)]">{t('footer.terms') || 'Terms of Service'}</a>
                        <a href="#" className="transition-colors hover:text-[var(--page-text)]">{t('footer.contact') || 'Contact Us'}</a>
                    </div>
                    <div className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--page-text-muted)', opacity: 0.5 }}>
                        &copy; {new Date().getFullYear()} {t('footer.rights') || 'First Team. All rights reserved.'}
                    </div>
                </div>
            </footer>
        </div>
    );
}
