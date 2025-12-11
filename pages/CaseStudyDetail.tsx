import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { siteContent } from '../services/siteContent';

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = siteContent.find(item => item.path === `/case-studies/${slug}` && item.type === 'Case Study');

  if (!study) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Case Study Not Found</h1>
        <Link to="/case-studies" className="text-primary hover:underline">Back to Case Studies</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="bg-slate-900 text-white py-24 px-6 relative overflow-hidden">
         <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
         <img src={study.image} alt={study.title} className="absolute inset-0 w-full h-full object-cover opacity-20" />
         <div className="container mx-auto relative z-10 text-center max-w-4xl">
             <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-bold mb-6">{study.industry}</span>
             <h1 className="text-4xl md:text-6xl font-black mb-8 font-display">{study.title}</h1>
         </div>
      </div>

      <div className="container mx-auto px-6 py-16">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-24 mb-16 relative z-20">
              {study.stats?.map((stat: any, i: number) => (
                  <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl text-center border border-slate-100 dark:border-slate-700">
                      <p className="text-4xl md:text-5xl font-black text-primary mb-2">{stat.value}</p>
                      <p className="text-slate-600 dark:text-slate-400 font-medium uppercase tracking-wide text-sm">{stat.label}</p>
                  </div>
              ))}
          </div>

          <div className="max-w-4xl mx-auto space-y-16">
              <section>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">The Challenge</h2>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{study.challenge}</p>
              </section>

              <section>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">The Solution</h2>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{study.solution}</p>
              </section>

              <section>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">The Result</h2>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{study.result}</p>
              </section>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-12 flex justify-between items-center">
                   <Link to="/case-studies" className="font-bold text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
                       <span className="material-symbols-outlined">arrow_back</span> All Stories
                   </Link>
                   <Link to="/contact" className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary/90 shadow-lg">
                       Start Your Project
                   </Link>
              </div>
          </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;