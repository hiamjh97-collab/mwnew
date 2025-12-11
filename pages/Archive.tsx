import React from 'react';

const Archive: React.FC = () => {
  const archiveItems = [
    { year: "2023", items: ["Launched AI-Powered Analytics Dashboard", "Partnered with TechGiant Corp", "Expanded team to 50+ members"] },
    { year: "2022", items: ["Opened new office in Singapore", "Awarded 'Best Digital Agency' by LocalBiz", "Reached 100 active clients"] },
    { year: "2021", items: ["Rebranded from 'WebWizards' to 'Marketing Widget'", "Introduced SEO services", "Hit $1M ARR"] },
    { year: "2020", items: ["Company founded", "First major e-commerce project launch"] }
  ];

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-12 font-display text-center">Company Archive</h1>
            
            <div className="space-y-12 relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-0">
                {archiveItems.map((yearGroup, i) => (
                    <div key={i} className="relative pl-8 md:pl-0">
                        <div className="md:w-32 md:absolute md:left-[-140px] md:text-right">
                             <span className="text-2xl font-bold text-primary block">{yearGroup.year}</span>
                        </div>
                        <div className="absolute left-[-5px] top-2 w-3 h-3 rounded-full bg-primary border-4 border-white dark:border-background-dark md:hidden"></div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <ul className="space-y-3">
                                {yearGroup.items.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-sm text-slate-400">history</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Archive;