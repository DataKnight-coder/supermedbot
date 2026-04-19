"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
    <div className="flex min-h-screen items-center justify-center bg-brand-light px-4 sm:px-6 lg:px-8 font-body">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl shadow-brand-medical/5 border border-slate-100 overflow-hidden">
         {/* Minimalist Medical ID Header */}
         <div className="bg-brand-medical p-8 flex items-center gap-5">
             <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-inner">
                 <Image src="/logo.webp" alt="SuperMedPros" width={40} height={40} className="rounded-lg" />
             </div>
             <div>
                <h2 className="font-heading text-xl font-black text-white tracking-tight uppercase">Medical Access Request</h2>
                <p className="text-brand-teal font-bold text-[10px] uppercase tracking-widest mt-1">SuperMedBot Systems</p>
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
                  className="block w-full rounded-2xl border-2 border-slate-200 py-3.5 px-5 text-brand-dark font-bold hover:border-slate-300 focus:border-brand-action focus:ring-4 focus:ring-brand-action/10 transition-all outline-none"
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
                  className="block w-full rounded-2xl border-2 border-slate-200 py-3.5 px-5 text-brand-dark font-bold tracking-widest hover:border-slate-300 focus:border-brand-action focus:ring-4 focus:ring-brand-action/10 transition-all outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-2xl bg-brand-action py-4.5 text-xs font-black text-white hover:bg-brand-teal shadow-xl shadow-brand-action/20 transition-all active:scale-95 uppercase tracking-widest disabled:opacity-50"
                  style={{ minHeight: '56px' }}
                >
                  {isLoading ? 'Processing Request...' : 'Submit Credentials'}
                </button>
              </div>
            </form>
         </div>

         <div className="bg-brand-light border-t border-slate-100 p-6 text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
               Already hold clearance? <Link href="/login" className="text-brand-medical hover:text-brand-action hover:underline transition-colors ml-1">Sign in here</Link>
            </p>
         </div>
      </div>
    </div>
  );
}
