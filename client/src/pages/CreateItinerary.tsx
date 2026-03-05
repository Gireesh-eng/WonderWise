import { useState } from 'react';
import axios from 'axios';
import TripPlannerForm from '../components/TripPlannerForm';
import ItineraryDisplay from '../components/ItineraryDisplay';
import { useAuth } from '../context/AuthContext';

/**
 * Create Itinerary Page
 * Handles the creation of new travel itineraries
 */
export default function CreateItinerary() {
  const [itinerary, setItinerary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refreshUser } = useAuth();

  const handleSubmit = async (formData: {
    destination: string;
    travelDates: string;
    travelers: string;
    budget: string;
    interests: string;
    theme: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/itinerary/generate', formData);
      setItinerary(response.data.itinerary);
      // Refresh user stats (e.g. total itineraries) after successful generation
      await refreshUser();
    } catch (err: any) {
      console.error('Error generating itinerary:', err);
      setError(err.response?.data?.error?.message || 'Failed to generate itinerary. Please try again.');
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setItinerary(null);
            }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (itinerary) {
    return <ItineraryDisplay html={itinerary.htmlContent} />;
  }

  return <TripPlannerForm onSubmit={handleSubmit} isLoading={isLoading} />;
}

