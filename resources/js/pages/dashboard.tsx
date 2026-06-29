import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut, CodeXml, Cpu, Box, Bot, ArrowRight, ShieldCheck, MonitorIcon, PaletteIcon } from 'lucide-react';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();
    const user = auth.user;

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
        <div className="min-h-screen bg-[#110c0b] text-[#ffffff] font-sans selection:bg-[#f3b8b1] selection:text-[#171110]">
            <Head title="First Team | Home" />

            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#110c0b]/90 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img 
                            src="/logo.png" 
                            alt="First Team Logo" 
                            className="w-10 h-10 object-contain drop-shadow-lg"
                            onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/40x40/000000/FFFFFF?text=FT';
                            }}
                        />
                        <span className="text-xl font-bold tracking-widest text-white">FT</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#a39997]">
                        <a href="#home" className="hover:text-[#f3b8b1] transition-colors text-white border-b-2 border-[#f3b8b1] pb-1">{t('nav.home') || 'Home'}</a>
                        <a href="#services" className="hover:text-[#f3b8b1] transition-colors">{t('nav.services') || 'Services'}</a>
                        <a href="#about" className="hover:text-[#f3b8b1] transition-colors">{t('nav.about') || 'About'}</a>
                        <a href="#contact" className="hover:text-[#f3b8b1] transition-colors">{t('nav.contact') || 'Contact'}</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />

                        <DropdownMenu>
                            <DropdownMenuTrigger className="focus:outline-none">
                                <Avatar className="h-10 w-10 border-2 border-[#f3b8b1]/30 hover:border-[#f3b8b1] transition-colors cursor-pointer bg-[#251c1a]">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=6b0f0f&textColor=f3b8b1`} alt={user.name} />
                                    <AvatarFallback className="bg-[#6b0f0f] text-[#f3b8b1] font-bold">
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-[#251c1a] border-[#f3b8b1]/20 text-white shadow-2xl">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none text-white">{user.name}</p>
                                        <p className="text-xs leading-none text-[#a39997]">{user.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem asChild className="hover:bg-[#f3b8b1]/10 focus:bg-[#f3b8b1]/10 focus:text-white cursor-pointer">
                                    <Link href={route('profile.edit')} className="flex items-center w-full">
                                        <User className="rtl:ml-2 ltr:mr-2 h-4 w-4 text-[#f3b8b1]" />
                                        <span>{t('nav.my_profile')}</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem asChild className="text-red-400 hover:bg-red-400/10 focus:bg-red-400/10 focus:text-red-400 cursor-pointer">
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

            {/* Hero Section */}
            <section id="home" className="py-24 px-6 relative flex flex-col items-center justify-center text-center min-h-[70vh]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#6b0f0f]/10 via-[#110c0b] to-[#110c0b] pointer-events-none"></div>
                
                <div className="mb-6 animate-pulse">
                    <img 
                        src="/logo.png" 
                        alt="First Team Icon" 
                        className="w-20 h-20 object-contain mx-auto"
                        onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/80x80/000000/FFFFFF?text=FT';
                        }}
                    />
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
                    {t('hero.title1') || 'First Team: '}<span className="text-[#f3b8b1] italic">{t('hero.title2') || 'Excellence'}</span>{t('hero.title3') || ' in Action'}
                </h1>
                
                <p className="text-[#a39997] text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
                    {t('hero.desc') || 'High-performance solutions for elite organizations. We design, develop, and engineer with tactical precision to drive your team toward absolute dominance.'}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 z-10">
                    <a href="#services" className="bg-[#f3b8b1] text-[#110c0b] hover:bg-white font-bold px-8 py-3 rounded tracking-widest transition-all">
                        {t('hero.btn_learn') || 'LEARN MORE'}
                    </a>
                    <a href="#portfolio" className="bg-transparent border border-white/20 text-white hover:bg-white/5 font-bold px-8 py-3 rounded tracking-widest transition-all">
                        {t('hero.btn_portfolio') || 'VIEW PORTFOLIO'}
                    </a>
                </div>
            </section>

            {/* Core Services Section */}
            <section id="services" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
                <div className="mb-12">
                    <p className="text-[#f3b8b1] text-xs font-bold tracking-[0.2em] uppercase mb-2">{t('services.subtitle') || 'Operational Capabilities'}</p>
                    <h2 className="text-4xl font-bold">{t('services.title') || 'Core Services'}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-[#1a1413] p-8 rounded-lg border border-white/5 hover:border-[#f3b8b1]/30 transition-colors group cursor-pointer">
                        <div className="bg-[#251c1a] w-12 h-12 rounded flex items-center justify-center mb-6 group-hover:bg-[#6b0f0f] transition-colors">
                            <CodeXml className="text-[#f3b8b1]" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{t('services.sw_title') || 'Software Development'}</h3>
                        <p className="text-[#a39997] text-sm leading-relaxed mb-6">
                            {t('services.sw_desc') || 'Hard-coded excellence using modern tech stacks. Scalable architectures built for mission-critical reliability.'}
                        </p>
                        <div className="h-0.5 w-12 bg-[#6b0f0f] group-hover:w-full transition-all duration-300"></div>
                    </div>

                    <div className="bg-[#1a1413] p-8 rounded-lg border border-white/5 hover:border-[#f3b8b1]/30 transition-colors group cursor-pointer">
                        <div className="bg-[#251c1a] w-12 h-12 rounded flex items-center justify-center mb-6 group-hover:bg-[#6b0f0f] transition-colors">
                            <MonitorIcon className="text-[#f3b8b1]" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{t('services.web_title') || 'Web Development'}</h3>
                        <p className="text-[#a39997] text-sm leading-relaxed mb-6">
                            {t('services.web_desc') || 'High-performance websites and web applications tailored for speed, security, and exceptional user experience.'}
                        </p>
                        <div className="h-0.5 w-12 bg-[#6b0f0f] group-hover:w-full transition-all duration-300"></div>
                    </div>

                    <div className="bg-[#1a1413] p-8 rounded-lg border border-white/5 hover:border-[#f3b8b1]/30 transition-colors group cursor-pointer">
                        <div className="bg-[#251c1a] w-12 h-12 rounded flex items-center justify-center mb-6 group-hover:bg-[#6b0f0f] transition-colors">
                            <Cpu className="text-[#f3b8b1]" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{t('services.hw_title') || 'Hardware Engineering'}</h3>
                        <p className="text-[#a39997] text-sm leading-relaxed mb-6">
                            {t('services.hw_desc') || 'Custom circuitry and robust electronic design for high-stress operational environments.'}
                        </p>
                        <div className="h-0.5 w-12 bg-[#6b0f0f] group-hover:w-full transition-all duration-300"></div>
                    </div>
                    
                    <div className="bg-[#1a1413] p-8 rounded-lg border border-white/5 hover:border-[#f3b8b1]/30 transition-colors group cursor-pointer">
                        <div className="bg-[#251c1a] w-12 h-12 rounded flex items-center justify-center mb-6 group-hover:bg-[#6b0f0f] transition-colors">
                            <Box className="text-[#f3b8b1]" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{t('services.3d_title') || '3D Design & Printing'}</h3>
                        <p className="text-[#a39997] text-sm leading-relaxed mb-6">
                            {t('services.3d_desc') || 'Rapid prototyping and precision manufacturing using advanced additive technologies and modeling.'}
                        </p>
                        <div className="h-0.5 w-12 bg-[#6b0f0f] group-hover:w-full transition-all duration-300"></div>
                    </div>
                    
                    <div className="bg-[#1a1413] p-8 rounded-lg border border-white/5 hover:border-[#f3b8b1]/30 transition-colors group cursor-pointer">
                        <div className="bg-[#251c1a] w-12 h-12 rounded flex items-center justify-center mb-6 group-hover:bg-[#6b0f0f] transition-colors">
                            <PaletteIcon className="text-[#f3b8b1]" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{t('services.graphic_title') || 'Graphic Design & Multimedia'}</h3>
                        <p className="text-[#a39997] text-sm leading-relaxed mb-6">
                            {t('services.graphic_desc') || 'Professional branding, photo editing, video montage, and documentation to visually dominate your market.'}
                        </p>
                        <div className="h-0.5 w-12 bg-[#6b0f0f] group-hover:w-full transition-all duration-300"></div>
                    </div>

                    <div className="bg-[#1a1413] p-8 rounded-lg border border-white/5 hover:border-[#f3b8b1]/30 transition-colors group cursor-pointer">
                        <div className="bg-[#251c1a] w-12 h-12 rounded flex items-center justify-center mb-6 group-hover:bg-[#6b0f0f] transition-colors">
                            <Bot className="text-[#f3b8b1]" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{t('services.robotics_title') || 'Robotics'}</h3>
                        <p className="text-[#a39997] text-sm leading-relaxed mb-6">
                            {t('services.robotics_desc') || 'Automated strike systems and autonomous agents engineered for precision movement and execution.'}
                        </p>
                        <div className="h-0.5 w-12 bg-[#6b0f0f] group-hover:w-full transition-all duration-300"></div>
                    </div>
                </div>
            </section>

            {/* About / Doctrine Section */}
            <section className="py-24 px-6 bg-[#160f0e] border-y border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 relative">
                        <div className="absolute -inset-4 bg-[#6b0f0f]/20 blur-2xl rounded-full"></div>
                        <div className="relative border border-white/10 rounded-xl overflow-hidden bg-black aspect-[16/10]">
                            <img 
                                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" 
                                alt="Command Center" 
                                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute bottom-6 rtl:left-6 ltr:right-6 bg-[#1a1413] border border-[#f3b8b1]/30 p-4 rounded shadow-2xl flex flex-col items-center">
                                <span className="text-3xl font-bold text-white mb-1">120+</span>
                                <span className="text-[#f3b8b1] text-[10px] tracking-widest font-bold uppercase">{t('about.missions') || 'Missions Completed'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:w-1/2">
                        <p className="text-[#f3b8b1] text-xs font-bold tracking-[0.2em] uppercase mb-4">{t('about.subtitle') || 'Our Doctrine'}</p>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            {t('about.title1') || 'Built by Experts,'}<br/>{t('about.title2') || 'Focused on '}<span className="text-[#f3b8b1] italic">{t('about.title3') || 'Results'}</span>
                        </h2>
                        <div className="space-y-6 text-[#a39997] leading-relaxed mb-8">
                            <p>{t('about.desc1') || 'First Team was founded on the principle that average is unacceptable. We operate as a high-performance strike team for your business, bridging the gap between complex technical problems and elegant, aggressive solutions.'}</p>
                            <p>{t('about.desc2') || 'Our personnel are veterans of the digital and physical engineering landscapes, battle-tested across industries and dedicated to the mission of elevating our clients to the next level of operational excellence.'}</p>
                        </div>
                        
                    </div>
                </div>
            </section>


            {/* Footer */}
            <footer className="border-t border-white/5 py-12 px-6 mt-12 bg-black/50">
                <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-6">
                    <div className="flex items-center gap-3">
                        <img 
                            src="/logo.png" 
                            alt="First Team Logo" 
                            className="w-6 h-6 object-contain grayscale opacity-70"
                            onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/24x24/000000/FFFFFF?text=FT';
                            }}
                        />
                        <span className="text-lg font-bold tracking-[0.2em] text-white/70 uppercase">First Team</span>
                    </div>
                    <div className="flex gap-6 text-xs font-bold tracking-widest text-[#a39997] uppercase">
                        <a href="#" className="hover:text-white transition-colors">{t('footer.privacy') || 'Privacy Policy'}</a>
                        <a href="#" className="hover:text-white transition-colors">{t('footer.terms') || 'Terms of Service'}</a>
                        <a href="#" className="hover:text-white transition-colors">{t('footer.contact') || 'Contact Us'}</a>
                    </div>
                    <div className="text-[10px] text-white/30 tracking-widest uppercase">
                        &copy; {new Date().getFullYear()} {t('footer.rights') || 'First Team. All rights reserved.'}
                    </div>
                </div>
            </footer>
        </div>
    );
}
