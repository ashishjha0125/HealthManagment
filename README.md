# 🧠 NutriVision AI - Smart Health Management System

> AI-powered food recognition and calorie tracking system built with React & TensorFlow.js

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.22-FF6F00?style=flat-square&logo=tensorflow)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite)

---

## ✨ Features

- 📸 **Food Image Upload** - Drag & drop or click to upload food photos
- 🤖 **AI Food Recognition** - TensorFlow.js MobileNet model identifies food items
- 🔥 **Calorie Estimation** - Automatic calorie & macro breakdown for detected foods
- 📊 **Daily Tracking** - Track calories, protein, carbs, and fat intake
- 📈 **Visual Dashboard** - Charts and graphs for nutrition trends
- 📋 **Food History** - Complete log of all scanned meals with date filtering
- 💾 **Local Storage** - All data persists locally on your device
- 🎯 **Goal Setting** - Set custom daily calorie and macro targets
- 🌙 **Dark Theme** - Beautiful dark UI with glassmorphism effects

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI Framework |
| **Vite** | Build Tool & Dev Server |
| **TensorFlow.js** | AI/ML in the browser |
| **MobileNet v2** | Pre-trained image classification model |
| **Chart.js** | Data visualization |
| **React Router** | Client-side routing |
| **LocalStorage** | Data persistence |
| **react-dropzone** | File upload handling |
| **react-hot-toast** | Toast notifications |
| **Lucide React** | Icon library |

---

## 📁 Project Structure

```
Health Management/
├── public/                      # Static assets
│   └── vite.svg                 # Favicon
├── src/
│   ├── assets/                  # Images & icons
│   │   ├── images/
│   │   └── icons/
│   ├── components/              # Reusable UI components
│   │   ├── common/              # Shared components
│   │   │   ├── Navbar.jsx       # Top navigation bar
│   │   │   ├── Sidebar.jsx      # Side navigation
│   │   │   ├── Footer.jsx       # Footer
│   │   │   └── Loader.jsx       # Loading spinner
│   │   ├── dashboard/           # Dashboard components
│   │   │   ├── CalorieChart.jsx  # Weekly calorie chart
│   │   │   ├── DailySummary.jsx  # Nutrition stat cards
│   │   │   ├── RecentMeals.jsx   # Recent meals list
│   │   │   └── NutritionOverview.jsx # Macro pie chart
│   │   ├── food/                # Food scanning components
│   │   │   ├── ImageUploader.jsx # Drag & drop uploader
│   │   │   ├── FoodResult.jsx    # AI detection result
│   │   │   ├── FoodHistory.jsx   # Meal history list
│   │   │   └── CalorieDisplay.jsx # Calorie gauge
│   │   └── profile/             # Profile components
│   │       ├── UserProfile.jsx   # User info form
│   │       └── GoalSettings.jsx  # Nutrition goals
│   ├── pages/                   # Page components
│   │   ├── Dashboard.jsx        # Main overview page
│   │   ├── Upload.jsx           # Food scanning page
│   │   ├── History.jsx          # Meal history page
│   │   ├── Profile.jsx          # User profile page
│   │   └── NotFound.jsx         # 404 page
│   ├── hooks/                   # Custom React hooks
│   │   ├── useImageClassifier.js # TF model hook
│   │   ├── useCalorieTracker.js  # Calorie tracking hook
│   │   └── useLocalStorage.js    # LocalStorage hook
│   ├── services/                # Business logic services
│   │   ├── tensorflowService.js  # TF.js model loading/inference
│   │   ├── calorieService.js     # Food → nutrition mapping
│   │   └── storageService.js     # LocalStorage operations
│   ├── context/                 # React Context providers
│   │   ├── MealContext.jsx       # Global meal state
│   │   └── UserContext.jsx       # Global user state
│   ├── utils/                   # Utilities & data
│   │   ├── constants.js          # App-wide constants
│   │   ├── helpers.js            # Helper functions
│   │   └── foodDatabase.js       # Food nutrition database
│   ├── styles/                  # CSS stylesheets
│   │   ├── index.css             # Global styles & reset
│   │   ├── variables.css         # Design tokens / CSS vars
│   │   ├── components/           # Component-specific CSS
│   │   └── pages/                # Page-specific CSS
│   ├── App.jsx                  # Root component with routing
│   ├── App.css                  # App layout styles
│   └── main.jsx                 # Entry point
├── package.json                 # Dependencies & scripts
├── vite.config.js               # Vite configuration
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env

# 3. Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔮 How It Works

1. **Upload** → User uploads/drops a food image
2. **AI Detect** → TensorFlow.js MobileNet model classifies the food
3. **Lookup** → Food name is matched against the nutrition database
4. **Display** → Calories & macros are shown to the user
5. **Track** → Meal is saved to localStorage with timestamp
6. **Visualize** → Dashboard shows daily/weekly nutrition trends

---

## 📝 License

This project is for educational purposes.

---

Built with ❤️ using React & TensorFlow.js
