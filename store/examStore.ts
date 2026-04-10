import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface ExamQuestion {
  id: string;
  vignette: string;
  options: { key: string; text: string }[];
}

export interface ExamConfig {
  category: string;
  count: number;
  mode: 'tutor' | 'timed';
}

export interface ExamResult {
  correctKey: string;
  explanation: string;
  isCorrect: boolean;
}

export interface SessionRecord {
  id: string;
  timestamp: number;
  category: string;
  scorePercentage: number;
  averageTimePerQuestion: number;
  timeLeftSeconds: number;
}

export interface SessionDetailedLog {
  sessionId: string;
  incorrectQuestionIds: string[];
  timePressureIndexes: number[];
}

export interface ExamState {
  examConfig: ExamConfig | null;
  currentQuestionIndex: number;
  questions: ExamQuestion[];
  answers: Record<number, string>;
  flags: Record<number, boolean>;
  results: Record<number, ExamResult>;
  questionLocks: Record<number, boolean>;
  userSessions: SessionRecord[];
  sessionHistory: SessionDetailedLog[];
  timeSpent: Record<number, number>;
  examTimeLeft: number;
  isExamFinished: boolean;
  dailyLimitReached: boolean;
  isGenerating: boolean;
  error: string | null;
  
  // Actions
  setQuestions: (questions: ExamQuestion[]) => void;
  fetchNextQuestion: () => Promise<void>;
  setAnswer: (index: number, optionKey: string) => void;
  toggleFlag: (index: number) => void;
  submitQuestion: (index: number, feedback: Omit<ExamResult, 'isCorrect'>) => void;
  jumpToQuestion: (index: number) => void;
  nextQuestion: () => void;
  tickTimer: () => void;
  finishExamBlock: () => void;
  setDailyLimitReached: (reached: boolean) => void;
  resetSession: () => void;
  startExamSession: (config: ExamConfig) => void;
}

export const useExamStore = create<ExamState>()(
  persist(
    (set, get) => ({
      examConfig: null,
      currentQuestionIndex: 0,
      questions: [],
      answers: {},
      flags: {},
      results: {},
      questionLocks: {},
      userSessions: [],
      sessionHistory: [],
      timeSpent: {},
      examTimeLeft: 1800,
      isExamFinished: false,
      dailyLimitReached: false,
      isGenerating: false,
      error: null,

      setQuestions: (questions) => set((state) => ({ 
        questions, 
        currentQuestionIndex: 0, 
        answers: {}, 
        flags: {}, 
        results: {}, 
        questionLocks: {}, 
        timeSpent: {},
        examTimeLeft: state.examConfig?.count === 140 ? 10800 : state.examConfig ? state.examConfig.count * 45 : 1800,
        isExamFinished: false,
        error: null 
      })),

      fetchNextQuestion: async () => {
        set({ isGenerating: true, error: null });
        try {
          // Dynamic import to avoid breaking Zustand with fetchWithAuth circular deps if any,
          // but we can just use the global fetch or fetchWithAuth.
          // Wait, fetchWithAuth is already available, but we didn't import it at the top. Let's do it or use window.fetch
          const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
          const headers: HeadersInit = { 'Content-Type': 'application/json' };
          if (token) headers['Authorization'] = `Bearer ${token}`;
          
          const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://supermedbot-backend.onrender.com';
          const { examConfig } = get();
          const body = JSON.stringify({
             category: examConfig?.category || 'Full Mock',
             mode: examConfig?.mode || 'tutor',
             targetCount: examConfig?.count || 40,
          });
          const res = await fetch(`${API_URL}/api/questions/generate`, { method: 'POST', headers, body }).catch(() => null);
          
          if (!res || !res.ok) throw new Error("Generation failed");
          const data = await res.json();

          let vignette = data.vignette || data.content || '';
          let parsedOptions: {key: string; text: string}[] = [];

          if (Array.isArray(data.options)) {
            if (typeof data.options[0] === 'string') {
              const keys = ['A', 'B', 'C', 'D', 'E'];
              parsedOptions = data.options.map((opt: string, i: number) => ({ key: keys[i] || String(i), text: opt }));
            } else {
              parsedOptions = data.options; // assume it's already {key, text}
            }
          } else if (data.options && typeof data.options === 'object') {
             parsedOptions = Object.entries(data.options).map(([k, v]) => ({ key: k.replace(/option_/i, '').toUpperCase(), text: String(v) }));
          } else {
             // Try to find flattened option properties
             const manualOptions: any[] = [];
             ['A', 'B', 'C', 'D', 'E'].forEach((letter) => {
                const searchKeys = [`option_${letter}`, `option_${letter.toLowerCase()}`, `option${letter}`, letter];
                for (const sk of searchKeys) {
                    if (data[sk]) {
                       manualOptions.push({ key: letter, text: data[sk] });
                       break;
                    }
                }
             });
             parsedOptions = manualOptions;
          }

          if (parsedOptions.length === 0) {
             // Fallback
             parsedOptions = [
                { key: 'A', text: 'Option A Placeholder' },
                { key: 'B', text: 'Option B Placeholder' },
                { key: 'C', text: 'Option C Placeholder' },
                { key: 'D', text: 'Option D Placeholder' },
                { key: 'E', text: 'Option E Placeholder' },
             ];
             // If the backend sent everything nicely formatted through the content
             if (vignette && vignette.includes('A)') && vignette.includes('B)')) {
                 // The backend might just dump text into content. We leave options as A, B, C...
             }
          }

          const newQ: ExamQuestion = {
            id: data.id || `q-${Date.now()}`,
            vignette,
            options: parsedOptions
          };

          set((state) => ({
             questions: [...state.questions, newQ],
             isGenerating: false,
             error: null,
          }));
        } catch (error: any) {
          console.error("Failed to fetch next question:", error);
          set({ isGenerating: false, error: error.message || "Failed to generate vignette" });
        }
      },
      
      setAnswer: (index, optionKey) => {
        set((state) => {
           if (state.questionLocks[index]) return state;
           return { answers: { ...state.answers, [index]: optionKey } };
        });
      },
      
      toggleFlag: (index) => {
        set((state) => ({ flags: { ...state.flags, [index]: !state.flags[index] } }));
      },

      submitQuestion: (index, feedback) => set((state) => {
         const selectedOption = state.answers[index];
         const isCorrect = selectedOption === feedback.correctKey;
         return {
            results: { ...state.results, [index]: { ...feedback, isCorrect } },
            questionLocks: { ...state.questionLocks, [index]: true }
         };
      }),
      
      jumpToQuestion: (index) => set({ currentQuestionIndex: index, error: null }),
      
      nextQuestion: () => set((state) => ({
        currentQuestionIndex: state.currentQuestionIndex + 1,
        error: null
      })),

      tickTimer: () => set((state) => {
         if (state.isExamFinished || state.examTimeLeft <= 0) return state;
         
         const newTimeLeft = state.examTimeLeft - 1;
         const newTimeSpent = { ...state.timeSpent };
         const index = state.currentQuestionIndex;
         newTimeSpent[index] = (newTimeSpent[index] || 0) + 1;
         
         return { examTimeLeft: newTimeLeft, timeSpent: newTimeSpent };
      }),
      
      finishExamBlock: () => set((state) => {
         if (state.isExamFinished) return state;
         const totalQuestions = state.examConfig?.count || 40;
         let correct = 0;
         const incorrectQuestionIds: string[] = [];
         
         for (let i = 0; i < totalQuestions; i++) {
            const res = state.results[i];
            if (res && res.isCorrect) correct++;
            // Note: If skipped or incorrect, consider it wrong + add to log
            if (!res || !res.isCorrect) {
               incorrectQuestionIds.push(state.questions[i]?.id || `unloaded_q_${i}`);
            }
         }
         
         const scorePercentage = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;
         
         let totalFocusedTime = 0;
         let answeredCount = 0;
         const timePressureIndexes: number[] = [];
         Object.entries(state.timeSpent).forEach(([idxStr, time]) => {
            totalFocusedTime += time;
            if (state.answers[Number(idxStr)]) answeredCount++;
            if (time > 90) timePressureIndexes.push(Number(idxStr));
         });
         
         const avgTime = answeredCount > 0 ? Math.round(totalFocusedTime / answeredCount) : 0;
         
         const sessionId = `sess-${Date.now()}`;
         const newRecord: SessionRecord = {
            id: sessionId,
            timestamp: Date.now(),
            category: state.examConfig?.category || 'Mock Exam',
            scorePercentage,
            averageTimePerQuestion: avgTime,
            timeLeftSeconds: state.examTimeLeft
         };
         
         const newLog: SessionDetailedLog = {
            sessionId,
            incorrectQuestionIds,
            timePressureIndexes
         };
         
         return {
            isExamFinished: true,
            userSessions: [...state.userSessions, newRecord],
            sessionHistory: [...state.sessionHistory, newLog]
         };
      }),

      setDailyLimitReached: (reached) => set({ dailyLimitReached: reached }),
      
      resetSession: () => set({
        examConfig: null,
        currentQuestionIndex: 0,
        questions: [],
        answers: {},
        flags: {},
        results: {},
        questionLocks: {},
        timeSpent: {},
        examTimeLeft: 1800,
        isExamFinished: false,
        dailyLimitReached: false,
        error: null
      }),
      
      startExamSession: (config) => set({
        examConfig: config,
        currentQuestionIndex: 0,
        questions: [],
        answers: {},
        flags: {},
        results: {},
        questionLocks: {},
        timeSpent: {},
        examTimeLeft: config.count === 140 ? 10800 : config.count * 45,
        isExamFinished: false,
        dailyLimitReached: false,
        error: null
      })
    }),
    {
      name: 'exam-storage', 
      storage: createJSONStorage(() => localStorage),
    }
  )
);
