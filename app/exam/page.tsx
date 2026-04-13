"use client";

import { useEffect, useState } from "react";
import { useExamStore } from "@/store/examStore";
import { useRouter } from "next/navigation";
import { Flag, Clock, ChevronRight, CheckCircle2 } from "lucide-react";

export default function ExamPage() {
  const router = useRouter();
  const {
    examConfig,
    questions, 
    currentQuestionIndex, 
    answers,
    flags,
    results,
    questionLocks,
    
    examTimeLeft,
    isExamFinished,
    userSessions,
    
    dailyLimitReached, 
    isGenerating, 
    error,
    
    setQuestions, 
    setAnswer,
    toggleFlag,
    submitQuestion, 
    nextQuestion,
    jumpToQuestion,
    tickTimer,
    finishExamBlock,
    setDailyLimitReached, 
    fetchNextQuestion,
    resetSession
  } = useExamStore();

  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // -----------------------------------------------------
  // MINIMALIST PERFORMANCE REPORT ROUTING
  // -----------------------------------------------------
  useEffect(() => {
     if (isMounted && isExamFinished) {
         router.push('/report');
     }
  }, [isMounted, isExamFinished, router]);

  // Tick the timer globally
  useEffect(() => {
    const interval = setInterval(() => {
       tickTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [tickTimer]);

  // Auto trigger finish exam block if timer runs out
  useEffect(() => {
     if (isMounted && examTimeLeft <= 0 && !isExamFinished) {
        finishExamBlock();
     }
  }, [examTimeLeft, isExamFinished, finishExamBlock, isMounted]);

  useEffect(() => {
    if (questions.length === 0 && !isGenerating && !error) {
      fetchNextQuestion();
    }
  }, [questions.length, isGenerating, error, fetchNextQuestion]);

  // Handle jump fetching logic
  useEffect(() => {
    if (isMounted && questions.length > 0 && currentQuestionIndex >= questions.length && !isGenerating && !error) {
        fetchNextQuestion();
    }
  }, [isMounted, currentQuestionIndex, questions.length, isGenerating, error, fetchNextQuestion]);

  if (!isMounted) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = examConfig?.count || 40;
  const isTutorMode = examConfig?.mode === 'tutor';

  // -----------------------------------------------------
  // MID-POINT TOAST LOGIC
  // -----------------------------------------------------
  const halfTime = totalQuestions === 140 ? 5400 : (totalQuestions * 45) / 2;
  // Use a slight effect catch instead of strict math match to ensure the render lifecycle safely captures it
  if (!isExamFinished && examTimeLeft === halfTime && !toastVisible) {
     setToastVisible(true);
     setTimeout(() => setToastVisible(false), 6000);
  }


  // Provide blank safety net while redirecting
  if (isExamFinished) return <div className="min-h-screen bg-slate-50" />;

  // -----------------------------------------------------
  // EXAM RENDER
  // -----------------------------------------------------

  if ((!currentQuestion && isGenerating) || (questions.length === 0 && isGenerating)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in fade-in duration-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mb-6"></div>
        <p className="text-slate-900 text-lg font-bold">Downloading blueprint...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in fade-in duration-500">
        <div className="mb-6 rounded-full bg-rose-50 p-4 border border-rose-100">
           <Flag className="h-8 w-8 text-rose-500" />
        </div>
        <p className="text-slate-900 text-xl font-bold">{error}</p>
        <button onClick={() => fetchNextQuestion()} className="mt-6 rounded-xl bg-slate-900 px-8 py-3 text-sm font-bold text-white hover:bg-black transition-colors">
          Retry Sequence
        </button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const selectedOption = answers[currentQuestionIndex];
  const isLocked = questionLocks[currentQuestionIndex];
  const currentResult = results[currentQuestionIndex];
  const isFlagged = flags[currentQuestionIndex];

  const handleSubmitAnswer = async () => {
    if (!selectedOption) return;
    setLoading(true);
    try {
      setTimeout(() => {
        submitQuestion(currentQuestionIndex, {
          correctKey: currentQuestion.correctAnswer || "A", 
          explanation: currentQuestion.explanation || "No explanation provided.",
        });
        setLoading(false);
      }, 500);
      
    } catch {
      setLoading(false);
    }
  };

  const advanceQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      if (currentQuestionIndex === questions.length - 1) nextQuestion();
      else nextQuestion();
    } else {
       finishExamBlock();
    }
  };

  const m = Math.floor(examTimeLeft / 60).toString().padStart(2, '0');
  const s = (examTimeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
      
      {/* Mid-Point Toast Notification */}
      {toastVisible && (
        <div className="fixed bottom-12 right-12 z-50 bg-slate-900 text-white px-8 py-5 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500 flex gap-4 items-center">
            <Clock className="text-white/60 w-6 h-6" />
            <span className="font-bold tracking-wide">
               {totalQuestions - Object.keys(answers).length} questions left, {Math.floor(examTimeLeft / 60)} minutes remaining.
            </span>
        </div>
      )}

      {/* Minimalist Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 border-b border-slate-200 pb-6">
        <div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 block">{examConfig?.category || 'Mock Exam'}</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Question {currentQuestionIndex + 1} <span className="text-slate-300">/ {totalQuestions}</span>
            </h2>
        </div>
        
        <div className="flex items-center gap-4">
            <button 
              onClick={() => toggleFlag(currentQuestionIndex)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 font-bold text-sm transition-all ${
                 isFlagged 
                   ? 'border-slate-800 bg-slate-800 text-white shadow-inner' 
                   : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700'
              }`}
            >
              <Flag className={`w-4 h-4 ${isFlagged ? "fill-white" : ""}`} />
              Review
            </button>
            <button onClick={finishExamBlock} className="px-5 py-2.5 rounded-full font-bold text-sm bg-white text-slate-400 border-2 border-slate-200 hover:text-slate-900 hover:border-slate-300 transition-colors">
                End Block
            </button>
            <div className="flex items-center gap-2 bg-slate-900 text-white font-mono text-2xl font-bold px-6 py-2.5 rounded-full shadow-lg ml-2">
               {m}:{s}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Main Question Content */}
         <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 sm:p-12 mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
               <p className="text-xl text-slate-800 leading-relaxed font-medium mb-12">
                  {currentQuestion.text}
               </p>
               
               <div className="space-y-3">
                  {currentQuestion.options.map((opt) => {
                     const isSelected = selectedOption === opt.key;
                     let btnClass = "w-full text-left relative flex items-center gap-5 p-5 rounded-2xl border-2 transition-all duration-200 group focus:outline-none ";
                     let badgeClass = "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-base border-2 transition-colors ";
                     
                     if (isLocked && currentResult) {
                       const isOptCorrect = currentResult.correctKey === opt.key;
                       if (isSelected && isOptCorrect) {
                           btnClass += "border-emerald-500 bg-emerald-50"; badgeClass += "bg-emerald-500 border-emerald-500 text-white";
                       } else if (isSelected && !isOptCorrect) {
                           btnClass += "border-rose-500 bg-rose-50"; badgeClass += "bg-rose-500 border-rose-500 text-white";
                       } else if (!isSelected && isOptCorrect) {
                           btnClass += "border-emerald-300 bg-white"; badgeClass += "bg-emerald-50 border-emerald-300 text-emerald-600";
                       } else {
                           btnClass += "border-slate-100 bg-slate-50 opacity-40"; badgeClass += "border-slate-200 bg-white text-slate-400";
                       }
                     } else {
                       btnClass += isSelected ? "border-slate-900 bg-slate-50 shadow-sm" : "border-slate-200 bg-white hover:border-slate-400";
                       badgeClass += isSelected ? "bg-slate-900 border-slate-900 text-white" : "border-slate-300 bg-slate-50 text-slate-500 group-hover:border-slate-400";
                     }

                     return (
                       <button key={opt.key} onClick={() => setAnswer(currentQuestionIndex, opt.key)} className={btnClass} disabled={isLocked}>
                         <div className={badgeClass}>{opt.key}</div>
                         <span className="text-lg font-semibold text-slate-800">{opt.text}</span>
                       </button>
                     )
                  })}
               </div>

               {isTutorMode && !isLocked && (
                  <div className="flex justify-end mt-8">
                     <button
                       onClick={handleSubmitAnswer}
                       disabled={!selectedOption || loading}
                       className="rounded-full flex items-center gap-2 bg-slate-900 px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-slate-900/20 hover:bg-black transition-all active:scale-95 disabled:opacity-50"
                     >
                       {loading ? "Checking..." : "Confirm Choice"}
                     </button>
                  </div>
               )}
            </div>

            <div className="flex justify-between items-center px-4">
               <button 
                  onClick={() => { if(currentQuestionIndex > 0) jumpToQuestion(currentQuestionIndex - 1) }}
                  disabled={currentQuestionIndex === 0}
                  className="text-slate-400 font-bold text-base hover:text-slate-900 disabled:opacity-30 transition-colors flex items-center gap-2"
               >
                  <ChevronRight className="w-5 h-5 rotate-180" /> Previous
               </button>
               {(!isTutorMode || isLocked) && (
                  <button
                     onClick={advanceQuestion}
                     className="rounded-full flex items-center gap-2 bg-slate-100 text-slate-900 border border-slate-200 px-8 py-3.5 text-base font-black hover:bg-slate-200 transition-all active:scale-95"
                  >
                     {currentQuestionIndex === totalQuestions - 1 ? "Complete Block" : "Next Question"}
                     <ChevronRight className="w-5 h-5" />
                  </button>
               )}
            </div>
         </div>

         {/* Right Sidebar: Navigator */}
         <div className="lg:col-span-1 hidden lg:block">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 sticky top-6">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">Skip to Question</h3>
               <div className={`grid gap-2 overflow-y-auto pr-2 max-h-[70vh] custom-scrollbar ${totalQuestions > 40 ? 'grid-cols-5' : 'grid-cols-4'}`}>
                  {Array.from({ length: totalQuestions }).map((_, i) => {
                    const hasAnswered = !!answers[i];
                    const hasFlagged = flags[i];
                    const isCurrent = currentQuestionIndex === i;
                    
                    return (
                      <button 
                        key={i}
                        onClick={() => jumpToQuestion(i)}
                        className={`relative w-full aspect-square rounded-xl border-2 flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                          isCurrent 
                            ? 'border-slate-800 text-slate-800 bg-slate-50 ring-4 ring-slate-800/10 scale-110 z-10' 
                            : hasAnswered 
                              ? 'bg-slate-900 border-slate-900 text-white hover:bg-black hover:border-black hover:scale-105' 
                              : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-600'
                        }`}
                      >
                        {i + 1}
                        {hasFlagged && (
                          <div className="absolute -top-1.5 -right-1.5 bg-white rounded-full p-0.5 shadow-sm border border-slate-100 z-20">
                             <Flag className="w-3 h-3 fill-slate-800 text-slate-800" />
                          </div>
                        )}
                      </button>
                    )
                  })}
               </div>
            </div>
         </div>
      </div>

    </div>
  );
}
