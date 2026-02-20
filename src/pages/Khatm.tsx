import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Star, Calendar, Clock, ArrowLeft, CheckCircle2 } from 'lucide-react';

const Khatm = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <Helmet>
        <title>ختم قرآن کریم | قرآن عبدالمتین</title>
        <meta name="description" content="فضیلت و روش‌های ختم قرآن کریم" />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden text-center">
        <div className="relative z-10 space-y-6">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold">ختم قرآن کریم</h1>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto leading-relaxed">
            تلاوت کل قرآن کریم، دریایی از نور و برکت است که دل‌ها را زنده و زندگی را سرشار از آرامش می‌کند.
          </p>
        </div>
        
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 0 L100 0 L100 100 Z" fill="white" />
           </svg>
        </div>
      </div>

      {/* Rewards Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 dark:text-gray-100">
          <Star className="w-6 h-6 text-yellow-500 fill-current" />
          فضیلت و ثواب ختم قرآن
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-bold text-lg text-gray-800 mb-3 dark:text-gray-200">استجابت دعا</h3>
            <p className="text-gray-600 leading-relaxed dark:text-gray-400">
              پیامبر اکرم (ص) فرمودند: «هر کس قرآن را ختم کند، دعایی مستجاب نزد خداوند دارد.» هنگام ختم قرآن، رحمت الهی نازل می‌شود و بهترین زمان برای دعا کردن است.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-bold text-lg text-gray-800 mb-3 dark:text-gray-200">شفاعت در قیامت</h3>
            <p className="text-gray-600 leading-relaxed dark:text-gray-400">
              قرآن در روز قیامت برای قاری خود شفاعت می‌کند. خواندن و عمل کردن به قرآن، نوری است که انسان را از تاریکی‌های دنیا و آخرت نجات می‌دهد.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-bold text-lg text-gray-800 mb-3 dark:text-gray-200">آرامش و برکت</h3>
            <p className="text-gray-600 leading-relaxed dark:text-gray-400">
              خانه‌ای که در آن قرآن خوانده شود، محل رفت و آمد فرشتگان می‌شود و شیاطین از آن دور می‌گردند. برکت در رزق و روزی و آرامش روحی از آثار تلاوت مداوم است.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-bold text-lg text-gray-800 mb-3 dark:text-gray-200">درجات بهشت</h3>
            <p className="text-gray-600 leading-relaxed dark:text-gray-400">
              در روایت است که تعداد درجات بهشت به تعداد آیات قرآن است. به قاری قرآن گفته می‌شود: «بخوان و بالا برو»، هر آیه‌ای که می‌خواند یک درجه مقامش بالاتر می‌رود.
            </p>
          </div>
        </div>
      </section>

      {/* Methods Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 dark:text-gray-100">
          <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          برنامه‌های پیشنهادی برای ختم قرآن
        </h2>
        <div className="space-y-4">
          {/* Monthly Plan */}
          <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold dark:bg-indigo-800 dark:text-indigo-300">۱</div>
                <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100">ختم یک ماهه (روزی یک جزء)</h3>
              </div>
              <span className="bg-white text-indigo-600 px-3 py-1 rounded-full text-sm font-medium shadow-sm dark:bg-indigo-900 dark:text-indigo-300">محبوب‌ترین روش</span>
            </div>
            <p className="text-gray-700 mb-4 dark:text-gray-300">
              این روش متداول‌ترین برنامه برای ختم قرآن است، به ویژه در ماه مبارک رمضان.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-xl flex items-center gap-3 dark:bg-gray-800">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">زمان مورد نیاز: حدود ۳۰ تا ۴۵ دقیقه در روز</span>
              </div>
              <div className="bg-white p-3 rounded-xl flex items-center gap-3 dark:bg-gray-800">
                <BookOpen className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">مقدار: ۲۰ صفحه (۴ صفحه بعد از هر نماز)</span>
              </div>
            </div>
          </div>

          {/* 2 Months Plan */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center font-bold dark:bg-gray-700 dark:text-gray-300">۲</div>
              <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100">ختم دو ماهه (روزی نیم جزء)</h3>
            </div>
            <p className="text-gray-600 mb-4 dark:text-gray-400">
              مناسب برای کسانی که مشغله زیادی دارند اما می‌خواهند ارتباط مستمر با قرآن داشته باشند.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-3 dark:bg-gray-700/50">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">زمان مورد نیاز: ۱۵ تا ۲۰ دقیقه در روز</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-3 dark:bg-gray-700/50">
                <BookOpen className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">مقدار: ۱۰ صفحه (۲ صفحه بعد از هر نماز)</span>
              </div>
            </div>
          </div>

          {/* 6 Months Plan */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center font-bold dark:bg-gray-700 dark:text-gray-300">۳</div>
              <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100">ختم آهسته (روزی ۵ صفحه)</h3>
            </div>
            <p className="text-gray-600 mb-4 dark:text-gray-400">
              روشی عالی برای تدبر و تفکر در آیات. با خواندن تنها ۵ صفحه در روز، در حدود ۴ ماه قرآن را ختم می‌کنید.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-3 dark:bg-gray-700/50">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">زمان مورد نیاز: ۱۰ دقیقه در روز</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-3 dark:bg-gray-700/50">
                <BookOpen className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">مقدار: ۱ صفحه بعد از هر نماز</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="sticky bottom-4 z-30">
        <Link 
          to="/quran"
          className="block w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white text-center py-4 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
        >
          <BookOpen className="w-6 h-6" />
          ختم همین الان
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default Khatm;
