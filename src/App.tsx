import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Flashcards from './components/Flashcards';
import Quizzes from './components/Quizzes';
import AiCoach from './components/AiCoach';
import Favorites from './components/Favorites';
import { UserStats, Sentence, EnglishFileLevel } from './types';
import { CORE_SENTENCES } from './data';
import { Menu, X, Sparkles, BookOpen } from 'lucide-react';

const LOCAL_STATS_KEY = 'eng5000_user_stats';
const LOCAL_FAVORITES_KEY = 'eng5000_user_favorites';

function generateSeedHistory() {
  const history: any[] = [];
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toDateString());
  }

  // Day -6: d1 (Easy), d2 (Medium)
  history.push({ sentenceId: 'd1', date: days[0], difficulty: 'Easy' });
  history.push({ sentenceId: 'd2', date: days[0], difficulty: 'Medium' });

  // Day -5: d3 (Easy), d4 (Medium), t1 (Medium)
  history.push({ sentenceId: 'd3', date: days[1], difficulty: 'Easy' });
  history.push({ sentenceId: 'd4', date: days[1], difficulty: 'Medium' });
  history.push({ sentenceId: 't1', date: days[1], difficulty: 'Medium' });

  // Day -4: t5 (Hard), b1 (Hard)
  history.push({ sentenceId: 't5', date: days[2], difficulty: 'Hard' });
  history.push({ sentenceId: 'b1', date: days[2], difficulty: 'Hard' });

  // Day -3: d5 (Easy), d6 (Medium), b4 (Hard), s1 (Hard)
  history.push({ sentenceId: 'd5', date: days[3], difficulty: 'Easy' });
  history.push({ sentenceId: 'd6', date: days[3], difficulty: 'Medium' });
  history.push({ sentenceId: 'b4', date: days[3], difficulty: 'Hard' });
  history.push({ sentenceId: 's1', date: days[3], difficulty: 'Hard' });

  // Day -2: d7 (Easy), d8 (Medium), s3 (Medium)
  history.push({ sentenceId: 'd7', date: days[4], difficulty: 'Easy' });
  history.push({ sentenceId: 'd8', date: days[4], difficulty: 'Medium' });
  history.push({ sentenceId: 's3', date: days[4], difficulty: 'Medium' });

  // Day -1: d9 (Easy), t2 (Medium), b2 (Medium), e1 (Medium), i1 (Medium), i4 (Hard)
  history.push({ sentenceId: 'd9', date: days[5], difficulty: 'Easy' });
  history.push({ sentenceId: 't2', date: days[5], difficulty: 'Medium' });
  history.push({ sentenceId: 'b2', date: days[5], difficulty: 'Medium' });
  history.push({ sentenceId: 'e1', date: days[5], difficulty: 'Medium' });
  history.push({ sentenceId: 'i1', date: days[5], difficulty: 'Medium' });
  history.push({ sentenceId: 'i4', date: days[5], difficulty: 'Hard' });

  // Day 0 (today): d10 (Easy), t3 (Medium), b3 (Medium)
  history.push({ sentenceId: 'd10', date: days[6], difficulty: 'Easy' });
  history.push({ sentenceId: 't3', date: days[6], difficulty: 'Medium' });
  history.push({ sentenceId: 'b3', date: days[6], difficulty: 'Medium' });

  return history;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedLevelId, setSelectedLevelId] = useState<EnglishFileLevel | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Voice Synthesis State
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>(() => {
    return localStorage.getItem('selected_english_voice') || '';
  });

  // Load and sync SpeechSynthesis voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        const allVoices = window.speechSynthesis.getVoices();
        // Filter for English voices (e.g., en-US, en-GB, en-AU, etc.)
        const enVoices = allVoices.filter(v => v.lang.toLowerCase().startsWith('en'));
        setVoices(enVoices);

        if (enVoices.length > 0) {
          const saved = localStorage.getItem('selected_english_voice');
          const exists = enVoices.some(v => v.name === saved);
          if (exists && saved) {
            setSelectedVoiceName(saved);
          } else {
            // Find a good default (Google US English, or en-US)
            const defaultVoice = enVoices.find(v => v.name.includes('Google US English') || v.lang === 'en-US') || enVoices[0];
            setSelectedVoiceName(defaultVoice.name);
            localStorage.setItem('selected_english_voice', defaultVoice.name);
          }
        }
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  // Stats State
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem(LOCAL_STATS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.studyHistory || parsed.studyHistory.length === 0) {
          parsed.studyHistory = generateSeedHistory();
        }
        return parsed;
      } catch (e) {
        console.error("Failed to parse user stats", e);
      }
    }
    return {
      streak: 1,
      lastStudyDate: new Date().toDateString(),
      masteredIds: [],
      learningIds: [],
      totalSessions: 0,
      highScore: 0,
      studyHistory: generateSeedHistory()
    };
  });

  const recordStudy = (sentenceId: string, english: string) => {
    const todayStr = new Date().toDateString();
    const wordCount = english.trim().split(/\s+/).length;
    const difficulty = wordCount <= 4 ? 'Easy' : wordCount <= 7 ? 'Medium' : 'Hard';

    setStats(prev => {
      const currentHistory = prev.studyHistory || [];
      const alreadyStudiedToday = currentHistory.some(
        h => h.sentenceId === sentenceId && h.date === todayStr
      );

      if (alreadyStudiedToday) return prev;

      return {
        ...prev,
        studyHistory: [
          ...currentHistory,
          { sentenceId, date: todayStr, difficulty }
        ]
      };
    });
  };

  // Favorites / Custom Bookmarked Sentences State
  const [customFavorites, setCustomFavorites] = useState<Sentence[]>(() => {
    const saved = localStorage.getItem(LOCAL_FAVORITES_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
    return [];
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STATS_KEY, JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(customFavorites));
  }, [customFavorites]);

  // Streak verification logic on mount
  useEffect(() => {
    const todayStr = new Date().toDateString();
    if (stats.lastStudyDate !== todayStr) {
      const lastDate = new Date(stats.lastStudyDate);
      const todayDate = new Date(todayStr);
      const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      setStats(prev => {
        let newStreak = prev.streak;
        if (diffDays === 1) {
          // Studied yesterday, keep streak going or increment when they study today
        } else if (diffDays > 1) {
          // Missed days, reset streak to 1
          newStreak = 1;
        }
        return {
          ...prev,
          lastStudyDate: todayStr,
          streak: newStreak
        };
      });
    }
  }, []);

  // Update streak when user actively performs actions
  const touchStreakAndDate = () => {
    const todayStr = new Date().toDateString();
    setStats(prev => {
      let newStreak = prev.streak;
      if (prev.lastStudyDate !== todayStr) {
        const lastDate = new Date(prev.lastStudyDate);
        const todayDate = new Date(todayStr);
        const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          newStreak += 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }
      }
      return {
        ...prev,
        lastStudyDate: todayStr,
        streak: newStreak
      };
    });
  };

  // Text-to-Speech Pronunciation engine
  const handleSpeak = (text: string, rate: number = 1.0) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any currently playing audio
      const utterance = new SpeechSynthesisUtterance(text);
      
      const allVoices = window.speechSynthesis.getVoices();
      const voice = allVoices.find(v => v.name === selectedVoiceName);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = 'en-US';
      }
      
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
      touchStreakAndDate();

      // Automatically log the study event if it matches a core sentence
      const matched = CORE_SENTENCES.find(s => s.english.toLowerCase() === text.toLowerCase());
      if (matched) {
        recordStudy(matched.id, matched.english);
      }
    } else {
      alert("عذراً، متصفحك لا يدعم خاصية تحويل النص إلى نطق مسموع.");
    }
  };

  // Compile full list of favorites (core bookmarks + custom added ones)
  const fullFavoritesList = useMemo(() => {
    const coreFavorites = CORE_SENTENCES.filter(s => stats.masteredIds.includes(s.id) || stats.learningIds.includes(s.id));
    // Combine core favorites with custom generated saved sentences
    const combined = [...coreFavorites];
    customFavorites.forEach(cf => {
      if (!combined.some(item => item.english.toLowerCase() === cf.english.toLowerCase())) {
        combined.push(cf);
      }
    });
    return combined;
  }, [stats.masteredIds, stats.learningIds, customFavorites]);

  // Handle toggling bookmark state
  const handleToggleBookmark = (id: string, customSentence?: Sentence) => {
    const isCore = CORE_SENTENCES.some(s => s.id === id);
    touchStreakAndDate();

    if (isCore) {
      setStats(prev => {
        const isMastered = prev.masteredIds.includes(id);
        const isLearning = prev.learningIds.includes(id);

        if (isMastered || isLearning) {
          // Remove from bookmarks/favorites
          return {
            ...prev,
            masteredIds: prev.masteredIds.filter(mid => mid !== id),
            learningIds: prev.learningIds.filter(lid => lid !== id)
          };
        } else {
          // Add to learning favorites by default
          return {
            ...prev,
            learningIds: [...prev.learningIds, id]
          };
        }
      });
    } else {
      // Custom AI Generated sentence toggle
      const sToSave = customSentence || customFavorites.find(s => s.id === id);
      if (sToSave) {
        setCustomFavorites(prev => {
          const exists = prev.some(item => item.english.toLowerCase() === sToSave.english.toLowerCase());
          if (exists) {
            return prev.filter(item => item.english.toLowerCase() !== sToSave.english.toLowerCase());
          } else {
            return [...prev, sToSave];
          }
        });
      }
    }
  };

  // Add custom AI generated sentences to favorites
  const handleAddCustomSentence = (sentence: Sentence) => {
    touchStreakAndDate();
    setCustomFavorites(prev => {
      const exists = prev.some(item => item.english.toLowerCase() === sentence.english.toLowerCase());
      if (!exists) {
        return [...prev, sentence];
      }
      return prev;
    });
  };

  const isBookmarked = (id: string) => {
    const isCoreMastered = stats.masteredIds.includes(id);
    const isCoreLearning = stats.learningIds.includes(id);
    const isCustomFav = customFavorites.some(s => s.id === id);
    return isCoreMastered || isCoreLearning || isCustomFav;
  };

  const isCustomSentenceSaved = (english: string) => {
    return customFavorites.some(s => s.english.toLowerCase() === english.toLowerCase());
  };

  const handleSelectCategory = (catId: string) => {
    setSelectedCategoryId(catId);
    setSelectedLevelId(null);
    setActiveTab('cards');
  };

  const handleSelectLevel = (levelId: EnglishFileLevel) => {
    setSelectedLevelId(levelId);
    setSelectedCategoryId(null);
    setActiveTab('cards');
  };

  return (
    <div id="app-wrapper" className="min-h-screen bg-[#f6f8fc] text-slate-900 flex flex-col lg:flex-row-reverse relative overflow-x-hidden">
      
      {/* Google Neural Expressive Aura Background Blurs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[15%] left-[5%] w-[35rem] h-[35rem] rounded-full bg-gradient-to-br from-indigo-500/8 to-purple-500/5 blur-[120px] animate-neural-breath" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-[15%] right-[5%] w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-pink-500/6 to-cyan-500/5 blur-[140px] animate-neural-breath" style={{ animationDelay: '-4s' }}></div>
      </div>

      {/* Mobile Top Navbar */}
      <header id="mobile-header" className="lg:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shrink-0 sticky top-0 z-40 shadow-sm relative z-10">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-500 hover:text-indigo-600 transition"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-orange-500 font-display">توالي {stats.streak} أيام</span>
          <BookOpen className="w-5 h-5 text-indigo-500" />
        </div>
        
        <h1 className="text-base font-bold font-display text-slate-800">Sentence Plus</h1>
      </header>

      {/* Mobile drawer backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40"
        ></div>
      )}

      {/* Sidebar Navigation */}
      <div className={`lg:block ${mobileMenuOpen ? 'fixed right-0 top-0 bottom-0 z-50 w-64 animate-slide-in-right' : 'hidden lg:relative'}`}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSelectedCategoryId(null);
            setSelectedLevelId(null);
            setMobileMenuOpen(false);
          }}
          streak={stats.streak}
          voices={voices}
          selectedVoiceName={selectedVoiceName}
          onVoiceChange={(name) => {
            setSelectedVoiceName(name);
            localStorage.setItem('selected_english_voice', name);
          }}
        />
      </div>

      {/* Main Content Area */}
      <main id="main-content-scroll" className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-5xl mx-auto w-full relative z-10">
        {/* Dynamic component routing based on active tab */}
        {activeTab === 'dashboard' && (
          <Dashboard 
            stats={stats}
            onSelectCategory={handleSelectCategory}
            onSelectLevel={handleSelectLevel}
            onSpeak={handleSpeak}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={isBookmarked}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'cards' && (
          <Flashcards 
            stats={stats}
            initialCategoryId={selectedCategoryId}
            initialLevelId={selectedLevelId}
            onUpdateStats={setStats}
            onSpeak={handleSpeak}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={isBookmarked}
            onRecordStudy={recordStudy}
          />
        )}

        {activeTab === 'quizzes' && (
          <Quizzes 
            stats={stats}
            onUpdateStats={setStats}
            onSpeak={handleSpeak}
            onRecordStudy={recordStudy}
          />
        )}

        {activeTab === 'aiCoach' && (
          <AiCoach 
            stats={stats}
            onSpeak={handleSpeak}
            onAddCustomSentence={handleAddCustomSentence}
            isCustomSentenceSaved={isCustomSentenceSaved}
          />
        )}

        {activeTab === 'favorites' && (
          <Favorites 
            favorites={fullFavoritesList}
            onToggleBookmark={handleToggleBookmark}
            onSpeak={handleSpeak}
          />
        )}
      </main>
    </div>
  );
}
