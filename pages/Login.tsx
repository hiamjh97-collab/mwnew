import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvlNwVem6sH1ApBmtsIMzb7_sKVb1wYDA2uUemAU0tBynpeZB3EDc0ePMCvWOVm0Zi3Xh5UU0WrpjK670i37KH8MxwT0KZS4ASZVIr4OQ_bbC2sRDxHWIoxBaiJ-0dYFiiXXMYcmTc3GurmgIEom9EiNq5GkkBiKnl8WwR2yaSKBq3C3CWDycQ1w5nnus0JWV45_4i8AAkpDSpf_h1JOIdr2yJWeXP2aFAZHojRphB3FagqIFEJgxfdD-YrOgWaSukLLw-pkyavI_J')"}}>
        <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-sm"></div>
        
        <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-800">
            <div className="text-center mb-8">
                 <div className="inline-flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary text-3xl">hub</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white font-display">Marketing Widget</span>
                 </div>
                 <h2 className="text-xl font-bold text-slate-800 dark:text-white">Client Login</h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-slate-900 dark:text-white focus:ring-primary focus:border-primary"
                        placeholder="name@company.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-slate-900 dark:text-white focus:ring-primary focus:border-primary"
                        placeholder="••••••••"
                    />
                </div>
                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                        <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                        Remember me
                    </label>
                    <a href="#" className="text-primary hover:underline">Forgot Password?</a>
                </div>
                
                <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-lg">
                    Log In
                </button>
            </form>
            
            <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                Don't have an account? <a href="#" className="text-primary font-bold hover:underline">Register</a>
            </p>
        </div>
    </div>
  );
};

export default Login;