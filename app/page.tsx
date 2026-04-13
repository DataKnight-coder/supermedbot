import Link from "next/link";
import { ChevronRight, Zap, Target, LayoutDashboard } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      
      {/* Header */}
      <header className="px-8 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-600/30">
               <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
               </svg>
            </div>
            <span className="font-extrabold text-2xl tracking-tighter text-indigo-950">SuperMedBot</span>
         </div>
         <nav className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-bold text-indigo-950 hover:text-cyan-600 transition-colors">Sign In</Link>
            <a href="mailto:admin@supermedpros.com" className="px-6 py-2.5 bg-indigo-950 text-white text-sm font-bold rounded-full hover:bg-cyan-600 shadow-md transition-all active:scale-95">
               Contact for Access
            </a>
         </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto pt-20 pb-24">
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-950/10 bg-indigo-950/5 text-indigo-950 text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse"></span>
            Now supporting MCCQE1 & TDM Formats
         </div>
         
         <h1 className="text-5xl md:text-7xl font-black text-indigo-950 tracking-tight leading-tight lg:leading-[1.1] mb-8">
            Master the TDM & MCCQE1 with <span className="text-cyan-600 relative inline-block">
               AI-Powered
               <svg className="absolute w-full h-3 -bottom-1 left-0 text-cyan-600/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
               </svg>
            </span> Clinical Simulation.
         </h1>
         
         <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            Train against dynamic, Canadian-standard medical cases. Our rigorous test engine explicitly forces timed decision-making against complex distractors to guarantee passing thresholds.
         </p>

         <a href="mailto:admin@supermedpros.com" className="group flex items-center justify-center gap-3 px-10 py-5 bg-cyan-600 text-white rounded-2xl font-black text-lg hover:bg-cyan-500 shadow-xl shadow-cyan-600/20 active:scale-95 transition-all">
            Contact for Access 
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
         </a>
      </main>

      {/* Features Section */}
      <section className="bg-white border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-indigo-950 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                     <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-indigo-950 mb-4 tracking-tight">30-Minute Sprints</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">
                     Daily mastery blocks consisting of exactly 40 questions per sprint. Perfect for rapid cognitive conditioning and maintaining daily momentum without friction.
                  </p>
               </div>

               <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-cyan-600/30">
                     <LayoutDashboard className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-indigo-950 mb-4 tracking-tight">180-Minute TDM Marathon</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">
                     Engage our absolute 140-question high-stakes simulator. Test your true stamina under full blueprint conditions mapping exactly to standard mock constraints.
                  </p>
               </div>

               <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-indigo-950 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                     <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-indigo-950 mb-4 tracking-tight">SI-Unit Precision</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">
                     Zero conversion friction. All labs, demographic data, and clinical guidelines precisely enforce pure Canadian medical standards and Master Blueprint rationales.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-950 text-white/50 py-10 text-center">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="font-bold text-sm tracking-wide uppercase">© 2026 SuperMedBot Simulator</span>
            <div>
               <a href="mailto:admin@supermedpros.com" className="text-sm font-bold text-white hover:text-cyan-400 transition-colors uppercase tracking-widest border border-white/20 px-6 py-3 rounded-full hover:border-cyan-400 bg-white/5">
                  Contact Admin
               </a>
            </div>
         </div>
      </footer>
    </div>
  );
}
