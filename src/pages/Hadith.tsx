import { useState, useMemo } from 'react';
import { Search, Copy, Check } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import hadithData from '../data/hadith.json';

const Hadith = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const itemsPerPage = 20;

  // لیست کتاب‌ها دیگر لازم نیست → حذف شده
  // const bukhariBooks = [...]   ← حذف کامل

  // تولید احادیث (بدون وابستگی به انتخاب کتاب)
  const allHadiths = useMemo(() => {
    const generated = [];
    let idCounter = 1;

    // چون دیگر فیلتر بر اساس کتاب نداریم، فقط نمونه‌ها را تکرار می‌کنیم
    for (let i = 0; i < 300; i++) {   // تعداد را می‌توانی تغییر دهی
      const sample = hadithData[i % hadithData.length];
      generated.push({
        id: idCounter++,
        book: sample.book || 'صحیح بخاری',   // اگر در json کتاب داشته باشد
        number: i + 1,
        arabic: sample.arabic,
        persian: sample.persian,
        source: sample.source || `صحیح بخاری - حدیث ${i + 1}`
      });
    }
    return generated;
  }, []);

  // فیلتر فقط بر اساس جستجو
  const filteredHadiths = allHadiths.filter(h =>
    h.persian.includes(searchTerm) ||
    h.arabic.includes(searchTerm) ||
    (h.book && h.book.includes(searchTerm)) ||
    (h.source && h.source.includes(searchTerm))
  );

  const totalPages = Math.ceil(filteredHadiths.length / itemsPerPage);
  const currentHadiths = filteredHadiths.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>احادیث صحیح بخاری | قرآن عبدالمتین</title>
      </Helmet>

      {/* Header & Search – بدون دکمه منو */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            احادیث صحیح بخاری
          </h1>
          <p className="text-gray-500 mt-2 dark:text-gray-400">
            مجموعه احادیث ({allHadiths.length} حدیث)
          </p>
        </div>

        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="جستجو در احادیث..."
            className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-sky-900"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* لیست احادیث – تمام عرض صفحه */}
      <div className="space-y-6">
        {currentHadiths.map((hadith) => (
          <div
            key={hadith.id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex justify-between items-start mb-4 border-b border-gray-50 pb-4 dark:border-gray-700">
              <span className="text-sky-600 font-medium text-sm bg-sky-50 px-3 py-1 rounded-full dark:bg-sky-900/30 dark:text-sky-400">
                {hadith.book}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-xs dark:text-gray-500">
                  {hadith.source}
                </span>
                <button
                  onClick={() =>
                    handleCopy(
                      `${hadith.arabic}\n\n${hadith.persian}\n\nمنبع: ${hadith.source}`,
                      hadith.id
                    )
                  }
                  className="text-gray-400 hover:text-sky-600 transition-colors dark:hover:text-sky-400"
                  title="کپی متن حدیث"
                >
                  {copiedId === hadith.id ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <p
              className="text-right text-xl leading-loose font-arabic text-gray-800 mb-4 dark:text-gray-100"
              style={{ fontFamily: 'Amiri, serif' }}
            >
              {hadith.arabic}
            </p>

            <p className="text-right text-gray-600 leading-relaxed font-light border-r-4 border-sky-200 pr-4 dark:text-gray-300 dark:border-sky-800">
              {hadith.persian}
            </p>
          </div>
        ))}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8 pb-8">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-300"
            >
              قبلی
            </button>
            <span className="px-4 py-2 text-gray-600 dir-ltr dark:text-gray-400">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-300"
            >
              بعدی
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hadith;
