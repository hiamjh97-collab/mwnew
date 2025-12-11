import React, { useState, useEffect } from 'react';
import { editImageWithGemini, generateVideoWithVeo, generateSpeech, transcribeAudio, generateImageWithGemini, analyzeImageWithGemini, ensureApiKey } from '../services/gemini';
import LiveVoiceAgent from '../components/LiveVoiceAgent';
import { Link } from 'react-router-dom';
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'image-studio' | 'video-studio' | 'audio-studio' | 'live-agent'>('overview');
  
  // State for AI Studio
  const [subTab, setSubTab] = useState<string>('generate');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Image State
  const [imagePrompt, setImagePrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState('1:1');

  // Video State
  const [videoPrompt, setVideoPrompt] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [videoAspectRatio, setVideoAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [videoStartImage, setVideoStartImage] = useState<string | null>(null);

  // Audio State
  const [audioText, setAudioText] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcription, setTranscription] = useState('');

  // Clear errors on tab change
  useEffect(() => {
      setError(null);
  }, [activeTab, subTab]);

  const handleApiError = (e: any, defaultMsg: string) => {
    console.error(e);
    let msg = defaultMsg;
    const errStr = e.toString().toLowerCase();
    const errMsg = e.message?.toLowerCase() || "";

    if (errStr.includes('403') || errMsg.includes('permission denied') || errMsg.includes('api key') || errMsg.includes('requested entity was not found')) {
        msg = "Authorization Failed: Please select a valid paid API key to continue.";
        // Trigger key selection dialog for user convenience
        if ((window as any).aistudio) {
            (window as any).aistudio.openSelectKey();
        }
    } else if (errStr.includes('429')) {
        msg = "Quota Exceeded: You have reached the request limit for this model.";
    }

    setError(msg);
  };

  // AI Handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = async () => {
      if (!imagePrompt) return;
      setLoading(true);
      setError(null);
      
      try {
          await ensureApiKey();
          const res = await generateImageWithGemini(imagePrompt, imageSize, aspectRatio);
          if (res) setGeneratedImage(res);
      } catch(e) { 
          handleApiError(e, "Image generation failed. Please try again.");
      }
      finally { setLoading(false); }
  }

  const handleEditImage = async () => {
    if (!selectedImage || !imagePrompt) return;
    setLoading(true);
    setError(null);

    try {
        await ensureApiKey();
        const rawBase64 = selectedImage.split(',')[1];
        const result = await editImageWithGemini(rawBase64, imagePrompt);
        if (result) setGeneratedImage(result);
    } catch (e) { 
        handleApiError(e, "Image editing failed. Ensure your API key supports this model.");
    } 
    finally { setLoading(false); }
  };

  const handleAnalyzeImage = async () => {
      if (!selectedImage) return;
      setLoading(true);
      setError(null);

      try {
        await ensureApiKey();
        const rawBase64 = selectedImage.split(',')[1];
        const result = await analyzeImageWithGemini(rawBase64, imagePrompt);
        setAnalysisResult(result || "No analysis returned");
      } catch(e) { 
          handleApiError(e, "Image analysis failed.");
      }
      finally { setLoading(false); }
  }

  const handleGenerateVideo = async () => {
    if (!videoPrompt) return;
    setLoading(true);
    setError(null);

    try {
        await ensureApiKey();
        const startImgRaw = videoStartImage ? videoStartImage.split(',')[1] : undefined;
        const url = await generateVideoWithVeo(videoPrompt, videoAspectRatio as any, startImgRaw);
        if (url) setGeneratedVideo(url);
    } catch (e) {
        handleApiError(e, "Video generation failed. Veo requires a paid API key.");
    } finally {
        setLoading(false);
    }
  };

  const handleGenerateAudio = async () => {
      if (!audioText) return;
      setLoading(true);
      setError(null);

      try {
          await ensureApiKey();
          const audioBase64 = await generateSpeech(audioText);
          if (audioBase64) {
             const blob = await (await fetch(`data:audio/mp3;base64,${audioBase64}`)).blob();
             const url = URL.createObjectURL(blob);
             setAudioUrl(url);
          }
      } catch (e) { 
          handleApiError(e, "Speech generation failed.");
      } 
      finally { setLoading(false); }
  }

  const handleTranscribeAudio = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setLoading(true);
      setError(null);

      try {
          await ensureApiKey();
          const reader = new FileReader();
          reader.onloadend = async () => {
              try {
                const base64 = (reader.result as string).split(',')[1];
                const text = await transcribeAudio(base64, file.type);
                setTranscription(text || "No text found.");
              } catch (innerE) {
                  handleApiError(innerE, "Transcription failed during processing.");
              } finally {
                  setLoading(false);
              }
          };
          reader.readAsDataURL(file);
      } catch(e) { 
          handleApiError(e, "Transcription failed."); 
          setLoading(false); 
      }
  }

  // Error Banner Component
  const ErrorBanner = () => {
      if (!error) return null;
      return (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3 text-red-700 dark:text-red-300">
                <span className="material-symbols-outlined shrink-0">error</span>
                <span className="text-sm font-medium">{error}</span>
            </div>
            <button 
                onClick={() => (window as any).aistudio?.openSelectKey()} 
                className="whitespace-nowrap bg-white dark:bg-red-900/40 text-red-700 dark:text-red-200 text-xs font-bold px-4 py-2 rounded-md border border-red-100 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/60 transition-colors shadow-sm"
            >
                Update API Key
            </button>
        </div>
      );
  };


  // --- Chart Data ---
  const sparklineData1 = Array.from({length: 10}, (_, i) => ({ val: 2000 + Math.random() * 1000 }));
  const sparklineData2 = Array.from({length: 10}, (_, i) => ({ val: 10 + i * 2 + Math.random() * 5 }));
  const sparklineData3 = Array.from({length: 10}, (_, i) => ({ val: 250000 - i * 1000 + Math.random() * 5000 }));
  const sparklineData4 = Array.from({length: 10}, (_, i) => ({ val: 8000 + i * 50 + Math.random() * 200 }));

  const performanceTrendData = Array.from({length: 30}, (_, i) => ({
      name: `Day ${i + 1}`,
      clicks: 1000 + Math.random() * 500 + (i * 50),
      conversions: 100 + Math.random() * 20 + (i * 5),
  }));

  const abTestData = Array.from({length: 10}, (_, i) => ({
      name: `Day ${i+1}`,
      varA: 1.0 + Math.random() * 0.5,
      varB: 1.2 + Math.random() * 0.8 + (i * 0.1)
  }));

  const demographicsData = [
    { name: '18-24', value: 15 },
    { name: '25-34', value: 45 },
    { name: '35-44', value: 25 },
    { name: '45+', value: 15 },
  ];
  
  const trafficData = [
    { name: 'Organic', value: 45, color: '#3b82f6' },
    { name: 'Social', value: 25, color: '#8b5cf6' },
    { name: 'Direct', value: 20, color: '#10b981' },
    { name: 'Referral', value: 10, color: '#f59e0b' },
  ];

  const deviceData = [
    { name: 'Desktop', value: 65, color: '#3b82f6' },
    { name: 'Mobile', value: 30, color: '#f97316' },
    { name: 'Tablet', value: 5, color: '#64748b' },
  ];

  // Render Client Overview Dashboard matching the design
  const renderClientDashboard = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Client Dashboard: Global Tech Solutions</h1>
          <p className="text-slate-500 text-sm">Your Marketing Performance & Campaign Overview</p>
        </div>
        <div className="flex gap-3">
             <Link to="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors">Login</Link>
             <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors">Dashboard</button>
             <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><span className="material-symbols-outlined">settings</span></button>
             <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><span className="material-symbols-outlined">notifications</span></button>
        </div>
      </div>

      {/* Quick AI Create Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                      <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                          <span className="material-symbols-outlined">auto_awesome</span> 
                          Quick Create
                      </h3>
                      <p className="text-blue-100 mb-6 max-w-lg">
                          Instantly draft high-quality marketing assets using Gemini 3 Pro.
                      </p>
                      
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                          <textarea 
                              value={imagePrompt}
                              onChange={(e) => setImagePrompt(e.target.value)}
                              placeholder="Describe your image (e.g., 'A modern office with neon lights')..."
                              className="w-full bg-transparent border-none text-white placeholder-blue-200 focus:ring-0 resize-none text-sm mb-4"
                              rows={2}
                          ></textarea>
                          <div className="flex gap-4 items-center justify-between">
                              <select 
                                  value={aspectRatio}
                                  onChange={(e) => setAspectRatio(e.target.value)}
                                  className="bg-black/20 border-none text-white text-sm rounded-lg cursor-pointer focus:ring-0"
                              >
                                  <option className="text-slate-900" value="1:1">Square (1:1)</option>
                                  <option className="text-slate-900" value="16:9">Landscape (16:9)</option>
                                  <option className="text-slate-900" value="9:16">Portrait (9:16)</option>
                              </select>
                              <button 
                                  onClick={() => { setActiveTab('image-studio'); setSubTab('generate'); handleGenerateImage(); }}
                                  className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-2 px-6 rounded-lg text-sm transition-colors shadow-sm flex items-center gap-2"
                              >
                                  Generate <span className="material-symbols-outlined text-sm">arrow_forward</span>
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
              {/* Decorative circles */}
              <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          </div>

          <div className="bg-white dark:bg-[#1a2230] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center gap-4">
               <h3 className="font-bold text-slate-800 dark:text-white">Recent Generations</h3>
               <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                   <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                       <span className="material-symbols-outlined text-slate-300">image</span>
                   </div>
                   <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                       <span className="material-symbols-outlined text-slate-300">movie</span>
                   </div>
                   <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                       <span className="material-symbols-outlined text-slate-300">mic</span>
                   </div>
               </div>
               <button onClick={() => setActiveTab('image-studio')} className="text-blue-600 dark:text-blue-400 text-sm font-bold hover:underline">Go to Full Studio</button>
          </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Total Spend', value: '$45,000', icon: 'account_balance_wallet', color: 'blue', chartColor: '#3b82f6', trend: 'up', data: sparklineData1 },
           { label: 'Overall ROI', value: '+125%', icon: 'trending_up', color: 'green', chartColor: '#22c55e', trend: 'up', data: sparklineData2 },
           { label: 'Total Traffic', value: '250k', icon: 'group', color: 'orange', chartColor: '#f97316', trend: 'down', data: sparklineData3 },
           { label: 'Conversions', value: '8,500', icon: 'shopping_cart', color: 'purple', chartColor: '#a855f7', trend: 'up', data: sparklineData4 },
         ].map((kpi, i) => (
           <div key={i} className="bg-white dark:bg-[#1a2230] p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-start mb-4">
                  <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">{kpi.label}</p>
                      <h3 className={`text-3xl font-black ${kpi.label === 'Overall ROI' ? 'text-green-500' : 'text-slate-900 dark:text-white'}`}>{kpi.value}</h3>
                  </div>
                  <div className={`p-1.5 rounded-md ${kpi.label === 'Total Spend' ? 'bg-blue-100 text-blue-600' : kpi.label === 'Overall ROI' ? 'bg-green-100 text-green-600' : kpi.label === 'Total Traffic' ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-purple-600' }`}>
                      <span className="material-symbols-outlined text-sm">edit</span>
                  </div>
              </div>
              <div className="h-24 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={kpi.data}>
                        <defs>
                          <linearGradient id={`color${i}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={kpi.chartColor} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={kpi.chartColor} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="val" stroke={kpi.chartColor} fillOpacity={1} fill={`url(#color${i})`} strokeWidth={2} />
                     </AreaChart>
                   </ResponsiveContainer>
              </div>
           </div>
         ))}
      </div>

      {/* Campaign Management & Trend */}
      <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-[#1a2230] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-800 dark:text-white">Campaign Management</h3>
                  <button className="text-xs border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 px-2 py-1 rounded hover:bg-slate-50 dark:hover:bg-slate-800">Export</button>
              </div>
              
              <div className="space-y-6">
                   {/* Campaign Item */}
                   <div className="p-4 border border-slate-100 dark:border-slate-700 rounded-xl hover:shadow-md transition-shadow dark:bg-[#151b26]">
                       <div className="flex justify-between mb-4">
                           <div>
                               <p className="font-bold text-slate-800 dark:text-white text-sm">Q3 AI Ads</p>
                               <p className="text-xs text-slate-500">Maximize engagement with our latest AI-powered ads.</p>
                           </div>
                           <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full h-fit font-bold">Active</span>
                       </div>
                       <div className="grid grid-cols-4 gap-4 text-center">
                            <div className="text-left">
                                <p className="text-xs text-slate-400">Impressions</p>
                                <p className="font-bold text-slate-800 dark:text-slate-200">1.2M</p>
                                <p className="text-[10px] text-green-500">↑ 15.2%</p>
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-slate-400">Clicks</p>
                                <p className="font-bold text-slate-800 dark:text-slate-200">15.8k</p>
                                <p className="text-[10px] text-green-500">↑ 8.5%</p>
                            </div>
                             <div className="text-left">
                                <p className="text-xs text-slate-400">CTR</p>
                                <p className="font-bold text-slate-800 dark:text-slate-200">1.3%</p>
                                <p className="text-[10px] text-red-500">↓ -0.2%</p>
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-slate-400">Conversions</p>
                                <p className="font-bold text-slate-800 dark:text-slate-200">1,250</p>
                                <p className="text-[10px] text-green-500">↑ 12.5%</p>
                            </div>
                       </div>
                   </div>
                   
                   <div className="pt-4">
                       <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-3">Demographics Breakdown</h4>
                       <div className="h-40 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={demographicsData}>
                                    <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} stroke="#64748b" />
                                    <Tooltip 
                                        cursor={{fill: 'transparent'}} 
                                        contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}}
                                    />
                                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                       </div>
                       <p className="text-xs text-slate-500 mt-2 text-center">Age 25-34 performs best.</p>
                   </div>
              </div>
          </div>

          <div className="bg-white dark:bg-[#1a2230] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
             <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-800 dark:text-white">Performance Trend</h3>
                  <select className="text-xs border border-slate-300 dark:border-slate-700 bg-transparent rounded p-1 dark:text-slate-300"><option>Last 30 Days</option></select>
              </div>
              <div className="flex-1 min-h-[250px] bg-slate-900 rounded-xl p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceTrendData}>
                      <defs>
                        <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#32d583" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#32d583" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="clicks" stroke="#32d583" fillOpacity={1} fill="url(#colorClicks)" />
                    </AreaChart>
                  </ResponsiveContainer>
              </div>
          </div>
      </div>

      {/* Traffic Sources & Device Usage */}
      <div className="grid md:grid-cols-2 gap-8">
         <div className="bg-white dark:bg-[#1a2230] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
             <h3 className="font-bold text-slate-800 dark:text-white mb-6">Traffic Sources</h3>
             <div className="h-64 flex items-center justify-center">
                 <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                         <Pie data={trafficData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                             {trafficData.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={entry.color} />
                             ))}
                         </Pie>
                         <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}/>
                     </PieChart>
                 </ResponsiveContainer>
             </div>
             <div className="flex justify-center gap-4 mt-2 flex-wrap">
                 {trafficData.map((d, i) => (
                     <div key={i} className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full" style={{backgroundColor: d.color}}></div>
                         <span className="text-xs text-slate-500 dark:text-slate-400">{d.name}</span>
                     </div>
                 ))}
             </div>
         </div>
         
         <div className="bg-white dark:bg-[#1a2230] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
             <h3 className="font-bold text-slate-800 dark:text-white mb-6">Device Breakdown</h3>
             <div className="h-64">
                 <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={deviceData} layout="vertical" margin={{ left: 20 }}>
                         <XAxis type="number" hide />
                         <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} stroke="#64748b" width={60} />
                         <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}} />
                         <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {deviceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                         </Bar>
                     </BarChart>
                 </ResponsiveContainer>
             </div>
         </div>
      </div>

      {/* A/B Test Management */}
      <div className="bg-white dark:bg-[#1a2230] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-orange-500">science</span>
                  A/B Test Management
              </h3>
              <button className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-orange-600 transition-colors">Create New Test</button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
              <div>
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Test Variations</h4>
                  <div className="space-y-3">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg flex justify-between items-center">
                          <div>
                              <p className="text-sm font-bold text-blue-800 dark:text-blue-300">Variation A (Control)</p>
                              <p className="text-xs text-blue-600 dark:text-blue-400">"AI-Powered Insights for Your Business"</p>
                          </div>
                          <span className="text-xs font-bold text-blue-500">50% Traffic</span>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-lg flex justify-between items-center">
                          <div>
                              <p className="text-sm font-bold text-purple-800 dark:text-purple-300">Variation B</p>
                              <p className="text-xs text-purple-600 dark:text-purple-400">"Unlock Growth with Predictive AI"</p>
                          </div>
                          <span className="text-xs font-bold text-purple-500">50% Traffic</span>
                      </div>
                  </div>
                  
                  <div className="mt-6">
                       <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Conversion Rate Over Time</h4>
                       <div className="h-40 bg-slate-900 rounded-lg overflow-hidden p-2">
                           <ResponsiveContainer width="100%" height="100%">
                             <LineChart data={abTestData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="name" hide />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                                <Line type="monotone" dataKey="varA" stroke="#3b82f6" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="varB" stroke="#a855f7" strokeWidth={2} dot={false} />
                             </LineChart>
                           </ResponsiveContainer>
                       </div>
                  </div>
              </div>
              
              <div>
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Performance Comparison</h4>
                  <table className="w-full text-sm">
                      <thead>
                          <tr className="border-b border-slate-100 dark:border-slate-800 text-left text-slate-400">
                              <th className="pb-2 font-medium">Metric</th>
                              <th className="pb-2 font-medium">Variation A</th>
                              <th className="pb-2 font-medium">Variation B</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr className="border-b border-slate-50 dark:border-slate-800/50">
                              <td className="py-2 text-slate-600 dark:text-slate-300">CTR</td>
                              <td className="py-2 font-medium text-slate-800 dark:text-slate-200">1.2%</td>
                              <td className="py-2 font-bold text-green-600">1.5%</td>
                          </tr>
                           <tr className="border-b border-slate-50 dark:border-slate-800/50">
                              <td className="py-2 text-slate-600 dark:text-slate-300">Conversions</td>
                              <td className="py-2 font-medium text-slate-800 dark:text-slate-200">1,250</td>
                              <td className="py-2 font-bold text-green-600">1,500</td>
                          </tr>
                           <tr>
                              <td className="py-2 text-slate-600 dark:text-slate-300">Conv. Rate</td>
                              <td className="py-2 font-medium text-slate-800 dark:text-slate-200">2.0%</td>
                              <td className="py-2 font-bold text-green-600">2.52%</td>
                          </tr>
                      </tbody>
                  </table>
                  
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg flex justify-between items-center">
                      <div>
                          <p className="text-sm font-bold text-green-800 dark:text-green-300">Winner: Variation B</p>
                          <p className="text-xs text-green-600 dark:text-green-400">Confidence 98% (Test running for 10 days)</p>
                      </div>
                      <div className="flex gap-2">
                           <button className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded text-slate-600 dark:text-slate-300">Stop Test</button>
                           <button className="text-xs bg-green-600 text-white px-3 py-1 rounded font-bold">Apply Winning Variation</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* User Permissions */}
      <div className="bg-white dark:bg-[#1a2230] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 dark:text-white">User Permissions Management</h3>
              <button className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-orange-600 transition-colors">Invite Team Member</button>
          </div>
          <div className="space-y-4">
              {[
                  { name: 'John Doe', email: 'john.doe@gls.com', role: 'Administrator', access: 'View Reports, Manage Campaigns, Access Billing, Manage Users', lastActive: 'Today' },
                  { name: 'Jane Smith', email: 'jane.smith@gls.com', role: 'Editor', access: 'View Reports, Manage Campaigns', lastActive: '2 days ago' },
              ].map((user, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-lg gap-4">
                      <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${i===0 ? 'bg-blue-500' : 'bg-purple-500'}`}>{user.name.charAt(0)}</div>
                          <div>
                              <p className="text-sm font-bold text-slate-800 dark:text-white">{user.name}</p>
                              <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300 px-3 py-1 border dark:border-slate-700 rounded w-fit">{user.role}</div>
                      <div className="text-xs text-slate-500 max-w-xs">{user.access}</div>
                      <div className="text-xs text-slate-500">{user.lastActive}</div>
                      <div className="flex gap-2">
                          <button className="text-slate-400 hover:text-blue-500"><span className="material-symbols-outlined text-sm">edit</span></button>
                          <button className="text-slate-400 hover:text-red-500"><span className="material-symbols-outlined text-sm">delete</span></button>
                      </div>
                  </div>
              ))}
          </div>
      </div>
      
      {/* Messages */}
      <div className="bg-white dark:bg-[#1a2230] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 dark:text-white">Messages with your Account Manager</h3>
              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-bold">1 New Message</span>
          </div>
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex gap-3">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Manager" className="w-10 h-10 rounded-full object-cover" />
                  <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl text-sm text-slate-700 dark:text-slate-300">
                      Hi there! Just wanted to let you know that the Q3 AI Ads campaign is live and performing well. Let me know if you have any questions.
                      <p className="text-[10px] text-slate-400 mt-1">10:30 AM</p>
                  </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                   <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">JD</div>
                   <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-tl-xl rounded-bl-xl rounded-br-xl text-sm text-blue-900 dark:text-blue-200">
                      That's great news, Sarah! Thanks for the update. Could you send over the preliminary performance report by EOD?
                      <p className="text-[10px] text-blue-300 dark:text-blue-400 mt-1">10:32 AM</p>
                   </div>
              </div>
          </div>
          <div className="mt-4 flex gap-2">
              <input type="text" placeholder="Type your message..." className="flex-grow border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#151b26] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 dark:text-white" />
              <button className="bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600 transition-colors"><span className="material-symbols-outlined">send</span></button>
          </div>
      </div>

    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#0f1115] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f1115] text-slate-300 flex flex-col border-r border-white/5 hidden md:flex">
        <div className="p-6 flex items-center gap-3">
           <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">MW</div>
           <span className="font-bold text-white">Marketing Widget</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
           <button 
             onClick={() => setActiveTab('overview')}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'hover:bg-white/5'}`}
           >
             <span className="material-symbols-outlined">dashboard</span>
             Overview
           </button>
           
           <div className="pt-4 pb-2 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">AI Studios</div>
           
           <button 
             onClick={() => setActiveTab('image-studio')}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'image-studio' ? 'bg-blue-600 text-white' : 'hover:bg-white/5'}`}
           >
             <span className="material-symbols-outlined">image</span>
             Image Studio
           </button>
           <button 
             onClick={() => setActiveTab('video-studio')}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'video-studio' ? 'bg-blue-600 text-white' : 'hover:bg-white/5'}`}
           >
             <span className="material-symbols-outlined">movie</span>
             Video Studio
           </button>
           <button 
             onClick={() => setActiveTab('audio-studio')}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'audio-studio' ? 'bg-blue-600 text-white' : 'hover:bg-white/5'}`}
           >
             <span className="material-symbols-outlined">mic</span>
             Audio Studio
           </button>
           <button 
             onClick={() => setActiveTab('live-agent')}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'live-agent' ? 'bg-red-600 text-white animate-pulse' : 'hover:bg-white/5 text-red-400'}`}
           >
             <span className="material-symbols-outlined">support_agent</span>
             Live Agent
           </button>
        </nav>
        
        <div className="p-4 border-t border-white/5">
            <Link to="/" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white px-4 py-2">
                <span className="material-symbols-outlined">logout</span> Exit Dashboard
            </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
         <div className="p-8 max-w-7xl mx-auto">
             {/* Mobile Header */}
             <div className="md:hidden flex justify-between items-center mb-8">
                 <h1 className="text-xl font-bold text-slate-900 dark:text-white">Marketing Widget</h1>
                 <button className="p-2 bg-slate-200 dark:bg-slate-800 rounded"><span className="material-symbols-outlined">menu</span></button>
             </div>

             <ErrorBanner />

             {activeTab === 'overview' && renderClientDashboard()}
             
             {activeTab === 'image-studio' && (
                 <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                     <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Image Studio</h2>
                     <div className="grid lg:grid-cols-3 gap-8">
                         <div className="lg:col-span-1 space-y-6">
                             <div className="bg-white dark:bg-[#1a2230] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                                 <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Prompt</label>
                                 <textarea 
                                     value={imagePrompt} 
                                     onChange={(e) => setImagePrompt(e.target.value)}
                                     className="w-full h-32 p-3 rounded-lg bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white resize-none"
                                     placeholder="Describe the image you want to generate..."
                                 ></textarea>
                                 
                                 <div className="mt-4 grid grid-cols-2 gap-4">
                                     <div>
                                         <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Aspect Ratio</label>
                                         <select 
                                            value={aspectRatio}
                                            onChange={(e) => setAspectRatio(e.target.value)}
                                            className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                         >
                                             {['1:1', '16:9', '9:16', '4:3', '3:4'].map(r => <option key={r} value={r}>{r}</option>)}
                                         </select>
                                     </div>
                                     <div>
                                         <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Image Size</label>
                                         <div className="flex gap-2 bg-slate-50 dark:bg-[#0f1115] p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                                             {['1K', '2K', '4K'].map(s => (
                                                 <button 
                                                     key={s}
                                                     onClick={() => setImageSize(s as any)}
                                                     className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${imageSize === s ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                                 >{s}</button>
                                             ))}
                                         </div>
                                     </div>
                                 </div>

                                 <div className="mt-6 flex flex-col gap-3">
                                     <button 
                                         onClick={handleGenerateImage} 
                                         disabled={loading || !imagePrompt}
                                         className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-3 rounded-xl transition-all"
                                     >
                                         {loading ? 'Generating...' : 'Generate Image'}
                                     </button>
                                     <div className="relative">
                                         <input type="file" onChange={(e) => handleImageUpload(e, setSelectedImage)} className="hidden" id="upload-image" accept="image/*" />
                                         <label htmlFor="upload-image" className="w-full block text-center border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-bold py-3 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                             Upload Reference
                                         </label>
                                     </div>
                                     {selectedImage && (
                                         <div className="flex gap-2">
                                             <button onClick={handleEditImage} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg text-sm">Edit Upload</button>
                                             <button onClick={handleAnalyzeImage} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-sm">Analyze Upload</button>
                                         </div>
                                     )}
                                 </div>
                             </div>
                             
                             {analysisResult && (
                                 <div className="bg-white dark:bg-[#1a2230] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                                     <h3 className="font-bold text-slate-800 dark:text-white mb-2">Analysis Result</h3>
                                     <p className="text-sm text-slate-600 dark:text-slate-300">{analysisResult}</p>
                                 </div>
                             )}
                         </div>
                         
                         <div className="lg:col-span-2 bg-slate-200 dark:bg-[#0f1115] rounded-3xl flex items-center justify-center min-h-[500px] border-2 border-dashed border-slate-300 dark:border-slate-800 relative overflow-hidden">
                             {generatedImage ? (
                                 <img src={generatedImage} alt="Generated" className="w-full h-full object-contain" />
                             ) : selectedImage ? (
                                 <img src={selectedImage} alt="Reference" className="w-full h-full object-contain opacity-50" />
                             ) : (
                                 <div className="text-center text-slate-400">
                                     <span className="material-symbols-outlined text-6xl mb-4">image</span>
                                     <p>Enter a prompt to generate or upload an image to edit</p>
                                 </div>
                             )}
                             {loading && (
                                 <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                     <div className="text-center text-white">
                                         <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                         <p>Processing with Gemini...</p>
                                     </div>
                                 </div>
                             )}
                         </div>
                     </div>
                 </div>
             )}

             {activeTab === 'video-studio' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                     <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Video Studio (Veo)</h2>
                     <div className="bg-white dark:bg-[#1a2230] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                         <div className="max-w-3xl mx-auto space-y-6">
                             <div>
                                 <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Prompt</label>
                                 <textarea 
                                     value={videoPrompt} 
                                     onChange={(e) => setVideoPrompt(e.target.value)}
                                     className="w-full h-24 p-3 rounded-lg bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white resize-none"
                                     placeholder="Describe the video..."
                                 ></textarea>
                             </div>
                             
                             <div className="grid grid-cols-2 gap-4">
                                 <div>
                                     <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Aspect Ratio</label>
                                     <select 
                                        value={videoAspectRatio}
                                        onChange={(e: any) => setVideoAspectRatio(e.target.value)}
                                        className="w-full p-3 rounded-lg bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                     >
                                         <option value="16:9">Landscape (16:9)</option>
                                         <option value="9:16">Portrait (9:16)</option>
                                     </select>
                                 </div>
                                 <div>
                                     <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Start Image (Optional)</label>
                                     <input type="file" onChange={(e) => handleImageUpload(e, setVideoStartImage)} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" accept="image/*" />
                                 </div>
                             </div>

                             <button 
                                 onClick={handleGenerateVideo} 
                                 disabled={loading || !videoPrompt}
                                 className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-3 rounded-xl transition-all"
                             >
                                 {loading ? 'Generating Video (This may take a moment)...' : 'Generate Video'}
                             </button>

                             {generatedVideo && (
                                 <div className="mt-8 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-black">
                                     <video controls className="w-full aspect-video" src={generatedVideo}></video>
                                 </div>
                             )}
                         </div>
                     </div>
                 </div>
             )}

             {activeTab === 'audio-studio' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                     <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Audio Studio</h2>
                     <div className="grid md:grid-cols-2 gap-8">
                         <div className="bg-white dark:bg-[#1a2230] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                             <h3 className="font-bold text-slate-800 dark:text-white mb-4">Text to Speech</h3>
                             <textarea 
                                 value={audioText} 
                                 onChange={(e) => setAudioText(e.target.value)}
                                 className="w-full h-32 p-3 rounded-lg bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white resize-none mb-4"
                                 placeholder="Enter text to generate speech..."
                             ></textarea>
                             <button 
                                 onClick={handleGenerateAudio} 
                                 disabled={loading || !audioText}
                                 className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-3 rounded-xl transition-all"
                             >
                                 {loading ? 'Generating...' : 'Generate Speech'}
                             </button>
                             {audioUrl && (
                                 <audio controls src={audioUrl} className="w-full mt-6"></audio>
                             )}
                         </div>

                         <div className="bg-white dark:bg-[#1a2230] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                             <h3 className="font-bold text-slate-800 dark:text-white mb-4">Audio Transcription</h3>
                             <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center mb-6">
                                 <input type="file" onChange={handleTranscribeAudio} className="hidden" id="transcribe-upload" accept="audio/*" />
                                 <label htmlFor="transcribe-upload" className="cursor-pointer">
                                     <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">upload_file</span>
                                     <p className="text-slate-500 font-bold">Upload Audio to Transcribe</p>
                                 </label>
                             </div>
                             {transcription && (
                                 <div className="bg-slate-50 dark:bg-[#0f1115] p-4 rounded-lg border border-slate-200 dark:border-slate-700 max-h-60 overflow-y-auto">
                                     <p className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap">{transcription}</p>
                                 </div>
                             )}
                         </div>
                     </div>
                 </div>
             )}

             {activeTab === 'live-agent' && (
                 <div className="max-w-3xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-4">
                     <LiveVoiceAgent />
                 </div>
             )}
         </div>
      </main>
    </div>
  );
};

export default Dashboard;