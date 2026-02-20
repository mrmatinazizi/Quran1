import { useState } from 'react';
import dhikrsData from '../data/dhikr.json';
import { Share2, Copy, Check } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Dhikr = () => {
  const [activeCategory, setActiveCategory] = useState('همه');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  
  const categories = ['همه', ...Array.from(new Set(dhikrsData.map(d => d.category)))];
  
  const filteredDhikrs = activeCategory === 'همه' 
    ? dhikrsData 
    : dhikrsData.filter(d => d.category === activeCategory);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>ذکرها و دعاها | قرآن عبدالمتین</title>
      </Helmet>
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">ذکرها و دعاها</h1>
        <p className="text-gray-500 max-w-2xl mx-auto dark:text-gray-400">مجموعه‌ای از بهترین ذکرها و دعاهای صحیح برای آرامش دل و نزدیکی به خداوند</p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat 
                ? 'bg-sky-600 text-white shadow-md dark:bg-sky-500' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dhikr Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDhikrs.map((dhikr) => (
          <div key={dhikr.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col h-full dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-sky-50 text-sky-600 text-xs px-2 py-1 rounded-md font-medium dark:bg-sky-900/30 dark:text-sky-400">{dhikr.category}</span>
              <div className="flex gap-2 text-gray-400">
                <button 
                  onClick={() => handleCopy(`${dhikr.arabic}\n\n${dhikr.persian}\n\n${dhikr.description}`, dhikr.id)}
                  className="hover:text-sky-600 transition-colors dark:hover:text-sky-400"
                  title="کپی متن"
                >
                  {copiedId === dhikr.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="flex-grow flex flex-col justify-center items-center text-center space-y-6 my-4">
              <p className="text-2xl font-arabic leading-loose text-gray-800 dark:text-gray-100" style={{ fontFamily: 'Amiri, serif' }}>
                {dhikr.arabic}
              </p>
              <p className="text-gray-600 font-light dark:text-gray-300">
                {dhikr.persian}
              </p>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-50 text-xs text-gray-400 text-center dark:border-gray-700 dark:text-gray-500">
              {dhikr.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dhikr;
