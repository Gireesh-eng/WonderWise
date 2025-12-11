import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  MapPin, 
  Calendar, 
  FileText, 
  TrendingUp,
  Sparkles,
  Globe,
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface Itinerary {
  _id: string;
  destination: string;
  travelDates: string;
  createdAt: string;
  theme: string;
}

/**
 * Dashboard Component
 * Main user dashboard showing stats and recent itineraries
 */
export default function Dashboard() {
  const { user, logout } = useAuth();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentItineraries();
  }, []);

  const fetchRecentItineraries = async () => {
    try {
      const response = await axios.get('/api/itinerary?limit=5');
      setItineraries(response.data.itineraries);
    } catch (error) {
      console.error('Failed to fetch itineraries:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { 
      label: 'Total Itineraries', 
      value: user?.stats.totalItineraries || 0, 
      icon: FileText, 
      color: 'from-blue-400 to-blue-600' 
    },
    { 
      label: 'Destinations', 
      value: user?.stats.destinationsVisited || 0, 
      icon: MapPin, 
      color: 'from-green-400 to-green-600' 
    },
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
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TravelGen
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/my-itineraries">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition"
                >
                  My Itineraries
                </motion.button>
              </Link>
              <Link to="/profile">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-700 hover:text-gray-900 transition"
                >
                  <User className="h-5 w-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="p-2 text-red-600 hover:text-red-700 transition"
              >
                <LogOut className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Ready to plan your next adventure?
          </p>
        </motion.div>

        {/* Quick Action Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Link to="/create">
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Sparkles className="h-8 w-8" />
                    <h2 className="text-3xl font-bold">Create New Itinerary</h2>
                  </div>
                  <p className="text-blue-100 text-lg">
                    Let AI plan your perfect trip in minutes
                  </p>
                </div>
                <PlusCircle className="h-16 w-16 opacity-50" />
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-4 bg-gradient-to-r ${stat.color} rounded-xl`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Itineraries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Itineraries</h2>
            <Link to="/my-itineraries">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                View All →
              </motion.button>
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : itineraries.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No itineraries yet</h3>
              <p className="text-gray-600 mb-6">Create your first travel itinerary to get started</p>
              <Link to="/create">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
                >
                  Create Itinerary
                </motion.button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itineraries.map((itinerary, index) => (
                <motion.div
                  key={itinerary._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Link to={`/itinerary/${itinerary._id}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
                          <MapPin className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{itinerary.destination}</h3>
                      <div className="flex items-center text-gray-600 text-sm space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{itinerary.travelDates}</span>
                      </div>
                      <div className="mt-4 text-sm text-gray-500">
                        Created {new Date(itinerary.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

