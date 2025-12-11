import React, { useState } from 'react';

const Pricing: React.FC = () => {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="container mx-auto px-6 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 font-display">Transparent Pricing</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">Choose the perfect plan to accelerate your growth.</p>
            
            <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button 
                    onClick={() => setBilling('monthly')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${billing === 'monthly' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-500'}`}
                >
                    Monthly
                </button>
                <button 
                    onClick={() => setBilling('annual')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${billing === 'annual' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-500'}`}
                >
                    Annual <span className="text-primary text-xs ml-1">-15%</span>
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col hover:border-blue-500/30 transition-colors duration-300">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Starter</h3>
                <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">${billing === 'monthly' ? '499' : '425'}</span>
                    <span className="text-slate-500 text-sm">/month</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">Perfect for small businesses getting started with digital marketing.</p>
                <button className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mb-8">Choose Plan</button>
                
                <div className="space-y-4 flex-grow">
                    {['Basic AI Marketing Tools', 'Standard Web Dev', 'Essential Analytics', 'Email Support', '1 Project'].map((feat, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                             <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                             {feat}
                        </div>
                    ))}
                </div>
            </div>

            {/* Professional */}
            <div className="bg-slate-900 dark:bg-slate-800 rounded-2xl p-8 border-2 border-primary relative flex flex-col transform md:-translate-y-4 shadow-2xl shadow-primary/20">
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">POPULAR</div>
                <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
                 <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black text-white">${billing === 'monthly' ? '999' : '850'}</span>
                    <span className="text-slate-400 text-sm">/month</span>
                </div>
                <p className="text-slate-300 text-sm mb-6">Advanced tools and support for growing companies.</p>
                <button className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors mb-8">Get Started</button>
                
                <div className="space-y-4 flex-grow">
                    {['All Starter Features', 'Advanced AI Tools', 'A/B Testing', 'Comprehensive Reporting', 'Priority Support', 'Up to 3 Projects'].map((feat, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-white">
                             <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                             {feat}
                        </div>
                    ))}
                </div>
            </div>

             {/* Enterprise */}
             <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col hover:border-blue-500/30 transition-colors duration-300">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Enterprise</h3>
                 <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">Custom</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">Tailored solutions for large-scale operations and specific needs.</p>
                <button className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mb-8">Contact Sales</button>
                
                <div className="space-y-4 flex-grow">
                    {['All Professional Features', 'Dedicated Account Manager', 'Bespoke Development', 'API Access', 'Advanced Security', 'Unlimited Projects'].map((feat, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                             <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                             {feat}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
             <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h3>
                <p className="text-slate-600 dark:text-slate-400">Everything you need to know about our billing and plans.</p>
             </div>
             
             <div className="space-y-4">
                 {[
                    {
                        q: "Can I change my plan later?",
                        a: "Absolutely! You can upgrade or downgrade your plan at any time directly from your dashboard. If you upgrade, the change is instant. If you downgrade, it takes effect at the end of your current billing cycle."
                    },
                    {
                        q: "Do you offer a free trial?",
                        a: "We offer a 30-day money-back guarantee instead of a limited free trial. This allows you to experience the full power of our Professional or Starter plans risk-free. If you're not satisfied within the first month, we'll issue a full refund."
                    },
                    {
                        q: "What payment methods do you accept?",
                        a: "We secure payments via Stripe and accept all major credit cards (Visa, Mastercard, American Express). For Enterprise plans, we also support invoicing and wire transfers."
                    },
                    {
                        q: "Is there a long-term contract?",
                        a: "No, our monthly plans are strictly pay-as-you-go with no long-term commitment. You can cancel anytime. Our annual plans offer a 15% discount in exchange for a one-year commitment."
                    },
                    {
                        q: "What happens if I exceed my project limit?",
                        a: "If you need more projects than your plan allows, you can either upgrade to the next tier or purchase an 'Add-on' pack for additional project slots from your dashboard settings."
                    }
                 ].map((item, index) => (
                    <details key={index} className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 open:shadow-md open:border-primary/50">
                        <summary className="font-bold cursor-pointer list-none flex justify-between items-center p-6 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            {item.q}
                            <span className="material-symbols-outlined text-slate-400 transition-transform duration-300 group-open:rotate-180 group-open:text-primary">expand_more</span>
                        </summary>
                        <div className="px-6 pb-6 pt-0 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-transparent group-open:border-slate-100 dark:group-open:border-slate-800 animate-in slide-in-from-top-2 fade-in duration-200">
                            <div className="pt-4">{item.a}</div>
                        </div>
                    </details>
                 ))}
             </div>
        </div>
    </div>
  );
};

export default Pricing;