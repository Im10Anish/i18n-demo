/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "@/app/hooks/useLocale";
import { i18n } from "@/app/i18n/setting";

const LanguageSelector = ({
  translations,
}: {
  translations: Record<string, any>;
}) => {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const { languageSelector } = translations;
  const handleLanguageChange = (lang: string) => {
    setIsChanging(true);
    setIsOpen(false);
    setLocale(lang);

    setTimeout(() => {
      setIsChanging(false);
    }, 500); // Simulate a delay for the transition
  };

  const getLanguageName = (locale: string) => {
    const names: Record<string, string> = {
      "en-US": "English",
      "es-MX": "Español",
      "fr-FR": "Français",
    };
    return names[locale] || locale;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest("[data-dropdown]")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const switcherTitle = languageSelector?.title;

  if (!locale) {
    return null; // or a loading spinner, etc.
  }

  return (
    <div className="relative" data-dropdown>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        disabled={isChanging}
        aria-label={switcherTitle}
      >
        <span>{getLanguageName(locale)}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        {isChanging && (
          <svg
            className="animate-spin ml-1 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden z-10 border border-gray-200">
          <ul>
            {i18n.locales.map((localeCode) => (
              <li key={localeCode}>
                <button
                  onClick={() => handleLanguageChange(localeCode)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition ${
                    localeCode === locale ? "bg-gray-50 font-medium" : ""
                  }`}
                  disabled={isChanging}
                >
                  {getLanguageName(localeCode)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
