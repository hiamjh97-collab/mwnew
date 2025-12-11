import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="bg-[#f8fafc] dark:bg-[#0f172a] min-h-screen font-sans py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 text-center">Terms & Conditions</h1>
        <p className="text-center text-slate-500 mb-12 text-sm">Last updated: October 26, 2023</p>

        <div className="bg-white dark:bg-[#1e293b] p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-12">
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">1. Introduction</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Welcome to Marketing Widget. These Terms & Conditions govern your use of our services and website. By engaging our services, you agree to these terms in full. If you disagree with any part of these terms, you must not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">2. Services Provided</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
              Marketing Widget offers a range of AI-based, data-driven digital marketing and web development services including, but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 text-sm ml-2">
              <li>Digital Marketing Strategy</li>
              <li>Search Engine Optimization (SEO)</li>
              <li>Web Design and Development</li>
              <li>Social Media Marketing</li>
              <li>Branding and Identity Design</li>
              <li>Paid Advertising (PPC) Campaigns</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-4">
              The specific scope of services for each client will be detailed in a separate proposal or statement of work.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">3. Payments</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Clients agree to pay for services based on the pricing and payment schedule outlined in their project proposal or invoice. All payments are due on the specified dates. We do not offer refunds for services once a project has been initiated, unless explicitly stated otherwise in a signed agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">4. Client Responsibilities</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Clients must provide all necessary access to information, digital assets, and personnel required for Marketing Widget to perform the agreed-upon services. Delays in providing these materials may result in project timeline extensions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">5. Intellectual Property</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Upon receipt of full and final payment, all rights, title, and interest in and to the final project deliverables created by Marketing Widget for the client will be transferred to the client. We retain the right to use the project for our portfolio and marketing materials.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">6. Limitation of Liability</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Marketing Widget will not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or other intangibles, arising out of or in connection with our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">7. Changes to Terms</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify clients of any significant changes. Continued use of our services after such changes constitutes your consent to the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">8. Termination</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">9. Governing Law</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of Delaware, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">10. Contact Us</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                If you have any questions about these Terms, please contact us at legal@marketingwidget.com.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Terms;