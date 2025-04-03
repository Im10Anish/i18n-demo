"use client";
import React, { useEffect } from "react";
import { useLocale } from "@/app/hooks/useLocale";

type HomePageProps = {
  locale: string;
  translations: Record<string, Record<string, string>>;
};

const Home = ({ locale: initialLocale, translations }: HomePageProps) => {
  const { setLocale } = useLocale();
  const { home } = translations; // Destructure the translations for the home component

  // Set the locale to the initial locale from the server
  useEffect(() => {
    setLocale(initialLocale);
  }, [initialLocale, setLocale]);

  return <div>{home.title}</div>;
};

export default Home;
