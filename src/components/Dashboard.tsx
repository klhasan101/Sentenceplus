import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Flame, 
  BookOpen, 
  CheckCircle, 
  Volume2, 
  Play, 
  Sparkles, 
  Award,
  ChevronLeft,
  X,
  Plus,
  BellRing,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Sentence, Category, UserStats, EnglishFileLevel } from '../types';
import { CATEGORIES, CORE_SENTENCES, ENGLISH_FILE_LEVELS } from '../data';

interface DashboardProps {
  stats: UserStats;
  onSelectCategory: (catId: string) => void;
  onSelectLevel: (levelId: EnglishFileLevel) => void;
  onSpeak: (text: string, rate?: number) => void;
  onToggleBookmark: (id: string, customSentence?: Sentence) => void;
  isBookmarked: (id: string) => boolean;
  onNavigate?: (tab: string) => void;
}

export interface WordOfTheDay {
  id: string;
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  definitionEn: string;
  definitionAr: string;
  translationAr: string;
  exampleSentenceEn: string;
  exampleSentenceAr: string;
}

export const WORDS_OF_THE_DAY: WordOfTheDay[] = [
  {
    id: 'resilient',
    word: 'Resilient',
    pronunciation: '/rɪˈzɪl.jənt/',
    partOfSpeech: 'Adjective - صفة',
    definitionEn: 'Able to withstand or recover quickly from difficult conditions.',
    definitionAr: 'القادر على الصمود والتعافي بسرعة من الظروف الصعبة والشدائد.',
    translationAr: 'مرن / مقاوم للصعاب',
    exampleSentenceEn: 'She is highly resilient and always bounces back from failure.',
    exampleSentenceAr: 'إنها مرنة للغاية ودائماً ما تستعيد قوتها وتتعافى من الفشل.'
  },
  {
    id: 'eloquent',
    word: 'Eloquent',
    pronunciation: '/ˈel.ə.kwənt/',
    partOfSpeech: 'Adjective - صفة',
    definitionEn: 'Fluent or persuasive in speaking or writing.',
    definitionAr: 'بليغ، فصيح، ذو قدرة ممتازة على التعبير الإقناعي بطلاقة.',
    translationAr: 'فصيح / بليغ الكلام',
    exampleSentenceEn: 'The president delivered an eloquent speech that moved the nation.',
    exampleSentenceAr: 'ألقى الرئيس خطاباً بليغاً أثر في الأمة بأكملها.'
  },
  {
    id: 'paradigm',
    word: 'Paradigm',
    pronunciation: '/ˈpær.ə.daɪm/',
    partOfSpeech: 'Noun - اسم',
    definitionEn: 'A typical example or pattern of something; a model.',
    definitionAr: 'نموذج فكري أو نمط مثال نموذجي يُحتذى به كإطار عمل.',
    translationAr: 'نموذج فكري / مثال نموذجي',
    exampleSentenceEn: 'This new approach is a paradigm shift in language learning.',
    exampleSentenceAr: 'هذا النهج الجديد يمثل نقلة نوعية (تحولاً في النموذج الفكري) في تعلم اللغات.'
  },
  {
    id: 'ubiquitous',
    word: 'Ubiquitous',
    pronunciation: '/juːˈbɪk.wɪ.təs/',
    partOfSpeech: 'Adjective - صفة',
    definitionEn: 'Present, appearing, or found everywhere.',
    definitionAr: 'واسع الانتشار، موجود في كل مكان وفي كل وقت.',
    translationAr: 'واسع الانتشار / موجود في كل مكان',
    exampleSentenceEn: 'Mobile phones have become ubiquitous in modern society.',
    exampleSentenceAr: 'أصبحت الهواتف المحمولة واسعة الانتشار وموجودة في كل مكان في المجتمع الحديث.'
  },
  {
    id: 'ephemeral',
    word: 'Ephemeral',
    pronunciation: '/ɪˈfem.ər.əl/',
    partOfSpeech: 'Adjective - صفة',
    definitionEn: 'Lasting for a very short time.',
    definitionAr: 'زائل، سريع الزوال، يدوم لفترة وجيزة جداً.',
    translationAr: 'زائل / سريع الزوال',
    exampleSentenceEn: 'The beauty of cherry blossoms is beautiful but ephemeral.',
    exampleSentenceAr: 'جمال أزهار الكرز فائق لكنه سريع الزوال ودائم لفترة وجيزة.'
  },
  {
    id: 'serendipity',
    word: 'Serendipity',
    pronunciation: '/ˌser.ənˈdɪp.ə.ti/',
    partOfSpeech: 'Noun - اسم',
    definitionEn: 'The occurrence of valuable events by chance in a happy way.',
    definitionAr: 'حدوث أشياء جميلة ومفيدة بالصدفة البحتة دون تخطيط مسبق.',
    translationAr: 'صدفة سعيدة / حسن الطالع',
    exampleSentenceEn: 'Meeting my old friend at the airport was a pure serendipity.',
    exampleSentenceAr: 'كان لقاء صديقي القديم في المطار بمثابة صدفة سعيدة بحتة.'
  },
  {
    id: 'diligent',
    word: 'Diligent',
    pronunciation: '/ˈdɪl.ɪ.dʒənt/',
    partOfSpeech: 'Adjective - صفة',
    definitionEn: 'Showing care and conscientiousness in one\'s work or duties.',
    definitionAr: 'مجتهد، دؤوب، يبذل قصارى جهده وعنايته التامة في عمله أو دراسته.',
    translationAr: 'مجتهد / دؤوب',
    exampleSentenceEn: 'He is a diligent student who always completes his tasks on time.',
    exampleSentenceAr: 'إنه طالب مجتهد ودؤوب ينجز واجباته دائماً في الوقت المحدد.'
  },
  {
    id: 'empathy',
    word: 'Empathy',
    pronunciation: '/ˈem.pə.θi/',
    partOfSpeech: 'Noun - اسم',
    definitionEn: 'The ability to understand and share the feelings of another.',
    definitionAr: 'القدرة على التعاطف العميق وفهم مشاعر الآخرين ومشاركتهم إياها.',
    translationAr: 'التعاطف الوجداني / فهم مشاعر الآخرين',
    exampleSentenceEn: 'Showing empathy towards others is a key to strong human relationships.',
    exampleSentenceAr: 'إظهار التعاطف الوجداني مع الآخرين هو مفتاح العلاقات الإنسانية القوية.'
  },
  {
    id: 'lucid',
    word: 'Lucid',
    pronunciation: '/ˈluː.sɪd/',
    partOfSpeech: 'Adjective - صفة',
    definitionEn: 'Expressed clearly; easy to understand or thinking clearly.',
    definitionAr: 'واضح ومفهوم تماماً، أو الشخص الواعي والواضح التفكير.',
    translationAr: 'واضح / سهل الفهم / صافي الذهن',
    exampleSentenceEn: 'The teacher gave a lucid explanation of a very complex grammar rule.',
    exampleSentenceAr: 'قدم المعلم شرحاً واضحاً ومبسطاً لقاعدة نحوية معقدة للغاية.'
  },
  {
    id: 'ambiguous',
    word: 'Ambiguous',
    pronunciation: '/æmˈbɪɡ.ju.əs/',
    partOfSpeech: 'Adjective - صفة',
    definitionEn: 'Open to more than one interpretation; having a double meaning.',
    definitionAr: 'غامض، حمال أوجه، يحتمل أكثر من تفسير أو معنى وغير محدد بدقة.',
    translationAr: 'غامض / حمّال أوجه',
    exampleSentenceEn: 'The instructions were ambiguous, leaving everyone confused.',
    exampleSentenceAr: 'كانت التعليمات غامضة، مما ترك الجميع في حالة حيرة.'
  },
  {
    id: 'benevolent',
    word: 'Benevolent',
    pronunciation: '/bəˈnev.əl.ənt/',
    partOfSpeech: 'Adjective - صفة',
    definitionEn: 'Well meaning and kindly; charitable.',
    definitionAr: 'حب الخير للآخرين، خيّر، معطاء، ويتمنى السعادة والخير للناس.',
    translationAr: 'مُحب للخير / خيّر / كريم النفس',
    exampleSentenceEn: 'A benevolent donor provided scholarships for ten needy students.',
    exampleSentenceAr: 'قدم متبرع محب للخير منحاً دراسية لعشرة طلاب محتاجين.'
  },
  {
    id: 'metaphor',
    word: 'Metaphor',
    pronunciation: '/ˈmet.ə.fɔːr/',
    partOfSpeech: 'Noun - اسم',
    definitionEn: 'A figure of speech in which a word or phrase is applied to an object or action to which it is not literally applicable.',
    definitionAr: 'الاستعارة أو التشبيه البليغ، إطلاق لفظ لغرض التعبير المجازي وليس الحرفي.',
    translationAr: 'استعارة مكنية / تشبيه مجازي',
    exampleSentenceEn: 'The phrase "time is money" is a well-known metaphor.',
    exampleSentenceAr: 'عبارة "الوقت كالسيف (الوقت من ذهب)" هي تشبيه مجازي معروف.'
  },
  {
    id: 'meticulous',
    word: 'Meticulous',
    pronunciation: '/məˈtɪk.jə.ləs/',
    partOfSpeech: 'Adjective - صفة',
    definitionEn: 'Showing great attention to detail; very careful and precise.',
    definitionAr: 'دقيق للغاية، شديد الحرص على التفاصيل الصغيرة بدقة متناهية.',
    translationAr: 'دقيق جداً / شديد الحرص على التفاصيل',
    exampleSentenceEn: 'He is meticulous in his research, ensuring every data point is verified.',
    exampleSentenceAr: 'إنه دقيق جداً في أبحاثه، حيث يحرص على التحقق من كل نقطة بيانات.'
  },
  {
    id: 'scrutinize',
    word: 'Scrutinize',
    pronunciation: '/ˈskruː.tɪ.naɪz/',
    partOfSpeech: 'Verb - فعل',
    definitionEn: 'Examine or inspect closely and thoroughly.',
    definitionAr: 'يدقق النظر والتمحيص، يتفحص الشيء بعناية شديدة وتفصيل.',
    translationAr: 'يدقق النظر / يمحص / يتفحص بدقة',
    exampleSentenceEn: 'The lawyer will scrutinize every word of the contract before signing.',
    exampleSentenceAr: 'سيدقق المحامي النظر في كل كلمة من العقد قبل توقيعه.'
  },
  {
    id: 'advocate',
    word: 'Advocate',
    pronunciation: '/ˈæd.və.keɪt/',
    partOfSpeech: 'Noun/Verb - اسم وفعل',
    definitionEn: 'A person who publicly supports or recommends a particular cause or policy; or to publicly support.',
    definitionAr: 'المدافع، المؤيد أو المناصر لقضية معينة، أو فعل (يدافع عن/يناصر).',
    translationAr: 'مؤيد / مناصر / يدافع عن قضية',
    exampleSentenceEn: 'He is a strong advocate for free high-quality education for all.',
    exampleSentenceAr: 'إنه مناصر قوي للتعليم المجاني عالي الجودة للجميع.'
  }
];

export default function Dashboard({ 
  stats, 
  onSelectCategory, 
  onSelectLevel,
  onSpeak, 
  onToggleBookmark, 
  isBookmarked,
  onNavigate
}: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSentence, setSelectedSentence] = useState<Sentence | null>(null);
  const [customTopic, setCustomTopic] = useState('');
  const [showNotification, setShowNotification] = useState(true);

  // Word of the Day calculation
  const dailyWordSeed = useMemo(() => {
    const today = new Date().toDateString();
    let seed = 0;
    for (let i = 0; i < today.length; i++) {
      seed += today.charCodeAt(i);
    }
    return seed % WORDS_OF_THE_DAY.length;
  }, []);

  const [currentWotdIndex, setCurrentWotdIndex] = useState<number>(dailyWordSeed);

  const currentWotd = useMemo(() => {
    return WORDS_OF_THE_DAY[currentWotdIndex];
  }, [currentWotdIndex]);

  const wotdSentence = useMemo<Sentence>(() => {
    return {
      id: `wotd_${currentWotd.id}`,
      english: `${currentWotd.word}: ${currentWotd.exampleSentenceEn}`,
      arabic: `${currentWotd.translationAr}: ${currentWotd.exampleSentenceAr}`,
      category: 'daily',
      notes: `تعريف الكلمة: ${currentWotd.definitionAr}\n(${currentWotd.partOfSpeech} - ${currentWotd.pronunciation})`
    };
  }, [currentWotd]);

  const handleNextRandomWord = () => {
    let nextIndex = Math.floor(Math.random() * WORDS_OF_THE_DAY.length);
    if (nextIndex === currentWotdIndex) {
      nextIndex = (nextIndex + 1) % WORDS_OF_THE_DAY.length;
    }
    setCurrentWotdIndex(nextIndex);
  };

  const isWotdBookmarked = isBookmarked(wotdSentence.id);

  const todayStr = useMemo(() => new Date().toDateString(), []);
  const todayEntries = useMemo(() => {
    return (stats.studyHistory || []).filter(h => h.date === todayStr);
  }, [stats.studyHistory, todayStr]);

  const uniqueTodayCount = useMemo(() => {
    return new Set(todayEntries.map(e => e.sentenceId)).size;
  }, [todayEntries]);

  const DAILY_GOAL = 5;

  // Prepare last 7 days study data for the Recharts chart
  const chartData = useMemo(() => {
    const days: string[] = [];
    const formattedDays: string[] = [];
    const dayLabelsAr = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    
    // Get last 7 days
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toDateString());
      
      const dayName = dayLabelsAr[d.getDay()];
      formattedDays.push(dayName);
    }
    
    const history = stats.studyHistory || [];
    
    return days.map((dayStr, index) => {
      // Filter entries for this day
      const entriesForDay = history.filter(h => h.date === dayStr);
      
      // Count unique sentences studied on this day
      const uniqueIds = new Set(entriesForDay.map(h => h.sentenceId));
      const count = uniqueIds.size;
      
      return {
        name: formattedDays[index],
        'الجمل المدروسة': count,
      };
    });
  }, [stats.studyHistory]);

  // Random Daily Sentence Focus
  const dailySentence = useMemo(() => {
    const today = new Date().toDateString();
    let seed = 0;
    for (let i = 0; i < today.length; i++) {
      seed += today.charCodeAt(i);
    }
    const index = seed % CORE_SENTENCES.length;
    return CORE_SENTENCES[index];
  }, []);

  // Filter core sentences by search query
  const filteredSentences = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return CORE_SENTENCES.filter(
      s => s.english.toLowerCase().includes(query) || s.arabic.includes(query)
    ).slice(0, 8); // limit search results for speed and cleanliness
  }, [searchQuery]);

  // Statistics calculations
  const totalMastered = stats.masteredIds.length;
  const totalLearning = stats.learningIds.length;
  const totalCoreCount = CORE_SENTENCES.length;
  const overallProgressPercent = Math.round((totalMastered / totalCoreCount) * 100) || 0;

  // Compute mastery counts per category
  const categoryStats = useMemo(() => {
    const counts: Record<string, { total: number; mastered: number }> = {};
    CATEGORIES.forEach(c => {
      counts[c.id] = { total: 0, mastered: 0 };
    });
    CORE_SENTENCES.forEach(s => {
      if (counts[s.category]) {
        counts[s.category].total++;
        if (stats.masteredIds.includes(s.id)) {
          counts[s.category].mastered++;
        }
      }
    });
    return counts;
  }, [stats.masteredIds]);

  // Compute mastery counts per English File level
  const levelStats = useMemo(() => {
    const counts: Record<string, { total: number; mastered: number }> = {};
    ENGLISH_FILE_LEVELS.forEach(l => {
      counts[l.id] = { total: 0, mastered: 0 };
    });
    CORE_SENTENCES.forEach(s => {
      if (s.level && counts[s.level]) {
        counts[s.level].total++;
        if (stats.masteredIds.includes(s.id)) {
          counts[s.level].mastered++;
        }
      }
    });
    return counts;
  }, [stats.masteredIds]);



  return (
    <div id="dashboard-view" className="space-y-8 animate-fade-in text-right">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-[2.5rem] neural-aura-gradient p-8 sm:p-10 text-white shadow-xl neural-glow-primary spring-interactive duration-500 ease-out">
        <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-white/15 blur-3xl animate-pulse"></div>
        <div className="absolute -left-24 -bottom-24 w-64 h-64 rounded-full bg-cyan-400/20 blur-3xl"></div>
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-white bg-white/20 rounded-full border border-white/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
            جوجل Neural Expressive • تطبيق ويب ذكي فائق السرعة
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight font-sans tracking-tight">
            أتقن أهم <span className="text-yellow-200 underline decoration-yellow-300/60 decoration-wavy">5000 جملة إنجليزية</span> بأسلوب تفاعلي ذكي!
          </h2>
          <p className="text-white/95 text-xs sm:text-sm font-medium leading-relaxed">
            استكشف الجمل الأساسية الأكثر تكراراً في الحياة اليومية والعمل بنظام نطق حقيقي، واجعل الذكاء الاصطناعي مدربك الخاص لتوليد جمل مخصصة بلمسة إبداع متقنة!
          </p>
        </div>
      </div>

      {/* Custom Study Goal Reminder/Notification System */}
      {showNotification && (
        <div className="animate-scale-up">
          {uniqueTodayCount === 0 ? (
            // State A: Has NOT studied today at all
            <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border border-orange-200/80 rounded-3xl p-5 sm:p-6 text-right flex flex-col md:flex-row md:items-center justify-between gap-4 card-shadow">
              <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl"></div>
              
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl text-white shadow-md shadow-orange-200 shrink-0 animate-bounce">
                  <BellRing className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 justify-end md:justify-start flex-row-reverse">
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 font-extrabold text-[10px] rounded-full">تنبيه دراسي ⚠️</span>
                    <h3 className="text-base font-extrabold text-slate-800">لم تبدأ حصتك اليومية بعد!</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xl">
                    لا تدع حماسك يفتر اليوم! حافظ على توالي أيام دراستك المتواصلة المتميزة بنجاح (<span className="text-orange-600 font-bold">{stats.streak} يوم</span>). تدرّب الآن على 5 جمل فقط لتأمين تقدمك اليومي.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-end md:self-auto shrink-0 z-10">
                <button 
                  onClick={() => onNavigate?.('cards')}
                  className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-2xl hover:bg-slate-800 transition-all duration-300 shadow-sm flex items-center gap-1.5"
                >
                  <span>تدريب البطاقات ⚡</span>
                </button>
                <button 
                  onClick={() => onNavigate?.('quizzes')}
                  className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-2xl hover:bg-slate-50 transition-all duration-300 shadow-sm"
                >
                  <span>اختبار سريع 📝</span>
                </button>
                <button 
                  onClick={() => setShowNotification(false)}
                  className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-200"
                  title="تجاهل مؤقتاً"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : uniqueTodayCount < DAILY_GOAL ? (
            // State B: Started but not finished yet (< 5 sentences)
            <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500/10 via-sky-500/5 to-transparent border border-indigo-200/80 rounded-3xl p-5 sm:p-6 text-right flex flex-col md:flex-row md:items-center justify-between gap-4 card-shadow">
              <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl"></div>
              
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-sky-500 rounded-2xl text-white shadow-md shadow-indigo-100 shrink-0">
                  <Flame className="w-6 h-6 text-yellow-300 animate-pulse" />
                </div>
                <div className="space-y-1.5 w-full">
                  <div className="flex items-center gap-2 justify-end md:justify-start flex-row-reverse">
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 font-extrabold text-[10px] rounded-full">اقتربت من الهدف 🚀</span>
                    <h3 className="text-base font-extrabold text-slate-800">أنت على بعد خطوة واحدة من إكمال حصتك!</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xl">
                    لقد قمت بمذاكرة <span className="text-indigo-600 font-bold">{uniqueTodayCount} من أصل {DAILY_GOAL}</span> جمل اليوم. متبقي لك <span className="text-indigo-600 font-bold">{DAILY_GOAL - uniqueTodayCount}</span> جمل فقط لتحقيق هدفك اليومي!
                  </p>
                  {/* Quota Progress bar */}
                  <div className="w-full max-w-md h-2 bg-slate-100 rounded-full overflow-hidden mt-1 relative">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-sky-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${(uniqueTodayCount / DAILY_GOAL) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-end md:self-auto shrink-0 z-10">
                <button 
                  onClick={() => onNavigate?.('cards')}
                  className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-2xl hover:bg-indigo-700 transition-all duration-300 shadow-md shadow-indigo-100 flex items-center gap-1.5 animate-pulse"
                >
                  <span>أكمل التدريب الآن ⚡</span>
                </button>
                <button 
                  onClick={() => setShowNotification(false)}
                  className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-200"
                  title="تجاهل مؤقتاً"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            // State C: Completed the daily goal (>= 5 sentences)
            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-200/80 rounded-3xl p-5 sm:p-6 text-right flex flex-col md:flex-row md:items-center justify-between gap-4 card-shadow">
              <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
              
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl text-white shadow-md shadow-emerald-100 shrink-0">
                  <Award className="w-6 h-6 text-yellow-300" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 justify-end md:justify-start flex-row-reverse">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-extrabold text-[10px] rounded-full">إنجاز اليوم مكتمل 🎉</span>
                    <h3 className="text-base font-extrabold text-slate-800">يا لك من بطل! لقد أتممت حصتك اليومية كاملة بنجاح!</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xl">
                    رائع جداً! لقد أكملت دراسة <span className="text-emerald-600 font-bold">{uniqueTodayCount} جملة</span> اليوم وحافظت على سلسلة توالي أيام دراستك المتواصلة بمستوى <span className="text-emerald-600 font-bold">{stats.streak} يوم</span> بنجاح. استمر بهذا الحماس الرائع!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-end md:self-auto shrink-0 z-10">
                <button 
                  onClick={() => onNavigate?.('quizzes')}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-2xl hover:bg-emerald-700 transition-all duration-300 shadow-md shadow-emerald-100"
                >
                  <span>اختبار التحدي البطل 🏆</span>
                </button>
                <button 
                  onClick={() => setShowNotification(false)}
                  className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-200"
                  title="إغلاق"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Progress Card */}
        <div className="bg-white/90 backdrop-blur-md border border-slate-100/80 p-5 rounded-3xl flex items-center justify-between card-shadow spring-interactive duration-300">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-400">تقدمك الكلي</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-slate-800 font-display">{overallProgressPercent}%</span>
              <span className="text-xs text-slate-500">من الجمل</span>
            </div>
            {/* Progress bar inside card */}
            <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
              <div className="bg-gradient-to-r from-neural-indigo via-neural-purple to-neural-pink h-full rounded-full transition-all duration-500" style={{ width: `${overallProgressPercent}%` }}></div>
            </div>
          </div>
          <div className="p-3 bg-indigo-50/75 rounded-2xl text-indigo-600">
            <BookOpen className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Mastered Count */}
        <div className="bg-white/90 backdrop-blur-md border border-slate-100/80 p-5 rounded-3xl flex items-center justify-between card-shadow spring-interactive duration-300">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-400">جمل تم إتقانها</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-emerald-600 font-display">{totalMastered}</span>
              <span className="text-xs text-slate-500">جملة</span>
            </div>
          </div>
          <div className="p-3 bg-emerald-50/75 rounded-2xl text-emerald-600">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Daily Streak */}
        <div className="bg-white/90 backdrop-blur-md border border-slate-100/80 p-5 rounded-3xl flex items-center justify-between card-shadow spring-interactive duration-300">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-400">التوالي الدراسي</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-orange-500 font-display">{stats.streak}</span>
              <span className="text-xs text-slate-500">{stats.streak === 1 ? 'يوم' : 'أيام متتالية'}</span>
            </div>
          </div>
          <div className="p-3 bg-orange-50/75 rounded-2xl text-orange-500">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* High Score */}
        <div className="bg-white/90 backdrop-blur-md border border-slate-100/80 p-5 rounded-3xl flex items-center justify-between card-shadow spring-interactive duration-300">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-400">أعلى نقاط بالمسابقات</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-yellow-600 font-display">{stats.highScore}</span>
              <span className="text-xs text-slate-500">نقطة</span>
            </div>
          </div>
          <div className="p-3 bg-yellow-50/75 rounded-2xl text-yellow-600">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Visual Progress Chart / Study Activity */}
      <div className="bg-white/90 backdrop-blur-md border border-slate-100/80 p-6 rounded-[2rem] card-shadow space-y-4 text-right animate-scale-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 justify-end">
              <span>نشاطك الدراسي اليومي (آخر 7 أيام)</span>
              <Sparkles className="w-4 h-4 text-purple-500" />
            </h3>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">عدد الجمل الفريدة التي قمت بمذاكرتها وتكرارها يومياً.</p>
          </div>
          <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl font-bold text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
            <span>جمل تم دراستها</span>
          </div>
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorStudy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#d946ef" stopOpacity={0.01}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <ChartTooltip 
                contentStyle={{ 
                  direction: 'rtl',
                  textAlign: 'right',
                  borderRadius: '1.25rem',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
                  fontFamily: 'Tajawal, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              />
              <Area 
                type="monotone" 
                dataKey="الجمل المدروسة" 
                stroke="#8b5cf6" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorStudy)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>



      {/* Interactive Search Bar & Dynamic Modal */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-700">ابحث عن أي جملة إنجليزية أو عربية:</h3>
        <div className="relative w-full max-w-xl">
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="مثال: how are you, حجز غرفة، piece of cake..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-12 py-3.5 bg-white border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-2xl text-slate-800 placeholder-slate-400 outline-none transition duration-300 shadow-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 left-4 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Instant Search Results */}
        {searchQuery.trim() && (
          <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-xl max-w-xl animate-fade-in z-20 relative">
            {filteredSentences.length > 0 ? (
              filteredSentences.map((s) => (
                <div 
                  key={s.id} 
                  onClick={() => setSelectedSentence(s)}
                  className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer group transition duration-200 text-right"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition font-display">{s.english}</p>
                    <p className="text-xs text-slate-500 font-sans">{s.arabic}</p>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition" />
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-slate-400 text-sm">
                لم نجد نتائج مطابقة في قاعدة البيانات الأساسية. جرب استخدام "المدرب الذكي" لتوليدها بضغطة زر!
              </div>
            )}
          </div>
        )}
      </div>

      {/* Daily Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Daily Focus Sentence Card */}
        <div className="bg-white border border-slate-150 p-6 rounded-[2rem] card-shadow relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -left-16 -top-16 w-36 h-36 bg-indigo-50 rounded-full opacity-40"></div>
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-100 self-start">
              <Sparkles className="w-3.5 h-3.5" />
              جملة التركيز لليوم
            </span>
            <div className="space-y-2">
              <h4 className="text-xl sm:text-2xl font-bold text-slate-800 font-display tracking-tight leading-snug">{dailySentence.english}</h4>
              <p className="text-base text-indigo-600 font-bold">{dailySentence.arabic}</p>
              {dailySentence.explanation && (
                <p className="text-xs text-slate-400 italic">شرح: {dailySentence.explanation}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
            <span className="text-xs text-slate-400 font-semibold">تدرّب على النطق والتكرار</span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onSpeak(dailySentence.english)}
                className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                title="استمع للنطق"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onToggleBookmark(dailySentence.id)}
                className={`p-3 rounded-xl border transition-all ${
                  isBookmarked(dailySentence.id)
                    ? 'bg-yellow-50 border-yellow-200 text-yellow-600'
                    : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                }`}
                title="إضافة للمفضلة"
              >
                ★
              </button>
            </div>
          </div>
        </div>

        {/* Word of the Day Card */}
        <div className="bg-white border border-slate-150 p-6 rounded-[2rem] card-shadow relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-16 -top-16 w-36 h-36 bg-indigo-50 rounded-full opacity-40"></div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-bold text-indigo-700 bg-indigo-50 rounded-full border border-indigo-100">
                <BookOpen className="w-3.5 h-3.5" />
                مفردة اليوم لزيادة حصيلتك 📚
              </span>
              <button
                onClick={handleNextRandomWord}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-all bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100 hover:bg-indigo-100"
                title="جلب كلمة عشوائية أخرى"
              >
                <span>كلمة أخرى 🎲</span>
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <h4 className="text-2xl font-black text-slate-800 font-display tracking-tight">{currentWotd.word}</h4>
                <button
                  onClick={() => onSpeak(currentWotd.word)}
                  className="p-1 text-indigo-500 hover:text-indigo-700 transition"
                  title="استمع لنطق الكلمة"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <span className="text-[11px] text-slate-400 font-extrabold font-mono block">
                {currentWotd.partOfSpeech} • {currentWotd.pronunciation}
              </span>

              <div className="pt-2">
                <p className="text-sm text-indigo-600 font-extrabold">الترجمة: {currentWotd.translationAr}</p>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                  <strong className="text-slate-700">التعريف:</strong> {currentWotd.definitionEn}
                </p>
                <p className="text-[11px] text-slate-400 font-semibold mt-0.5 leading-relaxed">
                  {currentWotd.definitionAr}
                </p>
              </div>

              {/* Example sentence section with quote look */}
              <div className="bg-slate-50/50 rounded-2xl p-3 border border-slate-100 mt-2 space-y-1">
                <span className="text-[10px] text-slate-400 font-extrabold block">مثال على الاستخدام:</span>
                <p className="text-xs font-bold text-slate-700 font-display italic">
                  "{currentWotd.exampleSentenceEn}"
                </p>
                <p className="text-[11px] text-slate-500 font-semibold">
                  "{currentWotd.exampleSentenceAr}"
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
            <span className="text-xs text-slate-400 font-semibold">احفظ الكلمة بمثالها في المفضلة</span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onSpeak(currentWotd.exampleSentenceEn)}
                className="p-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl transition-all flex items-center justify-center"
                title="استمع لنطق الجملة الكاملة"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onToggleBookmark(wotdSentence.id, wotdSentence)}
                className={`p-3 rounded-xl border transition-all ${
                  isWotdBookmarked
                    ? 'bg-yellow-50 border-yellow-200 text-yellow-600 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                }`}
                title={isWotdBookmarked ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
              >
                ★
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Language Mastery Levels Section */}
      <div className="space-y-4">
        <div className="space-y-1 text-right">
          <h3 className="text-lg font-bold text-slate-700">مستويات التدريب اللغوي التدريجية:</h3>
          <p className="text-xs text-slate-400 font-semibold">تتبع تقدمك اللغوي عبر المستويات المصممة بدقة لتصل بك إلى الاحتراف التام.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ENGLISH_FILE_LEVELS.map((lvl) => {
            const statsInfo = levelStats[lvl.id] || { total: 0, mastered: 0 };
            const progressPercent = statsInfo.total > 0 
              ? Math.round((statsInfo.mastered / statsInfo.total) * 100) 
              : 0;

            const colorMap = {
              emerald: { bg: 'bg-emerald-50/50 hover:border-emerald-300', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-800' },
              teal: { bg: 'bg-teal-50/50 hover:border-teal-300', text: 'text-teal-700', badge: 'bg-teal-100 text-teal-800' },
              sky: { bg: 'bg-sky-50/50 hover:border-sky-300', text: 'text-sky-700', badge: 'bg-sky-100 text-sky-800' },
              indigo: { bg: 'bg-indigo-50/50 hover:border-indigo-300', text: 'text-indigo-700', badge: 'bg-indigo-100 text-indigo-800' },
              purple: { bg: 'bg-purple-50/50 hover:border-purple-300', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-800' },
              rose: { bg: 'bg-rose-50/50 hover:border-rose-300', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-800' }
            };

            const colors = colorMap[lvl.color] || colorMap.indigo;

            return (
              <div 
                key={lvl.id}
                onClick={() => onSelectLevel(lvl.id)}
                className={`bg-white border border-slate-100 p-5 rounded-2xl flex flex-col justify-between hover:scale-[1.02] cursor-pointer card-shadow hover:shadow-lg transition-all duration-300 text-right ${colors.bg}`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${colors.badge}`}>{lvl.nameEn}</span>
                    <h4 className="text-sm font-extrabold text-slate-800">{lvl.nameAr.split(' ')[0]}</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed min-h-[36px]">{lvl.desc}</p>
                </div>
                
                {/* Progress bar inside card */}
                <div className="mt-4 pt-3 border-t border-slate-100/60 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold">
                    <span>مكتمل:</span>
                    <span className="font-bold text-slate-700 font-display">{statsInfo.mastered}</span>
                    <span>/</span>
                    <span className="font-display">{statsInfo.total}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold text-slate-700 font-display">{progressPercent}%</span>
                    <div className="w-16 h-1 bg-slate-200/40 rounded-full overflow-hidden">
                      <div className="bg-slate-700 h-full rounded-full" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Categories Grid Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-700">اختر تصنيفاً لتبدأ الدراسة:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => {
            const statsInfo = categoryStats[cat.id] || { total: 0, mastered: 0 };
            const progressPercent = statsInfo.total > 0 
              ? Math.round((statsInfo.mastered / statsInfo.total) * 100) 
              : 0;

            return (
              <div 
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="bg-white border border-slate-100 p-5 rounded-2xl flex flex-col justify-between hover:border-indigo-300 cursor-pointer card-shadow hover:shadow-xl hover:shadow-indigo-500/5 group transition-all duration-300 text-right"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-slate-800 group-hover:text-indigo-600 transition">{cat.nameAr}</h4>
                    <span className="text-xs text-slate-400 font-display font-medium">{cat.nameEn}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed min-h-[36px]">{cat.description}</p>
                </div>
                
                {/* Footer Progress within category card */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold">
                    <span>مكتمل:</span>
                    <span className="font-bold text-emerald-600 font-display">{statsInfo.mastered}</span>
                    <span>/</span>
                    <span className="font-display">{statsInfo.total}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-indigo-500 font-bold font-display">{progressPercent}%</span>
                    <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for detailed search sentence view */}
      {selectedSentence && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-150 rounded-[2rem] w-full max-w-lg p-6 space-y-6 shadow-2xl relative text-right animate-scale-up">
            <button 
              onClick={() => setSelectedSentence(null)}
              className="absolute left-4 top-4 p-1.5 rounded-full bg-slate-150 text-slate-500 hover:text-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="space-y-4">
              <span className="inline-flex px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-semibold rounded-full">
                معاينة جملة
              </span>
              
              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-bold text-slate-800 font-display tracking-tight leading-snug">{selectedSentence.english}</h4>
                <p className="text-base text-indigo-600 font-bold">{selectedSentence.arabic}</p>
              </div>

              {selectedSentence.pronunciation && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">النطق الصوتي التقريبي:</span>
                  <span className="text-sm font-bold text-emerald-600">{selectedSentence.pronunciation}</span>
                </div>
              )}

              {selectedSentence.explanation && (
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 block font-bold">الشرح النحوي / اللغوي:</span>
                  <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {selectedSentence.explanation}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => onSpeak(selectedSentence.english)}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 active:scale-98"
              >
                <Volume2 className="w-4 h-4" />
                استمع للنطق
              </button>
              <button
                onClick={() => {
                  onToggleBookmark(selectedSentence.id);
                }}
                className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all border ${
                  isBookmarked(selectedSentence.id)
                    ? 'bg-yellow-50 border-yellow-200 text-yellow-600'
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800'
                }`}
              >
                ★ المفضلة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
