import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="bg-[#0f1115] min-h-screen text-slate-300 font-sans">
      {/* Hero / Who We Are */}
      <div className="container mx-auto px-6 pt-16 pb-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Who We Are</h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            A results-driven digital marketing and web development agency that helps businesses grow with innovative, data-driven solutions. We turn brands into digital success stories.
          </p>
        </div>

        {/* Brain Image */}
        <div className="relative max-w-4xl mx-auto mb-24 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <img 
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
            alt="AI Brain Concept" 
            className="w-full h-[500px] object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-transparent"></div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-32">
          <div>
            <h3 className="text-sm font-bold text-blue-500 uppercase tracking-wider mb-3">Our Mission</h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              To deliver real, measurable results through transparency, creativity, and long-term partnerships, helping our clients navigate the digital landscape with confidence.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-blue-500 uppercase tracking-wider mb-3">Our Vision</h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              To be the leading innovator in digital marketing, leveraging AI and data to turn brands into digital success stories and set new standards for excellence.
            </p>
          </div>
        </div>

        {/* What We Specialize In */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">What We Specialize In</h2>
            <p className="text-slate-400">We provide a comprehensive suite of digital services designed to elevate your brand and drive measurable results.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: 'code', title: 'Web Development', desc: 'Crafting beautiful, high-performing websites that convert.' },
              { icon: 'trending_up', title: 'SEO', desc: 'Boosting your visibility and ranking on search engines.' },
              { icon: 'groups', title: 'Social Media Marketing', desc: 'Engaging your audience and building a strong online community.' },
              { icon: 'campaign', title: 'Paid Advertising', desc: 'Targeted campaigns that deliver immediate impact and ROI.' },
              { icon: 'palette', title: 'Branding', desc: 'Creating a memorable brand identity that resonates.' },
              { icon: 'monitor_heart', title: 'Digital Marketing Solutions', desc: 'AI-encompassing strategies to achieve your business goals.' }
            ].map((item, i) => (
              <div key={i} className="bg-[#1a1d24] p-6 rounded-xl border border-white/5 hover:border-blue-500/30 hover:bg-[#20242c] transition-all group">
                <div className="text-blue-500 mb-4 bg-blue-500/10 w-fit p-2 rounded-lg">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meet Our Team */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-slate-400">Skilled digital experts with a deep understanding of modern business needs.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Jane Doe", role: "CEO & Founder", desc: "With over 15 years in digital innovation, Jane founded Marketing Widget to merge data science with creative strategy.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", link: "jane-doe" },
              { name: "John Smith", role: "Head of Marketing", desc: "John is a master strategist with a decade of experience in crafting high-impact marketing campaigns.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", link: "john-smith" },
              { name: "Michael Johnson", role: "Lead Developer", desc: "Michael is the architectural mind behind our cutting-edge web solutions. Passion for clean code and seamless UX.", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", link: "michael-johnson" },
              { name: "Emily Davis", role: "SEO Specialist", desc: "Emily lives and breathes search engine algorithms. With over 8 years of dedicated SEO experience.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", link: "emily-davis" },
            ].map((person, i) => (
              <div key={i} className="bg-[#1a1d24] p-6 rounded-2xl border border-white/5 flex gap-6 items-start hover:border-blue-500/30 transition-all">
                <Link to={`/about/${person.link}`}>
                  <img src={person.img} alt={person.name} className="w-24 h-24 rounded-full object-cover border-2 border-slate-700 hover:border-blue-500 transition-colors" />
                </Link>
                <div>
                  <h3 className="text-xl font-bold text-white">{person.name}</h3>
                  <p className="text-blue-400 text-sm font-bold mb-3">{person.role}</p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">{person.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Culture & Values */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Culture & Values</h2>
            <p className="text-slate-400">We're more than just a team; we're a community of innovators, collaborators, and problem-solvers.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-green-500/10 p-3 h-fit rounded-lg text-green-500">
                  <span className="material-symbols-outlined">lightbulb</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Innovation at Heart</h3>
                  <p className="text-slate-400 text-sm">We thrive on curiosity and continuous learning. Our culture encourages creative thinking and the adoption of cutting-edge technology.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-500/10 p-3 h-fit rounded-lg text-blue-500">
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Collaborative Spirit</h3>
                  <p className="text-slate-400 text-sm">Great ideas come from everywhere. We foster an open, collaborative environment where every voice is heard.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-purple-500/10 p-3 h-fit rounded-lg text-purple-500">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Unwavering Integrity</h3>
                  <p className="text-slate-400 text-sm">Trust is our currency. We operate with transparency and honesty, building lasting partnerships with our clients.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1d24] p-8 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6">Life at Marketing Widget</h3>
              <ul className="space-y-4">
                {[
                  'Comprehensive Health & Wellness Benefits',
                  'Flexible Work Schedules & Remote Options',
                  'Generous Professional Development Stipend',
                  'Regular Team Building Events & Outings',
                  'Modern, Collaborative Office Environment',
                  'Opportunities to Work on Impactful, AI-driven Projects'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                    <span className="material-symbols-outlined text-blue-400 text-base">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Make an Impact?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">We're always looking for talented individuals to join our growing team. If you're passionate about digital innovation, we'd love to hear from you.</p>
          <Link to="/careers" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center gap-2">
            Join Our Team <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default About;