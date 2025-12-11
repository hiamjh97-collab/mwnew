import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const RoiCalculator: React.FC = () => {
  const [adSpend, setAdSpend] = useState(5000);
  const [visitors, setVisitors] = useState(10000);
  const [ltv, setLtv] = useState(500);
  
  // A/B Testing States
  const [isAbTestMode, setIsAbTestMode] = useState(false);
  const [conversionRateA, setConversionRateA] = useState(2.5); // Used as "Current" in standard mode
  const [conversionRateB, setConversionRateB] = useState(3.0); // Only used in A/B mode
  const [expectedGrowth, setExpectedGrowth] = useState(20); // Used in Standard mode, set to 20% conservative estimate

  // Interactive Chart State
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);

  const [metrics, setMetrics] = useState({
    revenueA: 0,
    revenueB: 0,
    roiA: 0,
    roiB: 0,
    upliftRevenue: 0,
    upliftPercentage: 0
  });

  useEffect(() => {
    // Helper to calculate single scenario metrics
    const calculateScenario = (rate: number) => {
        const conversions = Math.floor(visitors * (rate / 100));
        const revenue = conversions * ltv;
        const profit = revenue - adSpend;
        const roi = adSpend > 0 ? (profit / adSpend) * 100 : 0;
        return { revenue, roi, conversions };
    };

    const scenarioA = calculateScenario(conversionRateA);
    
    let scenarioB;
    if (isAbTestMode) {
        // In A/B mode, calculate based on user input B
        scenarioB = calculateScenario(conversionRateB);
    } else {
        // In Standard mode, calculate based on expected growth uplift applied to conversion rate
        const projectedRate = conversionRateA * (1 + (expectedGrowth / 100));
        scenarioB = calculateScenario(projectedRate);
    }

    setMetrics({
        revenueA: scenarioA.revenue,
        revenueB: scenarioB.revenue,
        roiA: scenarioA.roi,
        roiB: scenarioB.roi,
        upliftRevenue: scenarioB.revenue - scenarioA.revenue,
        upliftPercentage: scenarioA.revenue > 0 ? ((scenarioB.revenue - scenarioA.revenue) / scenarioA.revenue) * 100 : 0
    });

  }, [adSpend, visitors, conversionRateA, conversionRateB, ltv, isAbTestMode, expectedGrowth]);

  const getRecommendation = () => {
    if (isAbTestMode) {
        if (metrics.revenueB > metrics.revenueA) {
            return { title: "Variation B Wins", text: `Variation B is projected to generate $${metrics.upliftRevenue.toLocaleString()} more revenue. Switch to this strategy.`, color: "text-green-400" };
        } else if (metrics.revenueB < metrics.revenueA) {
             return { title: "Variation A Wins", text: "Variation B underperforms. Stick with your control strategy (Variation A) or test a new hypothesis.", color: "text-orange-400" };
        } else {
            return { title: "Inconclusive", text: "Both variations produce identical results. Focus on secondary metrics like user engagement.", color: "text-slate-400" };
        }
    }

    // Standard Mode Recommendations
    if (metrics.roiB > 500) return { title: "Aggressive Scaling", text: "Your projected ROI is exceptional. We recommend increasing ad spend to capture maximum market share immediately.", color: "text-green-400" };
    if (metrics.roiB > 200) return { title: "Balanced Growth", text: "Strong returns projected. We recommend a balanced strategy of scaling ad spend while optimizing conversion rates.", color: "text-blue-400" };
    return { title: "Optimization First", text: "Positive ROI is visible. We recommend focusing on CRO and audience targeting to improve efficiency before major scaling.", color: "text-orange-400" };
  };

  const recommendation = getRecommendation();

  const labels = isAbTestMode 
    ? { a: 'Variation A', b: 'Variation B' } 
    : { a: 'Current', b: 'Projected' };

  const data = [
    { 
        name: labels.a, 
        revenue: metrics.revenueA, 
        roi: metrics.roiA, 
        id: 'A',
        rate: conversionRateA,
        conversions: Math.floor(visitors * (conversionRateA / 100))
    },
    { 
        name: labels.b, 
        revenue: metrics.revenueB, 
        roi: metrics.roiB, 
        id: 'B',
        rate: isAbTestMode ? conversionRateB : conversionRateA * (1 + (expectedGrowth / 100)),
        conversions: Math.floor(visitors * ((isAbTestMode ? conversionRateB : conversionRateA * (1 + (expectedGrowth / 100))) / 100))
    },
  ];

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-[#1e293b] p-4 rounded-xl shadow-xl border border-slate-700 animate-in fade-in zoom-in-95 duration-200 z-50">
          <p className="font-bold text-white mb-3 border-b border-slate-600 pb-2">{label}</p>
          <div className="space-y-3 min-w-[180px]">
             <div className="flex justify-between items-center gap-4">
                <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Revenue</span>
                <span className="text-white font-mono font-bold text-lg">${d.revenue.toLocaleString()}</span>
             </div>
             <div className="flex justify-between items-center gap-4">
                <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">ROI</span>
                <span className={`font-mono font-bold ${d.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>{Math.round(d.roi)}%</span>
             </div>
             <div className="flex justify-between items-center gap-4">
                <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Conv. Rate</span>
                <span className="text-blue-400 font-mono font-bold">{d.rate.toFixed(1)}%</span>
             </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-700/50">
             <p className="text-[10px] text-slate-500 italic text-center">Click bar to view details</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleBarClick = (data: any) => {
      // Toggle selection or select new
      if (selectedScenarioId === data.id) {
          setSelectedScenarioId(null);
      } else {
          setSelectedScenarioId(data.id);
      }
  };

  const selectedData = data.find(d => d.id === selectedScenarioId);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-sans">
        <div className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 font-display">ROI Calculator</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    See the potential impact of AI-driven marketing on your bottom line. Input your current metrics to forecast your growth.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
                {/* Inputs Section */}
                <div className="lg:col-span-5 bg-white dark:bg-[#1a2230] p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 h-fit">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">tune</span>
                            Configuration
                        </h2>
                        
                        {/* A/B Mode Toggle */}
                        <div className="flex items-center gap-2">
                            <span className={`text-xs font-bold ${!isAbTestMode ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Standard</span>
                            <button 
                                onClick={() => setIsAbTestMode(!isAbTestMode)}
                                className={`w-12 h-6 rounded-full p-1 transition-colors ${isAbTestMode ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isAbTestMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </button>
                            <span className={`text-xs font-bold ${isAbTestMode ? 'text-primary' : 'text-slate-500'}`}>A/B Test</span>
                        </div>
                    </div>
                    
                    <div className="space-y-8">
                        {/* Ad Spend */}
                        <div>
                            <label className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Monthly Ad Spend
                                <span className="text-primary font-bold">${adSpend.toLocaleString()}</span>
                            </label>
                            <input 
                                type="range" 
                                min="1000" max="100000" step="1000" 
                                value={adSpend} 
                                onChange={(e) => setAdSpend(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="mt-2 relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                <input 
                                    type="number" 
                                    value={adSpend}
                                    onChange={(e) => setAdSpend(Number(e.target.value))}
                                    className="w-full pl-8 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Visitors */}
                        <div>
                            <label className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Monthly Visitors
                                <span className="text-primary font-bold">{visitors.toLocaleString()}</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-sm">group</span>
                                <input 
                                    type="number" 
                                    value={visitors}
                                    onChange={(e) => setVisitors(Number(e.target.value))}
                                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Conversion Rate(s) & Growth */}
                        <div className="grid grid-cols-1 gap-6">
                            {/* Current Conversion Rate */}
                            <div>
                                <label className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Current Conversion Rate
                                    <span className="text-primary font-bold">{conversionRateA}%</span>
                                </label>
                                <input 
                                    type="range" 
                                    min="0.1" max="10" step="0.1" 
                                    value={conversionRateA} 
                                    onChange={(e) => setConversionRateA(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>

                            {/* Conditional Input: Rate B or Expected Growth */}
                            {isAbTestMode ? (
                                <div>
                                    <label className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Target Conversion Rate (Variation B)
                                        <span className="text-purple-500 font-bold">{conversionRateB}%</span>
                                    </label>
                                    <input 
                                        type="range" 
                                        min="0.1" max="10" step="0.1" 
                                        value={conversionRateB} 
                                        onChange={(e) => setConversionRateB(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <label className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Expected Growth / Uplift
                                        <span className="text-[#00c77d] font-bold">+{expectedGrowth}%</span>
                                    </label>
                                    <input 
                                        type="range" 
                                        min="5" max="100" step="5" 
                                        value={expectedGrowth} 
                                        onChange={(e) => setExpectedGrowth(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                    />
                                </div>
                            )}
                        </div>

                        {/* LTV */}
                        <div>
                            <label className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Customer LTV
                                <span className="text-primary font-bold">${ltv}</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                <input 
                                    type="number" 
                                    value={ltv}
                                    onChange={(e) => setLtv(Number(e.target.value))}
                                    className="w-full pl-8 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Average revenue per customer over their relationship with you.</p>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    {/* Key Stats Cards */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-[#1a2230] p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{labels.b} Revenue</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white">${metrics.revenueB.toLocaleString()}</h3>
                                <span className={`${metrics.upliftRevenue >= 0 ? 'text-green-500' : 'text-red-500'} text-sm font-bold flex items-center`}>
                                    <span className="material-symbols-outlined text-sm">{metrics.upliftRevenue >= 0 ? 'arrow_upward' : 'arrow_downward'}</span>
                                    {Math.abs(Math.round(metrics.upliftPercentage))}%
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">vs ${metrics.revenueA.toLocaleString()} ({labels.a})</p>
                        </div>

                        <div className="bg-white dark:bg-[#1a2230] p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{labels.b} ROI (ROAS)</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-3xl font-black text-blue-600 dark:text-blue-400">{Math.round(metrics.roiB)}%</h3>
                            </div>
                             <p className="text-xs text-slate-400 mt-2">
                                {isAbTestMode ? `vs ${Math.round(metrics.roiA)}% (${labels.a})` : "Based on projected uplift"}
                            </p>
                        </div>
                    </div>

                    {/* Chart & Detail */}
                    <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex-grow flex flex-col relative overflow-hidden transition-all duration-300">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        
                        <div className="relative z-10 flex-grow">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-lg">Revenue Comparison</h3>
                                <div className="flex gap-2">
                                    {isAbTestMode && (
                                        <span className="text-xs bg-white/10 px-2 py-1 rounded border border-white/10">A/B Mode Active</span>
                                    )}
                                    {selectedScenarioId && (
                                        <button onClick={() => setSelectedScenarioId(null)} className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded border border-red-500/30 hover:bg-red-500/30 transition-colors">Clear Selection</button>
                                    )}
                                </div>
                            </div>
                            
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                        <XAxis 
                                            dataKey="name" 
                                            stroke="#94a3b8" 
                                            tick={{fill: '#94a3b8'}} 
                                            tickLine={false}
                                            axisLine={false} 
                                        />
                                        <YAxis 
                                            stroke="#94a3b8" 
                                            tick={{fill: '#94a3b8'}} 
                                            tickFormatter={(value) => `$${value / 1000}k`}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip 
                                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                            content={<CustomTooltip />}
                                        />
                                        <Bar 
                                            dataKey="revenue" 
                                            radius={[6, 6, 0, 0]} 
                                            barSize={60}
                                            onClick={(data) => handleBarClick(data)}
                                        >
                                            {data.map((entry, index) => (
                                                <Cell 
                                                    key={`cell-${index}`} 
                                                    fill={index === 0 ? '#475569' : (isAbTestMode ? '#a855f7' : '#00c77d')} 
                                                    fillOpacity={selectedScenarioId && selectedScenarioId !== entry.id ? 0.3 : 1}
                                                    stroke={selectedScenarioId === entry.id ? '#fff' : 'none'}
                                                    strokeWidth={2}
                                                    cursor="pointer"
                                                    className="transition-all duration-300 hover:brightness-110"
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            
                            {selectedData ? (
                                <div className="mt-8 pt-6 border-t border-slate-800 animate-in slide-in-from-bottom-2 fade-in duration-300">
                                     <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-bold text-white flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">info</span>
                                            Scenario Details: {selectedData.name}
                                        </h4>
                                     </div>
                                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                         <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                                             <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Revenue</p>
                                             <p className="text-lg font-bold text-white">${selectedData.revenue.toLocaleString()}</p>
                                         </div>
                                         <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                                             <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">ROI</p>
                                             <p className={`text-lg font-bold ${selectedData.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>{Math.round(selectedData.roi)}%</p>
                                         </div>
                                         <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                                             <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Conversions</p>
                                             <p className="text-lg font-bold text-white">{selectedData.conversions.toLocaleString()}</p>
                                         </div>
                                         <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                                             <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">CPA</p>
                                             <p className="text-lg font-bold text-blue-400">${(adSpend / (selectedData.conversions || 1)).toFixed(2)}</p>
                                         </div>
                                     </div>
                                </div>
                            ) : (
                                <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="flex-grow">
                                        <p className={`text-sm font-bold uppercase mb-1 ${recommendation.color}`}>AI Insight: {recommendation.title}</p>
                                        <p className="text-xs text-slate-400 leading-relaxed max-w-md">{recommendation.text}</p>
                                    </div>
                                    <div className="flex-shrink-0 text-right md:text-left">
                                        <p className="text-slate-400 text-sm mb-1">{isAbTestMode ? 'Difference' : 'Potential Increase'}</p>
                                        <p className={`text-2xl font-bold mb-4 ${metrics.upliftRevenue >= 0 ? 'text-white' : 'text-red-400'}`}>
                                            {metrics.upliftRevenue >= 0 ? '+' : ''}${metrics.upliftRevenue.toLocaleString()}
                                        </p>
                                        <Link to="/contact" className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 text-center">
                                            Start Your Growth Plan
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default RoiCalculator;