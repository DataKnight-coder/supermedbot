import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Zap, Target, LayoutDashboard } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-light font-body">
      
      {/* Header */}
      <header className="px-8 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
         <div className="flex items-center gap-3">
            <Image src="/logo.webp" alt="SuperMedPros" width={44} height={44} className="rounded-xl" />
            <span className="font-heading font-extrabold text-2xl tracking-tighter text-brand-medical">SuperMedBot</span>
         </div>
         <nav className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-bold text-brand-medical hover:text-brand-action transition-colors">Sign In</Link>
            <a href="mailto:admin@supermedpros.com" className="px-6 py-2.5 bg-brand-medical text-white text-sm font-bold rounded-full hover:bg-brand-action shadow-md transition-all active:scale-95">
               Contact for Access
            </a>
         </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto pt-20 pb-24">
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-medical/10 bg-brand-medical/5 text-brand-medical text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
            Now supporting MCCQE1 &amp; TDM Formats
         </div>
         
         <h1 className="font-heading text-5xl md:text-7xl font-black text-brand-medical tracking-tight leading-tight lg:leading-[1.1] mb-8">
            Master the TDM &amp; MCCQE1 with <span className="text-brand-action relative inline-block">
               AI-Powered
               <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-action/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
               </svg>
            </span> Clinical Simulation.
         </h1>
         
         <p className="text-lg md:text-xl text-brand-dark/60 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            Train against dynamic, Canadian-standard medical cases. Our rigorous test engine explicitly forces timed decision-making against complex distractors to guarantee passing thresholds.
         </p>

         <a href="mailto:admin@supermedpros.com" className="group flex items-center justify-center gap-3 px-10 py-5 bg-brand-action text-white rounded-2xl font-black text-lg hover:bg-brand-teal shadow-xl shadow-brand-action/20 active:scale-95 transition-all">
            Contact for Access 
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
         </a>
      </main>

      {/* Features Section */}
      <section className="bg-white border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               <div className="bg-brand-light rounded-[2.5rem] p-10 border border-slate-100 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-brand-medical rounded-2xl flex items-center justify-center mb-6 shadow-md">
                     <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-2xl font-extrabold text-brand-medical mb-4 tracking-tight">30-Minute Sprints</h3>
                  <p className="text-brand-dark/60 font-medium leading-relaxed">
                     Daily mastery blocks consisting of exactly 40 questions per sprint. Perfect for rapid cognitive conditioning and maintaining daily momentum without friction.
                  </p>
               </div>

               <div className="bg-brand-light rounded-[2.5rem] p-10 border border-slate-100 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-brand-teal rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-brand-teal/30">
                     <LayoutDashboard className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-2xl font-extrabold text-brand-medical mb-4 tracking-tight">180-Minute TDM Marathon</h3>
                  <p className="text-brand-dark/60 font-medium leading-relaxed">
                     Engage our absolute 140-question high-stakes simulator. Test your true stamina under full blueprint conditions mapping exactly to standard mock constraints.
                  </p>
               </div>

               <div className="bg-brand-light rounded-[2.5rem] p-10 border border-slate-100 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-brand-medical rounded-2xl flex items-center justify-center mb-6 shadow-md">
                     <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-2xl font-extrabold text-brand-medical mb-4 tracking-tight">SI-Unit Precision</h3>
                  <p className="text-brand-dark/60 font-medium leading-relaxed">
                     Zero conversion friction. All labs, demographic data, and clinical guidelines precisely enforce pure Canadian medical standards and Master Blueprint rationales.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-medical text-white/50 py-10 text-center">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="font-bold text-sm tracking-wide uppercase">© 2026 SuperMedBot Simulator</span>
            <div>
               <a href="mailto:admin@supermedpros.com" className="text-sm font-bold text-white hover:text-brand-teal transition-colors uppercase tracking-widest border border-white/20 px-6 py-3 rounded-full hover:border-brand-teal bg-white/5">
                  Contact Admin
               </a>
            </div>
         </div>
      </footer>
    </div>
  );
}
