import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  destination: {
    type: String,
    required: [true, 'Destination is required'],
    trim: true
  },
  travelDates: {
    type: String,
    required: [true, 'Travel dates are required']
  },
  travelers: {
    type: String,
    required: [true, 'Number of travelers is required']
  },
  budget: {
    type: String,
    required: [true, 'Budget is required']
  },
  interests: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    required: true,
    default: 'classic-blue'
  },
  htmlContent: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    default: 'travel-handbook.html'
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'completed', 'archived'],
    default: 'completed'
  },
  metadata: {
    generationTime: {
      type: Number, // in milliseconds
      default: 0
    },
    aiModel: {
      type: String,
      // Store which Gemini model generated this itinerary
      default: 'gemini-2.5-flash'
    },
    wordCount: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for faster queries
itinerarySchema.index({ user: 1, createdAt: -1 });
itinerarySchema.index({ destination: 'text' });

// Calculate word count before saving
itinerarySchema.pre('save', function(next) {
  if (this.htmlContent) {
    const text = this.htmlContent.replace(/<[^>]*>/g, '');
    this.metadata.wordCount = text.split(/\s+/).length;
  }
  next();
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

export default Itinerary;

