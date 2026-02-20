import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Pause, SkipForward, SkipBack, Settings, ChevronRight, ChevronLeft, User, Plus, Minus } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useSurahs } from '../hooks/useQuran';
import { reciters } from '../data/reciters';

const SurahDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { surahs } = useSurahs();
  
  const [surah, setSurah] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const [showStickyHeader, setShowStickyHeader] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReciter, setSelectedReciter] = useState(() => {
    const saved = localStorage.getItem('selectedReciter');
    return saved ? JSON.parse(saved) : reciters[0];
  });
  const [showReciters, setShowReciters] = useState(false);
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('quranFontSize');
    return saved ? parseInt(saved) : 30; // Default 30px
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastScrollY = useRef(0);

  // Save selected reciter to localStorage
  useEffect(() => {
    localStorage.setItem('selectedReciter', JSON.stringify(selectedReciter));
  }, [selectedReciter]);

  // Save font size to localStorage
  useEffect(() => {
    localStorage.setItem('quranFontSize', fontSize.toString());
  }, [fontSize]);

  // Scroll detection for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowStickyHeader(false);
      } else {
        setShowStickyHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parse query params to get initial ayah or reset to 0
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const ayahParam = searchParams.get('ayah');
    if (ayahParam) {
      const ayahIndex = parseInt(ayahParam) - 1;
      if (!isNaN(ayahIndex) && ayahIndex >= 0) {
        setCurrentAyahIndex(ayahIndex);
      } else {
        setCurrentAyahIndex(0);
      }
    } else {
      setCurrentAyahIndex(0);
    }
  }, [location.search, id]);

  const fetchSurah = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${id}/editions/quran-uthmani,fa.makarem,${selectedReciter.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data.code === 200) {
        setSurah({
          info: data.data[0],
          arabic: data.data[0].ayahs,
          persian: data.data[1].ayahs,
          audio: data.data[2].ayahs
        });
      } else {
        throw new Error(data.status || 'Failed to fetch surah data');
      }
    } catch (error) {
      console.error('Error fetching surah:', error);
      setError('متاسفانه در دریافت اطلاعات سوره مشکلی پیش آمد. لطفا اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurah();
    // Reset state when changing surah
    setIsPlaying(false);
    // Removed setCurrentAyahIndex(0) from here as it's handled by the query param effect
  }, [id, selectedReciter]);

  // Effect to handle audio source changes and scrolling
  useEffect(() => {
    let isMounted = true;
    if (loading || !surah || !surah.audio || !surah.audio[currentAyahIndex]) return;

    const loadAudio = async () => {
      // ... audio loading logic ...
      // Stop previous audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audioUrl = surah.audio[currentAyahIndex].audio;
      if (!audioUrl) {
        if (isMounted) setIsPlaying(false);
        return;
      }

      const secureAudioUrl = audioUrl.replace('http:', 'https:');
      const newAudio = new Audio(secureAudioUrl);
      audioRef.current = newAudio;

      newAudio.onended = () => {
        if (isMounted) {
          if (currentAyahIndex < surah.arabic.length - 1) {
            setCurrentAyahIndex(prev => prev + 1);
          } else {
            setIsPlaying(false);
          }
        }
      };

      newAudio.onerror = (e) => {
        console.error('Audio playback error:', e);
        if (isMounted) setIsPlaying(false);
      };

      // If we are supposed to be playing, start playing the new track
      if (isPlaying) {
        try {
          await newAudio.play();
        } catch (err: any) {
          // Ignore interruption errors which happen when skipping quickly
          if (err.name !== 'AbortError') {
             console.error('Failed to play audio:', err);
             if (isMounted) setIsPlaying(false);
          }
        }
      }
    };

    loadAudio();

    // Auto-scroll to current ayah
    setTimeout(() => {
      const element = document.getElementById(`ayah-${currentAyahIndex}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('bg-sky-50');
        element.classList.add('dark:bg-sky-900/40');
        setTimeout(() => {
          element.classList.remove('bg-sky-50');
          element.classList.remove('dark:bg-sky-900/40');
        }, 2000);
      }
    }, 100); // Reduced timeout as loading dependency ensures element existence

    // Save progress to localStorage
    if (surah && surah.info) {
      localStorage.setItem('lastRead', JSON.stringify({
        surahId: surah.info.number,
        surahName: surah.info.name,
        ayahIndex: currentAyahIndex,
        timestamp: Date.now()
      }));
    }

    return () => {
      isMounted = false;
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentAyahIndex, surah, selectedReciter, loading]); // Added loading dependency

  // Separate effect for toggling play/pause on existing audio
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          if (error.name !== 'AbortError') console.error("Play error:", error);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  if (loading) return <div className="text-center py-20">در حال بارگذاری سوره...</div>;
  if (error) return (
    <div className="text-center py-20 space-y-4">
      <div className="text-red-500">{error}</div>
      <button 
        onClick={fetchSurah}
        className="bg-sky-600 text-white px-6 py-2 rounded-xl hover:bg-sky-700 transition-colors"
      >
        تلاش مجدد
      </button>
    </div>
  );
  if (!surah) return <div className="text-center py-20 text-red-500">سوره یافت نشد</div>;

  const currentSurahNumber = surah.info.number;
  const prevSurah = surahs.find(s => s.number === currentSurahNumber - 1);
  const nextSurah = surahs.find(s => s.number === currentSurahNumber + 1);
  
  const currentAyahData = surah.arabic[currentAyahIndex];
  const currentJuz = currentAyahData?.juz;
  const currentHizb = currentAyahData?.hizbQuarter ? Math.ceil(currentAyahData.hizbQuarter / 4) : null;

  return (
    <div className="pb-32 pt-16"> {/* Added padding top for sticky header */}
      <Helmet>
        <title>سوره {surah.info.name} | قرآن عبدالمتین</title>
      </Helmet>

      {/* Sticky Info Header */}
      <div className={`fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-40 transition-transform duration-300 border-b border-gray-100 dark:bg-gray-900/95 dark:border-gray-800 ${showStickyHeader ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 h-14 flex items-center justify-between text-sm md:text-base">
          <div className="font-bold text-gray-800 dark:text-gray-100">سوره {surah.info.name}</div>
          <div className="flex gap-4 text-gray-600 dark:text-gray-400">
            {currentJuz && <span>جزء {currentJuz}</span>}
            {currentHizb && <span className="border-r border-gray-300 dark:border-gray-700 pr-4">حزب {currentHizb}</span>}
          </div>
          <Link to="/quran" className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 text-sm flex items-center gap-1">
            <ArrowRight className="w-4 h-4" />
            <span className="hidden sm:inline">فهرست</span>
          </Link>
        </div>
      </div>

      {/* Main Content Header */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 self-start md:self-center">
          <Link to="/quran" className="flex items-center gap-2 text-gray-500 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400">
            <ArrowRight className="w-5 h-5" />
            بازگشت به فهرست
          </Link>
          
          {/* Font Size Controls */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 dark:bg-gray-800">
            <button 
              onClick={() => setFontSize(prev => Math.min(prev + 2, 60))}
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-600 transition-all dark:text-gray-300 dark:hover:bg-gray-700"
              title="افزایش سایز متن"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setFontSize(prev => Math.max(prev - 2, 16))}
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-600 transition-all dark:text-gray-300 dark:hover:bg-gray-700"
              title="کاهش سایز متن"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-1 dark:text-white">{surah.info.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{surah.info.englishName} • {surah.info.numberOfAyahs} آیه • {surah.info.revelationType === 'Meccan' ? 'مکی' : 'مدنی'}</p>
        </div>
        
        {/* Reciter Selector */}
        <div className="relative">
          <button 
            onClick={() => setShowReciters(!showReciters)}
            className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl hover:border-sky-300 transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:border-sky-500"
          >
            <img src={selectedReciter.image} alt={selectedReciter.name} className="w-8 h-8 rounded-full object-cover" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{selectedReciter.name}</span>
            <Settings className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </button>

          {showReciters && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 max-h-80 overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
              {reciters.map((reciter) => (
                <button
                  key={reciter.id}
                  onClick={() => {
                    setSelectedReciter(reciter);
                    setShowReciters(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-right dark:hover:bg-gray-700 ${
                    selectedReciter.id === reciter.id ? 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <img src={reciter.image} alt={reciter.name} className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-600" />
                  <span className="text-sm font-medium">{reciter.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bismillah */}
      <div className="text-center mb-12">
        <p className="text-3xl font-arabic text-gray-800 dark:text-gray-100" style={{ fontFamily: 'Amiri, serif' }}>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
      </div>

      {/* Ayahs */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {surah.arabic.map((ayah: any, index: number) => (
          <div 
            key={ayah.number} 
            id={`ayah-${index}`}
            className={`p-6 rounded-2xl transition-all ${
              currentAyahIndex === index 
                ? 'bg-sky-50 border-sky-200 shadow-sm dark:bg-sky-900/20 dark:border-sky-800' 
                : 'hover:bg-gray-50 border-transparent dark:hover:bg-gray-800/50'
            } border dark:border-gray-800`}
            onClick={() => {
              setCurrentAyahIndex(index);
              setIsPlaying(true);
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-xs text-gray-500 font-mono dark:bg-gray-800 dark:text-gray-400">
                {ayah.numberInSurah}
              </span>
              <div className="flex gap-2 text-xs text-gray-400 dark:text-gray-500">
                <span>جزء {ayah.juz}</span>
              </div>
            </div>
            
            <p 
              className="text-right leading-loose font-arabic text-gray-800 mb-6 transition-all duration-300 dark:text-gray-100" 
              style={{ fontFamily: 'Amiri, serif', fontSize: `${fontSize}px` }}
            >
              {ayah.text.replace(/^بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\s*/, '')}
            </p>
            
            <p 
              className="text-right text-gray-600 leading-relaxed font-light transition-all duration-300 dark:text-gray-400"
              style={{ fontSize: `${fontSize * 0.6}px` }}
            >
              {surah.persian[index].text}
            </p>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="max-w-4xl mx-auto mt-12 flex justify-between gap-4">
        {prevSurah ? (
          <Link 
            to={`/quran/${prevSurah.number}`}
            className="flex-1 bg-white border border-gray-200 p-4 rounded-xl hover:border-sky-300 hover:shadow-md transition-all flex items-center gap-3 group dark:bg-gray-800 dark:border-gray-700 dark:hover:border-sky-500"
          >
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-sky-600 dark:text-gray-500 dark:group-hover:text-sky-400" />
            <div className="text-right">
              <span className="text-xs text-gray-500 block dark:text-gray-400">سوره قبل</span>
              <span className="font-bold text-gray-800 group-hover:text-sky-600 dark:text-gray-200 dark:group-hover:text-sky-400">{prevSurah.name}</span>
            </div>
          </Link>
        ) : <div className="flex-1"></div>}

        {nextSurah ? (
          <Link 
            to={`/quran/${nextSurah.number}`}
            className="flex-1 bg-white border border-gray-200 p-4 rounded-xl hover:border-sky-300 hover:shadow-md transition-all flex items-center justify-end gap-3 group dark:bg-gray-800 dark:border-gray-700 dark:hover:border-sky-500"
          >
            <div className="text-left">
              <span className="text-xs text-gray-500 block dark:text-gray-400">سوره بعد</span>
              <span className="font-bold text-gray-800 group-hover:text-sky-600 dark:text-gray-200 dark:group-hover:text-sky-400">{nextSurah.name}</span>
            </div>
            <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-sky-600 dark:text-gray-500 dark:group-hover:text-sky-400" />
          </Link>
        ) : <div className="flex-1"></div>}
      </div>

      {/* Sticky Audio Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50 dark:bg-gray-900 dark:border-gray-800">
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-3">
             <img src={selectedReciter.image} alt={selectedReciter.name} className="w-10 h-10 rounded-full object-cover border border-gray-200 hidden md:block dark:border-gray-700" />
             <div className="text-sm hidden md:block">
               <p className="font-bold text-gray-800 dark:text-gray-200">سوره {surah.info.name}</p>
               <p className="text-gray-500 text-xs dark:text-gray-400">{selectedReciter.name}</p>
             </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentAyahIndex(prev => Math.max(0, prev - 1))}
              className="p-2 text-gray-400 hover:text-sky-600 dark:hover:text-sky-400"
            >
              <SkipForward className="w-6 h-6 rotate-180" />
            </button>
            
            <button 
              onClick={togglePlay}
              className="w-12 h-12 bg-sky-600 text-white rounded-full flex items-center justify-center hover:bg-sky-700 shadow-lg transition-transform hover:scale-105 dark:bg-sky-500 dark:hover:bg-sky-600"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>

            <button 
              onClick={() => setCurrentAyahIndex(prev => Math.min(surah.arabic.length - 1, prev + 1))}
              className="p-2 text-gray-400 hover:text-sky-600 dark:hover:text-sky-400"
            >
              <SkipBack className="w-6 h-6 rotate-180" />
            </button>
          </div>

          <div className="w-1/3 hidden md:block">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
              <div 
                className="h-full bg-sky-600 transition-all duration-300 dark:bg-sky-500" 
                style={{ width: `${((currentAyahIndex + 1) / surah.arabic.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurahDetail;
