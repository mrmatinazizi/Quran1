import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Star, CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { quranLessons } from '../data/learnQuran';

const Learn = () => {
  return (
    <div className="space-y-8 pb-12">
      <Helmet>
        <title>آموزش قرآن کریم | قرآن عبدالمتین</title>
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-4">آموزش گام به گام قرآن کریم</h1>
          <p className="text-emerald-50 text-lg max-w-2xl">
            با درس‌های ساده و روان، روخوانی قرآن را از پایه تا پیشرفته بیاموزید.
            این دوره برای مبتدیان طراحی شده تا در کمترین زمان بتوانند قرآن را صحیح بخوانند.
          </p>
        </div>
        <BookOpen className="absolute left-4 bottom-4 w-32 h-32 text-white/10 rotate-12" />
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quranLessons.map((lesson) => (
          <Link 
            to={`/learn/${lesson.id}`} 
            key={lesson.id}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group relative overflow-hidden dark:bg-gray-800 dark:border-gray-700 dark:hover:border-emerald-500"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 dark:bg-emerald-900/20"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-emerald-600 font-bold text-xl border border-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-emerald-400">
                {lesson.id}
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors dark:text-gray-100 dark:group-hover:text-emerald-400">
                {lesson.title.split(':')[1]}
              </h3>
              
              <p className="text-gray-500 text-sm mb-6 line-clamp-2 dark:text-gray-400">
                {lesson.description}
              </p>
              
              <div className="flex items-center text-emerald-600 text-sm font-medium gap-1 dark:text-emerald-400">
                شروع یادگیری
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Learn;
