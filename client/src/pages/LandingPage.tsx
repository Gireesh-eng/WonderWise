 'use client';

import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Brain, 
  Globe, 
  Plane,
  Clock,
  Shield,
  Star,
  ArrowRight
} from 'lucide-react';
import Examples from '../components/Examples';
import Footer from '../components/Footer';

/**
 * Landing Page Component
 * Beautiful, modern landing page with animations
 */
export default function LandingPage() {
  const navigate = useNavigate();
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Planning',
      description: 'Advanced Gemini AI creates personalized itineraries tailored to your preferences',
      color: 'from-purple-400 to-pink-600'
    },
    {
      icon: Clock,
      title: 'Instant Generation',
      description: 'Get a complete travel handbook in minutes, not hours of manual planning',
      color: 'from-blue-400 to-cyan-600'
    },
    {
      icon: MapPin,
      title: 'Detailed Itineraries',
      description: 'Day-by-day plans with attractions, restaurants, and local experiences',
      color: 'from-green-400 to-emerald-600'
    },
    {
      icon: Globe,
      title: 'Worldwide Coverage',
      description: 'Plan trips to any destination around the world with local insights',
      color: 'from-orange-400 to-red-600'
    },
    {
      icon: Shield,
      title: 'Emergency Info',
      description: 'Essential contacts, medical facilities, and safety information included',
      color: 'from-indigo-400 to-purple-600'
    },
    {
      icon: Star,
      title: 'Beautiful Handbooks',
      description: 'Download stunning HTML travel guides you can view offline anytime',
      color: 'from-yellow-400 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TravelGen
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/signin">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium transition"
                >
                  Sign In
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg mb-6">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Powered by Gemini AI</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Dream Trip,
              <br />
              Planned in Minutes
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Let AI create a personalized travel itinerary with detailed plans, 
              local insights, and everything you need for the perfect vacation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition flex items-center space-x-2"
                >
                  <span>Start Planning Free</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-700 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Hero Image/Demo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-4 max-w-5xl mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop" 
              alt="Travel Planning" 
              className="rounded-2xl w-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Everything You Need for Perfect Travel
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From detailed itineraries to emergency contacts, we've got you covered
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
              >
                <div className={`inline-flex p-3 bg-gradient-to-r ${feature.color} rounded-xl mb-4`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Examples Section with real sample handbooks */}
      <Examples onGetStarted={() => navigate('/signup')} />

      {/* How It Works Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to your perfect travel handbook
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, title: 'Share Your Plans', description: 'Tell us your destination, dates, budget, and interests', icon: MapPin },
              { step: 2, title: 'AI Creates Magic', description: 'Our advanced AI generates a comprehensive travel handbook', icon: Sparkles },
              { step: 3, title: 'Download & Explore', description: 'Get your beautiful handbook and start your adventure', icon: Calendar }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white text-2xl font-bold mb-6">
                    {item.step}
                  </div>
                  <item.icon className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-purple-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of travelers who trust TravelGen for their perfect trip
            </p>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition flex items-center space-x-2 mx-auto"
              >
                <span>Create Your First Itinerary</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

