import React from 'react';
import { Link } from 'react-router-dom';
import { siteContent } from '../services/siteContent';

const CaseStudies: React.FC = () => {
  const caseStudies = siteContent.filter(item => item.type === 'Case Study');

  return (
    <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 font-display">Success Stories</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Discover how we've helped businesses like yours achieve predictable growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, i) => (
                <div key={i} className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all duration-300 relative">
                    <div className="h-56 overflow-hidden">
                        <img src={study.image} alt={study.industry} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    </div>
                    <div className="p-8">
                        <div className="flex gap-2 mb-4">
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">{study.industry}</span>
                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">Growth</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{study.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{study.description}</p>
                        <Link to={study.path} className="text-primary font-bold text-sm hover:underline flex items-center gap-1">View Case Study <span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
                    </div>
                </div>
            ))}
        </div>

        <section className="bg-slate-900 text-white rounded-3xl p-12 mt-20 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6">Ready to Achieve Similar Results?</h2>
                <Link to="/contact" className="inline-block bg-white text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition-colors">
                    Contact Us Today
                </Link>
             </div>
        </section>
    </div>
  );
};

export default CaseStudies;