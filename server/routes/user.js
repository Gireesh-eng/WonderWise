import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

/**
 * @route   GET /api/user/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ 
        error: { message: 'User not found', status: 404 } 
      });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ 
      error: { message: 'Failed to fetch profile', status: 500 } 
    });
  }
});

/**
 * @route   PATCH /api/user/profile
 * @desc    Update user profile
 * @access  Private
 */
router.patch('/profile', authenticate, [
  body('name').optional().trim().isLength({ min: 2, max: 50 }),
  body('preferences.defaultBudget').optional().isIn([
    'Budget ($50-100/day)',
    'Mid-range ($100-250/day)',
    'Luxury ($250-500/day)',
    'Ultra-luxury ($500+/day)'
  ])
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: { message: errors.array()[0].msg, status: 400 } });
    }

    const { name, profilePicture, preferences } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (profilePicture) updateData.profilePicture = profilePicture;
    if (preferences) {
      if (preferences.defaultBudget) updateData['preferences.defaultBudget'] = preferences.defaultBudget;
      if (preferences.interests) updateData['preferences.interests'] = preferences.interests;
      if (preferences.favoriteDestinations) updateData['preferences.favoriteDestinations'] = preferences.favoriteDestinations;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ 
      message: 'Profile updated successfully',
      user 
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ 
      error: { message: 'Failed to update profile', status: 500 } 
    });
  }
});

/**
 * @route   GET /api/user/stats
 * @desc    Get user statistics
 * @access  Private
 */
router.get('/stats', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.json({ 
      stats: user.stats,
      preferences: user.preferences
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ 
      error: { message: 'Failed to fetch stats', status: 500 } 
    });
  }
});

export default router;

