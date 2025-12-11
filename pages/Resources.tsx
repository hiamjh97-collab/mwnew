import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [activeDropdown, setActiveDropdown] = useState<'category' | 'type' | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const featured = [
    {
      type: 'Webinar',
      title: 'AI in Modern Marketing: A Deep Dive',
      image: 'gradient-to-br from-blue-900 to-slate-900',
      cta: 'Watch Now',
      color: 'bg-blue-600'
    },
    {
      type: 'Template',
      title: 'The Ultimate Social Media Content Calendar',
      image: 'gradient-to-br from-green-900 to-slate-900',
      cta: 'Download',
      color: 'bg-white text-slate-900'
    }
  ];

  const resources = [
    {
      tag: 'SEO',
      type: 'Guide',
      title: 'The Ultimate SEO Checklist for 2024',
      desc: 'A comprehensive guide to optimize your website for search engines.',
      cta: 'View Guide',
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      tag: 'Social Media',
      type: 'Video',
      title: 'Mastering Instagram Reels for Business',
      desc: 'Learn how to create engaging video content that converts followers to customers.',
      cta: 'Watch Video',
      img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      tag: 'Content Marketing',
      type: 'Article',
      title: '10 Proven Strategies for Blog Writing',
      desc: 'Discover best practices for writing compelling blog posts that drive traffic.',
      cta: 'Read Article',
      img: 'https://images.unsplash.com/photo-1499750310159-529800cf2c5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      tag: 'Email Marketing',
      type: 'Template',
      title: 'High-Converting Email Campaign Templates',
      desc: 'A pack of ready-to-use email templates for your next marketing campaign.',
      cta: 'Download',
      img: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      tag: 'Web Development',
      type: 'Article',
      title: 'Core Web Vitals: A Developer\'s Guide',
      desc: 'Understand and optimize for Google\'s Core Web Vitals to improve user experience.',
      cta: 'Read Article',
      img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      tag: 'PPC',
      type: 'Webinar',
      title: 'Google Ads Performance Max Campaigns',
      desc: 'An expert walkthrough of setting up and optimizing PMax campaigns for ROI.',
      cta: 'Watch Now',
      img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Extract unique options
  const categories = ['All', ...Array.from(new Set(resources.map(r => r.tag))).sort()];
  const types = ['All', ...Array.from(new Set(resources.map(r => r.type))).sort()];

  // Filter Logic
  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || res.tag === selectedCategory;
    const matchesType = selectedType === 'All' || res.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="flex min-h-screen bg-[#0f1115] font-sans text-slate-200">
      {/* Sidebar Mockup (Visual only based on design) */}
      <aside className="w-64 border-r border-white/5 hidden lg:flex flex-col p-6 bg-[#0f1115]">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">MW</div>
          <div>
            <h1 className="font-bold text-white text-sm">Marketing Widget</h1>
            <p className="text-xs text-slate-500">AI Digital Agency</p>
          </div>
        </div>

        <nav className="space-y-1 flex-grow">
          <div className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-white/5 rounded-lg cursor-pointer">
            <span className="material-symbols-outlined text-xl">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-white/5 rounded-lg cursor-pointer">
            <span className="material-symbols-outlined text-xl">analytics</span>
            <span className="text-sm font-medium">Analytics</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-white/5 rounded-lg cursor-pointer">
            <span className="material-symbols-outlined text-xl">description</span>
            <span className="text-sm font-medium">Reports</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 bg-[#1a1d24] text-white rounded-lg cursor-pointer">
            <span className="material-symbols-outlined text-xl">library_books</span>
            <span className="text-sm font-medium">Resource Library</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-white/5 rounded-lg cursor-pointer">
            <span className="material-symbols-outlined text-xl">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </div>
        </nav>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl w-full mt-auto mb-6">
          Contact Support
        </button>
        
        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
           <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
             <span className="material-symbols-outlined text-sm">person</span>
           </div>
           <span className="text-sm font-medium">Profile</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Resource Library</h2>
          <p className="text-slate-400">Access exclusive guides, templates, and tutorials to elevate your marketing strategy.</p>
        </header>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-500">search</span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for guides, tutorials, templates..." 
              className="w-full bg-[#1a1d24] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2 relative" ref={dropdownRef}>
            
            {/* Category Filter */}
            <div className="relative">
                <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')}
                    className={`flex items-center gap-2 px-4 py-2 bg-[#1a1d24] border ${activeDropdown === 'category' || selectedCategory !== 'All' ? 'border-blue-500 text-blue-400' : 'border-white/10 text-slate-300'} rounded-lg text-sm hover:bg-white/5 transition-colors min-w-[120px] justify-between`}
                >
                    {selectedCategory === 'All' ? 'Category' : selectedCategory} 
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
                {activeDropdown === 'category' && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-[#1a1d24] border border-white/10 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => { setSelectedCategory(cat); setActiveDropdown(null); }}
                                className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 border-b border-white/5 last:border-0 ${selectedCategory === cat ? 'text-blue-400 font-bold bg-white/5' : 'text-slate-300'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Content Type Filter */}
            <div className="relative">
                <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
                    className={`flex items-center gap-2 px-4 py-2 bg-[#1a1d24] border ${activeDropdown === 'type' || selectedType !== 'All' ? 'border-blue-500 text-blue-400' : 'border-white/10 text-slate-300'} rounded-lg text-sm hover:bg-white/5 transition-colors min-w-[140px] justify-between`}
                >
                    {selectedType === 'All' ? 'Content Type' : selectedType}
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
                {activeDropdown === 'type' && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-[#1a1d24] border border-white/10 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {types.map(t => (
                            <button 
                                key={t}
                                onClick={() => { setSelectedType(t); setActiveDropdown(null); }}
                                className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 border-b border-white/5 last:border-0 ${selectedType === t ? 'text-blue-400 font-bold bg-white/5' : 'text-slate-300'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Clear Filters (Conditional) */}
            {(selectedCategory !== 'All' || selectedType !== 'All' || searchQuery) && (
                <button 
                    onClick={() => { setSelectedCategory('All'); setSelectedType('All'); setSearchQuery(''); }}
                    className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400 hover:bg-red-500/20 transition-colors"
                    title="Clear Filters"
                >
                    <span className="material-symbols-outlined text-lg">close</span>
                </button>
            )}

          </div>
          <div className="flex bg-[#1a1d24] rounded-lg border border-white/10 p-1">
            <button className="p-1.5 rounded hover:bg-white/10 text-white"><span className="material-symbols-outlined text-sm">grid_view</span></button>
            <button className="p-1.5 rounded hover:bg-white/10 text-slate-500"><span className="material-symbols-outlined text-sm">list</span></button>
          </div>
        </div>

        {/* Featured Section - Only show when not searching/filtering to keep it clean, or keep it if filters match? 
            For simplicity, let's keep it visible unless user has typed a search query to avoid distraction. 
        */}
        {!searchQuery && selectedCategory === 'All' && selectedType === 'All' && (
        <section className="mb-12">
          <h3 className="text-xl font-bold text-white mb-6">Featured Resources</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((item, idx) => (
              <div key={idx} className={`relative overflow-hidden rounded-2xl p-8 h-64 flex flex-col justify-end bg-${item.image} border border-white/5 group`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${item.image.includes('blue') ? 'from-blue-900/80 to-slate-900' : 'from-emerald-900/80 to-slate-900'} z-0`}></div>
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white mb-3 border border-white/10">{item.type}</span>
                  <h4 className="text-2xl font-bold text-white mb-6 max-w-sm">{item.title}</h4>
                  <button className={`${item.color === 'bg-white text-slate-900' ? 'bg-white text-slate-900' : 'bg-blue-600 text-white'} font-bold py-2 px-6 rounded-lg text-sm transition-transform hover:scale-105`}>
                    {item.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        )}

        {/* Resource Grid */}
        <section>
          {filteredResources.length === 0 ? (
              <div className="text-center py-20 bg-[#1a1d24] rounded-2xl border border-white/5">
                  <span className="material-symbols-outlined text-4xl text-slate-500 mb-4">search_off</span>
                  <h3 className="text-xl font-bold text-white mb-2">No resources found</h3>
                  <p className="text-slate-400">Try adjusting your filters or search terms.</p>
                  <button 
                    onClick={() => { setSelectedCategory('All'); setSelectedType('All'); setSearchQuery(''); }}
                    className="mt-6 text-blue-400 hover:text-blue-300 font-bold"
                  >
                      Clear all filters
                  </button>
              </div>
          ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredResources.map((res, idx) => (
              <div key={idx} className="bg-[#1a1d24] rounded-xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors group flex flex-col animate-in fade-in zoom-in-95 duration-300">
                <div className="h-40 overflow-hidden relative">
                   <img src={res.img} alt={res.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                   <div className="absolute top-3 left-3 flex gap-2">
                       {/* Icon overlay or badge could go here */}
                   </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-2 py-1 rounded">{res.tag}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-700/50 px-2 py-1 rounded">{res.type}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{res.title}</h4>
                  <p className="text-sm text-slate-400 mb-6 flex-grow line-clamp-2">{res.desc}</p>
                  <button className="w-full bg-[#232730] hover:bg-[#2c323e] text-blue-400 font-semibold py-2.5 rounded-lg text-sm transition-colors border border-white/5">
                    {res.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
          )}
        </section>
        
        {/* Pagination - Hide if no results */}
        {filteredResources.length > 0 && (
        <div className="flex justify-center items-center mt-12 gap-4">
             <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-400"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-bold">1</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-400 text-sm">2</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-400 text-sm">3</button>
             <span className="text-slate-600">...</span>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-400 text-sm">10</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-400"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
        </div>
        )}
      </main>
    </div>
  );
};

export default Resources;