import Link from "next/link";
import { CopyCheck, ArrowLeft } from "lucide-react";

export default function PendingApprovalPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-light px-4 font-body">
       <div className="max-w-md w-full bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center p-12 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-teal to-brand-medical"></div>

          <div className="w-20 h-20 bg-brand-action/10 text-brand-medical rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-brand-action/20">
             <CopyCheck className="w-10 h-10 stroke-[2] text-brand-action" />
          </div>

          <h1 className="font-heading text-3xl font-black text-brand-dark tracking-tight mb-4 leading-tight">
             Registration Complete
          </h1>
          
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-8 mt-6">
             <p className="text-amber-900 font-bold leading-relaxed">
               Your account is awaiting Dr. Michael&apos;s verification. Please confirm your payment to begin.
             </p>
          </div>

          <div className="space-y-4">
             <a 
               href="mailto:admin@supermedpros.com" 
               className="flex items-center justify-center w-full min-h-[56px] text-sm font-black text-white bg-brand-medical hover:bg-brand-action rounded-2xl shadow-xl shadow-brand-medical/20 uppercase tracking-widest transition-all active:scale-95"
             >
                Contact Verification
             </a>
             <Link 
               href="/login" 
               className="flex items-center justify-center gap-2 w-full min-h-[56px] text-xs font-black text-slate-400 hover:text-brand-dark bg-brand-light hover:bg-slate-100 border border-slate-200 rounded-2xl transition-colors uppercase tracking-widest"
             >
                <ArrowLeft className="w-4 h-4" /> Return to Login
             </Link>
          </div>
       </div>
    </div>
  );
}
