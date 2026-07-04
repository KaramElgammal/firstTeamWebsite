import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import ThemeToggle from '@/components/theme-toggle';
import { useTranslation } from '@/hooks/useTranslation';
import { useState } from 'react';
import SiteUserAvatarMenu from '@/components/site-user-avatar-menu';
import { CodeXml, Cpu, Box, Bot, MonitorIcon, PaletteIcon, Menu, X } from 'lucide-react';
export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();
    const user = auth.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                        <SiteUserAvatarMenu user={user} isAdmin={auth.isAdmin} />
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
                        </div>
                    </div>
                    
                    <div className="lg:w-1/2">
                        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--page-accent)' }}>{t('about.subtitle') || 'Who We Are'}</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: 'var(--page-text)' }}>
                            {t('about.title1') || 'About'}{' '}<span className="italic" style={{ color: 'var(--page-accent)' }}>{t('about.title3') || 'First Team'}</span>
                        </h2>
                        <div className="space-y-4 leading-relaxed mb-8" style={{ color: 'var(--page-text-muted)' }}>
                            <p>{t('about.desc1') || 'First Team is a student-led technical team from Borg El Arab Technological University, founded with the goal of empowering students to gain hands-on experience and transform innovative ideas into real-world projects with tangible impact.'}</p>
                            <p>{t('about.desc2') || 'The team brings together a distinguished group of students from various disciplines to work as one unit, developing technical solutions in the fields of programming, artificial intelligence, embedded systems, electronics, 3D printing, and engineering model design.'}</p>
                            <p>{t('about.desc3') || 'First Team\'s role is not limited to learning — it extends to providing technical services and solutions for individuals and organizations, with a commitment to the highest standards of quality and professionalism.'}</p>
                            <p className="font-semibold" style={{ color: 'var(--page-accent)' }}>{t('about.vision') || 'Our Vision: To be a leading technical community that inspires students and contributes to developing innovative solutions that serve society.'}</p>
                            <p className="font-semibold" style={{ color: 'var(--page-accent)' }}>{t('about.mission') || 'Our Mission: To empower youth to acquire practical skills, encourage creativity, and turn ideas into successful projects of real value.'}</p>
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
                    
                    {/* Social Links */}
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
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
                    <div className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--page-text-muted)', opacity: 0.5 }}>
                        &copy; {new Date().getFullYear()} {t('footer.rights') || 'First Team. All rights reserved.'}
                    </div>
                </div>
            </footer>
        </div>
    );
}
