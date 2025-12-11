import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AiSearchModal from './AiSearchModal';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  
  // Theme State Management
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme as 'light' | 'dark';
        }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const navigation = [
    { 
      name: 'Services', 
      path: '/services',
      type: 'dropdown',
      width: 'w-[600px]',
      gridCols: 'grid-cols-2',
      children: [
        { name: 'Web Development', path: '/services/web-development', icon: 'code', desc: 'Custom, high-performance websites.' },
        { name: 'SEO Optimization', path: '/services/seo', icon: 'trending_up', desc: 'Rank higher & drive traffic.' },
        { name: 'Paid Advertising', path: '/services/paid-advertising', icon: 'campaign', desc: 'ROI-focused PPC campaigns.' },
        { name: 'Branding', path: '/services/branding', icon: 'palette', desc: 'Build a memorable identity.' },
      ]
    },
    { name: 'Case Studies', path: '/case-studies', type: 'link' },
    { name: 'Pricing', path: '/pricing', type: 'link' },
    { name: 'About Us', path: '/about', type: 'link' },
    { 
      name: 'Resources', 
      path: '/resources',
      type: 'dropdown',
      width: 'w-80',
      gridCols: 'grid-cols-1',
      children: [
        { name: 'Blog', path: '/blog', icon: 'article', desc: 'Latest industry insights.' },
        { name: 'Resource Library', path: '/resources', icon: 'library_books', desc: 'Guides, templates & more.' },
        { name: 'ROI Calculator', path: '/roi-calculator', icon: 'calculate', desc: 'Forecast your growth potential.' },
      ]
    },
    { name: 'Contact', path: '/contact', type: 'link' }
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 font-sans text-slate-900 dark:text-slate-100 bg-background-light dark:bg-[#0f1115]">
      <header 
        className={`fixed top-0 z-50 w-full transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-[#0a0a23]/95 backdrop-blur-xl border-white/10 py-3 shadow-lg' 
            : 'bg-[#0a0a23] border-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <Link to="/" aria-label="Home">
                <Logo iconClass="h-8 w-auto" textClass="text-white" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item, idx) => (
                <div key={idx} className="relative group px-1">
                  {item.type === 'link' ? (
                    <Link 
                      to={item.path} 
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 font-sans tracking-wide ${
                        isActive(item.path) 
                          ? 'text-primary bg-white/10' 
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <div className="relative">
                      <button 
                        className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 font-sans tracking-wide group-hover:bg-white/5 ${
                          isActive(item.path)
                            ? 'text-primary bg-white/10'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {item.name}
                        <span className="material-symbols-outlined text-sm transition-transform duration-200 group-hover:rotate-180 opacity-50">expand_more</span>
                      </button>
                      
                      {/* Mega Menu / Dropdown */}
                      <div className={`absolute left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 ${item.width || 'w-72'}`}>
                        <div className="bg-[#1a2230] rounded-xl shadow-2xl border border-white/10 p-2 overflow-hidden ring-1 ring-black/20">
                          <div className={`grid gap-1 ${item.gridCols || 'grid-cols-1'}`}>
                              {item.children?.map((child, childIdx) => (
                                <Link 
                                  key={childIdx} 
                                  to={child.path}
                                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                                >
                                  <div className="mt-1 w-8 h-8 rounded-lg bg-blue-500/10 text-primary flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                    <span className="material-symbols-outlined text-lg">{child.icon}</span>
                                  </div>
                                  <div>
                                    <div className="text-sm font-bold text-white group-hover/item:text-primary transition-colors font-sans">{child.name}</div>
                                    <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">{child.desc}</div>
                                  </div>
                                </Link>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
               <button 
                onClick={() => setIsSearchOpen(true)}
                className="w-9 h-9 flex items-center justify-center rounded-full transition-colors text-slate-300 hover:bg-white/10 hover:text-white"
                aria-label="Search"
               >
                 <span className="material-symbols-outlined text-xl">search</span>
               </button>

               <button 
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-full transition-colors text-slate-300 hover:bg-white/10 hover:text-white"
                aria-label="Toggle Dark Mode"
               >
                 <span className="material-symbols-outlined text-xl transition-transform duration-500 rotate-0 dark:-rotate-180">
                    {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                 </span>
               </button>

               <div className="h-5 w-px mx-1 bg-white/20"></div>

               <Link to="/login" className="text-sm font-bold transition-colors px-2 font-sans text-slate-300 hover:text-white">
                Login
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-lg bg-[#00c77d] px-6 py-2.5 text-sm font-bold text-[#0a0a23] shadow-lg shadow-[#00c77d]/20 hover:bg-[#00e08d] hover:shadow-[#00c77d]/40 hover:-translate-y-0.5 transition-all duration-200 font-sans">
                Get a Quote
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden flex items-center gap-3">
               <button 
                onClick={toggleTheme}
                className="p-2 rounded-full transition-colors text-white hover:bg-white/10"
               >
                 <span className="material-symbols-outlined text-xl">
                    {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                 </span>
               </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl transition-colors text-white hover:bg-white/10"
                aria-label="Menu"
              >
                <span className="material-symbols-outlined text-2xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed inset-0 z-40 bg-[#0f1115] transition-transform duration-300 pt-24 px-6 overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col gap-6 pb-12">
                {/* Mobile Search */}
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400">search</span>
                    <button 
                        onClick={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }}
                        className="w-full text-left bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-slate-400 text-sm font-sans"
                    >
                        Search site...
                    </button>
                </div>

                <nav className="flex flex-col space-y-1">
                    {navigation.map((item, idx) => (
                        <div key={idx} className="border-b border-white/5 pb-2 last:border-0">
                            {item.type === 'link' ? (
                                <Link 
                                    to={item.path} 
                                    className={`block py-3 text-lg font-bold font-sans ${isActive(item.path) ? 'text-primary' : 'text-white'}`}
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <div className="py-2">
                                    <div className={`py-1 text-lg font-bold text-white mb-2 font-sans`}>{item.name}</div>
                                    <div className="pl-4 border-l-2 border-white/10 space-y-3">
                                        {item.children?.map((child, cIdx) => (
                                            <Link 
                                                key={cIdx} 
                                                to={child.path} 
                                                className="flex items-center gap-3 py-2 text-slate-300 hover:text-primary transition-colors font-sans"
                                            >
                                                <span className="material-symbols-outlined text-lg opacity-70">{child.icon}</span>
                                                <span className="font-medium">{child.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="flex flex-col gap-4 mt-4">
                    <Link to="/login" className="w-full py-3 text-center font-bold text-slate-200 border border-white/10 rounded-xl hover:bg-white/5 font-sans">
                        Client Login
                    </Link>
                    <Link to="/contact" className="w-full py-3 text-center font-bold text-[#0a0a23] bg-[#00c77d] rounded-xl hover:bg-[#00e08d] shadow-lg shadow-[#00c77d]/20 font-sans">
                        Get a Quote
                    </Link>
                </div>
            </div>
        </div>
      </header>

      {/* Spacer */}
      <div className={`h-20 ${!scrolled && location.pathname !== '/' ? 'mb-6' : ''}`}></div>

      <AiSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer - Optimized for Mobile Readability */}
      <footer className="bg-slate-50 dark:bg-[#050505] border-t border-slate-200 dark:border-white/5 pt-16 pb-10 font-sans relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{backgroundImage: "radial-gradient(#6366f1 1px, transparent 1px)", backgroundSize: "32px 32px"}}></div>
          
          <div className="container mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
                  
                  {/* Brand & Newsletter Column - Full width on mobile */}
                  <div className="lg:col-span-4 md:col-span-4 space-y-6">
                      <a href="/" className="inline-block" aria-label="Marketing Widget Home">
                        <Logo />
                      </a>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base max-w-md">
                          AI-Powered Digital Success. We transform messy marketing data into a predictable revenue engine through advanced strategies and cutting-edge technology.
                      </p>
                      
                      <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                          <h5 className="font-bold text-slate-900 dark:text-white mb-2 font-display text-lg">Subscribe to Insights</h5>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Get the latest AI marketing trends delivered to your inbox.</p>
                          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                              <input 
                                id="newsletter-email"
                                type="email" 
                                placeholder="Enter email address" 
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-base text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-colors"
                              />
                              <button className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 py-2 flex items-center justify-center transition-colors" aria-label="Subscribe">
                                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                              </button>
                          </form>
                      </div>
                  </div>

                  {/* Links Columns - Stacked on mobile */}
                  <div className="lg:col-span-2 md:col-span-2">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-6 font-display tracking-wide text-lg">Services</h4>
                      <ul className="space-y-4 text-base text-slate-600 dark:text-slate-400">
                          <li><Link to="/services/web-development" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Web Development</Link></li>
                          <li><Link to="/services/seo" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">SEO Optimization</Link></li>
                          <li><Link to="/services/paid-advertising" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Paid Advertising</Link></li>
                          <li><Link to="/services/branding" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Branding & Identity</Link></li>
                          <li><Link to="/services" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200 font-bold text-primary mt-2">View All Services →</Link></li>
                      </ul>
                  </div>

                  <div className="lg:col-span-2 md:col-span-2">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-6 font-display tracking-wide text-lg">Company</h4>
                      <ul className="space-y-4 text-base text-slate-600 dark:text-slate-400">
                          <li><Link to="/about" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">About Us</Link></li>
                          <li><Link to="/careers" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200 flex items-center gap-2">Careers <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-[10px] font-bold px-1.5 py-0.5 rounded">HIRING</span></Link></li>
                          <li><Link to="/archive" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Our History</Link></li>
                          <li><Link to="/contact" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Contact</Link></li>
                          <li><Link to="/privacy" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Privacy Policy</Link></li>
                          <li><Link to="/terms" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Terms of Service</Link></li>
                      </ul>
                  </div>

                  <div className="lg:col-span-4 md:col-span-4">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-6 font-display tracking-wide text-lg">Contact & Connect</h4>
                      <div className="space-y-5">
                          <div className="flex items-start gap-4 text-slate-600 dark:text-slate-400 text-base group">
                               <div className="bg-white dark:bg-white/5 p-2 rounded-lg border border-slate-200 dark:border-white/10 group-hover:border-primary/50 transition-colors shrink-0">
                                   <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                               </div>
                               <span className="mt-1">House 108, Road 10/2, Block D, Niketan,<br/>Gulshan 1, Dhaka, Bangladesh</span>
                          </div>
                           <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 text-base group">
                               <div className="bg-white dark:bg-white/5 p-2 rounded-lg border border-slate-200 dark:border-white/10 group-hover:border-primary/50 transition-colors shrink-0">
                                   <span className="material-symbols-outlined text-primary text-xl">call</span>
                               </div>
                               <a href="tel:+8801580351067" className="hover:text-primary transition-colors font-medium">+880 1580 351067</a>
                          </div>
                           <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 text-base group">
                               <div className="bg-white dark:bg-white/5 p-2 rounded-lg border border-slate-200 dark:border-white/10 group-hover:border-primary/50 transition-colors shrink-0">
                                   <span className="material-symbols-outlined text-primary text-xl">mail</span>
                               </div>
                               <a href="mailto:sales@marketingwidget.com" className="hover:text-primary transition-colors font-medium">sales@marketingwidget.com</a>
                          </div>
                      </div>

                      <div className="flex gap-4 pt-8 flex-wrap">
                          <a href="https://www.facebook.com/marketingwidget" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-12 h-12 rounded-xl bg-white dark:bg-[#111] flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all shadow-sm border border-slate-200 dark:border-white/10 hover:-translate-y-1">
                             <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                          </a>
                          <a href="https://www.linkedin.com/company/marketing-widget-bd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-12 h-12 rounded-xl bg-white dark:bg-[#111] flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all shadow-sm border border-slate-200 dark:border-white/10 hover:-translate-y-1">
                             <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9H12.92v1.636h.049c.496-.94 1.712-1.929 3.55-1.929 3.795 0 4.496 2.497 4.496 5.746v6.002zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                          </a>
                           <a href="https://www.instagram.com/marketing_widget/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-12 h-12 rounded-xl bg-white dark:bg-[#111] flex items-center justify-center text-[#E4405F] hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white transition-all shadow-sm border border-slate-200 dark:border-white/10 hover:-translate-y-1 group/insta">
                             <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 group-hover/insta:fill-white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                           </a>
                      </div>
                  </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-slate-200 dark:border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                  <p className="text-base text-slate-500 dark:text-slate-400 font-medium text-center md:text-left">
                      © 2021-{currentYear} <a href="https://marketingwidget.com" className="hover:text-primary transition-colors font-bold">Marketing Widget</a>. All rights reserved.
                  </p>
                  <div className="flex items-center gap-6">
                      <Link to="/contact" className="text-base font-bold bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                          Start a Project
                      </Link>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  );
};

export default Layout;