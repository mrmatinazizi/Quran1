import { Heart } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Helmet>
        <title>درباره ما | قرآن عبدالمتین</title>
      </Helmet>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 text-center space-y-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6 dark:bg-sky-900/30">
          <Heart className="w-10 h-10 text-sky-600 fill-current dark:text-sky-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">درباره قرآن عبدالمتین</h1>
        
        <div className="space-y-6 text-gray-600 leading-loose text-lg font-light dark:text-gray-300">
          <p>
            قرآن عبدالمتین یک پروژه کاملاً رایگان و غیرتجاری است که برای همیشه در اختیار همه مسلمانان و علاقهمندان قرار میگیرد.
          </p>
          <p>
            هدف ما آسانسازی دسترسی به کلام الله، سنت پیامبر اکرم (ص)، ذکرها و دعاهای ناب اسلام به صورت دیجیتال، زیبا و بدون هیچ محدودیتی است.
          </p>
          <p>
            این وبسایت هیچ تبلیغی ندارد و هیچگاه پولی نخواهد شد.
          </p>
          <p className="font-medium text-gray-800 dark:text-gray-100">
            این برنامه توسط متین عزیزی ساخته شده است.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            تمام محتوا با نهایت دقت از منابع معتبر استخراج شده است.
          </p>
        </div>

        <div className="pt-8 border-t border-gray-100 flex justify-center gap-6 dark:border-gray-700">
          <a href="#" className="text-gray-400 hover:text-sky-600 transition-colors dark:hover:text-sky-400">تماس با ما</a>
          <a href="#" className="text-gray-400 hover:text-sky-600 transition-colors dark:hover:text-sky-400">گزارش خطا</a>
        </div>
      </div>
    </div>
  );
};

export default About;
