"use client";
import React, { useEffect } from "react";
import { useLocale } from "@/app/hooks/useLocale";
import { AnimatedText } from "../AnimatedText";

type HomePageProps = {
  locale: string;
  translations: Record<string, any>;
};

const Home = ({ locale: initialLocale, translations }: HomePageProps) => {
  const { setLocale } = useLocale();
  const { home } = translations; // Destructure the translations for the home component

  // Set the locale to the initial locale from the server
  useEffect(() => {
    setLocale(initialLocale);
  }, [initialLocale, setLocale]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-2xl mx-auto">
        <div className="p-8 bg-white rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              <AnimatedText text={home.title} />
            </h1>
          </div>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              <AnimatedText text={home?.welcome?.heading} />
            </h2>
            <p className="text-gray-600">
              <AnimatedText text={home.welcome?.description} />
            </p>
          </section>

          <div className="text-sm text-gray-500 border-t pt-4 mt-6">
            <AnimatedText text={home.footer || "© 2025 Next.js i18n Demo"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
