import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageToggle = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { 
      code: 'en', 
      flagClass: 'fi fi-ca', 
      name: t('languages.en'),
      label: 'EN'
    },
    { 
      code: 'fr', 
      flagClass: 'fi fi-ca', 
      name: t('languages.fr'),
      label: 'FR'
    }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1 rounded-md border border-white text-white hover:bg-white/10 transition-colors"
      >
        <span className={`${currentLanguage.flagClass} text-xl`}></span>
        <span className="ml-1 text-sm opacity-75">({currentLanguage.label})</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[var(--primary-color)] border border-white rounded-md shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                if (lang.code !== language) {
                  toggleLanguage();
                }
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 transition-colors ${
                lang.code === language ? 'bg-white/10' : ''
              }`}
            >
              <span className={`${lang.flagClass} text-xl`}></span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 