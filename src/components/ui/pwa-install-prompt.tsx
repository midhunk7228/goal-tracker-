import { useState } from "react";
import { usePwaInstall } from "@/hooks/usePwaInstall";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PwaInstallPrompt() {
  const { isInstallable, installApp } = usePwaInstall();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isInstallable || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-20 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-96 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg z-50 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="bg-primary-foreground/20 p-2 rounded-full">
            <Download className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Install App</span>
            <span className="text-xs opacity-90">
              Install for a better experience
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={installApp}
            variant="secondary"
            size="sm"
            className="whitespace-nowrap"
          >
            Install
          </Button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 hover:bg-primary-foreground/20 rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
