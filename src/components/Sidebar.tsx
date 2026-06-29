import React from 'react';
import { 
  Home, 
  Layers, 
  HelpCircle, 
  MessageSquare, 
  Bookmark, 
  Flame, 
  Sparkles,
  Info,
  Volume2,
  X,
  Smartphone,
  Laptop,
  Award
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  streak: number;
  voices: SpeechSynthesisVoice[];
  selectedVoiceName: string;
  onVoiceChange: (name: string) => void;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  streak,
  voices,
  selectedVoiceName,
  onVoiceChange
}: SidebarProps) {
  const [showVoiceInfo, setShowVoiceInfo] = React.useState(false);

  const getVoiceDialectLabel = (voice: SpeechSynthesisVoice) => {
    const lang = voice.lang.toLowerCase();
    let dialect = 'لهجة إنجليزية';
    if (lang.includes('us')) dialect = 'أمريكية (US) 🇺🇸';
    else if (lang.includes('gb') || lang.includes('uk')) dialect = 'بريطانية (UK) 🇬🇧';
    else if (lang.includes('au')) dialect = 'أسترالية (AU) 🇦🇺';
    else if (lang.includes('ca')) dialect = 'كندية (CA) 🇨🇦';
    else if (lang.includes('in')) dialect = 'هندية (IN) 🇮🇳';
    else if (lang.includes('ie')) dialect = 'أيرلندية (IE) 🇮🇪';
    else if (lang.includes('nz')) dialect = 'نيوزيلندية (NZ) 🇳🇿';
    else if (lang.includes('za')) dialect = 'جنوب أفريقية (ZA) 🇿🇦';
    
    const nameLower = voice.name.toLowerCase();
    const isNatural = nameLower.includes('natural') || 
                      nameLower.includes('neural') || 
                      nameLower.includes('premium') || 
                      nameLower.includes('enhanced') || 
                      nameLower.includes('siri') || 
                      nameLower.includes('google');

    const cleanName = voice.name
      .replace(/Microsoft|Google|Apple|Natural|Neural|Premium|Enhanced|Online|Voice/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
      
    return `${dialect} - ${cleanName} ${isNatural ? '⭐' : ''}`;
  };

  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: Home },
    { id: 'cards', label: 'البطاقات التعليمية', icon: Layers },
    { id: 'quizzes', label: 'الاختبارات التفاعلية', icon: HelpCircle },
    { id: 'aiCoach', label: 'المدرب الشخصي الذكي', icon: MessageSquare },
    { id: 'favorites', label: 'الجمل المفضلة', icon: Bookmark },
  ];

  return (
    <aside id="sidebar-container" className="w-full lg:w-64 bg-white border-l lg:border-l border-slate-200 flex flex-col h-auto lg:h-screen sticky top-0 z-30 shrink-0 shadow-sm">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-neural-indigo via-neural-purple to-neural-pink rounded-2xl text-white shadow-md shadow-purple-100 relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <Sparkles className="w-6 h-6 animate-pulse relative z-10" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-800 tracking-wide font-display">إنجليزية 5000</h1>
            <p className="text-[10px] text-slate-400 font-bold">بمفهوم Google Neural Expressive</p>
          </div>
        </div>
      </div>

      {/* Streak Indicator Widget */}
      <div className="px-6 py-4 border-b border-slate-150 bg-slate-50/50">
        <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-100/80 shadow-sm transition-all duration-300 hover:border-orange-200">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-500">التوالي اليومي:</span>
          </div>
          <span className="text-sm font-bold text-orange-500 font-display">{streak} {streak === 1 ? 'يوم' : 'أيام'}</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              id={`nav-tab-${item.id}`}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-right transition-all duration-300 font-extrabold text-sm group ${
                isActive
                  ? 'bg-gradient-to-r from-neural-indigo via-neural-purple to-neural-pink text-white shadow-lg shadow-purple-500/15 scale-[1.01]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
              <span className="flex-1">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Voice Dialect Selector */}
      <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/40 text-right">
        <div className="flex items-center justify-between mb-2">
          <button 
            onClick={() => setShowVoiceInfo(true)}
            className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded-md transition-all duration-200"
            title="كيفية الحصول على أصوات واقعية فائقة الجودة"
          >
            <HelpCircle className="w-3 h-3 text-indigo-500" />
            <span>تحسين الصوت 🎙️</span>
          </button>
          <div className="flex items-center gap-1 text-slate-700">
            <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-xs font-bold">لهجة النطق:</span>
          </div>
        </div>
        <select
          id="voice-dialect-selector"
          value={selectedVoiceName}
          onChange={(e) => onVoiceChange(e.target.value)}
          className="w-full text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 rounded-xl px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          {voices.length === 0 ? (
            <option value="">النطق الافتراضي للمتصفح 🌐</option>
          ) : (
            voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {getVoiceDialectLabel(voice)}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Footer info banner */}
      <div className="p-6 border-t border-slate-100 bg-slate-50/30 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <Info className="w-3.5 h-3.5 text-indigo-500" />
          <span>تطبيق ويب يدعم PWA بلا إنترنت</span>
        </div>
      </div>

      {/* Voice Help Modal */}
      {showVoiceInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" style={{ direction: 'rtl' }}>
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 text-right flex flex-col max-h-[90vh] animate-scale-up">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-between">
              <button 
                onClick={() => setShowVoiceInfo(false)}
                className="p-1.5 rounded-xl bg-white/15 hover:bg-white/25 transition-colors duration-200"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center gap-2.5">
                <div>
                  <h3 className="text-lg font-bold">الحصول على نطق بشري طبيعي 🎙️</h3>
                  <p className="text-xs text-indigo-100">خطوات بسيطة للحصول على أفضل جودة نطق كالمتحدث الأصلي</p>
                </div>
                <div className="p-2 bg-white/10 rounded-xl">
                  <Volume2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-600 font-sans">
              
              {/* Highlight Recommendation */}
              <div className="bg-indigo-50/75 border border-indigo-100 p-4 rounded-2xl flex gap-3 items-start">
                <div className="flex-1 space-y-1">
                  <h4 className="font-extrabold text-indigo-900 flex items-center gap-1.5 justify-end">
                    <span>التوصية الذهبية: متصفح Microsoft Edge ⭐</span>
                  </h4>
                  <p className="text-xs text-indigo-950 leading-relaxed text-right">
                    يحتوي متصفح <strong className="text-indigo-900 font-bold">Edge</strong> على أقوى تقنية توليد أصوات طبيعية (Natural Neural Voices) مدمجة ومجانية تماماً بالذكاء الاصطناعي. تمنحك صوتاً بشرياً حقيقياً 100% بنبرة متحدث أصلي. ننصح بفتح التطبيق من خلاله واختيار الأصوات التي تملك علامة النجمة <strong className="text-indigo-600 font-bold">⭐</strong>.
                  </p>
                </div>
              </div>

              {/* Steps per system */}
              <div className="space-y-4 text-right">
                <h4 className="font-extrabold text-slate-800 border-b border-slate-100 pb-2">كيفية تفعيل الأصوات الفاخرة على جهازك:</h4>
                
                {/* iOS & macOS */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-800 font-bold justify-end">
                    <span className="text-xs font-semibold text-slate-500">أجهزة iPhone / iPad / Mac</span>
                    <Smartphone className="w-4 h-4 text-indigo-500" />
                  </div>
                  <ol className="list-decimal list-inside pr-1 text-xs space-y-1 text-slate-500 leading-relaxed text-right">
                    <li>افتح <span className="font-semibold text-slate-700">الإعدادات (Settings)</span> ⚙️ بجهازك.</li>
                    <li>اذهب إلى <span className="font-semibold text-slate-700">تسهيلات الاستخدام (Accessibility)</span> ثم <span className="font-semibold text-slate-700">المحتوى المنطوق (Spoken Content)</span>.</li>
                    <li>اضغط على <span className="font-semibold text-slate-700">الأصوات (Voices)</span> ثم اختر <span className="font-semibold text-slate-700">الإنجليزية (English)</span>.</li>
                    <li>قم بتنزيل الأصوات التي تحمل تسمية <span className="font-semibold text-indigo-600">Siri</span> أو <span className="font-semibold text-indigo-600">محسّن (Enhanced)</span> (مثل Samantha Enhanced أو Daniel Enhanced).</li>
                  </ol>
                </div>

                {/* Google Android */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center gap-2 text-slate-800 font-bold justify-end">
                    <span className="text-xs font-semibold text-slate-500">أجهزة أندرويد (Samsung / Xiaomi / Pixel)</span>
                    <Smartphone className="w-4 h-4 text-emerald-500" />
                  </div>
                  <ol className="list-decimal list-inside pr-1 text-xs space-y-1 text-slate-500 leading-relaxed text-right">
                    <li>افتح <span className="font-semibold text-slate-700">الإعدادات</span> ⚙️ واكتب في البحث <span className="font-semibold text-slate-700">"تحويل النص إلى حديث"</span> (Text-to-speech).</li>
                    <li>تأكد من اختيار <span className="font-semibold text-indigo-600">محرك Google المفضل</span> كمحرك أساسي.</li>
                    <li>اضغط على أيقونة الترس بجانب المحرك، ثم اختر <span className="font-semibold text-slate-700">تثبيت البيانات الصوتية</span>.</li>
                    <li>قم بتنزيل الحزمة الصوتية عالية الجودة للغة الإنجليزية (English - US or UK) ذات الحجم الأكبر لنطق طبيعي فائق.</li>
                  </ol>
                </div>

                {/* Windows */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center gap-2 text-slate-800 font-bold justify-end">
                    <span className="text-xs font-semibold text-slate-500">أجهزة الكمبيوتر (Windows 10 / 11)</span>
                    <Laptop className="w-4 h-4 text-blue-500" />
                  </div>
                  <ol className="list-decimal list-inside pr-1 text-xs space-y-1 text-slate-500 leading-relaxed text-right">
                    <li>افتح <span className="font-semibold text-slate-700">الإعدادات (Settings)</span> ⚙️ ثم <span className="font-semibold text-slate-700">الوقت واللغة (Time & Language)</span>.</li>
                    <li>اذهب إلى قسم <span className="font-semibold text-slate-700">الكلام (Speech)</span>.</li>
                    <li>تأكد من تثبيت الحزم الصوتية الطبيعية للغة الإنجليزية في قائمة الأصوات المتاحة للنظام.</li>
                  </ol>
                </div>
              </div>

              {/* Refresh Info */}
              <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl text-center">
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  💡 <strong className="text-slate-700">ملاحظة هامة:</strong> بعد تفعيل الأصوات عالية الجودة على جهازك، قم بعمل <strong className="text-indigo-600">تحديث (Refresh) للصفحة</strong> وستظهر الأصوات الجديدة مفعّلة بنجمتك الذهبية في القائمة لتبدأ دراسة لغوية مثالية كالمحترفين!
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowVoiceInfo(false)}
                className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-700 transition-colors duration-200 shadow-md"
              >
                حسناً، فهمت
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
