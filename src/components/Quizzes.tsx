import React, { useState, useEffect, useMemo } from 'react';
import { 
  HelpCircle, 
  Check, 
  X, 
  RefreshCw, 
  Award, 
  Volume2, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Sentence, QuizQuestion, UserStats, EnglishFileLevel } from '../types';
import { CORE_SENTENCES, ENGLISH_FILE_LEVELS } from '../data';

interface QuizzesProps {
  stats: UserStats;
  onUpdateStats: (updater: (prev: UserStats) => UserStats) => void;
  onSpeak: (text: string) => void;
  onRecordStudy?: (id: string, english: string) => void;
}

export default function Quizzes({ stats, onUpdateStats, onSpeak, onRecordStudy }: QuizzesProps) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedQuizLevel, setSelectedQuizLevel] = useState<string>('all');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedWordOrder, setSelectedWordOrder] = useState<string[]>([]);
  const [shuffledWordOptions, setShuffledWordOptions] = useState<string[]>([]);

  // Build Quiz Questions based on Core Sentences database
  const generateQuiz = () => {
    // Select sentences based on selected level
    let sourceSentences = [...CORE_SENTENCES];
    if (selectedQuizLevel !== 'all') {
      sourceSentences = sourceSentences.filter(s => s.level === selectedQuizLevel);
    }

    // Fallback if we don't have enough sentences (should not happen)
    if (sourceSentences.length < 3) {
      sourceSentences = [...CORE_SENTENCES];
    }

    const numQuestions = Math.min(5, sourceSentences.length);
    const shuffledSentences = [...sourceSentences].sort(() => 0.5 - Math.random());
    const selectedSentences = shuffledSentences.slice(0, numQuestions);

    const quizQuestions: QuizQuestion[] = selectedSentences.map((sentence, idx) => {
      // 50% chance of EN to AR, 50% AR to EN, or unscramble
      const randType = idx % 3;
      const type = randType === 0 ? 'en-to-ar' : randType === 1 ? 'ar-to-en' : 'unscramble';

      if (type === 'unscramble') {
        return {
          sentenceId: sentence.id,
          questionText: sentence.arabic,
          options: [], // Not used for unscramble
          correctAnswer: sentence.english,
          type
        };
      } else if (type === 'en-to-ar') {
        // Generate wrong options
        const otherArs = CORE_SENTENCES
          .filter(s => s.id !== sentence.id)
          .map(s => s.arabic)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        const options = [sentence.arabic, ...otherArs].sort(() => 0.5 - Math.random());

        return {
          sentenceId: sentence.id,
          questionText: sentence.english,
          options,
          correctAnswer: sentence.arabic,
          type
        };
      } else {
        // ar-to-en
        const otherEns = CORE_SENTENCES
          .filter(s => s.id !== sentence.id)
          .map(s => s.english)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        const options = [sentence.english, ...otherEns].sort(() => 0.5 - Math.random());

        return {
          sentenceId: sentence.id,
          questionText: sentence.arabic,
          options,
          correctAnswer: sentence.english,
          type
        };
      }
    });

    setQuestions(quizQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setQuizStarted(true);
    setSelectedWordOrder([]);
  };

  const currentQuestion = questions[currentQuestionIndex];

  // Set up scrambled words for 'unscramble' question
  useEffect(() => {
    if (currentQuestion && currentQuestion.type === 'unscramble') {
      const cleanEn = currentQuestion.correctAnswer.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"");
      const words = cleanEn.split(' ').filter(w => w.length > 0);
      setShuffledWordOptions([...words].sort(() => 0.5 - Math.random()));
      setSelectedWordOrder([]);
    }
  }, [currentQuestion, currentQuestionIndex]);

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
  };

  const handleConfirmAnswer = () => {
    if (isAnswered) return;

    let correct = false;
    if (currentQuestion.type === 'unscramble') {
      const userSentence = selectedWordOrder.join(' ').toLowerCase();
      const correctSentenceClean = currentQuestion.correctAnswer
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"")
        .toLowerCase()
        .trim();
      correct = userSentence === correctSentenceClean;
    } else {
      correct = selectedAnswer === currentQuestion.correctAnswer;
    }

    if (correct) {
      setScore(prev => prev + 10);
      if (onRecordStudy) {
        const matched = CORE_SENTENCES.find(s => s.id === currentQuestion.sentenceId);
        if (matched) {
          onRecordStudy(matched.id, matched.english);
        }
      }
    }

    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setSelectedWordOrder([]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentIndexState();
    } else {
      handleCompleteQuiz();
    }
  };

  const setCurrentIndexState = () => {
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleCompleteQuiz = () => {
    setQuizCompleted(true);
    
    // Update high score & total sessions in stats
    onUpdateStats(prev => {
      const isNewHigh = score > prev.highScore;
      const updatedHigh = isNewHigh ? score : prev.highScore;
      
      return {
        ...prev,
        highScore: updatedHigh,
        totalSessions: prev.totalSessions + 1
      };
    });
  };

  // Unscramble helper buttons
  const handleWordClick = (word: string, index: number) => {
    if (isAnswered) return;
    setSelectedWordOrder(prev => [...prev, word]);
    setShuffledWordOptions(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleRemoveWord = (word: string, index: number) => {
    if (isAnswered) return;
    setSelectedWordOrder(prev => prev.filter((_, idx) => idx !== index));
    setShuffledWordOptions(prev => [...prev, word]);
  };

  return (
    <div id="quizzes-view" className="max-w-2xl mx-auto space-y-8 animate-fade-in text-right">
      {!quizStarted ? (
        /* Landing Section */
        <div className="bg-white border border-slate-150 p-8 rounded-3xl text-center space-y-6 card-shadow">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto border border-indigo-100">
            <HelpCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">اختبر معلوماتك وقدرتك على الفهم</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed font-semibold">
              مسابقة سريعة من 5 أسئلة متنوعة؛ تشمل الترجمة من الإنجليزية للعربية، ومن العربية للإنجليزية، وإعادة تركيب الجمل بشكل صحيح.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-around max-w-sm mx-auto text-xs">
            <div className="text-center space-y-1">
              <span className="text-slate-400 block font-bold">عدد الأسئلة:</span>
              <span className="font-bold text-slate-800 font-display text-sm">5 أسئلة</span>
            </div>
            <div className="border-l border-slate-200"></div>
            <div className="text-center space-y-1">
              <span className="text-slate-400 block font-bold">نقاط الإجابة:</span>
              <span className="font-bold text-emerald-600 font-display text-sm">10+ نقاط</span>
            </div>
          </div>

          {/* Academic Level selector for Quizzes */}
          <div className="space-y-3 text-right max-w-sm mx-auto border-t border-slate-100 pt-4">
            <label className="text-xs font-extrabold text-slate-500 block mb-2">حدد المستوى التعليمي لأسئلة الاختبار:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedQuizLevel('all')}
                className={`p-2.5 rounded-xl border text-[11px] font-bold transition-all text-center ${
                  selectedQuizLevel === 'all'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-extrabold shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                جميع المستويات 🌍
              </button>
              {ENGLISH_FILE_LEVELS.map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setSelectedQuizLevel(lvl.id)}
                  className={`p-2.5 rounded-xl border text-[11px] font-bold transition-all text-center ${
                    selectedQuizLevel === lvl.id
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-extrabold shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {lvl.nameEn} ({lvl.nameAr.split(' ')[0]})
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateQuiz}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-100 active:scale-95 w-full sm:w-auto"
          >
            ابدأ الاختبار التفاعلي الآن ⚡
          </button>
        </div>
      ) : quizCompleted ? (
        /* Quiz Finished State */
        <div className="bg-white border border-slate-150 p-8 rounded-3xl text-center space-y-6 card-shadow animate-scale-up">
          <div className="p-4 bg-yellow-50 text-yellow-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto border border-yellow-200 animate-bounce">
            <Award className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">اكتمل الاختبار بنجاح! 🎉</h3>
            <p className="text-sm text-slate-500 font-semibold">لقد انتهيت من الإجابة على جميع الأسئلة المطروحة.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
              <span className="text-xs text-slate-400 block font-bold">مجموع نقاطك:</span>
              <span className="text-2xl font-bold text-indigo-600 font-display">{score} / 50</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
              <span className="text-xs text-slate-400 block font-bold">أعلى رصيد نقاط:</span>
              <span className="text-2xl font-bold text-yellow-600 font-display">{stats.highScore}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={generateQuiz}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-indigo-100"
            >
              إعادة المحاولة 🔄
            </button>
            <button
              onClick={() => setQuizStarted(false)}
              className="w-full sm:w-auto px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm transition-all hover:bg-slate-200 hover:text-slate-800"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      ) : (
        /* Active Question State */
        <div className="bg-white border border-slate-150 p-6 sm:p-8 rounded-3xl space-y-6 card-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-1 bg-slate-100">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300" 
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 font-display font-bold">
            <span>السؤال {currentQuestionIndex + 1} من {questions.length}</span>
            <span className="font-bold text-indigo-600">النقاط الحالية: {score}</span>
          </div>

          {/* Question Text */}
          <div className="space-y-2 text-center py-4">
            <span className="inline-block px-2.5 py-0.5 bg-slate-50 text-slate-500 border border-slate-200 text-[10px] font-bold rounded-full uppercase">
              {currentQuestion.type === 'unscramble' ? 'رتب الكلمات الإنجليزية بالتتابع الصحيح' : 'اختر الترجمة الصحيحة'}
            </span>
            <h4 className="text-xl sm:text-2xl font-extrabold text-slate-800 font-display leading-relaxed">
              {currentQuestion.questionText}
            </h4>
          </div>

          {/* Options Display / Render logic depending on Question Type */}
          {currentQuestion.type === 'unscramble' ? (
            /* Unscramble Board */
            <div className="space-y-6">
              {/* Target Dropzone */}
              <div className="min-h-[72px] bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-4 flex flex-wrap gap-2 items-center justify-center">
                {selectedWordOrder.length === 0 ? (
                  <span className="text-xs text-slate-400 font-semibold font-sans">انقر على الكلمات بالأسفل لإضافتها وترتيب الجملة</span>
                ) : (
                  selectedWordOrder.map((word, idx) => (
                    <button
                      key={`selected-${idx}`}
                      onClick={() => handleRemoveWord(word, idx)}
                      className="px-3.5 py-1.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-500 transition select-none font-display shadow-sm"
                    >
                      {word}
                    </button>
                  ))
                )}
              </div>

              {/* Shuffled Word choices */}
              <div className="flex flex-wrap gap-2 items-center justify-center p-3">
                {shuffledWordOptions.map((word, idx) => (
                  <button
                    key={`option-${idx}`}
                    onClick={() => handleWordClick(word, idx)}
                    className="px-3.5 py-1.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:border-indigo-500 hover:bg-white transition select-none font-display shadow-sm"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Standard Multiple Choice Buttons */
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswer === option;
                const showCorrectColor = isAnswered && option === currentQuestion.correctAnswer;
                const showWrongColor = isAnswered && isSelected && option !== currentQuestion.correctAnswer;

                return (
                  <button
                    key={option}
                    onClick={() => handleSelectOption(option)}
                    disabled={isAnswered}
                    className={`p-4 text-right rounded-2xl border text-sm font-bold transition-all duration-300 flex items-center justify-between ${
                      showCorrectColor
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm'
                        : showWrongColor
                        ? 'bg-rose-50 border-rose-300 text-rose-600 shadow-sm'
                        : isSelected
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-display">{option}</span>
                    {showCorrectColor && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                    {showWrongColor && <X className="w-4 h-4 text-rose-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Validation Feedback Banner */}
          {isAnswered && (
            <div className="p-4 rounded-2xl border animate-fade-in text-xs space-y-1.5 text-right bg-slate-50 border-slate-150">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-500">الإجابة الصحيحة:</span>
                <span className="text-emerald-600 font-display text-sm font-extrabold">{currentQuestion.correctAnswer}</span>
              </div>
              <div className="pt-2 border-t border-slate-200/50 flex justify-between items-center text-slate-400 font-semibold">
                <span>توضيح أو نطق إضافي:</span>
                <button
                  onClick={() => onSpeak(currentQuestion.correctAnswer)}
                  className="p-1.5 bg-slate-200 text-slate-700 rounded-xl hover:text-slate-900 hover:bg-slate-350 transition"
                  title="نطق الإجابة"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Controls Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {!isAnswered ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={currentQuestion.type === 'unscramble' ? selectedWordOrder.length === 0 : !selectedAnswer}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-35 shadow-md shadow-indigo-100"
              >
                تأكيد الإجابة والتحقق منها ✓
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm transition-all hover:bg-slate-200 hover:text-slate-950 flex items-center justify-center gap-1.5 shadow-sm"
              >
                {currentQuestionIndex < questions.length - 1 ? 'السؤال التالي' : 'عرض النتيجة النهائية'}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
