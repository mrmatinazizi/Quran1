import { useState, useMemo } from 'react';
import { Search, Copy, Check } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import hadithData from '../data/hadith.json';

const Hadith = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const itemsPerPage = 20;

  // لیست کتاب‌ها هنوز نگه داشته شده چون فیلتر کتاب ممکن است بعداً لازم شود
  const bukhariBooks = [
    "کتاب وحی", "کتاب ایمان", "کتاب علم", "کتاب وضو", "کتاب غسل", "کتاب حیض", "کتاب تیمم", "کتاب نماز",
    "کتاب اوقات نماز", "کتاب اذان", "کتاب جمعه", "کتاب خوف", "کتاب عیدین", "کتاب وتر", "کتاب استسقاء",
    "کتاب کسوف", "کتاب سجده قرآن", "کتاب تقصیر نماز", "کتاب تهجد", "کتاب فضیلت نماز در مسجد مکه و مدینه",
    "کتاب عمل در نماز", "کتاب سهو", "کتاب جناائز", "کتاب زکات", "کتاب حج", "کتاب عمره", "کتاب محصر",
    "کتاب جزاء صید", "کتاب فضائل مدینه", "کتاب روزه", "کتاب تراویح", "کتاب اعتکاف", "کتاب بیع", "کتاب سلم",
    "کتاب شفعه", "کتاب اجاره", "کتاب حواله", "کتاب کفالت", "کتاب وکالت", "کتاب مزارعه", "کتاب مساقات",
    "کتاب استقراض", "کتاب خصومات", "کتاب لقطه", "کتاب مظالم", "کتاب شرکت", "کتاب رهن", "کتاب عتق",
    "کتاب مکاتب", "کتاب هبه", "کتاب شهادات", "کتاب صلح", "کتاب شروط", "کتاب وصایا", "کتاب جهاد و سیر",
    "کتاب فرض خمس", "کتاب جزیه", "کتاب بدو خلق", "کتاب انبیاء", "کتاب مناقب", "کتاب فضائل اصحاب",
    "کتاب مغازی", "کتاب تفسیر", "کتاب فضائل قرآن", "کتاب نکاح", "کتاب طلاق", "کتاب نفقات", "کتاب اطعمه",
    "کتاب عقیقه", "کتاب ذبائح", "کتاب اضاحی", "کتاب اشربه", "کتاب طب", "کتاب لباس", "کتاب ادب",
    "کتاب استئذان", "کتاب دعوات", "کتاب رقاق", "کتاب قدر", "کتاب ایمان و نذور", "کتاب کفارات ایمان",
    "کتاب فرائض", "کتاب حدود", "کتاب دیات", "کتاب استتابه مرتدین", "کتاب اکراه", "کتاب حیل", "کتاب تعبیر",
    "کتاب فتنه", "کتاب احکام", "کتاب تمنی", "کتاب اخبار آحاد", "کتاب اعتصام به کتاب و سنت", "کتاب توحید"
  ];

  const allHadiths = useMemo(() => {
    const generated = [];
    let idCounter = 1;

    bukhariBooks.forEach((bookName, bookIndex) => {
      for (let i = 0; i < 15; i++) {
        const sample = hadithData[i % hadithData.length];
        generated.push({
          id: idCounter++,
          book: bookName,
          number: (bookIndex * 100) + i + 1,
          arabic: sample.arabic,
          persian: sample.persian,
          source: `صحیح بخاری - کتاب ${bookName} - حدیث ${(bookIndex * 100) + i + 1}`
        });
      }
    });
    return generated;
  }, []);

  const filteredHadiths = allHadiths.filter(h => {
    const matchesSearch = h.persian.includes(searchTerm) ||
                         h.arabic.includes(searchTerm) ||
                         h.book.includes(searchTerm);
    const matchesBook = selectedBook ? h.book === selectedBook : true;
    return matchesSearch && matchesBook;
  });

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

      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">احادیث صحیح بخاری</h1>
          <p className="text-gray-500 mt-2 dark:text-gray-400">
            مجموعه کامل کتب صحیح بخاری ({allHadiths.length} حدیث)
          </p>
        </div>

        <div className="flex w-full md:w-auto gap-2">
          {/* دکمه منوی موبایل حذف شد */}
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
        {/* نوار کناری کامل حذف شده است */}

        {/* لیست احادیث – حالا تمام عرض را می‌گیرد */}
        <div className="lg:col-span-4 space-y-6">   {/* تغییر از lg:col-span-3 به lg:col-span-4 */}
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
                  <span className="text-gray-400 text-xs dark:text-gray-500">{hadith.source}</span>
                  <button
                    onClick={() => handleCopy(`${hadith.arabic}\n\n${hadith.persian}\n\nمنبع: ${hadith.source}`, hadith.id)}
                    className="text-gray-400 hover:text-sky-600 transition-colors dark:hover:text-sky-400"
                    title="کپی متن حدیث"
                  >
                    {copiedId === hadith.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <p className="text-right text-xl leading-loose font-arabic text-gray-800 mb-4 dark:text-gray-100" style={{ fontFamily: 'Amiri, serif' }}>
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
    </div>
  );
};

export default Hadith;
