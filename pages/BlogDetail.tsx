import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { siteContent } from '../services/siteContent';

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = siteContent.find(item => item.path === `/blog/${slug}` && item.type === 'Blog');

  if (!post) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Post Not Found</h1>
        <Link to="/blog" className="text-primary hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Image */}
      <div className="w-full h-[400px] md:h-[500px] relative">
         <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 -mt-32 relative z-10">
         <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4 mb-6">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">{post.category}</span>
                <span className="text-slate-500 text-sm">{post.date}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 leading-tight font-display">{post.title}</h1>
            
            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-8 mb-8">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-xl font-bold text-slate-500">
                    {post.author?.charAt(0)}
                </div>
                <div>
                    <p className="font-bold text-slate-900 dark:text-white">{post.author}</p>
                    <p className="text-sm text-slate-500">{post.role}</p>
                </div>
            </div>

            <div 
                className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300"
                dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
         </div>
      </div>
      
      <div className="container mx-auto px-6 py-12 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 font-bold text-slate-900 dark:text-white hover:text-primary transition-colors">
              <span className="material-symbols-outlined">arrow_back</span> Back to Articles
          </Link>
      </div>
    </article>
  );
};

export default BlogDetail;