import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning";
  onClose: () => void;
}

export const Toast = ({ message, type = "success", onClose }: ToastProps) => {
  const colors = {
    success: "bg-success text-white",
    error: "bg-error text-white",
    warning: "bg-warning text-white",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        exit={{ opacity: 0, y: 50, x: "-50%" }}
        className={cn(
          "fixed bottom-8 left-1/2 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50",
          colors[type]
        )}
      >
        <span>{message}</span>
        <button
          onClick={onClose}
          className="hover:opacity-80 transition-opacity"
        >
          <X size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};