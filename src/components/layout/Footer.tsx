import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-800">قرآن عبدالمتین</span>
            <span className="text-sm text-gray-500">| رایگان برای همیشه</span>
          </div>
          
          <div className="text-sm text-gray-500 text-center md:text-right">
            <p>ساخته شده با <Heart className="w-4 h-4 inline text-red-500 mx-1 fill-current" /> برای امت اسلامی</p>
          </div>

          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-sky-600 transition-colors">اینستاگرام</a>
            <a href="#" className="text-gray-400 hover:text-sky-600 transition-colors">تلگرام</a>
            <a href="#" className="text-gray-400 hover:text-sky-600 transition-colors">توییتر</a>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
