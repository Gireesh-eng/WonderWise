import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';
import ItineraryDisplay from '../components/ItineraryDisplay';

/**
 * View Itinerary Page
 * Displays a specific itinerary by ID
 */
export default function ViewItinerary() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchItinerary();
  }, [id]);

  const fetchItinerary = async () => {
    try {
      const response = await axios.get(`/api/itinerary/${id}`);
      setItinerary(response.data.itinerary);
    } catch (err: any) {
      console.error('Error fetching itinerary:', err);
      setError(err.response?.data?.error?.message || 'Failed to load itinerary');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="h-16 w-16 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600 font-medium">Loading your travel handbook...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Itinerary Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!itinerary) {
    return null;
  }

  return <ItineraryDisplay html={itinerary.htmlContent} />;
}

