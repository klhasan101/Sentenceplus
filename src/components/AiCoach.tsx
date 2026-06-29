import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Volume2, 
  Compass, 
  Bookmark, 
  HelpCircle, 
  Activity, 
  Layers, 
  Plus, 
  Check,
  RotateCw,
  X
} from 'lucide-react';
import { Sentence, UserStats } from '../types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AiCoachProps {
  stats: UserStats;
  onSpeak: (text: string) => void;
  onAddCustomSentence: (sentence: Sentence) => void;
  isCustomSentenceSaved: (english: string) => boolean;
}

export default function AiCoach({ 
  stats, 
  onSpeak, 
  onAddCustomSentence,
  isCustomSentenceSaved
}: AiCoachProps) {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'generator'>('chat');
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: 'أهلاً بك! أنا الأستاذ آدم، مدربك الشخصي لتعلم اللغة الإنجليزية بالذكاء الاصطناعي. 👋\n\nيمكنك التحدث معي باللغة العربية، أو طرح أسئلة حول القواعد، أو طلب المساعدة في صياغة الجمل ونطقها الصحيح. كيف يمكنني مساعدتك اليوم؟'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Generator state
  const [topicInput, setTopicInput] = useState('');
  const [sentenceCount, setSentenceCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSentences, setGeneratedSentences] = useState<Sentence[]>([]);
  const [generatorError, setGeneratorError] = useState('');

  // Scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSendingChat]);

  // Starter Prompts for quick chatting
  const starterPrompts = [
    'اشرح لي قاعدة Present Simple ببساطة',
    'كيف أطلب الطعام في مطعم بالإنجليزية؟',
    'أعطني تعبيرات إنجليزية شائعة للترحيب',
    'ما الفرق بين Make و Do في الجمل؟'
  ];

  const handleSendChat = async (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim() || isSendingChat) return;

    // Add user message
    const userMsg: Message = {
      id: `chat-${Date.now()}-u`,
      role: 'user',
      content: text
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');
    setIsSendingChat(true);

    try {
      const response = await fetch('/api/coach/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();
      if (data.success && data.content) {
        setMessages(prev => [...prev, {
          id: `chat-${Date.now()}-a`,
          role: 'assistant',
          content: data.content
        }]);
      } else {
        throw new Error(data.error || 'فشلت عملية التواصل مع المدرب الذكي.');
      }
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: `chat-${Date.now()}-err`,
        role: 'assistant',
        content: `عذراً، حدث خطأ أثناء الاتصال بالمدرب الذكي. الرجاء التحقق من إعدادات مفتاح API الخاص بـ Gemini في تبويب Secrets والمحاولة مرة أخرى. (${err.message})`
      }]);
    } finally {
      setIsSendingChat(false);
    }
  };

  const handleGenerateSentences = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicInput.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratorError('');
    setGeneratedSentences([]);

    try {
      const response = await fetch('/api/sentences/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicInput,
          count: sentenceCount
        })
      });

      const data = await response.json();
      if (data.success && data.sentences) {
        setGeneratedSentences(data.sentences);
      } else {
        throw new Error(data.error || 'فشلت عملية توليد الجمل.');
      }
    } catch (err: any) {
      console.error(err);
      setGeneratorError(err.message || 'حدث خطأ غير متوقع. يرجى مراجعة إعدادات الخادم ومفتاح API.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div id="ai-coach-view" className="space-y-6 animate-fade-in text-right">
      {/* View Sub-Tabs - Modern Google Pill Selector */}
      <div className="flex bg-slate-100/80 p-1.5 rounded-2xl gap-2 w-max ml-auto relative z-10">
        <button
          onClick={() => setActiveSubTab('chat')}
          className={`px-6 py-2.5 text-xs sm:text-sm font-extrabold rounded-xl transition-all duration-300 flex items-center gap-2 ${
            activeSubTab === 'chat'
              ? 'bg-gradient-to-r from-neural-indigo via-neural-purple to-neural-pink text-white shadow-md shadow-purple-500/10 scale-[1.02]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <span>محادثة المدرب آدم 💬</span>
        </button>
        <button
          onClick={() => setActiveSubTab('generator')}
          className={`px-6 py-2.5 text-xs sm:text-sm font-extrabold rounded-xl transition-all duration-300 flex items-center gap-2 ${
            activeSubTab === 'generator'
              ? 'bg-gradient-to-r from-neural-indigo via-neural-purple to-neural-pink text-white shadow-md shadow-purple-500/10 scale-[1.02]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <span>مولد الجمل الذكي بالسمات ⚡</span>
        </button>
      </div>

      {activeSubTab === 'chat' ? (
        /* COACH CHAT SCREEN */
        <div className="bg-white/95 backdrop-blur-md border border-slate-100/80 rounded-[2rem] h-[600px] flex flex-col overflow-hidden shadow-xl card-shadow">
          {/* Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-100/80 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="p-2.5 bg-gradient-to-tr from-neural-indigo via-neural-purple to-neural-pink rounded-2xl text-white">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-800">الأستاذ آدم</h4>
                <p className="text-[10px] text-emerald-600 font-bold">متصل الآن ومستعد للمساعدة بالتصميم العصري</p>
              </div>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/20">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div 
                  key={m.id}
                  className={`flex w-full ${isUser ? 'justify-start' : 'justify-end'} animate-fade-in`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-neural-indigo via-neural-purple to-neural-pink text-white rounded-br-none shadow-md shadow-purple-500/15'
                      : 'bg-white text-slate-800 rounded-bl-none border border-slate-100 card-shadow'
                  }`}>
                    {/* Preserve line breaks */}
                    <p className="whitespace-pre-wrap font-sans">{m.content}</p>
                  </div>
                </div>
              );
            })}
            
            {/* Loading/Thinking Bubble */}
            {isSendingChat && (
              <div className="flex w-full justify-end animate-pulse">
                <div className="bg-white border border-slate-150 rounded-2xl rounded-bl-none p-4 max-w-[80%] flex items-center gap-2 card-shadow">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span className="text-xs text-slate-500 font-bold">المدرب آدم يفكر...</span>
                </div>
              </div>
            )}
            
            <div ref={chatBottomRef}></div>
          </div>

          {/* Quick Starters (only visible when we have initial message) */}
          {messages.length === 1 && !isSendingChat && (
            <div className="px-4 py-2 bg-slate-50/80 border-t border-slate-100 flex flex-wrap gap-2 shrink-0 justify-end">
              {starterPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSendChat(p)}
                  className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition active:scale-95 shadow-sm"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input Panel */}
          <div className="p-4 bg-slate-50/80 border-t border-slate-150 shrink-0">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="اطرح سؤالاً عن القواعد، المفردات، أو تدرب على جمل..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendChat();
                }}
                disabled={isSendingChat}
                className="w-full pl-14 pr-4 py-3.5 bg-white border border-slate-200 focus:border-indigo-500 rounded-2xl text-slate-800 text-xs sm:text-sm placeholder-slate-400 outline-none transition duration-300 shadow-inner"
              />
              <button
                onClick={() => handleSendChat()}
                disabled={isSendingChat || !chatInput.trim()}
                className="absolute left-2.5 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-100 disabled:text-slate-400 text-white rounded-xl transition shadow-md shadow-indigo-100 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* THE DYNAMIC SENTENCE GENERATOR */
        <div className="space-y-6">
          <div className="bg-white border border-slate-150 p-6 rounded-3xl shadow-xl space-y-4 card-shadow">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-800">توليد جمل مخصصة بموضوع معين</h3>
              <p className="text-xs text-slate-400 font-medium">مثال: "في الطائرة"، "البرمجة والمصطلحات البرمجية"، "مقابلة لوظيفة مبيعات"</p>
            </div>

            <form onSubmit={handleGenerateSentences} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="اكتب السمة أو الموضوع باللغة العربية أو الإنجليزية..."
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 outline-none focus:border-indigo-500 text-sm shadow-inner"
              />
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 shrink-0 font-semibold">العدد:</span>
                <select 
                  value={sentenceCount} 
                  onChange={(e) => setSentenceCount(Number(e.target.value))}
                  className="px-3 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-sm outline-none"
                >
                  <option value="3">3 جمل</option>
                  <option value="5">5 جمل</option>
                  <option value="10">10 جمل</option>
                </select>
                
                <button
                  type="submit"
                  disabled={isGenerating || !topicInput.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-2xl font-bold text-sm transition shadow-lg shadow-indigo-150 shrink-0 flex items-center gap-1.5 active:scale-95"
                >
                  {isGenerating ? <RotateCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-yellow-300" />}
                  توليد الجمل ✨
                </button>
              </div>
            </form>

            {generatorError && (
              <p className="text-xs text-rose-500 font-bold">خطأ: {generatorError}</p>
            )}
          </div>

          {/* Results List */}
          {isGenerating && (
            <div className="p-12 text-center bg-white border border-slate-150 rounded-3xl space-y-4 animate-pulse card-shadow">
              <RotateCw className="w-8 h-8 text-indigo-500 animate-spin mx-auto" />
              <p className="text-sm text-slate-500 font-medium">يقوم الذكاء الاصطناعي الآن بصياغة جمل مخصصة مع نطقها وشرحها... يرجى الانتظار.</p>
            </div>
          )}

          {generatedSentences.length > 0 && (
            <div className="space-y-4 animate-fade-in text-right">
              <h4 className="text-sm font-bold text-slate-400">الجمل المولدة بالذكاء الاصطناعي:</h4>
              <div className="grid grid-cols-1 gap-4">
                {generatedSentences.map((s, idx) => {
                  const saved = isCustomSentenceSaved(s.english);
                  return (
                    <div 
                      key={s.id || idx}
                      className="bg-white border border-slate-100 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 card-shadow text-right relative overflow-hidden"
                    >
                      <div className="space-y-2 flex-1">
                        <h4 className="text-lg font-bold text-slate-800 font-display tracking-tight leading-snug">{s.english}</h4>
                        <p className="text-sm text-indigo-600 font-bold">{s.arabic}</p>
                        
                        {s.pronunciation && (
                          <p className="text-xs text-emerald-600 font-bold">النطق: {s.pronunciation}</p>
                        )}
                        {s.explanation && (
                          <p className="text-xs text-slate-500 font-sans leading-relaxed">شرح: {s.explanation}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0 shrink-0 justify-end">
                        <button
                          onClick={() => onSpeak(s.english)}
                          className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                          title="نطق الجملة"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => onAddCustomSentence(s)}
                          disabled={saved}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                            saved 
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700 cursor-not-allowed'
                              : 'bg-indigo-50 hover:bg-indigo-600 hover:text-white border-indigo-150 text-indigo-600 shadow-md shadow-indigo-100'
                          }`}
                        >
                          {saved ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          {saved ? 'تم الحفظ في المفضلة' : 'حفظ في المفضلة'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
