// Food Database - Calorie and nutrition data for common foods
// This maps food names (that MobileNet might detect) to their nutrition values
// Values are per standard serving

/**
 * Food database with nutritional information per serving
 * Keys are lowercase food names
 * Values: { calories, protein (g), carbs (g), fat (g), fiber (g), serving }
 */
export const FOOD_DATABASE = {
  // ── Fruits ──
  'apple': { calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4, serving: '1 medium (182g)' },
  'banana': { calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3, serving: '1 medium (118g)' },
  'orange': { calories: 62, protein: 1.2, carbs: 15, fat: 0.2, fiber: 3, serving: '1 medium (131g)' },
  'strawberry': { calories: 49, protein: 1, carbs: 12, fat: 0.5, fiber: 3, serving: '1 cup (152g)' },
  'grapes': { calories: 104, protein: 1.1, carbs: 27, fat: 0.2, fiber: 1.4, serving: '1 cup (151g)' },
  'watermelon': { calories: 46, protein: 0.9, carbs: 11, fat: 0.2, fiber: 0.6, serving: '1 cup (152g)' },
  'mango': { calories: 99, protein: 1.4, carbs: 25, fat: 0.6, fiber: 2.6, serving: '1 cup (165g)' },
  'pineapple': { calories: 82, protein: 0.9, carbs: 22, fat: 0.2, fiber: 2.3, serving: '1 cup (165g)' },

  // ── Vegetables ──
  'broccoli': { calories: 55, protein: 3.7, carbs: 11, fat: 0.6, fiber: 5, serving: '1 cup cooked (156g)' },
  'carrot': { calories: 25, protein: 0.6, carbs: 6, fat: 0.1, fiber: 1.7, serving: '1 medium (61g)' },
  'cucumber': { calories: 16, protein: 0.7, carbs: 4, fat: 0.1, fiber: 0.5, serving: '1 cup (104g)' },
  'tomato': { calories: 22, protein: 1.1, carbs: 5, fat: 0.2, fiber: 1.5, serving: '1 medium (123g)' },
  'spinach': { calories: 41, protein: 5.3, carbs: 7, fat: 0.5, fiber: 4, serving: '1 cup cooked (180g)' },

  // ── Proteins ──
  'chicken': { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, serving: '100g breast' },
  'egg': { calories: 78, protein: 6, carbs: 0.6, fat: 5, fiber: 0, serving: '1 large (50g)' },
  'fish': { calories: 136, protein: 20, carbs: 0, fat: 6, fiber: 0, serving: '100g fillet' },
  'steak': { calories: 271, protein: 26, carbs: 0, fat: 18, fiber: 0, serving: '100g' },

  // ── Grains & Bread ──
  'rice': { calories: 206, protein: 4.3, carbs: 45, fat: 0.4, fiber: 0.6, serving: '1 cup cooked (158g)' },
  'bread': { calories: 79, protein: 2.7, carbs: 15, fat: 1, fiber: 0.6, serving: '1 slice (30g)' },
  'pasta': { calories: 220, protein: 8, carbs: 43, fat: 1.3, fiber: 2.5, serving: '1 cup cooked (140g)' },
  'naan': { calories: 262, protein: 8.7, carbs: 45, fat: 5.1, fiber: 2, serving: '1 piece (90g)' },
  'roti': { calories: 120, protein: 3.5, carbs: 20, fat: 3.7, fiber: 2, serving: '1 piece (40g)' },

  // ── Fast Food ──
  'pizza': { calories: 285, protein: 12, carbs: 36, fat: 10, fiber: 2.5, serving: '1 slice (107g)' },
  'hamburger': { calories: 354, protein: 20, carbs: 29, fat: 17, fiber: 1, serving: '1 burger' },
  'french fries': { calories: 365, protein: 4, carbs: 48, fat: 17, fiber: 4, serving: '1 medium (117g)' },
  'hot dog': { calories: 290, protein: 11, carbs: 24, fat: 17, fiber: 0.7, serving: '1 hot dog' },
  'sandwich': { calories: 350, protein: 15, carbs: 35, fat: 16, fiber: 2, serving: '1 sandwich' },
  'burrito': { calories: 430, protein: 18, carbs: 50, fat: 18, fiber: 4, serving: '1 burrito' },

  // ── Indian Food ──
  'biryani': { calories: 350, protein: 12, carbs: 45, fat: 14, fiber: 2, serving: '1 plate (250g)' },
  'dal': { calories: 180, protein: 12, carbs: 30, fat: 2, fiber: 8, serving: '1 cup (200g)' },
  'curry': { calories: 250, protein: 15, carbs: 20, fat: 12, fiber: 3, serving: '1 cup (240g)' },
  'samosa': { calories: 262, protein: 4, carbs: 28, fat: 15, fiber: 2, serving: '1 piece (100g)' },
  'dosa': { calories: 168, protein: 4, carbs: 28, fat: 4, fiber: 1, serving: '1 dosa (100g)' },
  'idli': { calories: 58, protein: 2, carbs: 12, fat: 0.4, fiber: 0.5, serving: '1 piece (40g)' },
  'paneer': { calories: 265, protein: 18, carbs: 3.6, fat: 20, fiber: 0, serving: '100g' },
  'paratha': { calories: 200, protein: 4, carbs: 28, fat: 8, fiber: 2, serving: '1 piece (60g)' },
  'chapati': { calories: 120, protein: 3.5, carbs: 20, fat: 3.7, fiber: 2, serving: '1 piece (40g)' },

  // ── Beverages ──
  'coffee': { calories: 2, protein: 0.3, carbs: 0, fat: 0, fiber: 0, serving: '1 cup black (240ml)' },
  'tea': { calories: 2, protein: 0, carbs: 0.5, fat: 0, fiber: 0, serving: '1 cup (240ml)' },
  'milk': { calories: 149, protein: 8, carbs: 12, fat: 8, fiber: 0, serving: '1 cup (244ml)' },
  'juice': { calories: 112, protein: 0.8, carbs: 26, fat: 0.3, fiber: 0.5, serving: '1 cup (248ml)' },
  'smoothie': { calories: 210, protein: 4, carbs: 40, fat: 3, fiber: 3, serving: '1 cup (250ml)' },

  // ── Desserts & Snacks ──
  'cake': { calories: 350, protein: 4, carbs: 50, fat: 15, fiber: 1, serving: '1 slice (100g)' },
  'ice cream': { calories: 207, protein: 4, carbs: 24, fat: 11, fiber: 0, serving: '1 cup (132g)' },
  'chocolate': { calories: 155, protein: 1.4, carbs: 17, fat: 9, fiber: 1, serving: '1 bar (28g)' },
  'cookie': { calories: 160, protein: 2, carbs: 22, fat: 7, fiber: 0.5, serving: '1 cookie (35g)' },
  'donut': { calories: 289, protein: 5, carbs: 33, fat: 16, fiber: 0.8, serving: '1 donut (75g)' },
  'chips': { calories: 152, protein: 2, carbs: 15, fat: 10, fiber: 1, serving: '1 oz (28g)' },
  'popcorn': { calories: 93, protein: 3, carbs: 19, fat: 1, fiber: 3.5, serving: '3 cups popped' },

  // ── Nuts & Seeds ──
  'almonds': { calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5, serving: '1 oz (28g)' },
  'peanuts': { calories: 161, protein: 7, carbs: 5, fat: 14, fiber: 2, serving: '1 oz (28g)' },
  'walnuts': { calories: 185, protein: 4.3, carbs: 4, fat: 18, fiber: 2, serving: '1 oz (28g)' },

  // ── Dairy ──
  'cheese': { calories: 113, protein: 7, carbs: 0.4, fat: 9, fiber: 0, serving: '1 slice (28g)' },
  'yogurt': { calories: 100, protein: 17, carbs: 6, fat: 0.7, fiber: 0, serving: '1 cup (227g)' },
  'butter': { calories: 102, protein: 0.1, carbs: 0, fat: 12, fiber: 0, serving: '1 tbsp (14g)' },

  // ── Salads ──
  'salad': { calories: 150, protein: 5, carbs: 12, fat: 10, fiber: 3, serving: '1 bowl (200g)' },
  'caesar salad': { calories: 220, protein: 8, carbs: 10, fat: 16, fiber: 2, serving: '1 bowl (250g)' },

  // ── Soup ──
  'soup': { calories: 120, protein: 5, carbs: 18, fat: 3, fiber: 2, serving: '1 bowl (240ml)' },
};

/**
 * Get all food categories
 */
export const FOOD_CATEGORIES = {
  fruits: ['apple', 'banana', 'orange', 'strawberry', 'grapes', 'watermelon', 'mango', 'pineapple'],
  vegetables: ['broccoli', 'carrot', 'cucumber', 'tomato', 'spinach'],
  proteins: ['chicken', 'egg', 'fish', 'steak'],
  grains: ['rice', 'bread', 'pasta', 'naan', 'roti'],
  fastFood: ['pizza', 'hamburger', 'french fries', 'hot dog', 'sandwich', 'burrito'],
  indianFood: ['biryani', 'dal', 'curry', 'samosa', 'dosa', 'idli', 'paneer', 'paratha', 'chapati'],
  beverages: ['coffee', 'tea', 'milk', 'juice', 'smoothie'],
  desserts: ['cake', 'ice cream', 'chocolate', 'cookie', 'donut', 'chips', 'popcorn'],
  nuts: ['almonds', 'peanuts', 'walnuts'],
  dairy: ['cheese', 'yogurt', 'butter'],
};

export default FOOD_DATABASE;
