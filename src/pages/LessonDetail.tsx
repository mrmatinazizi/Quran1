import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, ChevronLeft, ChevronRight, BookOpen, Volume2, Play, Pause } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { quranLessons } from '../data/learnQuran';
import { useState, useEffect } from 'react';

const LessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lessonId = parseInt(id || '1');
  const lesson = quranLessons.find(l => l.id === lessonId);
  
  const nextLesson = quranLessons.find(l => l.id === lessonId + 1);
  const prevLesson = quranLessons.find(l => l.id === lessonId - 1);

  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSynthesisSupported, setSpeechSynthesisSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSynthesisSupported(true);
      
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      loadVoices();
      
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  // Stop audio/speech when leaving or changing lesson
  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [lessonId]);

  const handlePlayExplanation = () => {
    if (!lesson) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    // Construct the text to read
    const textToRead = `
      ${lesson.title}.
      ${lesson.description}.
      ${lesson.content.map(block => {
        if (block.type === 'text') return block.text;
        if (block.type === 'list') return block.items.map((i: any) => `${i.title}. ${i.desc}`).join('. ');
        return '';
      }).join('. ')}
    `;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    
    // Try to find a Persian voice
    const persianVoice = voices.find(v => v.lang === 'fa-IR' || v.lang.includes('fa'));
    if (persianVoice) {
      utterance.voice = persianVoice;
    }
    
    utterance.lang = 'fa-IR'; // Persian
    utterance.rate = 0.9; // Slightly slower for teaching
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = (e) => {
      console.error("TTS Error:", e);
      setIsPlaying(false);
    };

    window.speechSynthesis.cancel(); // Cancel any previous
    window.speechSynthesis.speak(utterance);
  };

  if (!lesson) return <div className="text-center py-20">درس یافت نشد</div>;

  return (
    <div className="max-w-3xl mx-auto pb-24">
      <Helmet>
        <title>{lesson.title} | آموزش قرآن</title>
      </Helmet>

      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-8">
        <Link to="/learn" className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors dark:text-gray-400 dark:hover:text-emerald-400">
          <ArrowRight className="w-5 h-5" />
          بازگشت به فهرست
        </Link>
        <div className="text-sm text-gray-400 dark:text-gray-500">
          درس {lesson.id} از {quranLessons.length}
        </div>
      </div>

      {/* Lesson Content */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <div className="bg-emerald-50 p-8 text-center border-b border-emerald-100 relative dark:bg-emerald-900/20 dark:border-emerald-800">
          <h1 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-2 dark:text-emerald-300">{lesson.title}</h1>
          <p className="text-emerald-600 mb-6 dark:text-emerald-400">{lesson.description}</p>
        </div>

        <div className="p-8 space-y-8">
          {lesson.content.map((block: any, index: number) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              {block.type === 'text' && (
                <p className="text-lg text-gray-700 leading-loose text-justify dark:text-gray-300">
                  {block.text}
                </p>
              )}

              {block.type === 'grid' && (
                <div className="grid grid-cols-4 md:grid-cols-7 gap-3 mt-4">
                  {block.items.map((item: any, i: number) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-3 text-center hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-default border border-gray-100 group dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-300">
                      <div className="text-2xl font-arabic mb-1 group-hover:scale-110 transition-transform">{item.char}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{item.name}</div>
                    </div>
                  ))}
                </div>
              )}

              {block.type === 'list' && (
                <div className="grid gap-4 mt-4">
                  {block.items.map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:hover:border-emerald-500">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl font-arabic text-emerald-600 shadow-sm shrink-0 dark:bg-gray-600 dark:text-emerald-400">
                        {item.example.split(' ')[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-gray-200">{item.title}</h4>
                        <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">{item.desc}</p>
                        <p className="text-xs text-emerald-600 mt-1 dir-ltr text-right font-mono dark:text-emerald-400">{item.example}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {block.type === 'practice' && (
                <div className="mt-6 bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-800">
                  <h3 className="font-bold text-emerald-800 mb-4 flex items-center gap-2 dark:text-emerald-300">
                    <BookOpen className="w-5 h-5" />
                    تمرین کنید
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {block.words.map((word: any, i: number) => (
                      <div key={i} className="bg-white p-4 rounded-xl text-center shadow-sm hover:shadow-md transition-all cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600" onClick={() => {
                         // Simple word pronunciation if clicked (using TTS for now as fallback)
                         const u = new SpeechSynthesisUtterance(word.word);
                         u.lang = 'ar-SA';
                         window.speechSynthesis.speak(u);
                      }}>
                        <div className="text-3xl font-arabic text-gray-800 mb-2 dark:text-gray-100">{word.word}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{word.reading}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between gap-4 mt-8">
        {prevLesson ? (
          <button 
            onClick={() => navigate(`/learn/${prevLesson.id}`)}
            className="flex-1 bg-white border border-gray-200 p-4 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all flex items-center gap-3 group text-right dark:bg-gray-800 dark:border-gray-700 dark:hover:border-emerald-500"
          >
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 dark:text-gray-500 dark:group-hover:text-emerald-400" />
            <div>
              <span className="text-xs text-gray-500 block dark:text-gray-400">درس قبل</span>
              <span className="font-bold text-gray-800 group-hover:text-emerald-600 text-sm md:text-base dark:text-gray-200 dark:group-hover:text-emerald-400">
                {prevLesson.title.split(':')[1]}
              </span>
            </div>
          </button>
        ) : <div className="flex-1"></div>}

        {nextLesson ? (
          <button 
            onClick={() => navigate(`/learn/${nextLesson.id}`)}
            className="flex-1 bg-white border border-gray-200 p-4 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all flex items-center justify-end gap-3 group text-left dark:bg-gray-800 dark:border-gray-700 dark:hover:border-emerald-500"
          >
            <div>
              <span className="text-xs text-gray-500 block dark:text-gray-400">درس بعد</span>
              <span className="font-bold text-gray-800 group-hover:text-emerald-600 text-sm md:text-base dark:text-gray-200 dark:group-hover:text-emerald-400">
                {nextLesson.title.split(':')[1]}
              </span>
            </div>
            <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 dark:text-gray-500 dark:group-hover:text-emerald-400" />
          </button>
        ) : (
          <Link 
            to="/learn"
            className="flex-1 bg-emerald-600 text-white p-4 rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 dark:shadow-none"
          >
            <CheckCircle className="w-5 h-5" />
            پایان دوره
          </Link>
        )}
      </div>
    </div>
  );
};

export default LessonDetail;
