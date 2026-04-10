"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate register API call
    setTimeout(() => {
       setIsLoading(false);
       router.push("/pending-approval");
    }, 600);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl shadow-indigo-950/5 border border-slate-100 overflow-hidden">
         {/* Minimalist Medical ID Header */}
         <div className="bg-indigo-950 p-8 flex items-center gap-5">
             <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-inner">
                 <UserPlus className="w-8 h-8 text-cyan-400 stroke-[2.5]" />
             </div>
             <div>
                <h2 className="text-xl font-black text-white tracking-tight uppercase">Medical Access Request</h2>
                <p className="text-cyan-400 font-bold text-[10px] uppercase tracking-widest mt-1">SuperMedBot Systems</p>
             </div>
         </div>

         <div className="p-8 sm:p-10">
            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                  Requested ID
                </label>
                <input
                  type="text"
                  required
                  className="block w-full rounded-2xl border-2 border-slate-200 py-3.5 px-5 text-slate-900 font-bold hover:border-slate-300 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10 transition-all outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="name@provider.com"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                  Access Key
                </label>
                <input
                  type="password"
                  required
                  className="block w-full rounded-2xl border-2 border-slate-200 py-3.5 px-5 text-slate-900 font-bold tracking-widest hover:border-slate-300 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10 transition-all outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-2xl bg-cyan-600 py-4.5 text-xs font-black text-white hover:bg-cyan-500 shadow-xl shadow-cyan-600/20 transition-all active:scale-95 uppercase tracking-widest disabled:opacity-50"
                  style={{ minHeight: '56px' }}
                >
                  {isLoading ? 'Processing Request...' : 'Submit Credentials'}
                </button>
              </div>
            </form>
         </div>

         <div className="bg-slate-50 border-t border-slate-100 p-6 text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
               Already hold clearance? <Link href="/login" className="text-indigo-950 hover:text-cyan-600 hover:underline transition-colors ml-1">Sign in here</Link>
            </p>
         </div>
      </div>
    </div>
  );
}
