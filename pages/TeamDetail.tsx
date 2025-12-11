import React from 'react';
import { useParams, Link } from 'react-router-dom';

const teamData: Record<string, any> = {
  'jane-doe': {
    name: 'Jane Doe',
    role: 'CEO & Founder',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'Jane is a visionary leader who founded Marketing Widget to bridge the gap between creative marketing and data science. With 15+ years of experience, she leads the company with a focus on innovation and results.',
    skills: ['Leadership', 'Strategic Planning', 'Digital Innovation', 'Public Speaking'],
    email: 'jane@marketingwidget.com',
    website: 'janedoe.com',
    github: 'janedoe-dev'
  },
  'john-smith': {
    name: 'John Smith',
    role: 'Head of Marketing',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'John brings a wealth of experience in multi-channel marketing campaigns. He specializes in creating cohesive brand narratives that drive engagement and conversion.',
    skills: ['Marketing Strategy', 'Brand Management', 'Campaign Analytics', 'Content Direction'],
    email: 'john@marketingwidget.com',
    website: 'johnsmithmarketing.com',
    github: 'jsmith-mkt'
  },
  'aisha-chen': {
    name: 'Aisha Chen',
    role: 'Lead Data Scientist',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Using existing placeholder
    bio: 'With over a decade of experience in the tech industry, I specialize in leveraging data to uncover insights and drive business strategy. My passion lies at the intersection of machine learning, statistical analysis, and compelling data visualization. At Marketing Widget, I lead a talented team of data scientists to build predictive models and AI-driven solutions that empower our clients to make smarter, data-informed decisions.\n\nBefore joining Marketing Widget, I worked with several Fortune 500 companies, helping them navigate the complexities of big data and develop scalable analytics platforms. I hold a Ph.D. in Computer Science with a focus on artificial intelligence, and I am a firm believer in continuous learning and innovation.',
    skills: ['AI Strategy', 'Data Analytics', 'Machine Learning', 'Predictive Modeling', 'Python & R', 'Web Development', 'Data Visualization'],
    email: 'aisha.chen@marketingwidget.com',
    website: 'aishachen.io',
    github: 'aisha-c'
  },
  'michael-johnson': {
      name: 'Michael Johnson',
      role: 'Lead Developer',
      img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bio: 'Michael is a full-stack wizard who ensures all our web projects are robust, scalable, and secure. He mentors the dev team and establishes coding standards.',
      skills: ['Full Stack Dev', 'React', 'Node.js', 'System Architecture'],
      email: 'michael@marketingwidget.com',
      website: 'mj-dev.io',
      github: 'mjohnson'
  },
  'emily-davis': {
      name: 'Emily Davis',
      role: 'SEO Specialist',
      img: 'https://images.unsplash.com/photo-1598550874175-4d7112ee750c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bio: 'Emily is an SEO guru who knows how to get brands to the top of search results. She stays ahead of algorithm updates to keep our clients visible.',
      skills: ['Technical SEO', 'Content Strategy', 'Keyword Research', 'Link Building'],
      email: 'emily@marketingwidget.com',
      website: 'emilyseo.net',
      github: 'edavis-seo'
  }
};

const TeamDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  // Default to Aisha if slug not found for demo purposes, or handle error
  const member = (slug && teamData[slug]) ? teamData[slug] : teamData['aisha-chen']; 

  return (
    <div className="bg-[#0f1115] min-h-screen text-slate-300 font-sans">
      <div className="container mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-slate-500 mb-12">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/about" className="hover:text-white">About Us</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{member.name}</span>
        </div>

        {/* Header Profile */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#1a1d24] shadow-2xl">
            <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold text-white mb-2">{member.name}</h1>
            <p className="text-xl text-slate-400 mb-6">{member.role}</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="px-6 py-2 bg-[#1a1d24] hover:bg-[#252a33] text-white rounded-lg font-medium transition-colors border border-white/10">
                Connect on LinkedIn
              </button>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-600/20">
                See My Work
              </button>
            </div>
          </div>
        </div>

        {/* Info Bar */}
        <div className="flex flex-wrap gap-8 border-t border-b border-white/10 py-6 mb-12 text-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-500">alternate_email</span>
            <span className="text-white font-medium">Email</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-500">link</span>
            <span className="text-white font-medium">Website</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-500">code</span>
            <span className="text-white font-medium">GitHub</span>
          </div>
        </div>

        {/* About Me */}
        <div className="mb-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-white mb-6">About Me</h2>
          <div className="text-slate-400 leading-relaxed whitespace-pre-line">
            {member.bio}
          </div>
        </div>

        {/* Expertise */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-6">My Expertise</h2>
          <div className="flex flex-wrap gap-3">
            {member.skills.map((skill: string, i: number) => (
              <span key={i} className="px-4 py-2 bg-[#111827] border border-[#1f2937] text-blue-400 rounded-full text-sm font-medium hover:border-blue-500/50 transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;