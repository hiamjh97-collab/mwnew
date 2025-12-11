import React from 'react';
import { Link } from 'react-router-dom';
import { siteContent } from '../services/siteContent';

const Blog: React.FC = () => {
  const posts = siteContent.filter(item => item.type === 'Blog');

  return (
    <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 font-display">Insights & News</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">Stay ahead of the curve with our expert analysis.</p>
        </div>

        {/* Featured Post */}
        <div className="mb-16 relative rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
            <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="AI Marketing" className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 max-w-3xl">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">Featured</span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">The Future of AI in Digital Marketing: Trends to Watch in 2024</h2>
                <p className="text-slate-300 text-lg mb-6 line-clamp-2">Explore how artificial intelligence is reshaping marketing strategies, from personalized customer experiences to predictive analytics.</p>
                <Link to="/blog/future-of-ai" className="bg-white text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-slate-200 transition-colors inline-block">Read Article</Link>
            </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
            {['All Posts', 'AI in Marketing', 'Web Development', 'Data Analytics', 'SEO'].map((cat, i) => (
                <button key={i} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                    {cat}
                </button>
            ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all group flex flex-col h-full">
                    <div className="h-48 overflow-hidden">
                         <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                        <p className="text-primary text-sm font-bold mb-2">{post.category}</p>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-snug">{post.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">{post.excerpt || post.description}</p>
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
                            <span>{post.author}</span>
                            <span>{post.date}</span>
                        </div>
                        <Link to={post.path} className="absolute inset-0 z-10"><span className="sr-only">Read more</span></Link>
                    </div>
                </div>
            ))}
        </div>
        
        {/* Newsletter */}
        <div className="mt-20 bg-slate-100 dark:bg-slate-800 rounded-2xl p-12 text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Subscribe to our newsletter</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">Get the latest insights delivered directly to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input type="email" placeholder="Enter your email" className="flex-grow rounded-xl border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 focus:ring-primary focus:border-primary" />
                <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary/90">Subscribe</button>
            </div>
        </div>
    </div>
  );
};

export default Blog;