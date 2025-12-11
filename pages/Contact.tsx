import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000); // Reset after 5s
  }

  return (
    <div className="bg-slate-50 dark:bg-[#0f1115] min-h-screen font-sans">
       {/* High Impact Hero */}
       <div className="bg-[#0a0a23] text-white pt-32 pb-48 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-xs font-bold tracking-wider uppercase text-slate-300">Accepting New Clients</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 font-display leading-tight">
                    Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Scale?</span>
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    Book a free 30-minute strategy session. We'll audit your current setup and identify the low-hanging fruit for immediate growth.
                </p>
            </div>
       </div>

       <div className="container mx-auto px-6 -mt-32 relative z-20 pb-24">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
                
                {/* Main Lead Form */}
                <div className="lg:col-span-7 bg-white dark:bg-[#1a2230] rounded-3xl shadow-2xl shadow-black/20 p-8 md:p-12 border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-blue-600"></div>
                    
                    {!isSubmitted ? (
                    <>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Let's start the conversation</h2>
                            <p className="text-slate-500 dark:text-slate-400">Fill out the form below and we'll get back to you within 24 hours.</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">First Name</label>
                                    <input type="text" required className="w-full rounded-xl border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#111621] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary p-3.5 transition-all outline-none" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Last Name</label>
                                    <input type="text" required className="w-full rounded-xl border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#111621] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary p-3.5 transition-all outline-none" placeholder="Doe" />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Work Email</label>
                                    <input type="email" required className="w-full rounded-xl border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#111621] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary p-3.5 transition-all outline-none" placeholder="john@company.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Website URL</label>
                                    <input type="url" className="w-full rounded-xl border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#111621] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary p-3.5 transition-all outline-none" placeholder="https://company.com" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">I'm interested in...</label>
                                <select className="w-full rounded-xl border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#111621] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary p-3.5 transition-all outline-none cursor-pointer">
                                    <option>Comprehensive Growth Audit</option>
                                    <option>SEO & Organic Traffic</option>
                                    <option>Paid Advertising (PPC)</option>
                                    <option>Web Development & Design</option>
                                    <option>Branding & Identity</option>
                                    <option>Other Inquiry</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">How can we help?</label>
                                <textarea rows={4} className="w-full rounded-xl border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#111621] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary p-3.5 transition-all outline-none resize-none" placeholder="Tell us about your current challenges and goals..."></textarea>
                            </div>

                            <button type="submit" className="w-full bg-primary text-slate-900 font-bold text-lg py-4 rounded-xl hover:bg-emerald-400 hover:-translate-y-1 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group-hover:shadow-primary/40">
                                Get My Free Consultation
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                            
                            <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1">
                                <span className="material-symbols-outlined text-sm">lock</span>
                                Your data is secure. We hate spam as much as you do.
                            </p>
                        </form>
                    </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in-95">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                                <span className="material-symbols-outlined text-4xl">check</span>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Message Sent!</h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-md">
                                Thanks for reaching out. Our team will review your inquiry and get back to you within 24 hours to schedule your strategy session.
                            </p>
                            <button onClick={() => setIsSubmitted(false)} className="mt-8 text-primary font-bold hover:underline">Send another message</button>
                        </div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="lg:col-span-5 flex flex-col gap-8 pt-8 lg:pt-0">
                    
                    {/* Value Props */}
                    <div className="bg-white dark:bg-[#1a2230] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 font-display">Why Partner With Us?</h3>
                        <div className="space-y-5">
                            {[
                                { title: 'Data-Driven Strategy', desc: 'We don\'t guess. We use AI and analytics to find what works.' },
                                { title: 'Transparent Reporting', desc: 'Real-time dashboards. You\'ll always know where your money goes.' },
                                { title: 'Agile Execution', desc: 'We move fast. Launch campaigns in days, not months.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="bg-primary/10 p-2 h-fit rounded-lg text-primary mt-1">
                                        <span className="material-symbols-outlined">check</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Cards */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                        <a href="mailto:hello@marketingwidget.com" className="bg-white dark:bg-[#1a2230] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary/50 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full text-blue-600 dark:text-blue-400 group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email Us</p>
                                    <p className="text-sm md:text-base font-bold text-slate-900 dark:text-white truncate">hello@marketingwidget.com</p>
                                </div>
                            </div>
                        </a>
                        
                        <div className="bg-white dark:bg-[#1a2230] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-full text-purple-600 dark:text-purple-400">
                                    <span className="material-symbols-outlined">location_on</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Visit HQ</p>
                                    <p className="text-sm md:text-base font-bold text-slate-900 dark:text-white">123 Growth Ave, Tech City</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Proof Mini */}
                    <div className="text-center lg:text-left">
                        <p className="text-sm font-bold text-slate-500 mb-4">TRUSTED BY INNOVATIVE TEAMS</p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {['Acme Corp', 'GlobalTech', 'Nebula'].map((logo, i) => (
                                <span key={i} className="text-lg font-black text-slate-700 dark:text-slate-300">{logo}</span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
       </div>

       {/* FAQ Section */}
       <div className="bg-white dark:bg-[#0f1115] py-24 border-t border-slate-200 dark:border-white/5">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-display">Common Questions</h2>
                    <p className="text-slate-600 dark:text-slate-400">Everything you need to know before reaching out.</p>
                </div>

                <div className="space-y-4">
                    {[
                        { q: "What happens after I submit the form?", a: "One of our strategists will review your site and goals. We'll then email you to schedule a 30-minute discovery call to discuss a tailored roadmap." },
                        { q: "Do you work with small businesses?", a: "Yes! We have tiered packages specifically designed for startups and growing small businesses, as well as enterprise solutions." },
                        { q: "How quickly can we start?", a: "Once we agree on a strategy, we can typically onboard you and launch initial campaigns within 5-7 business days." },
                        { q: "Is the consultation really free?", a: "Absolutely. We believe in providing value upfront. You'll walk away with actionable insights whether you hire us or not." }
                    ].map((item, index) => (
                        <div key={index} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#1a2230]">
                            <button 
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-center p-6 text-left font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                            >
                                {item.q}
                                <span className={`material-symbols-outlined transition-transform duration-300 ${activeFaq === index ? 'rotate-180 text-primary' : 'text-slate-400'}`}>expand_more</span>
                            </button>
                            <div className={`px-6 text-slate-600 dark:text-slate-300 text-sm leading-relaxed overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                {item.a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
       </div>
    </div>
  );
};

export default Contact;