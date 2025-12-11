'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Printer, 
  Eye, 
  EyeOff, 
  Share2, 
  BookOpen,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Star,
  Coffee,
  Camera
} from 'lucide-react';

interface ItineraryDisplayProps {
  html: string;
}

export default function ItineraryDisplay({ html }: ItineraryDisplayProps) {
  const [showRawHtml, setShowRawHtml] = useState(false);
  const [copied, setCopied] = useState(false);

  const downloadHtml = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'travel-handbook.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const openFullscreen = () => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(html);
      newWindow.document.close();
    }
  };

  const shareHandbook = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Travel Handbook',
          text: 'Check out my AI-generated travel handbook!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy link to clipboard
      copyToClipboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Your Travel Handbook</h1>
                <p className="text-sm text-gray-600">AI-generated personalized travel guide</p>
              </div>
            </div>
            
            {/* Success Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              <Check className="h-4 w-4" />
              <span>Successfully Generated</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Quick Actions
            </h2>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-gray-600">Premium Quality</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadHtml}
              className="flex flex-col items-center space-y-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-4 rounded-xl font-medium transition duration-200 shadow-lg"
            >
              <Download className="h-6 w-6" />
              <span className="text-sm">Download HTML</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadPDF}
              className="flex flex-col items-center space-y-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white p-4 rounded-xl font-medium transition duration-200 shadow-lg"
            >
              <Printer className="h-6 w-6" />
              <span className="text-sm">Print PDF</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openFullscreen}
              className="flex flex-col items-center space-y-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white p-4 rounded-xl font-medium transition duration-200 shadow-lg"
            >
              <ExternalLink className="h-6 w-6" />
              <span className="text-sm">Open Full</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareHandbook}
              className="flex flex-col items-center space-y-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white p-4 rounded-xl font-medium transition duration-200 shadow-lg"
            >
              <Share2 className="h-6 w-6" />
              <span className="text-sm">Share</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyToClipboard}
              className="flex flex-col items-center space-y-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white p-4 rounded-xl font-medium transition duration-200 shadow-lg"
            >
              {copied ? <Check className="h-6 w-6" /> : <Copy className="h-6 w-6" />}
              <span className="text-sm">{copied ? 'Copied!' : 'Copy HTML'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowRawHtml(!showRawHtml)}
              className="flex flex-col items-center space-y-2 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white p-4 rounded-xl font-medium transition duration-200 shadow-lg"
            >
              {showRawHtml ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
              <span className="text-sm">{showRawHtml ? 'Hide' : 'Show'} Code</span>
            </motion.button>
          </div>
        </div>

        {/* Raw HTML Display */}
        {showRawHtml && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-gray-900 rounded-2xl p-6 overflow-hidden mb-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Generated HTML Code
              </h3>
              <button
                onClick={copyToClipboard}
                className="text-gray-300 hover:text-white text-sm flex items-center gap-1"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 max-h-96 overflow-auto">
              <pre className="text-green-400 text-sm">
                <code>{html}</code>
              </pre>
            </div>
          </motion.div>
        )}

        {/* Handbook Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Travel Handbook Preview</h3>
                <p className="text-blue-100 text-sm">
                  Your personalized travel guide is ready! ✈️
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Coffee className="h-5 w-5 text-blue-200" />
                <Camera className="h-5 w-5 text-blue-200" />
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
              style={{
                lineHeight: '1.6',
                color: '#374151'
              }}
            />
          </div>
        </motion.div>

        {/* Usage Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6"
        >
          <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            📖 How to use your travel handbook:
          </h4>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-blue-800">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold mb-3 flex items-center gap-2">
                <Download className="h-4 w-4" />
                💾 Saving Options:
              </h5>
              <ul className="space-y-2">
                <li>• Download as HTML file for offline viewing</li>
                <li>• Print to PDF using your browser's print function</li>
                <li>• Copy HTML code to embed or modify</li>
                <li>• Open in fullscreen for better viewing</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold mb-3 flex items-center gap-2">
                <Star className="h-4 w-4" />
                🌟 Features:
              </h5>
              <ul className="space-y-2">
                <li>• Comprehensive daily itineraries</li>
                <li>• Local restaurant recommendations</li>
                <li>• Emergency information and contacts</li>
                <li>• Weather forecasts and packing tips</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold mb-3 flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                📱 Sharing:
              </h5>
              <ul className="space-y-2">
                <li>• Share with travel companions</li>
                <li>• Access from any device</li>
                <li>• Works offline after download</li>
                <li>• Print for physical backup</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

