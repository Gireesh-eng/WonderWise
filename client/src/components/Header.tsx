import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

/**
 * Header Component for Trip Planner Form
 */
export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <motion.div
        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl mb-6 shadow-lg"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <Plane className="h-10 w-10 text-blue-600" />
      </motion.div>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
        Plan Your Dream Trip
      </h1>
      <p className="text-xl text-slate-600 max-w-2xl mx-auto">
        Tell us about your travel plans and we'll create a personalized itinerary just for you
      </p>
    </motion.div>
  );
}

