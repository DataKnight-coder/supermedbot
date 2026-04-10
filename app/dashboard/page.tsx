"use client";

import { useExamStore } from "@/store/examStore";
import { useRouter } from "next/navigation";
import { HeartPulse, Baby, Activity, Brain, Scale, Stethoscope, Ambulance, Users, Globe, Syringe } from "lucide-react";

const CATEGORIES = [
  { id: 'medicine', name: 'Internal Medicine', subtext: 'Cardiology, GI, Neuro, etc.', icon: HeartPulse, text: 'text-slate-800' },
  { id: 'pediatrics', name: 'Pediatrics', subtext: 'Growth & Development, Acute Illness', icon: Baby, text: 'text-slate-800' },
  { id: 'obgyn', name: 'OBGYN', subtext: 'Antenatal, Gyn Oncology, Labor', icon: Activity, text: 'text-slate-800' },
  { id: 'psychiatry', name: 'Psychiatry', subtext: 'DSM-5, Safety Assessment', icon: Brain, text: 'text-slate-800' },
  { id: 'emergency', name: 'Emergency & Trauma', subtext: 'Shock, ACLS, ER Protocols', icon: Ambulance, text: 'text-slate-800', isHighYield: true },
  { id: 'ethics', name: 'Ethics & CLEO', subtext: "The Legal/Ethical 'Canadian' context", icon: Scale, text: 'text-slate-800', isHighYield: true },
  { id: 'family', name: 'Family Medicine', subtext: 'Geriatrics, Palliative, Screening', icon: Users, text: 'text-slate-800' },
  { id: 'public-health', name: 'Public Health', subtext: 'Immunization, Epidemiology', icon: Globe, text: 'text-slate-800' },
  { id: 'surgery', name: 'General Surgery', subtext: 'Pre-op, Trauma, Orthopedics', icon: Syringe, text: 'text-slate-800' },
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

  return (
    <div className="max-w-6xl mx-auto mt-12 px-6 pb-12">
      <div className="mb-12">
         <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Supermedpros MCQs Dashboard</h1>
         <p className="text-slate-500 font-medium text-lg">Select a deck to instantly begin your sprint.</p>
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
                   ? 'bg-gradient-to-br from-indigo-950 to-indigo-900 shadow-xl shadow-indigo-950/20 border-2 border-cyan-500 hover:shadow-cyan-500/20' 
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
                 <div className={`mb-6 ${cat.isMock ? 'text-cyan-400' : 'text-slate-400'} group-hover:${cat.isMock ? 'text-cyan-300' : 'text-slate-900'} transition-colors`}>
                   <Icon className="w-8 h-8" strokeWidth={2} />
                 </div>
                 <h3 className={`text-xl font-bold leading-tight tracking-tight mb-3 ${cat.text}`}>{cat.name}</h3>
                 <p className={`text-sm font-medium leading-relaxed ${cat.isMock ? 'text-indigo-200' : 'text-slate-500'}`}>{cat.subtext}</p>
              </div>

              <div className="mt-8">
                 <span className={`text-[10px] font-extrabold uppercase tracking-widest transition-colors ${cat.isMock ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-900'}`}>
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
