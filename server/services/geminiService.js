import { GoogleGenerativeAI } from '@google/generative-ai';

// Theme color configurations
const themeColors = {
  'classic-blue': {
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#3b82f6'
  },
  'tropical-green': {
    primary: '#10b981',
    secondary: '#059669',
    accent: '#34d399'
  },
  'sunset-red': {
    primary: '#ef4444',
    secondary: '#dc2626',
    accent: '#f87171'
  },
  'lavender': {
    primary: '#8b5cf6',
    secondary: '#7c3aed',
    accent: '#a78bfa'
  },
  'golden': {
    primary: '#f59e0b',
    secondary: '#d97706',
    accent: '#fbbf24'
  }
};

/**
 * Generate travel itinerary HTML using Gemini AI
 */
export const generateItinerary = async (formData) => {
  try {
    const { destination, travelDates, travelers, budget, interests, theme } = formData;

    // Initialize Gemini AI
    // Using Gemini 2.5 Flash model as requested. If you see model-not-found errors,
    // check your available models and quotas in the Google AI console.
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Create the detailed prompt
    const prompt = `Generate an HTML travel handbook for ${destination} during ${travelDates} for ${travelers} with a ${budget} budget. Interests include: ${interests}.

Follow this EXACT template structure:

1. HTML Structure:
<!DOCTYPE html>
<html lang="en">
<head>
   - Standard meta tags (UTF-8, viewport)
   - Title: "${destination} Travel Handbook - ${travelDates}"
   
2. CSS Variables in :root (EXACT values):
   --primary-color: ${themeColors[theme]?.primary || themeColors['classic-blue'].primary}
   --secondary-color: ${themeColors[theme]?.secondary || themeColors['classic-blue'].secondary}
   --accent-color: ${themeColors[theme]?.accent || themeColors['classic-blue'].accent}
   --light-bg: #f9f9f9
   --card-bg: #fff
   --text-color: #333
   --header-text: #fff
   --shadow: 0 4px 8px rgba(0,0,0,0.1)
   --hover-shadow: 0 6px 12px rgba(0,0,0,0.15)
   --border-radius: 8px
   
3. Page Structure (EXACT match):
Header:
- h1 with destination name
- p with travel dates
- Background using linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)
- Color: var(--header-text)
- Text-align: center
- Padding: 2em 0
- Border-radius: var(--border-radius)
- Margin-bottom: 20px

Navigation Menu:
- Background: linear-gradient(to right, #333333, #444444)
- Border-radius: var(--border-radius)
- Display: flex
- Justify-content: center
- Padding: 10px 0
- Margin-bottom: 20px
- Links should have:
  * Color: white
  * Padding: 15px 20px
  * Text-decoration: none
  * Transition: color 0.3s ease
  * Font-size: 1.1rem
  * Hover color: var(--primary-color)
- Navigation links to: #itinerary, #maps, #attractions, #language, #etiquette, #travel-tips, #emergency

Container with sidebar and main content:
a) Sidebar (25% width, padding-right: 20px):
   Trip Overview card (class="card trip-overview"):
   - Dates, Travelers, Budget
   - Interests and special notes
   - Each with proper formatting

   Quick Reference card (class="card quick-reference"):
   - Emergency Numbers (Emergency: local, Police: local)
   - Embassy information with full address and phone
   - Medical facilities (2-3) with addresses and phones
   - Natural disaster information
   - Emergency phrases (Help!, Call police!, I need doctor)

   Weather Forecast card (class="card weather-forecast"):
   - General seasonal description
   - City temperatures in both °C and °F
   - Seasonal highlights
   - Precipitation info
   - Packing recommendations

b) Main Content (75% width):
1. Itinerary Section (id="itinerary"):
   - Create 5-7 daily itinerary cards (class="itinerary-day")
   - Each day must have:
     * h3: "Day X: [Descriptive Title]"
     * h4 subsections: Morning, Afternoon, Evening
     * Detailed activities for each time period
     * Travel tips in styled div (class="travel-tip")
   - Styling:
     * border-left: 5px solid var(--primary-color)
     * background: var(--card-bg)
     * padding: 20px
     * border-radius: var(--border-radius)
     * box-shadow: var(--shadow)
     * margin-bottom: 30px
     * hover effects

2. Maps Section (id="maps"):
   - For each major city/location, create card with:
     * h3 with city name
     * div.map-container with Google Maps iframe
     * List of key locations below map
   - Map container styling:
     * width: 100%
     * height: 400px
     * border-radius: var(--border-radius)
     * box-shadow: var(--shadow)
     * border: 1px solid #eee

3. Key Attractions Section (id="attractions"):
   - Tab system with JavaScript
   - Tab buttons for different cities/areas
   - Tab content (class="tabcontent") for each area
   - Each attraction card includes:
     * h4 title
     * Description paragraph
     * Best Time to Visit
     * Admission Fees
   - Active tab styling: linear-gradient(135deg, var(--primary-color) 0%, #FF8000 100%)

4. Language Section (id="language"):
   - 10-15 phrase cards (class="phrase-card")
   - Each with: Local phrase, pronunciation, English translation
   - Left border accent: var(--accent-color)
   - Hover effects

5. Etiquette Section (id="etiquette"):
   - Cards for: General, Dining, Cultural, Transportation
   - Each category (class="etiquette-category")

6. Travel Tips Section (id="travel-tips"):
   - Cards (class="travel-tip-card") for:
     * Money & Payments (with exchange rates)
     * Transportation (local passes, options)
     * Connectivity (WiFi, SIM cards)
     * Packing essentials
     * Cultural tips

7. Emergency Section (id="emergency"):
   - Emergency numbers box (class="emergency-numbers")
   - Red left border accent
   - All critical contact info

4. Styling Requirements (EXACT):
- Font family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- All cards: background var(--card-bg), border-radius var(--border-radius), box-shadow var(--shadow), padding 25px, margin-bottom 25px
- Card hover: transform translateY(-5px), box-shadow var(--hover-shadow)
- All transitions: 0.3s ease
- Font sizes:
  * h1: 2.5rem
  * h2: 2rem, margin-bottom 20px
  * h3: 1.5rem, margin-bottom 15px
  * h4: 1rem, color var(--primary-color), margin-bottom 10px
  * p: 1rem, margin-bottom 10px
  * small: 0.9rem

5. JavaScript (include in <script> tag):
- Tab switching function
- Smooth scroll for navigation
- Must be working and complete

6. Responsive Design:
- @media (max-width: 768px): stack sidebar and content
- @media (max-width: 480px): adjust font sizes and padding

Generate a complete, standalone HTML document that is production-ready. Include real, researched information about ${destination}. Make it comprehensive with at least 5 days of detailed itinerary, accurate emergency contacts, real restaurant recommendations, and practical local insights.

IMPORTANT: Return ONLY the complete HTML code, nothing else. No markdown, no explanations, just pure HTML.`;

    // Generate content
    const startTime = Date.now();
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const htmlContent = response.text();
    const generationTime = Date.now() - startTime;

    // Clean the HTML content (remove markdown code blocks if present)
    let cleanedHtml = htmlContent.trim();
    if (cleanedHtml.startsWith('```html')) {
      cleanedHtml = cleanedHtml.replace(/```html\n?/, '').replace(/\n?```$/, '');
    } else if (cleanedHtml.startsWith('```')) {
      cleanedHtml = cleanedHtml.replace(/```\n?/, '').replace(/\n?```$/, '');
    }

    return {
      html: cleanedHtml,
      metadata: {
        generationTime,
        aiModel: 'gemini-2.5-flash',
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error(`Failed to generate itinerary: ${error.message}`);
  }
};

