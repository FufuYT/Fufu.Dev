import React from 'react';
import { Heart, Code } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      madeWith: "Made with",
      by: "by FufuDev",
      rights: "All rights reserved."
    },
    fr: {
      madeWith: "Fait avec",
      by: "par FufuDev",
      rights: "Tous droits réservés."
    }
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            <span>{content[language].madeWith}</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>&</span>
            <Code className="w-4 h-4 text-blue-500" />
            <span>{content[language].by}</span>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} FufuDev. {content[language].rights}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;