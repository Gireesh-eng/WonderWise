import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate } from '../middleware/auth.js';
import Itinerary from '../models/Itinerary.js';
import User from '../models/User.js';
import { generateItinerary } from '../services/geminiService.js';

const router = express.Router();

/**
 * @route   POST /api/itinerary/generate
 * @desc    Generate a new travel itinerary using AI
 * @access  Private
 */
router.post('/generate', authenticate, [
  body('destination').trim().notEmpty().withMessage('Destination is required'),
  body('travelDates').trim().notEmpty().withMessage('Travel dates are required'),
  body('travelers').trim().notEmpty().withMessage('Number of travelers is required'),
  body('budget').trim().notEmpty().withMessage('Budget is required'),
  body('interests').trim().notEmpty().withMessage('Interests are required'),
  body('theme').trim().notEmpty().withMessage('Theme is required')
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: { message: errors.array()[0].msg, status: 400 } });
    }

    const { destination, travelDates, travelers, budget, interests, theme } = req.body;

    // Generate itinerary using Gemini AI
    const result = await generateItinerary({
      destination,
      travelDates,
      travelers,
      budget,
      interests,
      theme
    });

    // Create itinerary document
    const itinerary = new Itinerary({
      user: req.user._id,
      destination,
      travelDates,
      travelers,
      budget,
      interests,
      theme,
      htmlContent: result.html,
      fileName: `${destination.toLowerCase().replace(/[^a-z0-9]/g, '-')}-travel-plan.html`,
      metadata: {
        generationTime: result.metadata.generationTime,
        aiModel: result.metadata.aiModel
      }
    });

    await itinerary.save();

    // Update user stats
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { 'stats.totalItineraries': 1 }
    });

    res.status(201).json({
      message: 'Itinerary generated successfully',
      itinerary: {
        id: itinerary._id,
        destination: itinerary.destination,
        travelDates: itinerary.travelDates,
        travelers: itinerary.travelers,
        budget: itinerary.budget,
        interests: itinerary.interests,
        theme: itinerary.theme,
        htmlContent: itinerary.htmlContent,
        fileName: itinerary.fileName,
        metadata: itinerary.metadata,
        createdAt: itinerary.createdAt
      }
    });
  } catch (error) {
    console.error('Itinerary generation error:', error);
    res.status(500).json({ 
      error: { message: error.message || 'Failed to generate itinerary', status: 500 } 
    });
  }
});

/**
 * @route   GET /api/itinerary
 * @desc    Get all itineraries for the logged-in user
 * @access  Private
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    
    const query = { user: req.user._id };
    
    if (status) {
      query.status = status;
    }
    
    if (search) {
      query.destination = { $regex: search, $options: 'i' };
    }

    const itineraries = await Itinerary.find(query)
      .select('-htmlContent') // Exclude large HTML content in list view
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Itinerary.countDocuments(query);

    res.json({
      itineraries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching itineraries:', error);
    res.status(500).json({ 
      error: { message: 'Failed to fetch itineraries', status: 500 } 
    });
  }
});

/**
 * @route   GET /api/itinerary/:id
 * @desc    Get a specific itinerary by ID
 * @access  Private
 */
router.get('/:id', authenticate, async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!itinerary) {
      return res.status(404).json({ 
        error: { message: 'Itinerary not found', status: 404 } 
      });
    }

    res.json({ itinerary });
  } catch (error) {
    console.error('Error fetching itinerary:', error);
    res.status(500).json({ 
      error: { message: 'Failed to fetch itinerary', status: 500 } 
    });
  }
});

/**
 * @route   PATCH /api/itinerary/:id
 * @desc    Update an itinerary (favorite, status, etc.)
 * @access  Private
 */
router.patch('/:id', authenticate, async (req, res) => {
  try {
    const { isFavorite, status } = req.body;
    
    const updateData = {};
    if (typeof isFavorite !== 'undefined') updateData.isFavorite = isFavorite;
    if (status) updateData.status = status;

    const itinerary = await Itinerary.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updateData,
      { new: true, runValidators: true }
    ).select('-htmlContent');

    if (!itinerary) {
      return res.status(404).json({ 
        error: { message: 'Itinerary not found', status: 404 } 
      });
    }

    res.json({ 
      message: 'Itinerary updated successfully',
      itinerary 
    });
  } catch (error) {
    console.error('Error updating itinerary:', error);
    res.status(500).json({ 
      error: { message: 'Failed to update itinerary', status: 500 } 
    });
  }
});

/**
 * @route   DELETE /api/itinerary/:id
 * @desc    Delete an itinerary
 * @access  Private
 */
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const itinerary = await Itinerary.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!itinerary) {
      return res.status(404).json({ 
        error: { message: 'Itinerary not found', status: 404 } 
      });
    }

    // Update user stats
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { 'stats.totalItineraries': -1 }
    });

    res.json({ message: 'Itinerary deleted successfully' });
  } catch (error) {
    console.error('Error deleting itinerary:', error);
    res.status(500).json({ 
      error: { message: 'Failed to delete itinerary', status: 500 } 
    });
  }
});

export default router;

