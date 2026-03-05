'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Eye, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign,
  Star,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ExampleHandbook {
  id: string;
  title: string;
  destination: string;
  duration: string;
  travelers: string;
  budget: string;
  theme: string;
  themeColor: string;
  image: string;
  description: string;
  features: string[];
  generationTime: string;
  fileSize: string;
  filename: string;
}

const examples: ExampleHandbook[] = [
  {
    id: 'paris',
    title: 'Paris 5-Day Romantic Getaway',
    destination: 'Paris, France',
    duration: '5 days',
    travelers: '2 travelers',
    budget: 'Mid-range',
    theme: 'Classic Blue',
    themeColor: 'from-blue-500 to-blue-600',
    image: '/italy.jpg',
    description: 'A romantic journey through the City of Light with intimate dining, art galleries, and scenic walks.',
    features: ['Seine River Cruise', 'Louvre Museum', 'Montmartre District', 'Fine Dining'],
    generationTime: '19s',
    fileSize: '42 KB',
    filename: 'paris-travel-plan.html'
  },
  {
    id: 'tokyo',
    title: 'Tokyo Cultural Adventure',
    destination: 'Tokyo, Japan',
    duration: '7 days',
    travelers: '1 traveler',
    budget: 'Budget',
    theme: 'Tropical Green',
    themeColor: 'from-green-500 to-green-600',
    image: '/thailand.jpg',
    description: 'Immerse yourself in traditional and modern Japanese culture with temples, tech, and incredible food.',
    features: ['Senso-ji Temple', 'Robot Restaurant', 'Tsukiji Market', 'Traditional Ryokan'],
    generationTime: '22s',
    fileSize: '38 KB',
    filename: 'tokyo-culture-quest.html'
  },
  {
    id: 'bali',
    title: 'Bali Surf & Relax Retreat',
    destination: 'Bali, Indonesia',
    duration: '10 days',
    travelers: '4 travelers',
    budget: 'Luxury',
    theme: 'Sunset Red',
    themeColor: 'from-red-500 to-orange-600',
    image: '/peru.jpeg',
    description: 'Perfect blend of adventure and relaxation with world-class surfing and spa treatments.',
    features: ['Surf Lessons', 'Ubud Rice Terraces', 'Spa Treatments', 'Beach Clubs'],
    generationTime: '25s',
    fileSize: '45 KB',
    filename: 'bali-surf-relax.html'
  }
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 60
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

interface ExamplesProps {
  onGetStarted: () => void;
}

/**
 * Examples section on the landing page showing sample handbooks.
 * Static HTML files and images should be placed in the public/ folder.
 */
export default function Examples({ onGetStarted }: ExamplesProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handlePreview = (filename: string) => {
    // Navigate to the example page in the same tab (served from /public)
    window.location.href = `/${filename}`;
  };

  const handleDownload = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="examples" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 mb-6 shadow-lg"
          >
            <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-600">
              Real Examples
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
          >
            See It in{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Action
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Real, full-length travel handbooks produced in seconds. 
            Each one is personalized, comprehensive, and ready to use.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {examples.map((example) => (
            <motion.div
              key={example.id}
              variants={scaleIn}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              onMouseEnter={() => setHoveredCard(example.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={example.image}
                  alt={example.destination}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Theme Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`bg-gradient-to-r ${example.themeColor} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}>
                    {example.theme}
                  </div>
                </div>

                {/* Generation Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredCard === example.id ? 1 : 0,
                    y: hoveredCard === example.id ? 0 : 20
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium"
                >
                  Generated in {example.generationTime} • {example.fileSize}
                </motion.div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {example.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {example.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.9</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span>{example.destination}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-green-500" />
                    <span>{example.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="h-4 w-4 text-purple-500" />
                    <span>{example.travelers}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 text-orange-500" />
                    <span>{example.budget}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {example.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePreview(example.filename)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Preview</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDownload(example.filename)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </motion.button>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: hoveredCard === example.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Create Your Own Handbook</span>
              <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}


