import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="bg-[#f8fafc] dark:bg-[#0f172a] min-h-screen font-sans py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 text-center font-display">Privacy Policy</h1>
        <p className="text-center text-slate-500 mb-16 text-sm">Last updated: October 26, 2023</p>

        <div className="bg-white dark:bg-[#1e293b] p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 space-y-12 relative overflow-hidden">
          
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">info</span>
              1. Introduction
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              At Marketing Widget ("we", "our", or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or engage with our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">database</span>
              2. Data We Collect
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              We collect information that helps us provide you with the best possible experience. This includes:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">Personal Information</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Name, email address, phone number, and billing details provided during registration or checkout.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">Usage Data</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">IP address, browser type, device information, and pages visited to analyze performance and trends.</p>
                </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
               <span className="material-symbols-outlined text-primary">manage_accounts</span>
               3. How We Use Your Data
            </h2>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                <li className="flex gap-3">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                    <span>To provide, operate, and maintain our services.</span>
                </li>
                <li className="flex gap-3">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                    <span>To improve, personalize, and expand our website's functionality.</span>
                </li>
                <li className="flex gap-3">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                    <span>To understand and analyze how you use our website.</span>
                </li>
                <li className="flex gap-3">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                    <span>To communicate with you, including for customer service and marketing purposes.</span>
                </li>
            </ul>
          </section>

           <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">cookie</span>
              4. Cookies & Tracking
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
               <span className="material-symbols-outlined text-primary">security</span>
               5. Data Security
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
               <span className="material-symbols-outlined text-primary">gavel</span>
               6. Your Rights
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <div className="flex flex-wrap gap-3">
                {['Access', 'Rectification', 'Erasure', 'Restriction', 'Objection', 'Portability'].map((right, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md text-sm font-medium border border-slate-200 dark:border-slate-700">
                        {right}
                    </span>
                ))}
            </div>
          </section>

          <section className="border-t border-slate-200 dark:border-slate-700 pt-8 mt-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <a href="mailto:privacy@marketingwidget.com" className="inline-flex items-center gap-2 text-primary hover:text-blue-700 font-bold transition-colors">
                <span className="material-symbols-outlined">mail</span>
                privacy@marketingwidget.com
            </a>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Privacy;