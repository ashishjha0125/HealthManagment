import { useState, useEffect } from 'react';
import { useMeals } from '../../context/MealContext';
import { Droplet, Plus, Minus, Bell, BellOff } from 'lucide-react';
import toast from 'react-hot-toast';
import '../../styles/components/watertracker.css';

const WaterTracker = () => {
  const { todaysMeals, addMeal, deleteMeal, goals } = useMeals();
  const [reminderActive, setReminderActive] = useState(false);
  const [reminderInterval, setReminderInterval] = useState(60); // minutes

  // We uniquely identify water by its exact name to save it in the DB without changing Tables!
  const WATER_MEAL_NAME = 'Glass of Water 💧';
  
  const waterMeals = todaysMeals.filter(m => m.name === WATER_MEAL_NAME);
  const waterCount = waterMeals.length;
  const goal = goals?.water || 8; // Custom target from Supabase Cloud
  const percentage = Math.min((waterCount / goal) * 100, 100);

  // Function to create a clean 'Drop/Bloop' sound without any external files (Using Web Audio API)
  const playDropSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      // Start high, drop low like a drip
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.15);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.02);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch(e) { console.error('Audio play failed', e); }
  };

  // Setup Notification Reminder
  useEffect(() => {
    let intervalId;
    if (reminderActive) {
      toast.success(`Reminder set! I'll notify you every ${reminderInterval} minute(s).`, { icon: '⏰' });
      intervalId = setInterval(() => {
        playDropSound(); // Play the sound!!
        toast("Hey! It's time to drink water! Stay hydrated! 💧", { 
          icon: '💦', 
          duration: 6000,
          style: { border: '2px solid #3b82f6', color: '#3b82f6' }
        });
      }, reminderInterval * 60000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [reminderActive, reminderInterval]);

  const handleAddWater = () => {
    // Add a 0 calorie "meal" that acts as a water record
    addMeal({
      name: WATER_MEAL_NAME,
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      image_url: 'water'
    });
  };

  const handleRemoveWater = () => {
    if (waterCount > 0) {
      // Find the most recently added water
      const lastWater = waterMeals[0]; // because meals are ordered by created_at descending
      if (lastWater) {
        deleteMeal(lastWater.id);
      }
    }
  };

  return (
    <div className="glass-card water-tracker">
      <div className="water-tracker__info">
        <div className="water-tracker__header">
          <Droplet size={24} className="water-tracker__icon" color="#3b82f6" fill={waterCount > 0 ? "#3b82f6" : "none"} />
          <h3 className="water-tracker__title">Daily Hydration</h3>
        </div>
        
        <p className="water-tracker__status">
          <span className="water-tracker__count">{waterCount}</span> 
          <span className="water-tracker__goal">/ {goal} glasses</span>
        </p>
        <p className="water-tracker__volume">{(waterCount * 250)} ml total <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>(1 glass = 250ml)</span></p>

        <div className="water-tracker__controls-wrap">
          <div className="water-tracker__controls">
            <button 
              className="water-btn water-btn--remove" 
              onClick={handleRemoveWater}
              disabled={waterCount === 0}
            >
              <Minus size={18} />
            </button>
            <button 
              className="water-btn water-btn--add" 
              onClick={handleAddWater}
            >
              <Plus size={18} />
            </button>
          </div>
          
          {/* Reminder Toggle */}
          <div className="water-tracker__reminder">
            <button 
              className={`water-reminder-btn ${reminderActive ? 'active' : ''}`}
              onClick={() => setReminderActive(!reminderActive)}
              title="Toggle Hydration Reminder"
            >
              {reminderActive ? <Bell size={16} /> : <BellOff size={16} />}
              {reminderActive ? 'On' : 'Remind me'}
            </button>
            {reminderActive && (
              <select 
                className="water-reminder-select"
                value={reminderInterval}
                onChange={(e) => setReminderInterval(Number(e.target.value))}
              >
                <option value={1}>Every 1m (Test)</option>
                <option value={30}>Every 30m</option>
                <option value={60}>Every 1 hr</option>
                <option value={120}>Every 2 hr</option>
              </select>
            )}
          </div>
        </div>
      </div>

      <div className="water-tracker__visual">
        <div className="water-glass">
          <div 
            className="water-fill" 
            style={{ height: `${percentage}%` }}
          >
            {/* The liquid waves */}
            <div className={`wave wave1 ${waterCount === 0 ? 'paused' : ''}`}></div>
            <div className={`wave wave2 ${waterCount === 0 ? 'paused' : ''}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;
