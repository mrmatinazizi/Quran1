import { useState, useEffect, useMemo } from 'react';
import { BookOpen, Moon, Sun, ArrowLeft, Bookmark, GraduationCap, CheckCircle2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { shortVerses } from '../data/shortVerses';
import hadithData from '../data/hadith.json';
import dhikrData from '../data/dhikr.json';
import { juzData } from '../data/quranMeta';

const Home = () => {
  const [randomVerse, setRandomVerse] = useState<any>(null);
  const [lastRead, setLastRead] = useState<any>(null);
  const [juzOfDay, setJuzOfDay] = useState<any>(null);
  const [hadithOfDay, setHadithOfDay] = useState<any>(null);
  const [dhikrOfDay, setDhikrOfDay] = useState<any>(null);

  useEffect(() => {
    // 1. Random Verse (changes on every visit)
    const randomIndex = Math.floor(Math.random() * shortVerses.length);
    setRandomVerse(shortVerses[randomIndex]);

    // 2. Last Read from localStorage
    const savedLastRead = localStorage.getItem('lastRead');
    if (savedLastRead) {
      setLastRead(JSON.parse(savedLastRead));
    }

    // 3. Juz of the Day (based on day of month)
    const today = new Date();
    const dayOfMonth = today.getDate();
    // Simple mapping: Day 1 -> Juz 1, ..., Day 30 -> Juz 30, Day 31 -> Juz 1
    const juzId = (dayOfMonth % 30) || 30;
    const foundJuz = juzData.find(j => j.id === juzId);
    setJuzOfDay(foundJuz);

    // 4. Hadith & Dhikr of the Day (seeded by date string YYYY-MM-DD)
    const dateString = today.toISOString().split('T')[0];
    const seed = dateString.split('-').reduce((acc, val) => acc + parseInt(val), 0);
    
    // Simple seeded random function
    const seededRandom = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    const hadithIndex = Math.floor(seededRandom(seed) * hadithData.length);
    setHadithOfDay(hadithData[hadithIndex % hadithData.length]);

    const dhikrIndex = Math.floor(seededRandom(seed + 1) * dhikrData.length);
    setDhikrOfDay(dhikrData[dhikrIndex % dhikrData.length]);

  }, []);

  return (
    <div className="space-y-12">
      <Helmet>
        <title>قرآن عبدالمتین | صفحه اصلی</title>
        <meta name="description" content="وبسایت جامع قرآن کریم، احادیث صحیح بخاری و ذکرها و دعاها" />
      </Helmet>

      {/* Hero Section - Random Short Verse */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 to-blue-700 text-white shadow-xl p-8 md:p-12">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            قرآن کریم، نور هدایت <br /> و آرامش دل‌ها
          </h1>
          
          {randomVerse ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-3xl border border-white/20">
              <p className="text-xl md:text-2xl font-arabic mb-4 text-right leading-loose" style={{ fontFamily: 'Amiri, serif' }}>
                {randomVerse.arabic}
              </p>
              <p className="text-lg text-sky-100 mb-2 font-light">
                {randomVerse.persian}
              </p>
              <div className="flex justify-between items-center text-sm text-sky-200 mt-4 border-t border-white/10 pt-4">
                <span>سوره {randomVerse.surah} - آیه {randomVerse.ayah}</span>
              </div>
            </div>
          ) : (
            <div className="animate-pulse h-24 bg-white/20 rounded-xl w-full max-w-2xl"></div>
          )}

          <div className="mt-8 flex gap-4">
            <Link to="/quran" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-sky-50 transition-colors shadow-lg">
              شروع قرائت
            </Link>
            <Link to="/hadith" className="bg-blue-600/50 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600/70 transition-colors border border-white/20">
              احادیث
            </Link>
          </div>
        </div>
        
        {/* Decorative Background Pattern */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 0 L100 0 L100 100 Z" fill="white" />
           </svg>
        </div>
      </section>

      {/* Quick Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Last Read Card */}
        <Link to={lastRead ? `/quran/${lastRead.surahId}?ayah=${lastRead.ayahIndex + 1}` : '/quran'}>
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all h-full dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <Bookmark className="w-6 h-6" />
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-300 dark:text-gray-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1 dark:text-gray-100">ادامه قرائت</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {lastRead ? `سوره ${lastRead.surahName} - آیه ${lastRead.ayahIndex + 1}` : 'هنوز قرائتی ثبت نشده'}
            </p>
          </motion.div>
        </Link>

        {/* Juz of the Day Card */}
        <Link to={juzOfDay ? `/quran/${juzOfDay.start.surah}?ayah=${juzOfDay.start.ayah}` : '/quran'}>
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all h-full dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-xl text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                <Sun className="w-6 h-6" />
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-300 dark:text-gray-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1 dark:text-gray-100">جزء امروز</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {juzOfDay ? `${juzOfDay.name} (روز ${new Date().getDate()} ماه)` : 'جزء ۳۰'}
            </p>
          </motion.div>
        </Link>

        {/* Hadith of the Day Card */}
        <Link to="/hadith">
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all h-full dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-xl text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-300 dark:text-gray-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1 dark:text-gray-100">حدیث روز</h3>
            <p className="text-sm text-gray-500 line-clamp-2 dark:text-gray-400">
              {hadithOfDay ? hadithOfDay.persian : 'از صحیح بخاری'}
            </p>
          </motion.div>
        </Link>

        {/* Dhikr of the Day Card */}
        <Link to="/dhikr">
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all h-full dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <Moon className="w-6 h-6" />
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-300 dark:text-gray-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1 dark:text-gray-100">ذکر روز</h3>
            <p className="text-sm text-gray-500 line-clamp-2 dark:text-gray-400">
              {dhikrOfDay ? dhikrOfDay.arabic : 'سبحان الله'}
            </p>
          </motion.div>
        </Link>

        {/* Learn Quran Card */}
        <Link to="/learn" className="md:col-span-2 lg:col-span-2">
          <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden h-full flex items-center justify-between">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">یادگیری قرآن کریم</h3>
              </div>
              <p className="text-emerald-50 max-w-md text-sm">
                آموزش گام به گام روخوانی قرآن از پایه.
              </p>
            </div>
            <div className="relative z-10 bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </div>
            <BookOpen className="absolute -left-6 -bottom-6 w-32 h-32 text-white/10 rotate-12" />
          </motion.div>
        </Link>

        {/* Khatm Quran Card */}
        <Link to="/khatm" className="md:col-span-2 lg:col-span-2">
          <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden h-full flex items-center justify-between">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">ختم قرآن کریم</h3>
              </div>
              <p className="text-indigo-50 max-w-md text-sm">
                فضیلت ختم قرآن و برنامه‌های عملی برای آن.
              </p>
            </div>
            <div className="relative z-10 bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </div>
            <Star className="absolute -left-6 -bottom-6 w-32 h-32 text-white/10 rotate-12" />
          </motion.div>
        </Link>
      </section>

      {/* Popular Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">محبوب‌ترین‌ها</h2>
          <Link to="/quran" className="text-sky-600 text-sm hover:underline dark:text-sky-400">مشاهده همه</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'سوره یاسین', desc: 'قلب قرآن', number: 36 },
            { name: 'سوره الرحمن', desc: 'عروس قرآن', number: 55 },
            { name: 'سوره ملک', desc: 'نجات دهنده از عذاب قبر', number: 67 },
            { name: 'سوره کهف', desc: 'نور بین دو جمعه', number: 18 },
            { name: 'سوره واقعه', desc: 'رزق و روزی', number: 56 },
            { name: 'آیت الکرسی', desc: 'عظیم‌ترین آیه', number: 2 },
          ].map((item, i) => (
            <Link to={`/quran/${item.number}`} key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-sky-200 hover:shadow-sm transition-all dark:bg-gray-800 dark:border-gray-700 dark:hover:border-sky-500">
              <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center font-bold text-sm dark:bg-sky-900/30 dark:text-sky-300">
                {item.number}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100">{item.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
