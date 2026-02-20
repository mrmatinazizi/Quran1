import { useSurahs } from '../hooks/useQuran';
import { Search, BookOpen, Layers, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { juzData, hizbData } from '../data/quranMeta';

const Quran = () => {
  const { surahs, loading, error } = useSurahs();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'surah' | 'juz' | 'hizb'>('surah');

  const filteredSurahs = surahs.filter(surah => 
    surah.name.includes(searchTerm) || 
    surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(surah.number).includes(searchTerm)
  );

  const filteredJuz = juzData.filter(juz => 
    juz.name.includes(searchTerm) || 
    String(juz.id).includes(searchTerm)
  );

  const filteredHizb = hizbData.filter(hizb => 
    hizb.name.includes(searchTerm) || 
    String(hizb.id).includes(searchTerm)
  );

  if (loading) return <div className="text-center py-20">در حال بارگذاری سوره‌ها...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="space-y-8">
      <Helmet>
        <title>فهرست قرآن کریم | قرآن عبدالمتین</title>
      </Helmet>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">قرآن کریم</h1>
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="جستجو..."
            className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-sky-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('surah')}
          className={`px-6 py-3 flex items-center gap-2 font-medium transition-colors border-b-2 ${
            activeTab === 'surah' ? 'border-sky-600 text-sky-600 dark:text-sky-400 dark:border-sky-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          سوره
        </button>
        <button
          onClick={() => setActiveTab('juz')}
          className={`px-6 py-3 flex items-center gap-2 font-medium transition-colors border-b-2 ${
            activeTab === 'juz' ? 'border-sky-600 text-sky-600 dark:text-sky-400 dark:border-sky-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          <Layers className="w-5 h-5" />
          جزء
        </button>
        <button
          onClick={() => setActiveTab('hizb')}
          className={`px-6 py-3 flex items-center gap-2 font-medium transition-colors border-b-2 ${
            activeTab === 'hizb' ? 'border-sky-600 text-sky-600 dark:text-sky-400 dark:border-sky-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          حزب
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'surah' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
            {filteredSurahs.map((surah) => (
              <Link
                to={`/quran/${surah.number}`}
                key={surah.number}
                className="bg-white p-4 rounded-xl border border-gray-100 hover:border-sky-300 hover:shadow-md transition-all group flex items-center justify-between dark:bg-gray-800 dark:border-gray-700 dark:hover:border-sky-500"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 group-hover:bg-sky-50 text-gray-400 group-hover:text-sky-600 rounded-lg flex items-center justify-center font-bold text-lg transition-colors relative dark:bg-gray-700 dark:text-gray-300 dark:group-hover:bg-sky-900/30 dark:group-hover:text-sky-400">
                    <span className="absolute text-[10px] top-1 right-1 opacity-50">#{surah.number}</span>
                    {surah.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg dark:text-gray-100">{surah.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{surah.englishNameTranslation}</p>
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-xs font-medium text-gray-400 block dark:text-gray-500">{surah.revelationType === 'Meccan' ? 'مکی' : 'مدنی'}</span>
                  <span className="text-xs text-gray-400 block dark:text-gray-500">{surah.numberOfAyahs} آیه</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'juz' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
            {filteredJuz.map((juz) => (
              <Link
                to={`/quran/${juz.start.surah}?ayah=${juz.start.ayah}`}
                key={juz.id}
                className="bg-white p-6 rounded-xl border border-gray-100 hover:border-sky-300 hover:shadow-md transition-all group flex items-center justify-between dark:bg-gray-800 dark:border-gray-700 dark:hover:border-sky-500"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center font-bold text-lg dark:bg-sky-900/30 dark:text-sky-400">
                    {juz.id}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg dark:text-gray-100">{juz.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      شروع: سوره {surahs[juz.start.surah - 1]?.name} آیه {juz.start.ayah}
                    </p>
                  </div>
                </div>
                <Layers className="w-5 h-5 text-gray-300 group-hover:text-sky-500 transition-colors dark:text-gray-600 dark:group-hover:text-sky-400" />
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'hizb' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
            {filteredHizb.map((hizb) => (
              <Link
                to={`/quran/${hizb.start.surah}?ayah=${hizb.start.ayah}`}
                key={hizb.id}
                className="bg-white p-6 rounded-xl border border-gray-100 hover:border-sky-300 hover:shadow-md transition-all group flex items-center justify-between dark:bg-gray-800 dark:border-gray-700 dark:hover:border-sky-500"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-bold text-lg dark:bg-emerald-900/30 dark:text-emerald-400">
                    {hizb.id}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg dark:text-gray-100">{hizb.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      شروع: سوره {surahs[hizb.start.surah - 1]?.name} آیه {hizb.start.ayah}
                    </p>
                  </div>
                </div>
                <Bookmark className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors dark:text-gray-600 dark:group-hover:text-emerald-400" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quran;
