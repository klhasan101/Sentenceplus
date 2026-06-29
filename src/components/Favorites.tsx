import React, { useState, useMemo } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Volume2, 
  Search, 
  Layers, 
  ChevronLeft, 
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { Sentence } from '../types';

interface FavoritesProps {
  favorites: Sentence[];
  onToggleBookmark: (id: string, sentence?: Sentence) => void;
  onSpeak: (text: string) => void;
}

export default function Favorites({ favorites, onToggleBookmark, onSpeak }: FavoritesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [studyMode, setStudyMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Filter bookmarked sentences
  const filteredFavorites = useMemo(() => {
    if (!searchQuery.trim()) return favorites;
    const query = searchQuery.toLowerCase().trim();
    return favorites.filter(
      s => s.english.toLowerCase().includes(query) || s.arabic.includes(query)
    );
  }, [favorites, searchQuery]);

  const currentSentence = filteredFavorites[currentIndex];

  const handleNext = () => {
    if (currentIndex < filteredFavorites.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleToggleStudyMode = () => {
    setStudyMode(!studyMode);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div id="favorites-view" className="space-y-6 animate-fade-in text-right">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            الجمل المفضلة والمحفوظة ({favorites.length})
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-semibold">جمل مخصصة قمت بحفظها لسهولة المراجعة والتكرار.</p>
        </div>

        {favorites.length > 0 && (
          <button
            onClick={handleToggleStudyMode}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto shadow-md shadow-indigo-100 active:scale-95"
          >
            <Layers className="w-4 h-4" />
            {studyMode ? 'عرض كقائمة مفرودة' : 'مراجعة المفضلة كبطاقات'}
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        /* Empty State */
        <div className="p-12 text-center bg-white border border-slate-200 rounded-3xl max-w-xl mx-auto space-y-4 card-shadow">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto animate-pulse" />
          <h4 className="text-lg font-bold text-slate-700">المفضلة فارغة حالياً</h4>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed font-semibold">
            تصفح الجمل في الأقسام الأخرى واضغط على رمز النجمة لتظهر هنا، أو استخدم المدرب الشخصي الذكي لتوليد وحفظ جمل خاصة بك!
          </p>
        </div>
      ) : studyMode ? (
        /* STUDY MODAL/CARDS VIEW */
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 font-display font-semibold">
            <span>بطاقة المفضلة {currentIndex + 1} من {filteredFavorites.length}</span>
            <span>انقر للقلب</span>
          </div>

          {currentSentence ? (
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className="h-72 w-full perspective-1000 cursor-pointer"
            >
              <div className={`relative h-full w-full rounded-2xl border transition-all duration-700 preserve-3d shadow-lg ${
                isFlipped ? 'rotate-y-180 bg-white border-indigo-200' : 'bg-white border-slate-150 card-shadow'
              }`}>
                {/* English front */}
                <div className="absolute inset-0 h-full w-full rounded-2xl backface-hidden bg-white p-6 flex flex-col justify-between">
                  <span className="text-xs text-slate-400 uppercase font-display font-bold">English</span>
                  <div className="text-center py-4">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 font-display leading-tight">{currentSentence.english}</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSpeak(currentSentence.english);
                      }}
                      className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <span className="text-[10px] text-indigo-500 font-bold">انقر للمشاهدة بالعربية</span>
                  </div>
                </div>

                {/* Arabic back */}
                <div className="absolute inset-0 h-full w-full rounded-2xl backface-hidden rotate-y-180 bg-slate-50/50 p-6 flex flex-col justify-between">
                  <span className="text-xs text-indigo-600 font-bold">الترجمة والشرح</span>
                  <div className="text-center py-4">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-snug">{currentSentence.arabic}</h3>
                    {currentSentence.pronunciation && (
                      <p className="text-xs text-amber-600 font-bold mt-2">نطق: {currentSentence.pronunciation}</p>
                    )}
                  </div>
                  <div className="text-center text-[10px] text-slate-400 font-semibold">انقر للعودة للإنجليزية</div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-slate-400 text-sm font-semibold">لا تتوفر جمل للدراسة حالياً.</p>
          )}

          {/* Cards control row */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 transition disabled:opacity-30 flex items-center gap-2 text-xs font-bold shadow-sm"
            >
              السابق
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onToggleBookmark(currentSentence.id)}
              className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm"
            >
              <Trash2 className="w-3.5 h-3.5" />
              إزالة من المفضلة
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === filteredFavorites.length - 1}
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 transition disabled:opacity-30 flex items-center gap-2 text-xs font-bold shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              التالي
            </button>
          </div>
        </div>
      ) : (
        /* FLAT LIST VIEW WITH FILTERS */
        <div className="space-y-4">
          {/* Internal search */}
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="ابحث في مفضلتك السريعة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 focus:border-indigo-500 rounded-xl text-xs sm:text-sm text-slate-800 outline-none shadow-sm"
            />
          </div>

          {/* Favorites List table/grid */}
          <div className="grid grid-cols-1 gap-3">
            {filteredFavorites.map((s) => (
              <div 
                key={s.id}
                className="bg-white border border-slate-100 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 card-shadow hover:border-indigo-300 transition"
              >
                <div className="space-y-1.5 flex-1 text-right">
                  <h4 className="text-sm font-extrabold text-slate-800 font-display tracking-tight leading-normal">{s.english}</h4>
                  <p className="text-xs text-indigo-600 font-bold">{s.arabic}</p>
                  
                  {s.explanation && (
                    <p className="text-[10px] text-slate-500 leading-relaxed font-sans">{s.explanation}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 border-slate-100 pt-2.5 md:pt-0 justify-end">
                  <button
                    onClick={() => onSpeak(s.english)}
                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 transition"
                    title="استمع للنطق"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onToggleBookmark(s.id)}
                    className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 rounded-xl transition"
                    title="إزالة من المفضلة"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
