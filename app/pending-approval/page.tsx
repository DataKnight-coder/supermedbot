import Link from "next/link";
import { CopyCheck, ArrowLeft } from "lucide-react";

export default function PendingApprovalPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 font-sans">
       <div className="max-w-md w-full bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center p-12 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 to-indigo-950"></div>

          <div className="w-20 h-20 bg-indigo-50 text-indigo-950 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-indigo-100">
             <CopyCheck className="w-10 h-10 stroke-[2] text-indigo-600" />
          </div>

          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
             Registration Complete
          </h1>
          
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-8 mt-6">
             <p className="text-amber-900 font-bold leading-relaxed">
               Your account is awaiting Dr. Michael’s verification. Please confirm your payment to begin.
             </p>
          </div>

          <div className="space-y-4">
             <a 
               href="mailto:admin@supermedpros.com" 
               className="flex items-center justify-center w-full min-h-[56px] text-sm font-black text-white bg-indigo-950 hover:bg-slate-900 rounded-2xl shadow-xl shadow-indigo-950/20 uppercase tracking-widest transition-all active:scale-95"
             >
                Contact Verification
             </a>
             <Link 
               href="/login" 
               className="flex items-center justify-center gap-2 w-full min-h-[56px] text-xs font-black text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-colors uppercase tracking-widest"
             >
                <ArrowLeft className="w-4 h-4" /> Return to Login
             </Link>
          </div>
       </div>
    </div>
  );
}
