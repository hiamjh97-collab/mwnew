import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Data for related content mapping
const relatedContentData: Record<string, Array<{ type: 'case-study' | 'blog' | 'resource', title: string, link: string, image: string, category: string }>> = {
  'web-development': [
    { type: 'case-study', title: 'MediCare: Modernizing Patient Engagement', link: '/case-studies/medicare', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Healthcare' },
    { type: 'blog', title: 'The Rise of Headless CMS', link: '/blog/headless-cms', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Web Dev' },
    { type: 'resource', title: 'Core Web Vitals Guide', link: '/resources', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Performance' }
  ],
  'seo': [
    { type: 'case-study', title: 'TechFlow: Doubling Qualified Leads', link: '/case-studies/techflow', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'SaaS' },
    { type: 'blog', title: 'The Ultimate SEO Checklist for 2024', link: '/resources', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Guide' },
    { type: 'case-study', title: 'ScaleUp Apparel: E-commerce SEO Win', link: '/case-studies/scaleup-apparel', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'E-commerce' }
  ],
  'paid-advertising': [
     { type: 'resource', title: 'Google Ads Performance Max Campaigns', link: '/resources', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Webinar' },
     { type: 'case-study', title: 'ScaleUp Apparel: 150% Revenue Growth', link: '/case-studies/scaleup-apparel', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'E-commerce' },
     { type: 'blog', title: 'The Future of AI in Digital Marketing', link: '/blog/future-of-ai', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'AI Trends' }
  ],
  'branding': [
    { type: 'resource', title: 'Mastering Instagram Reels for Business', link: '/resources', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Social Media' },
    { type: 'blog', title: '10 Proven Strategies for Blog Writing', link: '/resources', image: 'https://images.unsplash.com/photo-1499750310159-529800cf2c5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Content' }
  ]
};

const RelatedInsights: React.FC<{ slug: string, darkMode?: boolean }> = ({ slug, darkMode = false }) => {
  const items = relatedContentData[slug] || [];
  
  if (items.length === 0) return null;

  return (
    <div className={`py-20 ${darkMode ? 'bg-[#0a0a23] border-t border-white/10' : 'bg-white border-t border-slate-100'}`}>
      <div className="container mx-auto px-6">
        <h2 className={`text-3xl font-bold mb-12 text-center font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>Related Insights & Success Stories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
             <Link to={item.link} key={i} className="group block h-full">
                <div className={`rounded-2xl overflow-hidden border transition-all h-full flex flex-col ${darkMode ? 'bg-slate-900 border-white/10 hover:border-purple-500' : 'bg-slate-50 border-slate-100 hover:shadow-xl'}`}>
                  <div className="h-48 overflow-hidden relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 uppercase tracking-wide">{item.category}</div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                     <div className="mb-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${
                            item.type === 'case-study' ? 'bg-blue-100 text-blue-700' : 
                            item.type === 'blog' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                        }`}>
                            {item.type.replace('-', ' ')}
                        </span>
                     </div>
                     <h3 className={`text-xl font-bold mb-3 transition-colors ${darkMode ? 'text-white group-hover:text-purple-400' : 'text-slate-900 group-hover:text-blue-600'}`}>{item.title}</h3>
                     <div className={`mt-auto flex items-center gap-2 text-sm font-bold ${darkMode ? 'text-slate-400 group-hover:text-purple-400' : 'text-slate-500 group-hover:text-blue-600'}`}>
                        Read More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                     </div>
                  </div>
                </div>
             </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // 1. Web Development (Detailed Page)
  if (slug === 'web-development') {
    return (
      <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
        {/* Hero */}
        <div className="bg-[#0f1115] text-white pt-24 pb-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
               <div className="max-w-2xl">
                   <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold mb-6 border border-blue-500/30">
                       Custom Solutions
                   </div>
                   <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight font-display">
                       Websites that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">perform</span>.
                   </h1>
                   <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-lg">
                       We build blazing fast, SEO-optimized, and visually stunning digital experiences that turn visitors into loyal customers.
                   </p>
                   <div className="flex flex-wrap gap-4">
                       <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-blue-600/20">
                           Start Your Project
                       </button>
                       <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-4 px-8 rounded-xl transition-all backdrop-blur-sm">
                           View Portfolio
                       </button>
                   </div>
               </div>
               <div className="flex-1 w-full relative">
                   <div className="bg-gradient-to-tr from-slate-800 to-slate-900 p-2 rounded-2xl shadow-2xl border border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                       <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Code Interface" className="rounded-xl w-full h-auto opacity-90" />
                   </div>
               </div>
           </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white py-12 border-b border-slate-100">
            <div className="container mx-auto px-6">
                <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Powered by Modern Tech</p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'AWS'].map((tech, i) => (
                        <span key={i} className="text-xl font-bold text-slate-700">{tech}</span>
                    ))}
                </div>
            </div>
        </div>

        {/* Features / Value Props */}
        <div className="py-24 container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-display">Why Choose Our Dev Team?</h2>
                <p className="text-lg text-slate-600">We don't just write code; we engineer solutions that solve business problems and drive growth.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { title: 'Performance First', desc: 'We obsess over Core Web Vitals. Expect lightning-fast load times that boost SEO and user retention.', icon: 'speed' },
                    { title: 'Responsive Design', desc: 'Your site will look and function perfectly on every device, from massive monitors to mobile screens.', icon: 'devices' },
                    { title: 'Scalable Architecture', desc: 'Built to grow. We use modular codebases and cloud infrastructure that scales with your traffic.', icon: 'architecture' },
                    { title: 'SEO Native', desc: 'Search engine optimization is baked into the code structure, not added as an afterthought.', icon: 'search' },
                    { title: 'Secure by Default', desc: 'Enterprise-grade security practices to protect your data and your users.', icon: 'security' },
                    { title: 'Easy Management', desc: 'User-friendly CMS integration so your team can update content without touching code.', icon: 'edit_note' }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Development Process */}
        <div className="bg-[#0f1115] text-white py-24">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-16">
                    <div className="md:w-1/3">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">How We Build</h2>
                        <p className="text-slate-400 text-lg mb-8">Our development lifecycle is transparent, agile, and focused on quality assurance at every step.</p>
                        <button className="text-blue-400 font-bold flex items-center gap-2 hover:text-blue-300 transition-colors">
                            View Methodology <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                    <div className="md:w-2/3 space-y-12">
                        {[
                            { step: '01', title: 'Discovery & Architecture', desc: 'We map out the technical requirements, database schema, and user flows before writing a single line of code.' },
                            { step: '02', title: 'UI/UX Design', desc: 'Our designers create high-fidelity prototypes. We iterate until the visual experience aligns perfectly with your brand.' },
                            { step: '03', title: 'Development', desc: 'We build using modern frameworks, ensuring clean, maintainable code. Regular sprints keep you updated.' },
                            { step: '04', title: 'QA & Launch', desc: 'Rigorous testing across devices and browsers. We handle the deployment and ensure a smooth go-live.' }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 group">
                                <span className="text-5xl font-black text-white/10 group-hover:text-blue-500/20 transition-colors">{item.step}</span>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{item.title}</h3>
                                    <p className="text-slate-400">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Featured Project */}
        <div className="py-24 container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16 font-display">Featured Project</h2>
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col md:flex-row">
                <div className="md:w-1/2 bg-slate-100 relative min-h-[300px]">
                    <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Medicare Project" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="md:w-1/2 p-12 flex flex-col justify-center">
                    <div className="mb-6">
                        <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide">Healthcare</span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">MediCare Patient Portal</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                        A secure, HIPAA-compliant web application allowing patients to book appointments, view records, and chat with doctors. Built with React and Node.js.
                    </p>
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                            <p className="text-3xl font-black text-slate-900">20h</p>
                            <p className="text-xs text-slate-500 uppercase font-bold">Admin Time Saved/Wk</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-slate-900">+85%</p>
                            <p className="text-xs text-slate-500 uppercase font-bold">Online Bookings</p>
                        </div>
                    </div>
                    <Link to="/case-studies/medicare" className="bg-slate-900 text-white font-bold py-3 px-8 rounded-xl text-center hover:bg-slate-800 transition-colors">
                        Read Case Study
                    </Link>
                </div>
            </div>
        </div>

        {/* Related Insights - Added Here */}
        <RelatedInsights slug="web-development" />

        {/* FAQ */}
        <div className="bg-slate-50 py-24 border-t border-slate-200">
            <div className="container mx-auto px-6 max-w-3xl">
                <h2 className="text-3xl font-bold text-center mb-12 font-display">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    <details className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 group">
                        <summary className="font-bold text-slate-900 cursor-pointer flex justify-between items-center">
                            How long does a typical project take?
                            <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-slate-400">expand_more</span>
                        </summary>
                        <p className="mt-4 text-slate-600">A standard business website typically takes 4-6 weeks. Complex web applications can take 3-6 months depending on requirements.</p>
                    </details>
                    <details className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 group">
                        <summary className="font-bold text-slate-900 cursor-pointer flex justify-between items-center">
                            Do you provide hosting and maintenance?
                            <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-slate-400">expand_more</span>
                        </summary>
                        <p className="mt-4 text-slate-600">Yes, we offer comprehensive maintenance packages that include hosting, security updates, and regular backups.</p>
                    </details>
                    <details className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 group">
                        <summary className="font-bold text-slate-900 cursor-pointer flex justify-between items-center">
                            Will I be able to update the site myself?
                            <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-slate-400">expand_more</span>
                        </summary>
                        <p className="mt-4 text-slate-600">Absolutely. We integrate user-friendly CMS solutions (like Headless CMS or custom dashboards) so you can easily manage content.</p>
                    </details>
                </div>
            </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 py-24 text-center text-white">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-6 font-display">Ready to build something great?</h2>
                <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">Let's discuss your project requirements and how we can help you achieve your digital goals.</p>
                <button className="bg-white text-blue-600 font-bold py-4 px-10 rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:scale-105">
                    Schedule Free Consultation
                </button>
            </div>
        </div>
      </div>
    );
  }

  // 2. SEO (Detailed Page) - REFINED
  if (slug === 'seo') {
    return (
      <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
        {/* Hero */}
        <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
                <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-6 border border-green-200">
                    Data-Driven Growth
                </div>
                <h1 className="text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                    Dominate Search Rankings with AI-Powered SEO
                </h1>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    Leverage our advanced strategies to boost your search visibility, drive organic traffic, and outrank your competition with precision.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-green-600/20 transition-all">
                        Get Your Free SEO Audit
                    </button>
                    <button className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-bold py-3 px-8 rounded-lg transition-all">
                        View Case Studies
                    </button>
                </div>
            </div>
            <div className="w-full max-w-lg h-[400px] bg-slate-900 rounded-2xl overflow-hidden relative shadow-2xl">
                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="SEO Data" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-transparent to-green-500/30"></div>
                <div className="absolute bottom-8 left-8 right-8">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="material-symbols-outlined text-green-400">trending_up</span>
                            <span className="text-white font-bold">Traffic Growth</span>
                        </div>
                        <div className="w-full bg-slate-700/50 h-2 rounded-full overflow-hidden">
                            <div className="bg-green-400 h-full w-[75%]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Tools We Use - NEW SECTION */}
        <div className="py-16 bg-white border-y border-slate-100">
            <div className="container mx-auto px-6">
                <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">Powered by Industry-Leading Tools</p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="text-center group">
                        <span className="text-2xl font-black text-slate-800 group-hover:text-[#ff6400] transition-colors">ahrefs</span>
                        <p className="text-[10px] text-slate-400 mt-1">Backlink Analysis</p>
                    </div>
                    <div className="text-center group">
                        <span className="text-2xl font-black text-slate-800 group-hover:text-[#ff7f00] transition-colors">Semrush</span>
                        <p className="text-[10px] text-slate-400 mt-1">Keyword Strategy</p>
                    </div>
                    <div className="text-center group">
                        <span className="text-2xl font-black text-slate-800 group-hover:text-[#4285f4] transition-colors">Google</span>
                        <p className="text-[10px] text-slate-400 mt-1">Analytics & Console</p>
                    </div>
                    <div className="text-center group">
                        <span className="text-2xl font-black text-slate-800 group-hover:text-[#6a1b9a] transition-colors">Screaming Frog</span>
                        <p className="text-[10px] text-slate-400 mt-1">Technical Audits</p>
                    </div>
                    <div className="text-center group">
                        <span className="text-2xl font-black text-slate-800 group-hover:text-[#00c853] transition-colors">Surfer</span>
                        <p className="text-[10px] text-slate-400 mt-1">Content Optimization</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Proven Process - REFINED */}
        <div className="py-24 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Our SEO Process</h2>
                    <p className="text-slate-600">We don't guess. We follow a rigorous, 4-phase methodology designed to uncover opportunities and deliver sustainable growth.</p>
                </div>
                
                <div className="space-y-8">
                    {[
                        { 
                            phase: "01", 
                            title: 'Discovery & Technical Audit', 
                            desc: 'We begin with a comprehensive health check of your website. We analyze over 200 ranking factors, including site speed, mobile usability, crawl errors, and backlink toxicity. We identify the technical roadblocks preventing you from ranking.',
                            list: ['Core Web Vitals Assessment', 'Competitor Gap Analysis', 'Keyword Opportunity Mapping'] 
                        },
                        { 
                            phase: "02", 
                            title: 'Strategic Planning & Keywords', 
                            desc: 'Based on our audit, we build a custom roadmap. We don\'t just look for high-volume keywords; we find "money keywords" with high purchase intent that your competitors are missing.',
                            list: ['Content Strategy Creation', 'Information Architecture Planning', 'Local SEO Setup'] 
                        },
                        { 
                            phase: "03", 
                            title: 'On-Page & Content Execution', 
                            desc: 'Our team gets to work. We optimize your existing pages for relevance and user intent. Simultaneously, our writers create high-quality, authoritative content that establishes your brand as a thought leader.',
                            list: ['Meta Tag Optimization', 'Schema Markup Implementation', 'Long-form Content Production'] 
                        },
                        { 
                            phase: "04", 
                            title: 'Link Building & Authority', 
                            desc: 'Authority is currency in SEO. We launch ethical, white-hat link-building campaigns to earn high-quality backlinks from reputable sites in your industry, boosting your domain authority.',
                            list: ['Digital PR Outreach', 'Guest Posting', 'Broken Link Building'] 
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 hover:shadow-lg transition-shadow">
                            <div className="shrink-0">
                                <span className="text-5xl font-black text-slate-100">{item.phase}</span>
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">{item.desc}</p>
                                <div className="flex flex-wrap gap-4">
                                    {item.list.map((li, idx) => (
                                        <span key={idx} className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {li}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Technical vs Content SEO Comparison - NEW */}
        <div className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">A Holistic Approach</h2>
                        <p className="text-lg text-slate-600 mb-8">
                            True SEO success requires a balance. We don't just focus on keywords; we ensure your website is technically sound and populated with content that converts.
                        </p>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="bg-blue-100 p-3 rounded-xl h-fit text-blue-600"><span className="material-symbols-outlined">settings_suggest</span></div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2">Technical SEO</h4>
                                    <p className="text-sm text-slate-500">Focuses on the backend. Ensures Google can crawl and index your site without issues. Includes speed, security (SSL), and mobile responsiveness.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-purple-100 p-3 rounded-xl h-fit text-purple-600"><span className="material-symbols-outlined">article</span></div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2">Content SEO</h4>
                                    <p className="text-sm text-slate-500">Focuses on the frontend. Ensures your content answers user queries, provides value, and targets the right keywords to attract traffic.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        <h3 className="text-xl font-bold mb-6 relative z-10">The Result?</h3>
                        <div className="space-y-6 relative z-10">
                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <span>Organic Traffic</span>
                                <span className="text-green-400 font-bold text-xl">↑ 250%</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <span>Keyword Rankings</span>
                                <span className="text-green-400 font-bold text-xl">#1 Spots</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <span>Lead Quality</span>
                                <span className="text-green-400 font-bold text-xl">High Intent</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>ROI</span>
                                <span className="text-green-400 font-bold text-xl">Sustainable</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Case Studies */}
        <div className="py-20 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Success Stories</h2>
                        <p className="text-slate-600">See how we've helped other businesses achieve remarkable growth.</p>
                    </div>
                    <Link to="/case-studies" className="text-blue-600 font-bold hover:underline mt-4 md:mt-0 flex items-center gap-1">
                        View All Case Studies <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 group hover:shadow-xl transition-all">
                        <div className="h-64 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="TechGrowth" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600">SaaS</div>
                        </div>
                        <div className="p-8">
                            <div className="flex gap-4 mb-4">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">Traffic Growth</p>
                                    <p className="text-2xl font-bold text-slate-900">+200%</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">Leads</p>
                                    <p className="text-2xl font-bold text-slate-900">+150%</p>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">TechFlow: Dominating the SaaS Niche</h3>
                            <p className="text-slate-600 text-sm mb-6 line-clamp-2">How we helped a SaaS startup identify high-intent keywords and create a content strategy that drove qualified leads in just 6 months.</p>
                            <Link to="/case-studies/techflow" className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">Read Full Story <span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 group hover:shadow-xl transition-all">
                        <div className="h-64 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="RetailBoost" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-600">E-Commerce</div>
                        </div>
                        <div className="p-8">
                            <div className="flex gap-4 mb-4">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">Revenue</p>
                                    <p className="text-2xl font-bold text-slate-900">+150%</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">ROI</p>
                                    <p className="text-2xl font-bold text-slate-900">4.5x</p>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">ScaleUp Apparel: E-commerce SEO Win</h3>
                            <p className="text-slate-600 text-sm mb-6 line-clamp-2">Optimizing technical SEO and implementing a product schema strategy to capture rich snippets and drive purchase-ready traffic.</p>
                            <Link to="/case-studies/scaleup-apparel" className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">Read Full Story <span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Testimonial */}
        <div className="py-20 bg-white">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <span className="text-blue-600 text-6xl font-serif opacity-30">“</span>
                <p className="text-2xl text-slate-800 font-medium mb-8 leading-relaxed -mt-8 relative z-10">"Working with Marketing Widget transformed our online presence. Their data-driven approach to SEO doubled our organic traffic in just six months. They are true partners in growth."</p>
                <div>
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Jane Doe" className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" />
                    <p className="font-bold text-slate-900">Jane Doe</p>
                    <p className="text-sm text-slate-500">CMO, Tech Innovators Inc.</p>
                </div>
            </div>
        </div>

        {/* Related Insights - Added Here */}
        <RelatedInsights slug="seo" />

        {/* CTA */}
        <div className="py-20 container mx-auto px-6">
            <div className="bg-green-600 rounded-2xl p-12 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-4">Ready to Climb the Ranks?</h2>
                    <p className="mb-8 max-w-2xl mx-auto opacity-90 text-lg">Let our experts analyze your website and provide a custom, no-obligation SEO strategy to help you outrank the competition.</p>
                    <button className="bg-white text-green-600 font-bold py-4 px-10 rounded-lg hover:bg-green-50 transition-all shadow-xl hover:scale-105">
                        Request Your Free Audit
                    </button>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // 3. Paid Advertising (New Custom Design - Image 5)
  if (slug === 'paid-advertising') {
    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Hero */}
            <div className="bg-slate-50 pt-20 pb-20">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                    <div className="max-w-xl">
                        <h1 className="text-5xl font-extrabold text-slate-900 mb-6 leading-tight">Drive Immediate ROI with Data-Driven Paid Advertising</h1>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Leverage our AI-powered, data-driven approach to PPC and media buying for targeted campaigns that deliver measurable results.
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-blue-600/20 transition-all">
                            Get Your Free PPC Audit
                        </button>
                    </div>
                    <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="PPC Dashboard" className="w-full h-auto" />
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Marketing Widget?</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">Our unique approach combines expert strategy with AI-powered optimization to maximize your return on ad spend.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'AI-Powered Optimization', desc: 'Our algorithms analyze data in real-time to adjust bids and targeting.', icon: 'auto_fix_high' },
                            { title: 'Expert Campaign Management', desc: 'A dedicated team of certified professionals will build and manage your campaigns.', icon: 'manage_accounts' },
                            { title: 'Transparent Reporting', desc: 'Get clear, concise, and actionable insights with our comprehensive dashboards.', icon: 'insights' }
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-50 p-8 rounded-xl border border-slate-100">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Platforms */}
            <div className="bg-slate-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8">Our Paid Advertising Platforms</h2>
                        <div className="flex justify-center gap-8 border-b border-slate-200 pb-4 mb-8">
                            <button className="text-blue-600 font-bold border-b-2 border-blue-600 pb-4 -mb-4.5">Google Ads</button>
                            <button className="text-slate-500 font-medium hover:text-slate-700">Social Media Ads</button>
                            <button className="text-slate-500 font-medium hover:text-slate-700">Display & Video</button>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg border border-slate-200">
                             <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Google Ads UI" className="w-full h-auto" />
                        </div>
                        <div className="w-full md:w-1/2">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Maximize Reach with Google Ads</h3>
                            <p className="text-slate-600 mb-6">We create and manage highly targeted Google Ads campaigns that place your business in front of customers actively searching for your products or services.</p>
                            <ul className="space-y-3">
                                {[
                                    'Keyword Research & Strategy',
                                    'Compelling Ad Copy Creation',
                                    'Continuous A/B Testing & Optimization'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700">
                                        <span className="material-symbols-outlined text-blue-600">check_circle</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Proven Process */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-16">Our Proven 4-Step Process</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { num: '01', title: 'Discovery & Strategy', desc: 'We start by understanding your business, goals, and target audience.' },
                            { num: '02', title: 'Campaign Setup', desc: 'Our experts handle everything from account setup to ad creative.' },
                            { num: '03', title: 'Launch & Optimize', desc: 'We launch your campaigns and use AI tools to continuously monitor.' },
                            { num: '04', title: 'Analysis & Reporting', desc: 'You receive regular, transparent reports showing exactly how we perform.' }
                        ].map((step, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl mb-4 shadow-sm">
                                    {step.num}
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                                <p className="text-xs text-slate-500 max-w-xs">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Related Insights - Added Here */}
            <RelatedInsights slug="paid-advertising" />

            {/* CTA */}
            <div className="bg-slate-50 py-24 text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Grow Your Business?</h2>
                <p className="text-slate-600 mb-8 max-w-xl mx-auto">Let our team of experts craft a data-driven paid advertising strategy that delivers real results.</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg">
                    Schedule Your Free Consultation
                </button>
            </div>
        </div>
    );
  }

  // 4. Branding (Detailed Page)
  if (slug === 'branding') {
    return (
        <div className="bg-[#0a0a23] min-h-screen font-sans text-white">
            {/* Hero */}
            <div className="relative pt-24 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-slate-900 to-blue-900/30 z-0"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-bold mb-6 border border-purple-500/30">Strategic Identity Design</span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight font-display">
                        We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Iconic</span> Brands.
                    </h1>
                    <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Your brand is more than a logo. It’s the story you tell and the feeling you evoke. We craft cohesive identities that resonate and endure.
                    </p>
                     <div className="flex justify-center gap-4">
                       <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-purple-600/20">
                           Transform Your Brand
                       </button>
                       <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-4 px-8 rounded-xl transition-all backdrop-blur-sm">
                           View Portfolio
                       </button>
                   </div>
                </div>
            </div>

            {/* Visual Grid */}
            <div className="container mx-auto px-6 -mt-20 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="h-80 rounded-2xl overflow-hidden shadow-2xl group">
                         <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Brand Book" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                             <h3 className="text-xl font-bold">Brand Guidelines</h3>
                         </div>
                    </div>
                     <div className="h-80 rounded-2xl overflow-hidden shadow-2xl group md:-mt-12">
                         <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Typography" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                             <h3 className="text-xl font-bold">Visual Identity</h3>
                         </div>
                    </div>
                     <div className="h-80 rounded-2xl overflow-hidden shadow-2xl group">
                         <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Packaging" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                             <h3 className="text-xl font-bold">Packaging Design</h3>
                         </div>
                    </div>
                </div>
            </div>

            {/* Philosophy */}
            <div className="py-24 bg-slate-900">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="md:w-1/2">
                             <h2 className="text-3xl font-bold mb-6 font-display">Crafting the Soul of Your Business</h2>
                             <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                                 In a crowded marketplace, perception is reality. A strong brand builds trust, commands premium pricing, and creates loyal advocates.
                             </p>
                             <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                 We dig deep to uncover your core values and unique value proposition, translating them into a visual and verbal language that speaks directly to your ideal customer.
                             </p>
                             <ul className="space-y-4">
                                 {[
                                     'Strategic Differentiation',
                                     'Emotional Connection',
                                     'Consistent Visual Language',
                                     'Scalable Design Systems'
                                 ].map((item, i) => (
                                     <li key={i} className="flex items-center gap-3 text-purple-300">
                                         <span className="material-symbols-outlined text-purple-500">auto_awesome</span>
                                         {item}
                                     </li>
                                 ))}
                             </ul>
                        </div>
                         <div className="md:w-1/2 bg-gradient-to-br from-purple-900 to-slate-800 p-8 rounded-2xl border border-white/10">
                            <h3 className="text-xl font-bold mb-6">Our Capabilities</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    'Logo Design', 'Brand Strategy', 'Typography', 'Color Palettes', 
                                    'Iconography', 'Brand Guidelines', 'Packaging', 'Merchandise',
                                    'Social Assets', 'Rebranding'
                                ].map((cap, i) => (
                                    <div key={i} className="bg-black/20 p-3 rounded-lg text-sm text-slate-300 text-center hover:bg-purple-600/20 transition-colors border border-white/5">
                                        {cap}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Process */}
            <div className="py-24 bg-[#0a0a23] relative">
                 <div className="container mx-auto px-6">
                     <h2 className="text-3xl font-bold text-center mb-16 font-display">How We Create Magic</h2>
                     <div className="grid md:grid-cols-4 gap-8">
                         {[
                             { title: 'Discovery', desc: 'Workshops and research to define your archetype, audience, and goals.', icon: 'search' },
                             { title: 'Strategy', desc: 'Defining your voice, tone, and positioning in the market.', icon: 'lightbulb' },
                             { title: 'Design', desc: 'Iterative exploration of logos, colors, and visual elements.', icon: 'palette' },
                             { title: 'Delivery', desc: 'Comprehensive brand books and asset libraries for your team.', icon: 'rocket_launch' }
                         ].map((step, i) => (
                             <div key={i} className="bg-slate-900 p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500 transition-all group">
                                 <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                                     <span className="material-symbols-outlined">{step.icon}</span>
                                 </div>
                                 <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                 <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                             </div>
                         ))}
                     </div>
                 </div>
            </div>

            {/* Related Insights - Added Here */}
            <RelatedInsights slug="branding" darkMode={true} />

            {/* CTA */}
             <div className="py-20 text-center bg-gradient-to-b from-[#0a0a23] to-[#1a1a2e]">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-6">Ready to stand out?</h2>
                    <p className="text-slate-400 mb-8 max-w-xl mx-auto">Let's build a brand that your customers will love and your competitors will envy.</p>
                    <button className="bg-white text-purple-900 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-purple-50 transition-colors">
                        Start Your Branding Journey
                    </button>
                </div>
            </div>
        </div>
    );
  }

  // Fallback / Standard Detail Page for other services
  const service = slug ? {
      title: slug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      subtitle: "Professional services tailored to your needs.",
      description: "We offer top-tier solutions to help your business thrive in the digital age.",
      features: ["Expert Strategy", "Dedicated Support", "Proven Results", "Custom Solutions"],
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
  } : null;

  if (!service) return <div>Service not found</div>;

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <div className="relative h-[400px] w-full overflow-hidden">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 font-display">{service.title}</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">{service.subtitle}</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-20">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Overview</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">{service.description}</p>
              <div className="grid md:grid-cols-2 gap-4">
                  {service.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                          <span className="material-symbols-outlined text-primary">check_circle</span>
                          {f}
                      </div>
                  ))}
              </div>
          </div>
      </div>
      <RelatedInsights slug={slug || 'general'} />
    </div>
  );
};

export default ServiceDetail;