"use client";

import React from "react";
import { AnimatedText } from "../AnimatedText";

const Features = ({ translations }: { translations: Record<string, any> }) => {
  const { features } = translations; // Destructure the translations for the features component
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-gray-700">
        <AnimatedText text={features.heading || "Key Features"} />
      </h2>
      <ul className="list-disc pl-5 text-gray-600 space-y-2">
        {(features.list || []).map((feature: string, idx: number) => (
          <li key={idx}>
            <AnimatedText text={feature} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Features;
