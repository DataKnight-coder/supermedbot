"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
        setIsLoading(false);
        if (username.toLowerCase().includes('pending')) {
           setErrorStatus(403);
           return;
        }
        
        setErrorStatus(null);
        localStorage.setItem("token", "dummy_jwt_token");
        router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-md">
         
         {errorStatus === 403 && (
            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-3xl p-6 shadow-lg shadow-amber-900/5 animate-in fade-in slide-in-from-top-4 flex gap-4">
               <AlertCircle className="w-8 h-8 text-amber-600 shrink-0 mt-0.5" strokeWidth={2.5} />
               <div>
                 <strong className="block text-amber-900 font-extrabold text-sm uppercase tracking-widest mb-1">Access Denied</strong>
                 <p className="text-amber-800 font-medium text-sm leading-relaxed">
                    Account Pending Payment Verification. Please contact the administrator.
                 </p>
               </div>
            </div>
         )}
         
         <div className="bg-white rounded-[2rem] shadow-xl shadow-indigo-950/5 border border-slate-100 overflow-hidden">
            {/* Minimalist Medical ID Header */}
            <div className="bg-indigo-950 p-8 flex items-center justify-between">
                <div>
                   <h2 className="text-2xl font-black text-white tracking-tight uppercase">Medical Scanner</h2>
                   <p className="text-cyan-400 font-bold text-[10px] uppercase tracking-widest mt-1">System Authentication</p>
                </div>
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 shadow-inner backdrop-blur-sm">
                    <ShieldCheck className="w-8 h-8 text-cyan-400 stroke-[2.5]" />
                </div>
            </div>

            <div className="p-8 sm:p-10">
               <form className="space-y-6" onSubmit={handleLogin}>
                 <div>
                   <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                     Clearance ID
                   </label>
                   <input
                     type="text"
                     required
                     className="block w-full rounded-2xl border-2 border-slate-200 py-3.5 px-5 text-slate-900 font-black hover:border-slate-300 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10 transition-all outline-none"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                   />
                 </div>

                 <div>
                   <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                     Passcode
                   </label>
                   <input
                     type="password"
                     required
                     className="block w-full rounded-2xl border-2 border-slate-200 py-3.5 px-5 text-slate-900 font-black tracking-widest hover:border-slate-300 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10 transition-all outline-none"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                   />
                 </div>

                 <div className="pt-6">
                   <button
                     type="submit"
                     disabled={isLoading}
                     style={{ minHeight: '56px' }}
                     className="w-full flex items-center justify-center rounded-2xl bg-indigo-950 px-4 text-xs font-black text-cyan-400 hover:bg-slate-900 shadow-xl shadow-indigo-950/20 transition-all active:scale-95 uppercase tracking-widest disabled:opacity-50"
                   >
                     {isLoading ? 'Authenticating...' : 'Commence Shift'}
                   </button>
                 </div>
               </form>
            </div>

            <div className="bg-slate-50 border-t border-slate-100 p-6 text-center">
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  No active clearance? <a href="mailto:admin@supermedpros.com" className="text-cyan-600 hover:text-cyan-700 transition-colors ml-1 hover:underline">Contact Admin</a>
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
