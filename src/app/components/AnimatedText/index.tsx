"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const AnimatedText = ({ text }: { text: string }) => {
  const prevTextRef = useRef<string>("");

  useEffect(() => {
    prevTextRef.current = text;
  }, [text]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={text}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {text}
      </motion.span>
    </AnimatePresence>
  );
};
