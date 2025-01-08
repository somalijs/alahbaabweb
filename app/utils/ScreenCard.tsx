import { motion } from "framer-motion";

type ScreenCardProps = {
  children: React.ReactNode; // Correct typing for React children
};

function ScreenCard({ children }: ScreenCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Start with opacity 0 (hidden)
      animate={{ opacity: 1 }} // Animate to opacity 1 (visible)
      transition={{ duration: 0.5 }} // Duration of the animation (0.5 seconds)
      className="relative w-full"
    >
      <div className="mx-auto max-w-[1400px]  relative">{children}</div>
    </motion.div>
  );
}

export default ScreenCard;
