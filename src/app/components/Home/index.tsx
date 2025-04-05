/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { AnimatedText } from "../AnimatedText";
import Features from "../Features";
import LanguageSelector from "../LanguageSelector";

type HomePageProps = {
  translations: Record<string, any>;
};

const Home = ({ translations }: HomePageProps) => {
  const { home } = translations; // Destructure the translations for the home component

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-3xl mx-auto">
        <div className="p-8 bg-white rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              <AnimatedText text={home.title} />
            </h1>
            <LanguageSelector translations={translations} />
          </div>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              <AnimatedText text={home?.welcome?.heading} />
            </h2>
            <p className="text-gray-600">
              <AnimatedText text={home.welcome?.description} />
            </p>
          </section>
          <Features translations={translations} />

          <div className="text-sm text-gray-500 border-t pt-4 mt-6">
            <AnimatedText text={home.footer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
