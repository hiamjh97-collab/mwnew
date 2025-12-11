import React from 'react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <div className="bg-[#0f1115] min-h-screen font-sans">
        {/* Header */}
        <div className="pt-20 pb-16 text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
            <p className="text-slate-400 max-w-xl mx-auto">AI-based, data-driven solutions to elevate your brand's digital presence.</p>
        </div>

        {/* Services Grid */}
        <div className="container mx-auto px-6 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { 
                        title: "Web Development", 
                        slug: "web-development",
                        icon: "code", 
                        desc: "We build stunning, high-performance websites optimized for conversion. Our approach combines cutting-edge technology with custom designs.",
                        iconBg: "bg-blue-100",
                        iconColor: "text-blue-600"
                    },
                    { 
                        title: "SEO", 
                        slug: "seo",
                        icon: "trending_up", 
                        desc: "Increase your organic visibility and attract qualified leads with our data-driven SEO strategies. We utilize AI-driven keyword research.",
                        iconBg: "bg-green-100",
                        iconColor: "text-green-600"
                    },
                    { 
                        title: "Social Media Marketing", 
                        slug: "social-media",
                        icon: "thumb_up", 
                        desc: "Engage your audience and build a loyal community through compelling social media campaigns. We develop platform-specific content strategies.",
                        iconBg: "bg-pink-100",
                        iconColor: "text-pink-600"
                    },
                    { 
                        title: "Paid Advertising", 
                        slug: "paid-advertising",
                        icon: "campaign", 
                        desc: "Maximize your ROI with precisely targeted ad campaigns across platforms like Google and Meta. Our certified experts use AI for audience segmentation.",
                        iconBg: "bg-purple-100",
                        iconColor: "text-purple-600"
                    },
                    { 
                        title: "Branding", 
                        slug: "branding",
                        icon: "edit", 
                        desc: "Craft a memorable brand identity that resonates with your target audience. We provide comprehensive branding services, including logo design.",
                        iconBg: "bg-yellow-100",
                        iconColor: "text-yellow-600"
                    },
                    { 
                        title: "Complete Digital Solutions", 
                        slug: "complete-solutions",
                        icon: "layers", 
                        desc: "An all-in-one package that integrates our core services into a unified, powerful strategy. We tailor a comprehensive plan that aligns with your business goals.",
                        iconBg: "bg-teal-100",
                        iconColor: "text-teal-600"
                    }
                ].map((service, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow flex flex-col h-full">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${service.iconBg} ${service.iconColor}`}>
                            <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{service.desc}</p>
                        <Link to={`/services/${service.slug}`} className="text-slate-900 font-bold text-sm hover:text-blue-600 transition-colors">
                            Learn More →
                        </Link>
                    </div>
                ))}
            </div>
        </div>

        {/* Dashboard Preview Section */}
        <div className="bg-slate-50 py-24">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Client Dashboard Preview</h2>
                <p className="text-slate-600 mb-12">Get a glimpse of how you'll track your marketing performance and campaign overview.</p>
                
                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden text-left">
                    <div className="p-8 border-b border-slate-100">
                        <h3 className="font-bold text-lg text-slate-800 mb-6">KPI Summary</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { label: 'Total Spend', val: '$45,000', icon: 'attach_money', color: 'blue' },
                                { label: 'Overall ROI', val: '+125%', icon: 'trending_up', color: 'green' },
                                { label: 'Total Traffic', val: '250k', icon: 'trending_up', color: 'orange' },
                                { label: 'Conversions', val: '8,500', icon: 'rocket_launch', color: 'purple' }
                            ].map((kpi, i) => (
                                <div key={i} className="bg-slate-50 p-4 rounded-xl">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-xs text-slate-500">{kpi.label}</p>
                                        <span className={`material-symbols-outlined text-sm text-${kpi.color}-500 bg-${kpi.color}-100 p-1 rounded-full`}>{kpi.icon}</span>
                                    </div>
                                    <p className={`text-2xl font-bold ${kpi.label === 'Overall ROI' ? 'text-green-500' : 'text-slate-900'}`}>{kpi.val}</p>
                                    <div className="h-10 mt-2">
                                        <svg viewBox="0 0 100 20" className="w-full h-full stroke-2 fill-none" style={{stroke: kpi.color === 'green' ? '#22c55e' : '#3b82f6'}}>
                                            <path d="M0 15 Q 25 15 30 10 T 60 5 T 100 2" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="p-8 grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold text-lg text-slate-800 mb-4">Active Campaigns</h3>
                            <table className="w-full text-sm">
                                <thead className="text-xs text-slate-400 uppercase">
                                    <tr><th className="text-left font-medium pb-2">Campaign Name</th><th className="text-left font-medium pb-2">Status</th><th className="text-right font-medium pb-2">Budget</th></tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr><td className="py-3 text-slate-700">Q3 AI Ads</td><td><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">Active</span></td><td className="text-right text-slate-600">$45,000</td></tr>
                                    <tr><td className="py-3 text-slate-700">Q2 AI Ads</td><td><span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-bold">Paused</span></td><td className="text-right text-slate-600">$25,000</td></tr>
                                    <tr><td className="py-3 text-slate-700">Q1 AI Ads</td><td><span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-bold">Paused</span></td><td className="text-right text-slate-600">$30,000</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800 mb-4">Billing & Invoices</h3>
                            <table className="w-full text-sm">
                                <thead className="text-xs text-slate-400 uppercase">
                                    <tr><th className="text-left font-medium pb-2">Date</th><th className="text-left font-medium pb-2">Invoice #</th><th className="text-right font-medium pb-2">Amount</th><th className="text-right font-medium pb-2">Status</th></tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr><td className="py-3 text-slate-600">Oct 25, 2023</td><td className="text-slate-700 font-medium">INV-2345</td><td className="text-right text-slate-600">$15,000</td><td className="text-right"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">Paid</span></td></tr>
                                    <tr><td className="py-3 text-slate-600">Nov 25, 2023</td><td className="text-slate-700 font-medium">INV-2346</td><td className="text-right text-slate-600">$15,000</td><td className="text-right"><span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-bold">Pending</span></td></tr>
                                    <tr><td className="py-3 text-slate-600">Dec 25, 2023</td><td className="text-slate-700 font-medium">INV-2347</td><td className="text-right text-slate-600">$15,000</td><td className="text-right"><span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-bold">Pending</span></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <Link to="/dashboard" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-orange-500/20 transition-all inline-flex items-center gap-2">
                        Log in to your Dashboard <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </div>

        {/* CTA */}
        <div className="py-24 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Already a Client?</h2>
            <p className="text-slate-400 mb-8">Access your personalized dashboard to track campaign performance, view reports, and manage your account.</p>
            <Link to="/dashboard" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center gap-2">
                Go to Client Dashboard <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
        </div>
    </div>
  );
};

export default Services;