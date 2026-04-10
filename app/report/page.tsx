"use client";

import { useExamStore } from "@/store/examStore";
import { useRouter } from "next/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";

export default function ReportPage() {
  const router = useRouter();
  const {
      userSessions,
      questions,
      answers,
      results,
      examConfig,
      resetSession
  } = useExamStore();

  const totalQuestions = examConfig?.count || 40;
  const latestSession = userSessions[userSessions.length - 1];

  if (!latestSession) {
     return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
           <button onClick={() => router.push('/dashboard')} className="text-slate-500 font-bold hover:text-slate-900">
             Return to Dashboard
           </button>
        </div>
     );
  }

  const correctCount = Math.round((latestSession.scorePercentage / 100) * totalQuestions);

  return (
     <div className="bg-slate-50 min-h-screen pt-12 pb-24 font-sans">
        <div className="max-w-4xl mx-auto px-4 animate-in fade-in py-8 slide-in-from-bottom-4 duration-700">
           
           <div className="text-center mb-16">
              <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">System Report</h1>
              <p className="text-3xl font-bold text-slate-500">
                 Final Score: {correctCount} / {totalQuestions} <span className="text-cyan-600">({latestSession.scorePercentage}%)</span>
              </p>
           </div>

           <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden mb-12">
              <div className="p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                 <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Complete Question Review</h2>
                    <p className="text-sm text-slate-500 font-medium mt-1">Explore your selections against the blueprint rationale.</p>
                 </div>
              </div>
              <div className="divide-y divide-slate-100">
                 {Array.from({ length: totalQuestions }).map((_, i) => {
                    const res = results[i];
                    const q = questions[i];
                    const ans = answers[i];
                    if(!q) return null; // Safety check for mocked jumps
                    
                    return (
                       <details key={i} className="group overflow-hidden bg-white">
                          <summary className="px-8 py-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors list-none outline-none">
                             <div className="flex items-center gap-6">
                                <span className="font-bold text-slate-900 text-lg w-32 tracking-tight">Question {i + 1}</span>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${res?.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                                   {res?.isCorrect ? 'Correct' : 'Incorrect'}
                                </span>
                             </div>
                             <span className="text-slate-400 group-open:rotate-90 transition-transform duration-200">
                                <ChevronRight className="w-5 h-5" />
                             </span>
                          </summary>
                          
                          <div className="px-8 pb-8 pt-2 bg-slate-50/50">
                             <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                                <div>
                                   <strong className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Clinical Vignette</strong>
                                   <p className="text-slate-800 leading-relaxed font-medium text-sm">{q?.vignette || "Unanswered Mock Data"}</p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                   <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                      <strong className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Your Selection</strong>
                                      <p className="text-lg font-bold text-slate-900">{ans || "Skipped"}</p>
                                   </div>
                                   <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                                      <strong className="block text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Correct Answer</strong>
                                      <p className="text-lg font-bold text-emerald-900">{res?.correctKey || "N/A"}</p>
                                   </div>
                                </div>

                                <div className="bg-indigo-950 rounded-2xl p-6 shadow-inner">
                                   <strong className="block text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2">Rationale</strong>
                                   <p className="text-white text-sm leading-relaxed tracking-wide">{res?.explanation || "No explanation recorded."}</p>
                                </div>
                             </div>
                          </div>
                       </details>
                    )
                 })}
              </div>
           </div>

           <div className="flex justify-center">
              <button 
                onClick={() => { resetSession(); router.push('/dashboard'); }} 
                className="flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-white bg-indigo-950 hover:bg-slate-900 transition-colors active:scale-95 shadow-xl shadow-indigo-950/20 uppercase tracking-widest text-xs"
              >
                <ArrowLeft className="w-5 h-5" /> Return to Dashboard
              </button>
           </div>
        </div>
     </div>
  );
}
