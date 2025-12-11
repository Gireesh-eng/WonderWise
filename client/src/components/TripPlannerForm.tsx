'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Heart, 
  Palette, 
  Sparkles,
  Plane,
  Camera,
  Mountain,
  Coffee,
  Star,
  CheckCircle2,
  Globe,
  Compass,
  Sunset
} from 'lucide-react';
import Header from './Header';

interface TripPlannerFormProps {
  onSubmit: (formData: {
    destination: string;
    travelDates: string;
    travelers: string;
    budget: string;
    interests: string;
    theme: string;
  }) => void;
  isLoading: boolean;
}

const themes = [
  { 
    id: 'classic-blue', 
    name: 'Ocean Blue', 
    colors: 'bg-gradient-to-br from-blue-400 to-blue-600',
    description: 'Professional & Elegant',
    accent: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 'tropical-green', 
    name: 'Forest Green', 
    colors: 'bg-gradient-to-br from-green-400 to-green-600',
    description: 'Nature & Adventure',
    accent: 'from-green-500 to-emerald-500'
  },
  { 
    id: 'sunset-red', 
    name: 'Sunset Red', 
    colors: 'bg-gradient-to-br from-red-400 to-pink-500',
    description: 'Vibrant & Energetic',
    accent: 'from-red-500 to-pink-500'
  },
  { 
    id: 'lavender', 
    name: 'Royal Purple', 
    colors: 'bg-gradient-to-br from-purple-400 to-purple-600',
    description: 'Luxury & Sophisticated',
    accent: 'from-purple-500 to-violet-500'
  },
  { 
    id: 'golden', 
    name: 'Golden Sun', 
    colors: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    description: 'Warm & Inviting',
    accent: 'from-yellow-500 to-orange-500'
  },
];

const budgetOptions = [
  { value: 'Budget ($50-100/day)', icon: Coffee, description: 'Backpacker friendly', color: 'text-green-600', bg: 'bg-green-50' },
  { value: 'Mid-range ($100-250/day)', icon: Camera, description: 'Comfortable travel', color: 'text-blue-600', bg: 'bg-blue-50' },
  { value: 'Luxury ($250-500/day)', icon: Star, description: 'Premium experience', color: 'text-purple-600', bg: 'bg-purple-50' },
  { value: 'Ultra-luxury ($500+/day)', icon: Sparkles, description: 'Ultimate indulgence', color: 'text-yellow-600', bg: 'bg-yellow-50' },
];

const travelerOptions = [
  { value: '1 traveler', icon: '🚶‍♂️', description: 'Solo adventure', color: 'border-blue-300', bg: 'bg-blue-50' },
  { value: '2 travelers', icon: '👫', description: 'Couple getaway', color: 'border-pink-300', bg: 'bg-pink-50' },
  { value: '3-4 travelers', icon: '👨‍👩‍👧‍👦', description: 'Small group', color: 'border-green-300', bg: 'bg-green-50' },
  { value: '5+ travelers', icon: '👥', description: 'Large group', color: 'border-purple-300', bg: 'bg-purple-50' },
  { value: 'Family with children', icon: '👨‍👩‍👧‍👦', description: 'Family vacation', color: 'border-orange-300', bg: 'bg-orange-50' },
  { value: 'Group trip', icon: '🎉', description: 'Party group', color: 'border-red-300', bg: 'bg-red-50' },
];

const interestTags = [
  { name: 'Culture & History', icon: '🏛️', color: 'from-amber-500 to-orange-500' },
  { name: 'Food & Cuisine', icon: '🍜', color: 'from-red-500 to-pink-500' },
  { name: 'Adventure Sports', icon: '🏔️', color: 'from-green-500 to-emerald-500' },
  { name: 'Nature & Wildlife', icon: '🦋', color: 'from-green-400 to-teal-500' },
  { name: 'Art & Museums', icon: '🎨', color: 'from-purple-500 to-violet-500' },
  { name: 'Nightlife', icon: '🌃', color: 'from-indigo-500 to-purple-500' },
  { name: 'Shopping', icon: '🛍️', color: 'from-pink-500 to-rose-500' },
  { name: 'Photography', icon: '📸', color: 'from-blue-500 to-cyan-500' },
  { name: 'Architecture', icon: '🏗️', color: 'from-gray-500 to-slate-500' },
  { name: 'Beach & Water', icon: '🏖️', color: 'from-cyan-400 to-blue-500' },
  { name: 'Mountains', icon: '⛰️', color: 'from-stone-500 to-gray-600' },
  { name: 'Local Experiences', icon: '🎭', color: 'from-yellow-500 to-amber-500' },
  { name: 'Wellness & Spa', icon: '🧘‍♀️', color: 'from-teal-400 to-green-500' }
];

// Floating background elements
const FloatingElement = ({ delay = 0, className = "", children }: { delay?: number; className?: string; children: React.ReactNode }) => (
  <motion.div
    className={`absolute opacity-10 ${className}`}
    initial={{ y: 0, rotate: 0 }}
    animate={{ 
      y: [-20, 20, -20],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

export default function TripPlannerForm({ onSubmit, isLoading }: TripPlannerFormProps) {
  const [formData, setFormData] = useState({
    destination: '',
    travelDates: '',
    travelers: '',
    budget: '',
    interests: '',
    theme: 'classic-blue',
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInterestTags, setSelectedInterestTags] = useState<string[]>([]);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const totalSteps = 6;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalFormData = {
      ...formData,
      interests: selectedInterestTags.join(', ') + (formData.interests ? `, ${formData.interests}` : '')
    };
    onSubmit(finalFormData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tag: string) => {
    setSelectedInterestTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1: return formData.destination.length > 0;
      case 2: return formData.travelDates.length > 0;
      case 3: return formData.travelers.length > 0;
      case 4: return formData.budget.length > 0;
      case 5: return selectedInterestTags.length > 0 || formData.interests.length > 0;
      case 6: return true;
      default: return false;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      x: -100, 
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden"
    >
      {/* Floating Background Elements */}
      <FloatingElement delay={0} className="top-10 left-10">
        <Globe className="h-24 w-24 text-blue-300" />
      </FloatingElement>
      <FloatingElement delay={2} className="top-20 right-20">
        <Compass className="h-20 w-20 text-purple-300" />
      </FloatingElement>
      <FloatingElement delay={4} className="bottom-20 left-20">
        <Mountain className="h-28 w-28 text-green-300" />
      </FloatingElement>
      <FloatingElement delay={6} className="bottom-10 right-10">
        <Sunset className="h-16 w-16 text-orange-300" />
      </FloatingElement>

      {/* Main Content */}
      <div className="relative z-10 p-8 md:p-12 min-h-screen flex flex-col">
        {/* Header Component */}
        <Header />

        {/* Enhanced Progress Bar */}
        <motion.div variants={itemVariants} className="relative mb-20">
          <div className="flex items-center justify-center mb-12 px-4">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="flex items-center">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl border-4 transition-all duration-500 relative overflow-hidden ${
                      i + 1 <= currentStep
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white border-transparent shadow-2xl'
                        : i + 1 === currentStep
                        ? 'bg-gradient-to-br from-blue-400 to-purple-500 text-white border-blue-300 shadow-xl scale-110'
                        : 'bg-white text-slate-500 border-slate-300 shadow-lg'
                    }`}
                    layout
                  >
                    {/* Animated background for current step */}
                    {i + 1 === currentStep && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                    
                    {/* Pulsing ring for current step */}
                    {i + 1 === currentStep && (
                      <motion.div
                        className="absolute inset-0 border-4 border-blue-400 rounded-full"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    
                    <span className="relative z-10 font-extrabold">
                      {i + 1 < currentStep ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CheckCircle2 className="h-8 w-8" />
                        </motion.div>
                      ) : (
                        i + 1
                      )}
                    </span>
                  </motion.div>
                  
                  {/* Step label */}
                  <motion.div
                    className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-sm font-semibold whitespace-nowrap ${
                      i + 1 === currentStep ? 'text-blue-700 scale-110' : 
                      i + 1 < currentStep ? 'text-blue-600' : 'text-slate-400'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {['Destination', 'Dates', 'Travelers', 'Budget', 'Interests', 'Theme'][i]}
                  </motion.div>
                </motion.div>
                
                {i < totalSteps - 1 && (
                  <motion.div 
                    className={`h-3 w-24 mx-6 rounded-full transition-all duration-500 ${
                      i + 1 < currentStep 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' 
                        : 'bg-slate-200'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  />
                )}
              </div>
            ))}
          </div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-slate-500 font-medium">
              Step {currentStep} of {totalSteps}
            </p>
          </motion.div>
        </motion.div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-[450px] flex items-center justify-center"
          >
            <div className="w-full max-w-4xl">
              {/* Step 1: Destination */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <motion.div 
                    variants={itemVariants}
                    className="text-center"
                  >
                    <motion.div 
                      className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl mb-6 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MapPin className="h-12 w-12 text-blue-600" />
                    </motion.div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                      Where would you like to go?
                    </h3>
                    <p className="text-xl text-slate-600 max-w-md mx-auto">
                      Tell us your dream destination and let the adventure begin
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
                    <div className="relative">
                      <motion.input
                        type="text"
                        id="destination"
                        name="destination"
                        required
                        value={formData.destination}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('destination')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="e.g., Tokyo, Japan or Paris, France"
                        className={`w-full px-8 py-6 text-xl border-3 rounded-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                          focusedField === 'destination' 
                            ? 'border-blue-500 ring-8 ring-blue-100 shadow-2xl transform scale-105' 
                            : 'border-slate-300 hover:border-slate-400 shadow-lg hover:shadow-xl'
                        }`}
                        whileFocus={{ scale: 1.02 }}
                      />
                      <motion.div
                        className="absolute right-6 top-1/2 transform -translate-y-1/2"
                        animate={{ 
                          rotate: focusedField === 'destination' ? 360 : 0,
                          scale: focusedField === 'destination' ? 1.2 : 1
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Plane className="h-8 w-8 text-slate-400" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Enhanced destination suggestions */}
                  <motion.div 
                    variants={itemVariants} 
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
                  >
                    {[
                      { name: 'Tokyo, Japan', emoji: '🗾', color: 'from-red-400 to-pink-500' },
                      { name: 'Paris, France', emoji: '🗼', color: 'from-blue-400 to-indigo-500' },
                      { name: 'New York, USA', emoji: '🗽', color: 'from-yellow-400 to-orange-500' },
                      { name: 'Bali, Indonesia', emoji: '🏝️', color: 'from-green-400 to-teal-500' }
                    ].map((dest, index) => (
                      <motion.button
                        key={dest.name}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFormData(prev => ({ ...prev, destination: dest.name }))}
                        className={`p-6 bg-gradient-to-br ${dest.color} text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                          {dest.emoji}
                        </div>
                        <div className="font-semibold text-sm">{dest.name}</div>
                      </motion.button>
                    ))}
                  </motion.div>
                </div>
              )}

              {/* Step 2: Travel Dates */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <motion.div variants={itemVariants} className="text-center">
                    <motion.div 
                      className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl mb-6 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Calendar className="h-12 w-12 text-green-600" />
                    </motion.div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                      When are you traveling?
                    </h3>
                    <p className="text-xl text-slate-600 max-w-md mx-auto">
                      Choose your perfect travel dates
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
                    <motion.input
                      type="text"
                      id="travelDates"
                      name="travelDates"
                      required
                      value={formData.travelDates}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('travelDates')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g., March 15-25, 2024 or Summer 2024"
                      className={`w-full px-8 py-6 text-xl border-3 rounded-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                        focusedField === 'travelDates' 
                          ? 'border-green-500 ring-8 ring-green-100 shadow-2xl transform scale-105' 
                          : 'border-slate-300 hover:border-slate-400 shadow-lg hover:shadow-xl'
                      }`}
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                </div>
              )}

              {/* Step 3: Travelers */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <motion.div variants={itemVariants} className="text-center">
                    <motion.div 
                      className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl mb-6 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Users className="h-12 w-12 text-purple-600" />
                    </motion.div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                      Who's traveling?
                    </h3>
                    <p className="text-xl text-slate-600 max-w-md mx-auto">
                      Tell us about your travel companions
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {travelerOptions.map((option, index) => (
                      <motion.label
                        key={option.value}
                        whileHover={{ scale: 1.03, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        className={`relative cursor-pointer rounded-2xl border-3 p-6 transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                          formData.travelers === option.value
                            ? 'border-purple-500 bg-purple-50 shadow-xl transform scale-105'
                            : `${option.color} hover:${option.bg} hover:shadow-lg`
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <input
                          type="radio"
                          name="travelers"
                          value={option.value}
                          checked={formData.travelers === option.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-4">
                          <div className="text-4xl">{option.icon}</div>
                          <div className="flex-1">
                            <div className="font-bold text-lg text-slate-800">{option.value}</div>
                            <div className="text-slate-600">{option.description}</div>
                          </div>
                        </div>
                        {formData.travelers === option.value && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="absolute top-4 right-4 bg-purple-500 text-white rounded-full p-2 shadow-lg"
                          >
                            <CheckCircle2 className="h-5 w-5" />
                          </motion.div>
                        )}
                      </motion.label>
                    ))}
                  </motion.div>
                </div>
              )}

              {/* Step 4: Budget */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <motion.div variants={itemVariants} className="text-center">
                    <motion.div 
                      className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl mb-6 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <DollarSign className="h-12 w-12 text-yellow-600" />
                    </motion.div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                      What's your budget?
                    </h3>
                    <p className="text-xl text-slate-600 max-w-md mx-auto">
                      Choose your daily spending range
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {budgetOptions.map((option, index) => {
                      const IconComponent = option.icon;
                      return (
                        <motion.label
                          key={option.value}
                          whileHover={{ scale: 1.03, y: -3 }}
                          whileTap={{ scale: 0.97 }}
                          className={`relative cursor-pointer rounded-2xl border-3 p-6 transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                            formData.budget === option.value
                              ? 'border-yellow-500 bg-yellow-50 shadow-xl transform scale-105'
                              : `border-slate-300 hover:border-slate-400 hover:${option.bg} hover:shadow-lg`
                          }`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <input
                            type="radio"
                            name="budget"
                            value={option.value}
                            checked={formData.budget === option.value}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-xl ${option.bg}`}>
                              <IconComponent className={`h-8 w-8 ${option.color}`} />
                            </div>
                            <div className="flex-1">
                              <div className="font-bold text-lg text-slate-800">{option.value}</div>
                              <div className="text-slate-600">{option.description}</div>
                            </div>
                          </div>
                          {formData.budget === option.value && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="absolute top-4 right-4 bg-yellow-500 text-white rounded-full p-2 shadow-lg"
                            >
                              <CheckCircle2 className="h-5 w-5" />
                            </motion.div>
                          )}
                        </motion.label>
                      );
                    })}
                  </motion.div>
                </div>
              )}

              {/* Step 5: Interests */}
              {currentStep === 5 && (
                <div className="space-y-8">
                  <motion.div variants={itemVariants} className="text-center">
                    <motion.div 
                      className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-pink-100 to-red-100 rounded-3xl mb-6 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart className="h-12 w-12 text-pink-600" />
                    </motion.div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                      What interests you?
                    </h3>
                    <p className="text-xl text-slate-600 max-w-md mx-auto">
                      Select activities and experiences you enjoy
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                    {interestTags.map((tag, index) => (
                      <motion.button
                        key={tag.name}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTagToggle(tag.name)}
                        className={`p-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                          selectedInterestTags.includes(tag.name)
                            ? `bg-gradient-to-r ${tag.color} text-white shadow-lg transform scale-105`
                            : 'bg-white/80 text-slate-700 hover:bg-slate-100 border-2 border-slate-200 hover:border-slate-300 shadow-md hover:shadow-lg backdrop-blur-sm'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <span className="text-2xl">{tag.icon}</span>
                          <span className="text-center leading-tight">{tag.name}</span>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>

                  <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
                    <motion.textarea
                      id="interests"
                      name="interests"
                      value={formData.interests}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Add any other specific interests or requirements..."
                      className="w-full px-6 py-4 border-3 border-slate-300 rounded-2xl focus:border-pink-500 focus:ring-8 focus:ring-pink-100 transition-all duration-300 resize-none bg-white/80 backdrop-blur-sm text-lg"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                </div>
              )}

              {/* Step 6: Theme */}
              {currentStep === 6 && (
                <div className="space-y-8">
                  <motion.div variants={itemVariants} className="text-center">
                    <motion.div 
                      className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl mb-6 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Palette className="h-12 w-12 text-indigo-600" />
                    </motion.div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                      Choose your style
                    </h3>
                    <p className="text-xl text-slate-600 max-w-md mx-auto">
                      Pick a theme for your travel handbook
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {themes.map((theme, index) => (
                      <motion.label
                        key={theme.id}
                        whileHover={{ scale: 1.03, y: -5 }}
                        whileTap={{ scale: 0.97 }}
                        className={`relative cursor-pointer rounded-2xl border-3 p-6 transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                          formData.theme === theme.id
                            ? 'border-indigo-500 bg-indigo-50 shadow-xl transform scale-105'
                            : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50 hover:shadow-lg'
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <input
                          type="radio"
                          name="theme"
                          value={theme.id}
                          checked={formData.theme === theme.id}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="text-center space-y-4">
                          <motion.div 
                            className={`w-16 h-16 rounded-2xl ${theme.colors} mx-auto shadow-lg`}
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          />
                          <div>
                            <div className="font-bold text-xl text-slate-800">{theme.name}</div>
                            <div className="text-slate-600">{theme.description}</div>
                          </div>
                        </div>
                        {formData.theme === theme.id && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="absolute top-4 right-4 bg-indigo-500 text-white rounded-full p-2 shadow-lg"
                          >
                            <CheckCircle2 className="h-5 w-5" />
                          </motion.div>
                        )}
                      </motion.label>
                    ))}
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Navigation Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-between items-center pt-12 mt-12 border-t border-slate-200"
        >
          <motion.button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            whileHover={{ scale: currentStep > 1 ? 1.05 : 1, x: currentStep > 1 ? -5 : 0 }}
            whileTap={{ scale: currentStep > 1 ? 0.95 : 1 }}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
              currentStep === 1
                ? 'text-slate-400 cursor-not-allowed'
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100 shadow-md hover:shadow-lg'
            }`}
          >
            ← Previous
          </motion.button>

          <motion.div 
            className="flex items-center space-x-2 text-slate-500 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex space-x-1">
              {Array.from({ length: totalSteps }, (_, i) => (
                <motion.div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i + 1 <= currentStep ? 'bg-blue-500' : 'bg-slate-300'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
            <span className="ml-2">{currentStep} of {totalSteps}</span>
          </motion.div>

          {currentStep < totalSteps ? (
            <motion.button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid(currentStep)}
              whileHover={{ scale: isStepValid(currentStep) ? 1.05 : 1, x: isStepValid(currentStep) ? 5 : 0 }}
              whileTap={{ scale: isStepValid(currentStep) ? 0.95 : 1 }}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                isStepValid(currentStep)
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              Next →
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading || !isStepValid(currentStep)}
              whileHover={{ scale: !isLoading && isStepValid(currentStep) ? 1.05 : 1 }}
              whileTap={{ scale: !isLoading && isStepValid(currentStep) ? 0.95 : 1 }}
              className={`px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                isLoading || !isStepValid(currentStep)
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-2xl'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                  />
                  <span>Creating Magic...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Sparkles className="h-6 w-6" />
                  <span>Generate My Travel Handbook</span>
                </div>
              )}
            </motion.button>
          )}
        </motion.div>

        {/* Enhanced Tips Section */}
        {currentStep === totalSteps && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-start space-x-4">
              <motion.div 
                className="flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </motion.div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-blue-900 mb-4">✨ Your personalized handbook will include:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-blue-800">
                  {[
                    '📅 Detailed daily itineraries with perfect timing',
                    '🍜 Restaurant recommendations and local cuisine guides',
                    '🎭 Cultural insights and etiquette tips',
                    '🚨 Emergency contacts and useful phrases',
                    '💰 Budget breakdowns and money-saving tips',
                    '☀️ Weather information and packing suggestions'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

