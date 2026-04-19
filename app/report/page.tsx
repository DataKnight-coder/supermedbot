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
        <div className="min-h-screen flex items-center justify-center bg-brand-light">
           <button onClick={() => router.push('/dashboard')} className="text-brand-dark/40 font-bold hover:text-brand-dark">
             Return to Dashboard
           </button>
        </div>
     );
  }

  const correctCount = Math.round((latestSession.scorePercentage / 100) * totalQuestions);

  return (
     <div className="bg-brand-light min-h-screen pt-12 pb-24 font-body">
        <div className="max-w-4xl mx-auto px-4 animate-in fade-in py-8 slide-in-from-bottom-4 duration-700">
           
           <div className="text-center mb-16">
              <h1 className="font-heading text-5xl font-black text-brand-dark mb-4 tracking-tight">System Report</h1>
              <p className="text-3xl font-bold text-brand-dark/40">
                 Final Score: {correctCount} / {totalQuestions} <span className="text-brand-action">({latestSession.scorePercentage}%)</span>
              </p>
           </div>

           <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden mb-12">
              <div className="p-8 border-b border-slate-100 bg-brand-light flex items-center justify-between">
                 <div>
                    <h2 className="font-heading text-xl font-bold text-brand-dark tracking-tight">Complete Question Review</h2>
                    <p className="text-sm text-brand-dark/40 font-medium mt-1">Explore your selections against the blueprint rationale.</p>
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
                          <summary className="px-8 py-5 flex items-center justify-between cursor-pointer hover:bg-brand-light transition-colors list-none outline-none">
                             <div className="flex items-center gap-6">
                                <span className="font-bold text-brand-dark text-lg w-32 tracking-tight">Question {i + 1}</span>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${res?.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                                   {res?.isCorrect ? 'Correct' : 'Incorrect'}
                                </span>
                             </div>
                             <span className="text-brand-dark/30 group-open:rotate-90 transition-transform duration-200">
                                <ChevronRight className="w-5 h-5" />
                             </span>
                          </summary>
                          
                          <div className="px-8 pb-8 pt-2 bg-brand-light/50">
                             <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                                <div>
                                   <strong className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/30 mb-2">Clinical Vignette</strong>
                                   <p className="text-brand-dark leading-relaxed font-medium text-sm">{q?.text || "Unanswered Mock Data"}</p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                   <div className="bg-brand-light rounded-2xl p-5 border border-slate-100">
                                      <strong className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/30 mb-1">Your Selection</strong>
                                      <p className="text-lg font-bold text-brand-dark">{ans || "Skipped"}</p>
                                   </div>
                                   <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                                      <strong className="block text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Correct Answer</strong>
                                      <p className="text-lg font-bold text-emerald-900">{res?.correctKey || q?.correctAnswer || "N/A"}</p>
                                   </div>
                                </div>

                                <div className="bg-brand-medical rounded-2xl p-6 shadow-inner">
                                   <strong className="block text-[10px] font-black uppercase tracking-widest text-brand-teal mb-2">Rationale</strong>
                                   <p className="text-white text-sm leading-relaxed tracking-wide">{res?.explanation || q?.explanation || "No explanation recorded."}</p>
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
                className="flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-white bg-brand-medical hover:bg-brand-action transition-colors active:scale-95 shadow-xl shadow-brand-medical/20 uppercase tracking-widest text-xs"
              >
                <ArrowLeft className="w-5 h-5" /> Return to Dashboard
              </button>
           </div>
        </div>
     </div>
  );
}
