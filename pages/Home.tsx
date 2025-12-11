import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  // Calculator State
  const [spend, setSpend] = useState(10000);
  const [conversion, setConversion] = useState(2.5);
  const [ltv, setLtv] = useState(500);
  const [growth, setGrowth] = useState(25); // Default to 25% to match screenshot
  const [projection, setProjection] = useState(0);
  const [roi, setRoi] = useState(0);

  useEffect(() => {
    // Formula derived to match the screenshot aesthetics and logic
    const monthlyRevenue = (spend / 50) * (conversion / 100) * ltv * (1 + (growth/100)) * 50; // Simplified model for demo
    // Actually, let's use a more standard one:
    // Traffic ~ Spend / CPC. Let's assume CPC is constant-ish, say $2 for simplicity in demo logic or just scale from spend
    // Leads = Traffic * Conversion
    // Revenue = Leads * LTV
    
    // Reverse engineer roughly for the demo values: 10000 spend -> 2.6M rev? That's huge. 
    // The screenshot shows $10k spend -> $2.6M projection. That implies high LTV or volume.
    // Let's implement a logical projection formula:
    
    // Annual Spend = spend * 12
    // Baseline Annual Revenue = (spend * 4) * 12 (assuming 4x ROAS baseline)
    // Uplift = Baseline * (growth / 100)
    // Total Projected = Baseline + Uplift
    // BUT the screenshot shows $2,611,404 for $10k spend. That's 260x ROAS? 
    // Maybe "Incremental"? "Approx. incremental revenue attributed to Marketing Widget".
    
    // Let's stick to a formula that reacts to inputs dynamically.
    const traffic = spend / 1.5; // Assume $1.50 CPC
    const monthlyConversions = traffic * (conversion / 100);
    const monthlyRev = monthlyConversions * ltv;
    
    // "Clean tracking & optimisation" impact
    const optimizedMonthlyRev = monthlyRev * (1 + (growth / 100));
    const annualProjectedRev = optimizedMonthlyRev * 12;
    
    const annualSpend = spend * 12;
    const profit = annualProjectedRev - annualSpend;
    const calculatedRoi = annualSpend > 0 ? (profit / annualSpend) * 100 : 0;

    setProjection(annualProjectedRev);
    setRoi(calculatedRoi);
  }, [spend, conversion, ltv, growth]);

  return (
    <div className="flex flex-col items-center bg-background-light dark:bg-background-home min-h-screen text-slate-900 dark:text-slate-300 font-sans selection:bg-emerald-500 selection:text-white">
      {/* 1. HERO SECTION (Updated to match specific design) */}
      <section className="relative overflow-hidden w-full bg-[#0a0a23] text-white">
        {/* Background Blurs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-1/4 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-3xl opacity-50"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 py-16 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
              Elite Growth Partner for performance-heavy brands
            </div>
            <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-50 font-display">
              Turn messy marketing into a <span className="text-emerald-300">predictable revenue engine</span>.
            </h1>
            <p className="mt-6 text-balance text-base text-slate-300 sm:text-lg max-w-2xl mx-auto">
              Marketing Widget sits between your data and your decisions – fixing tracking, simplifying funnels,
              and giving your team a clear, calm roadmap for compounding growth.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-8 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/40 hover:bg-emerald-300 transition-colors">
                Book a 30-min Growth Session
              </Link>
              <Link to="/services" className="inline-flex items-center justify-center rounded-full border border-slate-700 px-8 py-3.5 text-sm font-bold text-slate-200 hover:border-emerald-400 hover:text-emerald-300 transition-colors bg-white/5 backdrop-blur-sm">
                Explore Growth Playbooks
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-400 font-medium">
              No fluffy audits. No vanity metrics. Just an honest growth roadmap – or we walk away.
            </p>
          </div>

          {/* Dashboard Showcase */}
          <div className="mt-20 grid gap-8 lg:grid-cols-[1.5fr,1fr] lg:items-start max-w-6xl mx-auto">
            
            {/* Live Dashboard Card */}
            <div className="relative rounded-3xl border border-slate-800/80 bg-slate-900/40 p-8 shadow-2xl shadow-emerald-500/5 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Live Growth Dashboard</p>
                  <p className="text-3xl font-bold text-slate-50">$380,420 <span className="text-sm font-normal text-slate-400">/ last 30 days</span></p>
                </div>
                <div className="rounded-xl bg-emerald-500/10 px-4 py-2 text-right border border-emerald-500/20">
                  <p className="text-[10px] uppercase tracking-wide text-emerald-400 font-bold">Attributed Growth</p>
                  <p className="text-xl font-bold text-emerald-300">+38.6%</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-800/50 p-5 border border-white/5">
                  <p className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">Tracking Confidence</p>
                  <p className="mt-2 text-2xl font-bold text-slate-50">97.2%</p>
                  <p className="mt-1 text-xs text-slate-400 leading-snug">Cross-platform signals stitched &amp; verified</p>
                </div>
                <div className="rounded-2xl bg-slate-800/50 p-5 border border-white/5">
                  <p className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">Media Efficiency</p>
                  <p className="mt-2 text-2xl font-bold text-slate-50">4.3x</p>
                  <p className="mt-1 text-xs text-slate-400 leading-snug">Blended MER, last 90 days</p>
                </div>
                <div className="rounded-2xl bg-slate-800/50 p-5 border border-white/5">
                  <p className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">Decision Lag</p>
                  <p className="mt-2 text-2xl font-bold text-slate-50">-63%</p>
                  <p className="mt-1 text-xs text-slate-400 leading-snug">From messy dashboards to 1-page clarity</p>
                </div>
              </div>
            </div>

            {/* ROI Calculator */}
            <div className="rounded-3xl border border-emerald-500/30 bg-slate-900/80 p-6 shadow-xl shadow-emerald-500/10 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-emerald-400 text-lg">calculate</span>
                  <h2 className="text-sm font-bold tracking-wide text-emerald-300 uppercase">ROI Scenario</h2>
              </div>
              <p className="mb-6 text-xs text-slate-400">Rough projection with conservative assumptions.</p>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-300" htmlFor="mw_spend">Monthly ad spend (USD)</label>
                  <input 
                    id="mw_spend" 
                    type="number" 
                    min="1000" 
                    step="100" 
                    className="w-full rounded-lg border border-slate-700 bg-black/40 px-4 py-3 text-sm text-slate-50 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all" 
                    value={spend}
                    onChange={(e) => setSpend(Number(e.target.value))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-300" htmlFor="mw_conversion">Site conversion rate (%)</label>
                    <input 
                        id="mw_conversion" 
                        type="number" 
                        min="0.1" 
                        max="25" 
                        step="0.1" 
                        className="w-full rounded-lg border border-slate-700 bg-black/40 px-4 py-3 text-sm text-slate-50 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all" 
                        value={conversion}
                        onChange={(e) => setConversion(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-300" htmlFor="mw_ltv">Customer LTV (USD)</label>
                    <input 
                        id="mw_ltv" 
                        type="number" 
                        min="10" 
                        step="10" 
                        className="w-full rounded-lg border border-slate-700 bg-black/40 px-4 py-3 text-sm text-slate-50 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all" 
                        value={ltv}
                        onChange={(e) => setLtv(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-300" htmlFor="mw_growth">Expected lift from clean tracking (%)</label>
                  <div className="flex items-center gap-4">
                      <input 
                        id="mw_growth" 
                        type="range" 
                        min="5" 
                        max="200" 
                        step="5" 
                        className="flex-grow h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400" 
                        value={growth}
                        onChange={(e) => setGrowth(Number(e.target.value))}
                      />
                      <span className="text-emerald-400 font-bold text-sm min-w-[3ch]">{growth}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-black/40 p-5 border border-white/5">
                <p className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">12-month projection</p>
                <p className="mt-2 text-2xl font-black text-emerald-300 tracking-tight" id="mw_roi_revenue">${projection.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                <p className="mt-2 text-[10px] text-slate-400 leading-relaxed">
                  Approx. incremental revenue attributed to Marketing Widget interventions.
                </p>
                <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
                    <span className="text-[10px] text-slate-300 font-bold uppercase">Estimated ROI</span>
                    <span id="mw_roi_percent" className="font-bold text-emerald-300 text-lg">{roi.toLocaleString(undefined, { maximumFractionDigits: 0 })}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-16">
            <button 
                onClick={() => window.dispatchEvent(new Event('open-chat-widget'))}
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold py-3.5 px-8 rounded-full inline-flex items-center gap-3 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 hover:shadow-emerald-500/30"
            >
              <span className="material-symbols-outlined text-xl">smart_toy</span>
              Ask AI Assistant
            </button>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section id="services" className="w-full bg-white dark:bg-[#0f1115] py-24 px-6 relative">
         <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-20">
               <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest text-sm uppercase mb-2 block">What We Do</span>
               <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display text-slate-900 dark:text-white">AI-Powered Marketing Solutions</h2>
               <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                   Precision-driven services designed for the data-savvy business seeking measurable outcomes. We don't guess; we execute.
               </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                 { title: "Web Development", icon: "code", desc: "Crafting high-performance, SEO-native websites that convert visitors into loyal customers." },
                 { title: "SEO Optimization", icon: "trending_up", desc: "Dominating search rankings with data-backed content strategies and technical precision." },
                 { title: "Social Media Marketing", icon: "groups", desc: "Building engaged communities and brand loyalty through authentic, strategic storytelling." },
                 { title: "Paid Advertising", icon: "public", desc: "Driving immediate ROI with hyper-targeted PPC campaigns managed by AI algorithms." },
                 { title: "Branding & Identity", icon: "palette", desc: "Creating memorable, cohesive brand identities that resonate deeply with your audience." },
                 { title: "Complete Digital Solutions", icon: "dashboard", desc: "An integrated, full-funnel approach that aligns all channels for maximum impact." },
               ].map((service, i) => (
                 <div key={i} className="group p-8 rounded-2xl bg-white dark:bg-[#151b26] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 bg-emerald-50 dark:bg-emerald-500/10 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                       <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{service.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">{service.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 3. PARTNER SECTION */}
      <section id="about" className="w-full bg-slate-50 dark:bg-[#111] py-24 px-6 overflow-hidden border-y border-slate-200 dark:border-white/5">
         <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               <div className="lg:w-1/2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest text-sm uppercase mb-2 block">Our Philosophy</span>
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 font-display text-slate-900 dark:text-white leading-tight">Your Partner in <br/>Digital Growth</h2>
                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
                     At Marketing Widget, our mission is to fuse cutting-edge AI technology with creative marketing strategies. We are a team of innovators, data scientists, and digital experts dedicated to delivering transparent, measurable results.
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-10">
                     We don't just establish your brand; we fuel its growth engine, ensuring you stay ahead in a rapidly evolving digital landscape.
                  </p>
                  <Link to="/about" className="inline-flex items-center gap-2 text-white bg-slate-900 dark:bg-white dark:text-slate-900 font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity shadow-lg">
                     Learn More About Us <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </Link>
               </div>
               <div className="lg:w-1/2 w-full relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-3xl blur-2xl opacity-20"></div>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                     <img 
                       src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                       alt="Marketing Widget Team Collaboration" 
                       className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                        <p className="text-white font-bold text-lg">Empowering brands since 2021</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. GUIDING PRINCIPLES */}
      <section id="values" className="w-full bg-white dark:bg-[#0f1115] py-24 px-6">
         <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-20">
               <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display text-slate-900 dark:text-white">Our Guiding Principles</h2>
               <p className="text-lg text-slate-600 dark:text-slate-400">The core values and long-term objectives that drive every decision we make.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
               <div className="p-10 rounded-3xl bg-slate-50 dark:bg-[#151b26] border border-slate-200 dark:border-white/5 shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                      <span className="material-symbols-outlined text-9xl text-emerald-500">visibility</span>
                  </div>
                  <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <span className="material-symbols-outlined text-2xl">visibility</span>
                         </div>
                         <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                         To become a globally recognized digital marketing and technology agency that empowers businesses to conquer innovative ventures. We envision a future where every client experiences meaningful, data-backed growth without the guesswork.
                      </p>
                  </div>
               </div>

               <div className="p-10 rounded-3xl bg-slate-50 dark:bg-[#151b26] border border-slate-200 dark:border-white/5 shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                      <span className="material-symbols-outlined text-9xl text-blue-500">flag</span>
                  </div>
                  <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <span className="material-symbols-outlined text-2xl">flag</span>
                         </div>
                         <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
                      </div>
                      <ul className="space-y-4 text-slate-600 dark:text-slate-300 text-base">
                         <li className="flex gap-3 items-start"><span className="material-symbols-outlined text-blue-500 text-xl mt-0.5">check_circle</span> Provide high-quality digital marketing and web development services.</li>
                         <li className="flex gap-3 items-start"><span className="material-symbols-outlined text-blue-500 text-xl mt-0.5">check_circle</span> Help businesses build strong online visibility and brand reputation.</li>
                         <li className="flex gap-3 items-start"><span className="material-symbols-outlined text-blue-500 text-xl mt-0.5">check_circle</span> Use data-driven strategies for measurable, transparent results.</li>
                         <li className="flex gap-3 items-start"><span className="material-symbols-outlined text-blue-500 text-xl mt-0.5">check_circle</span> Nurture trusted, long-term partnerships with every client.</li>
                      </ul>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. SUCCESS STORIES */}
      <section id="case-studies" className="w-full bg-slate-50 dark:bg-[#111] py-24 px-6 border-t border-slate-200 dark:border-white/5">
         <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                   <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest text-sm uppercase mb-2 block">Proven Results</span>
                   <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-900 dark:text-white">Success Stories That <br/>Speak Volumes</h2>
                </div>
                <Link to="/case-studies" className="hidden md:inline-flex items-center gap-2 font-bold text-slate-900 dark:text-white hover:text-emerald-500 transition-colors">
                    View All Case Studies <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
               {[
                 { tag: "E-COMMERCE", title: "210% ROI in 6 Months", desc: "Through our AI-driven ad spend and targeting strategy, we skyrocketed their conversion rates and revenue, delivering unprecedented growth.", link: "/case-studies/scaleup-apparel" },
                 { tag: "SAAS STARTUP", title: "5x Increase in Qualified Leads", desc: "Our targeted content and SEO campaign captured high-intent users, dramatically increasing their sales pipeline with quality leads.", link: "/case-studies/techflow" },
                 { tag: "LOCAL SERVICE", title: "#1 on Google for Key Terms", desc: "We dominated local search results, driving a 300% increase in organic traffic and positioning them as the market leader.", link: "/case-studies" }
               ].map((story, i) => (
                 <article key={i} className="bg-white dark:bg-[#1a2230] p-8 rounded-2xl shadow-md hover:shadow-2xl border border-slate-100 dark:border-white/5 flex flex-col transition-all duration-300 hover:-translate-y-2 group">
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 mb-4 tracking-widest uppercase border-b border-slate-100 dark:border-white/10 pb-4">{story.tag}</span>
                    <h3 className="text-2xl font-bold mb-4 leading-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{story.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 flex-grow leading-relaxed">{story.desc}</p>
                    <Link to={story.link} className="text-emerald-600 dark:text-emerald-400 font-bold text-sm hover:underline flex items-center gap-2 group-hover:gap-3 transition-all">
                       Read Case Study <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                 </article>
               ))}
            </div>
            
            <div className="text-center md:hidden">
                <Link to="/case-studies" className="inline-flex items-center gap-2 font-bold text-slate-900 dark:text-white hover:text-emerald-500 transition-colors">
                    View All Case Studies <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
            </div>
         </div>
      </section>

      {/* 6. CONTACT FORM SECTION */}
      <section id="contact" className="w-full bg-white dark:bg-[#0f1115] py-24 px-6">
         <div className="container mx-auto max-w-4xl">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-[#1a2230] dark:to-[#111] rounded-[2.5rem] p-8 md:p-16 shadow-2xl text-center relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-blue-500"></div>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display text-white">Ready to Revolutionize Your Marketing?</h2>
                    <p className="text-slate-300 mb-10 text-lg max-w-2xl mx-auto">
                        Connect with our AI strategists for a personalized, data-backed assessment of your marketing potential. No obligations.
                    </p>

                    <form className="max-w-xl mx-auto space-y-4 text-left" onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll be in touch."); }}>
                        <div>
                            <label htmlFor="contact-name" className="sr-only">Your Name</label>
                            <input id="contact-name" type="text" placeholder="Your Name" className="w-full p-4 rounded-xl bg-white/10 border border-white/10 outline-none focus:border-emerald-400 focus:bg-white/20 transition-all text-white placeholder-slate-400" required />
                        </div>
                        <div>
                            <label htmlFor="contact-email" className="sr-only">Your Email</label>
                            <input id="contact-email" type="email" placeholder="Your Email" className="w-full p-4 rounded-xl bg-white/10 border border-white/10 outline-none focus:border-emerald-400 focus:bg-white/20 transition-all text-white placeholder-slate-400" required />
                        </div>
                        <div>
                            <label htmlFor="contact-message" className="sr-only">Your Message</label>
                            <textarea id="contact-message" rows={4} placeholder="Tell us about your marketing goals..." className="w-full p-4 rounded-xl bg-white/10 border border-white/10 outline-none focus:border-emerald-400 focus:bg-white/20 transition-all resize-none text-white placeholder-slate-400"></textarea>
                        </div>
                    
                        <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                            Request Your AI Marketing Audit
                        </button>
                    </form>
                    <p className="mt-6 text-xs text-slate-500 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">lock</span>
                        Your information is secure. We never sell your data.
                    </p>
                </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default Home;