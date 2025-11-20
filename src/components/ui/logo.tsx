"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function Logo({
  collapsed,
  size = 28,
}: {
  collapsed: boolean;
  size: number;
}) {
  return (
    <div className={cn(`flex items-center w-full gap-2 relative`)}>
      <motion.div
        style={{ width: size, height: size }}
        className="flex items-center justify-center shrink-0"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <Image
          src="/logo.svg"
          className="rounded-md"
          alt="logo"
          width={size}
          height={size}
        />
      </motion.div>
      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{
              duration: 0.2,
              delay: 0.1,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="text-neutral-1000 text-lg"
          >
            BreakDayz.
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
