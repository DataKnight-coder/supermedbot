"use client";

import { useEffect, useState } from "react";
import { useExamStore } from "@/store/examStore";
import { useRouter } from "next/navigation";
import { HeartPulse, Baby, Activity, Brain, Scale, Stethoscope, Ambulance, Users, Globe, Syringe } from "lucide-react";

const CATEGORIES = [
  { id: 'medicine', name: 'Internal Medicine', subtext: 'Cardiology, GI, Neuro, etc.', icon: HeartPulse, text: 'text-brand-dark' },
  { id: 'pediatrics', name: 'Pediatrics', subtext: 'Growth & Development, Acute Illness', icon: Baby, text: 'text-brand-dark' },
  { id: 'obgyn', name: 'OBGYN', subtext: 'Antenatal, Gyn Oncology, Labor', icon: Activity, text: 'text-brand-dark' },
  { id: 'psychiatry', name: 'Psychiatry', subtext: 'DSM-5, Safety Assessment', icon: Brain, text: 'text-brand-dark' },
  { id: 'emergency', name: 'Emergency & Trauma', subtext: 'Shock, ACLS, ER Protocols', icon: Ambulance, text: 'text-brand-dark', isHighYield: true },
  { id: 'ethics', name: 'Ethics & CLEO', subtext: "The Legal/Ethical 'Canadian' context", icon: Scale, text: 'text-brand-dark', isHighYield: true },
  { id: 'family', name: 'Family Medicine', subtext: 'Geriatrics, Palliative, Screening', icon: Users, text: 'text-brand-dark' },
  { id: 'public-health', name: 'Public Health', subtext: 'Immunization, Epidemiology', icon: Globe, text: 'text-brand-dark' },
  { id: 'surgery', name: 'General Surgery', subtext: 'Pre-op, Trauma, Orthopedics', icon: Syringe, text: 'text-brand-dark' },
  { id: 'tdm-mock', name: 'TDM (Full Mock)', subtext: 'Thermometer Diagnostic Module Simulator', icon: Stethoscope, text: 'text-white', isMock: true },
];

export default function DashboardPage() {
  const router = useRouter();
  const startExamSession = useExamStore((state) => state.startExamSession);

  const startSprint = (cat: any) => {
    if (cat.isMock) {
      startExamSession({ category: cat.name, count: 140, mode: 'timed' });
    } else {
      startExamSession({ category: cat.name, count: 40, mode: 'timed' });
    }
    router.push("/exam");
  };

  const [isWakingBackend, setIsWakingBackend] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
     let mounted = true;
     let attempts = 0;
     const maxAttempts = 15; // 15 * 4s = 1 min timeout

     const pingRenderInstance = async () => {
         const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://supermedbot-backend.onrender.com';
         try {
            const res = await fetch(`${API_URL}/docs`, {
               // Fire a lightweight GET to check if the app is awake
               method: 'GET',
               cache: 'no-store'
            });
            
            if (res.ok || res.status < 500) {
               if (mounted) setIsWakingBackend(false);
            } else {
               throw new Error("502");
            }
         } catch (e) {
            attempts++;
            if (attempts >= maxAttempts) {
               if (mounted) {
                  setIsWakingBackend(false);
                  setHasError(true);
               }
            } else {
               if (mounted) setTimeout(pingRenderInstance, 4000);
            }
         }
     };
     
     pingRenderInstance();
     return () => { mounted = false; };
  }, []);

  if (isWakingBackend) {
     return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 font-body text-center animate-in fade-in duration-1000">
            <div className="w-16 h-16 bg-brand-action/10 rounded-2xl flex items-center justify-center mb-6 border border-brand-action/20 shadow-inner">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-medical"></div>
            </div>
            <h2 className="font-heading text-2xl font-black text-brand-medical tracking-tight mb-2">Engaging Clinical Servers</h2>
            <p className="text-brand-dark/50 font-medium max-w-sm leading-relaxed">
               Please wait while the secure exam engine spins up. Cloud cold starts typically take 30-50 seconds...
            </p>
        </div>
     );
  }

  if (hasError) {
     return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 font-body text-center">
            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 border border-rose-100">
               <Activity className="w-8 h-8 text-rose-500" />
            </div>
            <h2 className="font-heading text-2xl font-black text-brand-medical tracking-tight mb-2">Connection Timeout</h2>
            <p className="text-brand-dark/50 font-medium max-w-sm leading-relaxed mb-6">
               The server is unresponsive. Check your internet connection or try reloading.
            </p>
            <button onClick={() => window.location.reload()} className="px-6 py-3 bg-brand-medical hover:bg-brand-action text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-colors">
               Retry Connection
            </button>
        </div>
     );
  }

  return (
    <div className="max-w-6xl mx-auto mt-12 px-6 pb-12">
      <div className="mb-12">
         <h1 className="font-heading text-4xl font-black text-brand-dark tracking-tight mb-2">Supermedpros MCQs Dashboard</h1>
         <p className="text-brand-dark/50 font-medium text-lg">Select a deck to instantly begin your sprint.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <div 
              key={cat.id} 
              onClick={() => startSprint(cat)}
              className={`relative rounded-[2rem] p-6 sm:p-8 cursor-pointer hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between aspect-[3/4] ${
                 cat.isMock 
                   ? 'bg-gradient-to-br from-brand-medical to-[#0a3050] shadow-xl shadow-brand-medical/20 border-2 border-brand-teal hover:shadow-brand-teal/20' 
                   : 'bg-white shadow-sm border border-slate-200/60 hover:shadow-xl'
              }`}
            >
              {cat.isHighYield && (
                 <div className="absolute top-0 right-6 -translate-y-1/2">
                    <span className="bg-amber-400 text-amber-950 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm shadow-amber-400/30">
                       High-Yield
                    </span>
                 </div>
              )}

              <div>
                 <div className={`mb-6 ${cat.isMock ? 'text-brand-teal' : 'text-brand-dark/30'} group-hover:${cat.isMock ? 'text-brand-teal' : 'text-brand-dark'} transition-colors`}>
                   <Icon className="w-8 h-8" strokeWidth={2} />
                 </div>
                 <h3 className={`font-heading text-xl font-bold leading-tight tracking-tight mb-3 ${cat.text}`}>{cat.name}</h3>
                 <p className={`text-sm font-medium leading-relaxed ${cat.isMock ? 'text-white/50' : 'text-brand-dark/40'}`}>{cat.subtext}</p>
              </div>

              <div className="mt-8">
                 <span className={`text-[10px] font-extrabold uppercase tracking-widest transition-colors ${cat.isMock ? 'text-brand-teal' : 'text-brand-dark/30 group-hover:text-brand-dark'}`}>
                   {cat.isMock ? 'Start 140 Qs - 180 Min' : 'Start 40 Qs - 30 Min'}
                 </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
