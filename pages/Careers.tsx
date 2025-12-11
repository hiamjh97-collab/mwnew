import React from 'react';
import { Link } from 'react-router-dom';

const Careers: React.FC = () => {
  return (
    <div className="bg-[#0f1115] min-h-screen text-white font-sans">
      {/* Hero Section */}
      <div className="relative h-[600px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-[#0f1115]/80 to-transparent"></div>
        
        <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl mt-20">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6 backdrop-blur-sm">We are hiring</span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight font-display">
            Shape the Future of <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">AI Marketing</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join our innovative, data-driven team and build the next generation of digital marketing tools used by top brands worldwide.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })} className="bg-primary hover:bg-blue-600 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-primary/25">
              View Open Positions
            </button>
            <Link to="/about" className="bg-[#1a1d24] hover:bg-[#252a33] text-white font-bold py-3.5 px-8 rounded-xl transition-all border border-white/5">
              About Us
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 max-w-6xl">
        {/* Culture & Values */}
        <section className="mb-32">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Our Culture & Values</h2>
             <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                We're a team of passionate innovators dedicated to pushing the boundaries of what's possible in digital marketing.
             </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'analytics', title: 'Data-Driven', desc: 'We let data guide our decisions and strategies, ensuring measurable success for our clients and ourselves.' },
              { icon: 'lightbulb', title: 'Innovation', desc: 'We are constantly exploring new technologies and ideas to stay at the forefront of the industry.' },
              { icon: 'groups', title: 'Collaboration', desc: 'We believe the best results come from working together, sharing knowledge, and supporting each other.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#1a1d24] p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-all hover:bg-[#20242c] group">
                <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 font-display">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Life at Marketing Widget */}
        <section className="mb-32 bg-gradient-to-br from-[#1a1d24] to-[#11141a] rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <h2 className="text-3xl font-bold mb-12 text-center font-display relative z-10">Life at Marketing Widget</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {[
              { icon: 'favorite', title: 'Health & Wellness', desc: 'Comprehensive health, dental, and vision insurance for you and your family.' },
              { icon: 'schedule', title: 'Flexible Work', desc: 'Choose to work from our office, from home, or a mix of both. We value output over hours.' },
              { icon: 'school', title: 'Professional Growth', desc: 'Generous budget for courses, conferences, and certifications to help you level up.' },
              { icon: 'celebration', title: 'Team Events', desc: 'Regular team-building activities, happy hours, and annual company-wide retreats.' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-blue-400 mb-4">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section id="open-positions">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-display">Open Positions</h2>
          <div className="space-y-4">
            {[
              { title: 'Senior Frontend Engineer', dept: 'Engineering', loc: 'Remote (US)', type: 'Full-time' },
              { title: 'Product Marketing Manager', dept: 'Marketing', loc: 'New York, NY (Hybrid)', type: 'Full-time' },
              { title: 'UX/UI Designer', dept: 'Design', loc: 'Remote (Anywhere)', type: 'Contract' },
              { title: 'AI Research Scientist', dept: 'Data Science', loc: 'San Francisco, CA', type: 'Full-time' }
            ].map((job, i) => (
              <div key={i} className="bg-[#1a1d24] p-6 md:p-8 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between hover:border-primary hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group cursor-pointer">
                <div className="mb-6 md:mb-0 text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">domain</span> {job.dept}</span>
                    <span className="hidden md:inline w-1 h-1 bg-slate-700 rounded-full"></span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">location_on</span> {job.loc}</span>
                    <span className="hidden md:inline w-1 h-1 bg-slate-700 rounded-full"></span>
                    <span className="bg-white/5 px-2 py-0.5 rounded text-xs font-medium text-slate-300">{job.type}</span>
                  </div>
                </div>
                <button className="bg-white text-slate-900 px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-all shadow-sm min-w-[140px]">
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-3xl p-12 text-center border border-white/10 relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 font-display">Don't see a role for you?</h3>
                <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                We're always looking for talented people to join our team. Send us your resume and we'll keep you in mind for future openings.
                </p>
                <button className="bg-white text-slate-900 font-bold py-3 px-8 rounded-xl transition-all hover:bg-slate-200">
                Join Our Talent Pool
                </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Careers;