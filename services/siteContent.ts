// Define the interface for site content items
export interface SiteContentItem {
  title: string;
  path: string;
  type: 'Page' | 'Service' | 'Case Study' | 'Blog' | 'Tool' | 'Resource';
  description: string;
  keywords?: string;
  content?: string; // HTML or long text
  image?: string;
  category?: string;
  author?: string;
  date?: string;
  role?: string;
  stats?: Array<{ label: string; value: string }>;
  challenge?: string;
  solution?: string;
  result?: string;
  industry?: string;
  excerpt?: string;
}

export const siteContent: SiteContentItem[] = [
  // Main Pages
  { title: "Home", path: "/", type: "Page", description: "Marketing Widget homepage. AI-driven growth agency overview, ROI calculator teaser, and testimonials.", keywords: "home, agency, growth, ai, main" },
  { title: "About Us", path: "/about", type: "Page", description: "Learn about our mission, vision, team, and culture. We merge data science with creative strategy.", keywords: "team, mission, vision, history, culture" },
  { title: "Contact", path: "/contact", type: "Page", description: "Get in touch with us. Contact form, email, phone number, and office location.", keywords: "contact, support, email, location, address" },
  { title: "Pricing", path: "/pricing", type: "Page", description: "Transparent pricing plans: Starter, Professional, and Enterprise. Monthly and annual billing options.", keywords: "cost, plans, pricing, subscription, rates" },
  { title: "ROI Calculator", path: "/roi-calculator", type: "Tool", description: "Interactive calculator to forecast revenue growth and ROI based on ad spend and conversion rates.", keywords: "calculator, revenue, forecast, profit, math, projection" },
  { title: "Careers", path: "/careers", type: "Page", description: "Join our team. View open positions and learn about our benefits.", keywords: "jobs, hiring, careers, work, employment" },
  { title: "Resources", path: "/resources", type: "Page", description: "Library of guides, templates, and webinars for digital marketing.", keywords: "guides, whitepapers, downloads, learning" },

  // Services
  { title: "Services Overview", path: "/services", type: "Service", description: "Overview of all our digital marketing and development services.", keywords: "services, offerings, capabilities" },
  { title: "Web Development", path: "/services/web-development", type: "Service", description: "We build stunning, high-performance websites optimized for conversion. Our approach combines cutting-edge technology with custom designs.", keywords: "coding, website, development, programming, app, react, nextjs" },
  { title: "SEO Optimization", path: "/services/seo", type: "Service", description: "Data-driven SEO strategies to boost organic rankings and traffic. We utilize AI-driven keyword research.", keywords: "search engine, ranking, google, organic traffic, keywords" },
  { title: "Paid Advertising (PPC)", path: "/services/paid-advertising", type: "Service", description: "Maximize your ROI with precisely targeted ad campaigns across platforms like Google and Meta.", keywords: "ads, ppc, google ads, facebook ads, sem" },
  { title: "Branding & Identity", path: "/services/branding", type: "Service", description: "Craft a memorable brand identity that resonates with your target audience. We provide comprehensive branding services, including logo design.", keywords: "logo, design, identity, brand strategy" },

  // Case Studies
  {
    title: "ScaleUp Apparel: 150% Revenue Growth",
    path: "/case-studies/scaleup-apparel",
    type: "Case Study",
    industry: "E-commerce",
    category: "E-commerce",
    description: "How we helped an E-commerce brand achieve 150% revenue growth via AI personalization.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    stats: [
        { label: "Revenue Growth", value: "150%" },
        { label: "ROAS", value: "4.5x" },
        { label: "Conversion Rate", value: "+2.1%" }
    ],
    challenge: "ScaleUp Apparel was struggling with a high cart abandonment rate and low customer retention. Their ad spend was increasing, but returns were diminishing due to poor targeting.",
    solution: "We implemented an AI-driven personalization engine that tailored product recommendations on the homepage and via email. Simultaneously, we restructured their paid social campaigns to focus on lookalike audiences based on high-LTV customers.",
    result: "Within 6 months, ScaleUp Apparel saw a 150% increase in monthly revenue. The personalized email sequences recovered 18% of abandoned carts, and the optimized ad campaigns achieved a stable 4.5x ROAS.",
    keywords: "ecommerce, retail, success story, case study, personalization"
  },
  {
    title: "TechFlow: Doubling Qualified Leads",
    path: "/case-studies/techflow",
    type: "Case Study",
    industry: "SaaS",
    category: "SaaS",
    description: "Doubling qualified leads for a SaaS company through lead scoring and content strategy.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    stats: [
        { label: "Qualified Leads", value: "+110%" },
        { label: "CPA Reduction", value: "-35%" },
        { label: "Sales Cycle", value: "-2 wks" }
    ],
    challenge: "TechFlow had plenty of inbound leads, but the sales team was wasting time on unqualified prospects. Their content strategy was attracting traffic but not decision-makers.",
    solution: "We revamped their content strategy to focus on bottom-of-funnel technical whitepapers and case studies. We also implemented a lead scoring system in their CRM that prioritized leads based on engagement and firmographic data.",
    result: "The volume of Marketing Qualified Leads (MQLs) more than doubled. The sales team reported a higher quality of conversations, leading to a shorter sales cycle and a 35% reduction in Cost Per Acquisition.",
    keywords: "saas, b2b, lead gen, case study, lead scoring"
  },
  {
    title: "MediCare: Modernizing Patient Engagement",
    path: "/case-studies/medicare",
    type: "Case Study",
    industry: "Healthcare",
    category: "Healthcare",
    description: "Modernizing patient engagement with a custom web portal.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    stats: [
        { label: "Patient Satisfaction", value: "9.2/10" },
        { label: "Admin Time Saved", value: "20 hrs/wk" },
        { label: "Online Bookings", value: "+85%" }
    ],
    challenge: "MediCare's legacy system made it difficult for patients to book appointments online, leading to high call volumes and staff burnout.",
    solution: "We designed and developed a secure, HIPAA-compliant patient portal. The new web app allowed for real-time appointment scheduling, prescription refills, and secure messaging with doctors.",
    result: "Patient satisfaction scores soared to 9.2/10. The front desk saved approximately 20 hours per week on phone calls, allowing them to focus on in-person patient care. Online bookings increased by 85% in the first quarter.",
    keywords: "healthcare, app, portal, case study, hipaa"
  },

  // Blog Posts
  {
    title: "The Future of AI in Digital Marketing",
    path: "/blog/future-of-ai",
    type: "Blog",
    category: "AI in Marketing",
    description: "Explore how artificial intelligence is reshaping marketing strategies, from personalized customer experiences to predictive analytics.",
    excerpt: "Explore how artificial intelligence is reshaping marketing strategies, from personalized customer experiences to predictive analytics.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    author: "Jane Doe",
    role: "CEO & Founder",
    date: "Oct 26, 2023",
    keywords: "ai, trends, future, automation, article, predictive analytics",
    content: `
      <p class="mb-6">Artificial Intelligence (AI) is no longer a futuristic concept; it is the driving force behind modern digital marketing strategies. From personalized customer experiences to predictive analytics, AI is reshaping how brands connect with their audiences.</p>
      
      <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Hyper-Personalization at Scale</h3>
      <p class="mb-6">One of the most significant impacts of AI is the ability to analyze vast amounts of data to create hyper-personalized experiences. Algorithms can predict user behavior, recommend products, and tailor content to individual preferences in real-time.</p>
      
      <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Predictive Analytics</h3>
      <p class="mb-6">Marketing is shifting from reactive to proactive. AI-powered predictive analytics allows businesses to forecast trends, customer churn, and sales performance with remarkable accuracy. This enables data-driven decision-making that minimizes risk and maximizes ROI.</p>

      <blockquote class="border-l-4 border-primary pl-4 italic text-lg text-slate-700 dark:text-slate-300 mb-6">"AI isn't replacing marketers; it's replacing marketers who don't use AI."</blockquote>

      <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Chatbots and Conversational Marketing</h3>
      <p class="mb-6">Advanced NLP models, like Gemini, power intelligent chatbots that can handle complex customer inquiries, qualify leads, and even close sales 24/7. This improves customer satisfaction while reducing operational costs.</p>
      
      <p>As we move forward, the integration of AI will only deepen. Brands that embrace these technologies today will define the market standards of tomorrow.</p>
    `
  },
  {
    title: "Unlocking Growth: Data Analytics Revolution",
    path: "/blog/data-analytics",
    type: "Blog",
    category: "Data Analytics",
    description: "Dive into the metrics that matter and learn how to leverage data to make smarter marketing decisions.",
    excerpt: "Dive into the metrics that matter and learn how to leverage data to make smarter marketing decisions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    author: "John Smith",
    role: "Head of Marketing",
    date: "Oct 15, 2023",
    keywords: "data, analytics, metrics, growth, article, cac, ltv",
    content: `
      <p class="mb-6">Data is the new oil, but raw data is useless without refinement. The revolution lies in how we interpret and act upon data.</p>
      <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-white">The Metrics That Matter</h3>
      <p class="mb-6">Vanity metrics like 'likes' and 'pageviews' are out. The focus has shifted to actionable metrics: Customer Acquisition Cost (CAC), Lifetime Value (LTV), and Churn Rate. Understanding the relationship between these figures is the key to sustainable growth.</p>
      <p class="mb-6">Modern analytics platforms provide a unified view of the customer journey, attribution modeling, and cohort analysis, allowing marketers to optimize every touchpoint.</p>
    `
  },
  {
    title: "The Rise of Headless CMS",
    path: "/blog/headless-cms",
    type: "Blog",
    category: "Web Development",
    description: "Discover why decoupling your frontend and backend can lead to unparalleled performance and scalability.",
    excerpt: "Discover why decoupling your frontend and backend can lead to unparalleled performance and scalability.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    author: "Michael Johnson",
    role: "Lead Developer",
    date: "Sep 28, 2023",
    keywords: "tech, cms, headless, web dev, article, performance",
    content: `
      <p class="mb-6">Traditional CMS platforms often couple the frontend and backend tightly, limiting flexibility. Headless CMS decouples these, serving content via API.</p>
      <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Omnichannel Delivery</h3>
      <p class="mb-6">With a headless architecture, you can push content to websites, mobile apps, smartwatches, and even IoT devices from a single source of truth.</p>
      <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Performance & Security</h3>
      <p class="mb-6">Headless sites are often static generated or server-side rendered, leading to blazing fast load times and a smaller attack surface for hackers.</p>
    `
  }
];