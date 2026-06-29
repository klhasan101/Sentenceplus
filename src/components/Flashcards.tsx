import React, { useState, useMemo, useEffect } from 'react';
import { 
  Volume2, 
  Mic, 
  MicOff, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  RefreshCw, 
  BookOpen, 
  Sparkles,
  HelpCircle,
  Award,
  ArrowRight
} from 'lucide-react';
import { Sentence, Category, UserStats, EnglishFileLevel } from '../types';
import { CATEGORIES, CORE_SENTENCES, ENGLISH_FILE_LEVELS } from '../data';

interface FlashcardsProps {
  stats: UserStats;
  initialCategoryId?: string | null;
  initialLevelId?: EnglishFileLevel | null;
  onUpdateStats: (updater: (prev: UserStats) => UserStats) => void;
  onSpeak: (text: string, rate?: number) => void;
  onToggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  onRecordStudy?: (id: string, english: string) => void;
}

export default function Flashcards({ 
  stats, 
  initialCategoryId, 
  initialLevelId,
  onUpdateStats, 
  onSpeak, 
  onToggleBookmark, 
  isBookmarked,
  onRecordStudy
}: FlashcardsProps) {
  // If initialLevelId is provided, we default filterType to 'level'
  const [filterType, setFilterType] = useState<'level' | 'category'>(
    initialLevelId ? 'level' : (initialCategoryId ? 'category' : 'level')
  );
  const [selectedLevel, setSelectedLevel] = useState<EnglishFileLevel>(initialLevelId || 'Starter');
  const [selectedCatId, setSelectedCatId] = useState<string>(initialCategoryId || CATEGORIES[0].id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechResult, setSpeechResult] = useState<{ text: string; status: 'idle' | 'success' | 'failed' }>({
    text: '',
    status: 'idle'
  });
  const [slowVoice, setSlowVoice] = useState(false);

  // Reset indices when level, category, or filterType changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSpeechResult({ text: '', status: 'idle' });
  }, [selectedCatId, selectedLevel, filterType]);

  // Sync state with props when they change (e.g., from Dashboard click)
  useEffect(() => {
    if (initialLevelId) {
      setFilterType('level');
      setSelectedLevel(initialLevelId);
    } else if (initialCategoryId) {
      setFilterType('category');
      setSelectedCatId(initialCategoryId);
    }
  }, [initialLevelId, initialCategoryId]);

  // Filter sentences depending on filterType (level vs category)
  const sentences = useMemo(() => {
    if (filterType === 'level') {
      return CORE_SENTENCES.filter(s => s.level === selectedLevel);
    } else {
      return CORE_SENTENCES.filter(s => s.category === selectedCatId);
    }
  }, [filterType, selectedLevel, selectedCatId]);

  const currentSentence = sentences[currentIndex];

  const handleNext = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      setSpeechResult({ text: '', status: 'idle' });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
      setSpeechResult({ text: '', status: 'idle' });
    }
  };

  const handleMarkMastered = (id: string) => {
    onUpdateStats(prev => {
      const mastered = prev.masteredIds.includes(id) 
        ? prev.masteredIds 
        : [...prev.masteredIds, id];
      const learning = prev.learningIds.filter(lid => lid !== id);
      return { ...prev, masteredIds: mastered, learningIds: learning };
    });
    if (onRecordStudy && currentSentence) {
      onRecordStudy(id, currentSentence.english);
    }
    // Autoplay next if available after short delay
    setTimeout(() => {
      handleNext();
    }, 400);
  };

  const handleMarkLearning = (id: string) => {
    onUpdateStats(prev => {
      const learning = prev.learningIds.includes(id)
        ? prev.learningIds
        : [...prev.learningIds, id];
      const mastered = prev.masteredIds.filter(mid => mid !== id);
      return { ...prev, masteredIds: mastered, learningIds: learning };
    });
    if (onRecordStudy && currentSentence) {
      onRecordStudy(id, currentSentence.english);
    }
  };

  // Browser Speech Recognition Integration
  const startSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("عذراً، ميزة التعرف على الصوت غير مدعومة في متصفحك الحالي. يرجى استخدام متصفح Google Chrome أو Safari.");
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.lang = 'en-US';
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      rec.onstart = () => {
        setIsListening(true);
        setSpeechResult({ text: 'جارٍ الاستماع...', status: 'idle' });
      };

      rec.onresult = (event: any) => {
        const textSpoken = event.results[0][0].transcript;
        const targetClean = currentSentence.english.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").trim();
        const spokenClean = textSpoken.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").trim();

        // Basic match comparison
        const isMatch = targetClean === spokenClean || targetClean.includes(spokenClean) || spokenClean.includes(targetClean);

        if (isMatch && onRecordStudy) {
          onRecordStudy(currentSentence.id, currentSentence.english);
        }

        setSpeechResult({
          text: textSpoken,
          status: isMatch ? 'success' : 'failed'
        });
      };

      rec.onerror = (err: any) => {
        console.error('Speech recognition error:', err);
        let errorMsg = 'حدث خطأ في التقاط الصوت. حاول مجدداً.';
        if (err.error === 'not-allowed') {
          errorMsg = 'تم رفض الوصول للميكروفون أو أن الإطار الحالي يمنع ذلك. يرجى تفعيل إذن الميكروفون أو فتح التطبيق في نافذة جديدة مستقلة عبر خيار "Open in new tab" المتاح أعلى الصفحة.';
        } else if (err.error === 'no-speech') {
          errorMsg = 'لم يتم رصد أي صوت. يرجى التحدث بوضوح وبصوت مسموع مباشرة بعد الضغط على زر الميكروفون.';
        } else if (err.error === 'audio-capture') {
          errorMsg = 'فشل التقاط الصوت. يرجى التحقق من توصيل جهاز الميكروفون وضبطه بشكل صحيح في النظام.';
        } else if (err.error === 'network') {
          errorMsg = 'حدث خطأ في الاتصال بالشبكة لخدمة التعرف على الصوت.';
        }
        setSpeechResult({ text: errorMsg, status: 'failed' });
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  return (
    <div id="flashcards-view" className="space-y-8 animate-fade-in text-right">
      {/* Dynamic Selector (English File Level vs Category) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          <span className="text-sm font-bold text-slate-700">طريقة تصفح البطاقات:</span>
        </div>
        <div className="flex gap-1.5 bg-slate-100 p-1.5 rounded-2xl self-start sm:self-auto">
          <button
            onClick={() => setFilterType('level')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 ${
              filterType === 'level'
                ? 'bg-gradient-to-r from-neural-indigo via-neural-purple to-neural-pink text-white shadow-md shadow-purple-500/10 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            المستويات التعليمية
          </button>
          <button
            onClick={() => setFilterType('category')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 ${
              filterType === 'category'
                ? 'bg-gradient-to-r from-neural-indigo via-neural-purple to-neural-pink text-white shadow-md shadow-purple-500/10 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            التصنيفات الموضوعية
          </button>
        </div>
      </div>

      {filterType === 'level' ? (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-500">اختر مستوى دراسياً لتبدأ رحلة التعلم:</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {ENGLISH_FILE_LEVELS.map((lvl) => {
              const isSelected = selectedLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedLevel(lvl.id)}
                  className={`flex flex-col items-center justify-between p-3.5 rounded-2xl border text-center transition-all h-24 spring-interactive duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-r from-neural-indigo via-neural-purple to-neural-pink border-transparent text-white shadow-md shadow-purple-500/15 scale-[1.03]'
                      : 'bg-white border-slate-100/80 text-slate-700'
                  }`}
                >
                  <span className="text-xs font-black uppercase tracking-wide">{lvl.nameEn}</span>
                  <span className={`text-[11px] font-bold ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {lvl.nameAr.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Category selector row */
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-700">اختر تصنيف الجمل:</h3>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
            {CATEGORIES.map((cat) => (
              <button
                id={`cat-select-${cat.id}`}
                key={cat.id}
                onClick={() => setSelectedCatId(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                  selectedCatId === cat.id
                    ? 'bg-gradient-to-br from-indigo-500 to-indigo-700 border-transparent text-white shadow-md shadow-indigo-200'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {cat.nameAr}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Flashcard Container */}
      {sentences.length > 0 ? (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Card Indicator */}
          <div className="flex items-center justify-between px-2 text-xs text-slate-500 font-display font-medium">
            <span>البطاقة {currentIndex + 1} من {sentences.length}</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <span>
                {filterType === 'level' 
                  ? `مستوى: ${ENGLISH_FILE_LEVELS.find(l => l.id === selectedLevel)?.nameAr}`
                  : `تصنيف: ${CATEGORIES.find(c => c.id === selectedCatId)?.nameAr}`}
              </span>
            </div>
          </div>

          {/* Flip Card Stage */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="group h-80 w-full perspective-1000 cursor-pointer"
          >
            <div className={`relative h-full w-full rounded-3xl border transition-all duration-700 preserve-3d shadow-xl ${
              isFlipped ? 'rotate-y-180 bg-white border-indigo-200' : 'bg-white border-slate-150 card-shadow'
            }`}>
              {/* CARD FRONT (English) */}
              <div className="absolute inset-0 h-full w-full rounded-3xl backface-hidden bg-white p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-slate-400 font-display uppercase">English</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(currentSentence.id);
                    }}
                    className={`p-2 rounded-xl text-lg transition ${isBookmarked(currentSentence.id) ? 'text-yellow-500 scale-110' : 'text-slate-300 hover:text-slate-500'}`}
                  >
                    ★
                  </button>
                </div>

                <div className="text-center py-6">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-display leading-tight tracking-tight selection:bg-indigo-500 select-all">
                    {currentSentence.english}
                  </h3>
                  <p className="text-xs text-indigo-500/80 mt-4 font-bold animate-pulse">انقر لقلب البطاقة ومعرفة الترجمة والشرح</p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSpeak(currentSentence.english, slowVoice ? 0.6 : 1.0);
                      }}
                      className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                      title="نطق الجملة"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSlowVoice(!slowVoice);
                      }}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-xl border transition ${
                        slowVoice 
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-600' 
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      بطيء
                    </button>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">تم الإتقان: {stats.masteredIds.includes(currentSentence.id) ? 'نعم' : 'لا'}</span>
                </div>
              </div>

              {/* CARD BACK (Arabic Translation + Pronunciation + Explanation) */}
              <div className="absolute inset-0 h-full w-full rounded-3xl backface-hidden rotate-y-180 bg-slate-50/50 p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600">الترجمة والشرح العربي</span>
                  <span className="text-xs text-slate-400 font-display font-semibold">English</span>
                </div>

                <div className="space-y-4 py-2">
                  <div className="text-center">
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
                      {currentSentence.arabic}
                    </h4>
                  </div>

                  <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    {currentSentence.pronunciation && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">النطق الصوتي التقريبي:</span>
                        <span className="font-bold text-amber-600 text-sm">{currentSentence.pronunciation}</span>
                      </div>
                    )}
                    {currentSentence.explanation && (
                      <div className="border-t border-slate-200/50 pt-2 text-xs text-right">
                        <span className="text-slate-400 block mb-1 font-bold">شرح القواعد والمفردات:</span>
                        <p className="text-slate-600 leading-relaxed font-sans">{currentSentence.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center text-xs text-slate-400 border-t border-slate-100 pt-4 font-semibold">
                  انقر لقلب البطاقة للواجهة الإنجليزية
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Microphone Pronunciation Checker */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col items-center justify-center space-y-4 card-shadow">
            <div className="text-center space-y-1">
              <h4 className="text-sm font-bold text-slate-700">اختبر نطقك الصوتي لهذه الجملة:</h4>
              <p className="text-xs text-slate-400 font-medium">انقر على المايكروفون واقرأ الجملة باللغة الإنجليزية</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={startSpeechRecognition}
                disabled={isListening}
                className={`p-4 rounded-full transition-all duration-300 transform active:scale-90 ${
                  isListening 
                    ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-200' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-150'
                }`}
                title="اضغط وتحدث"
              >
                {isListening ? <MicOff className="w-6 h-6 animate-pulse" /> : <Mic className="w-6 h-6" />}
              </button>
            </div>

            {/* Speech results analysis */}
            {speechResult.text && (
              <div className="w-full max-w-md p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center animate-fade-in text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-bold">ما قلته:</span>
                  <span className="font-display font-bold text-slate-800 italic">"{speechResult.text}"</span>
                </div>
                <div className="pt-2 border-t border-slate-200/50">
                  {speechResult.status === 'success' ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full font-bold">
                      <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                      نطق ممتاز وصحيح 100%! أحسنت!
                    </span>
                  ) : speechResult.status === 'failed' ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-50 text-rose-600 border border-rose-100 rounded-full font-bold">
                      حاول مجدداً، ركز على مخارج الحروف واستمع للنطق أولاً.
                    </span>
                  ) : (
                    <span className="text-slate-400 font-medium">التعرف على الصوت...</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Flashcard navigation and action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            {/* Nav Arrows */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-3 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:text-slate-800 text-slate-500 transition disabled:opacity-30 flex items-center gap-2 text-xs font-bold select-none shadow-sm"
              >
                السابق
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleNext}
                disabled={currentIndex === sentences.length - 1}
                className="px-4 py-3 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:text-slate-800 text-slate-500 transition disabled:opacity-30 flex items-center gap-2 text-xs font-bold select-none shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                التالي
              </button>
            </div>

            {/* Study Status Updaters */}
            <div className="flex gap-2 w-full sm:flex-1 justify-end">
              <button
                onClick={() => handleMarkLearning(currentSentence.id)}
                className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl text-xs font-bold transition border ${
                  stats.learningIds.includes(currentSentence.id)
                    ? 'bg-amber-50 border-amber-200 text-amber-700 shadow-sm'
                    : 'bg-white border-slate-250 text-slate-500 hover:border-slate-300 hover:text-slate-700 shadow-sm'
                }`}
              >
                قيد المراجعة ⏳
              </button>
              
              <button
                onClick={() => handleMarkMastered(currentSentence.id)}
                className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                  stats.masteredIds.includes(currentSentence.id)
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-100'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                تم الحفظ والإتقان!
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-3xl max-w-xl mx-auto space-y-4 card-shadow">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="text-lg font-bold text-slate-700">لا توجد جمل مضافة في هذا القسم بعد!</h4>
          <p className="text-sm text-slate-400">يرجى اختيار تصنيف آخر أو طلب إضافة جمل مخصصة من المدرب الذكي.</p>
        </div>
      )}
    </div>
  );
}
