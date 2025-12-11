import React from 'react';

export const LogoIcon: React.FC<{ className?: string }> = ({ className = "w-auto h-8" }) => (
  <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-labelledby="logoTitle">
    <title id="logoTitle">Marketing Widget Logo</title>
    {/* 'M' Part - Primary Green */}
    <path 
      d="M10 45 C10 45 15 10 30 10 C45 10 50 45 50 45 C50 45 55 10 70 10 C80 10 85 30 85 30" 
      stroke="rgb(23 234 157)" 
      strokeWidth="10" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* 'W' Part & Arrow - Secondary Blue */}
    <path 
      d="M85 30 C85 30 90 45 105 45 C120 45 125 15 125 15 C125 15 130 45 145 15 L155 10" 
      stroke="#3b82f6" 
      strokeWidth="10" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* Arrow Head */}
    <path 
      d="M140 10 L155 10 L150 25" 
      stroke="#3b82f6" 
      strokeWidth="10" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

interface LogoProps {
    className?: string;
    iconClass?: string;
    textClass?: string;
    variant?: 'full' | 'icon';
}

const Logo: React.FC<LogoProps> = ({ className = "", iconClass = "h-10 w-auto", textClass = "", variant = 'full' }) => {
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div className={`relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
         <LogoIcon className={iconClass} />
      </div>
      {variant === 'full' && (
        <div className={`flex flex-col justify-center ${textClass}`}>
            <span className="text-xl font-black tracking-tight leading-none font-display text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                MARKETING
            </span>
            <span className="text-[0.65rem] font-bold tracking-[0.3em] leading-none text-slate-500 dark:text-slate-400 group-hover:text-blue-500 transition-colors uppercase mt-0.5">
                Widget
            </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
