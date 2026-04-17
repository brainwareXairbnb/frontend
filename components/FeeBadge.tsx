"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Tags } from "lucide-react";

export function FeeBadge() {
  const [isVisible, setIsVisible] = useState(true);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 100], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 30000); // 30 seconds auto-remove

    return () => clearTimeout(timer);
  }, []);

  const handleDragEnd = (_: any, info: any) => {
    // If dragged down more than 50px, dismiss
    if (info.offset.y > 50) {
      setIsVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-24 left-0 right-0 flex justify-center z-[100] px-6 pointer-events-none">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            style={{ y, opacity }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 200 }}
            onDragEnd={handleDragEnd}
            className="pointer-events-auto cursor-grab active:cursor-grabbing bg-white border border-outline-variant/20 shadow-[0_4px_20px_rgba(0,0,0,0.12)] rounded-full px-5 py-3 flex items-center gap-3 active:scale-95 transition-transform"
          >
            <div className='md:-rotate-45 block'>
              <Tags className='w-4 h-4 sm:w-4.5 sm:h-4.5 text-red-500' strokeWidth={2.5} />
            </div>
            <span className="text-[13px] sm:text-[15px] font-semibold text-on-surface text-center leading-tight">
              Prices include all fees
            </span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
