// GoalSettings Component - Set daily calorie and macro goals with a Rotation Wheel (Knob)
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../../supabase';
import { useAuth } from '../../context/AuthContext';

// Reusable Circular Rotation Dial (Knob) Component
const RotationDial = ({ label, value, onChange, min, max, color, unit }) => {
  const dialRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate percentage to draw the stroke arc
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  
  // SVG Arc drawing logic (270 degree arc for a cool speedometer look)
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  // Let arc be only 75% of a full circle (270 degrees)
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (percentage / 100) * arcLength;

  // Handle Drag calculations
  const calculateValueFromEvent = (e) => {
    if (!dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Get mouse or touch position
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    // Calculate angle in radians
    const x = clientX - centerX;
    const y = clientY - centerY;
    
    // Math.atan2 gives angle from -PI to PI. We want 0 at the bottom left (-225deg) to max at bottom right (45deg).
    // A simpler approach: use purely the Y and X movements or map standard atan2.
    // Let's use standard angle mapping starting from bottom left:
    let angleDeg = Math.atan2(y, x) * (180 / Math.PI);
    
    // Normalize angle to start from 135 degrees (bottom left of wheel) and map to 0-270 scale
    // This is mathematically complex, let's use a simpler mapping:
    // Make it rotate from 135 deg to 405 deg.
    let mappedAngle = angleDeg + 90; // Top is 0
    if (mappedAngle < 0) mappedAngle += 360;
    
    // 0 is top. Our arc starts at -135 from top (225 on 360 scale) to +135 from top.
    let wheelPercent = 0;
    if (mappedAngle >= 225) {
      wheelPercent = (mappedAngle - 225) / 270;
    } else if (mappedAngle <= 135) {
      wheelPercent = (mappedAngle + 135) / 270;
    } else if (mappedAngle > 135 && mappedAngle < 180) {
      wheelPercent = 1; // clip to max right
    } else {
      wheelPercent = 0; // clip to min left
    }
    
    const newValue = Math.round(min + wheelPercent * (max - min));
    onChange(Math.max(min, Math.min(max, newValue)));
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    calculateValueFromEvent(e);
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      calculateValueFromEvent(e);
    }
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="rotation-dial">
      <h4 className="rotation-dial__label">{label}</h4>
      <div 
        className="rotation-dial__wheel-container"
        ref={dialRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <svg viewBox="0 0 120 120" className="rotation-dial__svg">
          {/* Background Track */}
          <circle 
            cx="60" cy="60" r="50"
            fill="none"
            stroke="var(--glass-border)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
            transform="rotate(135 60 60)"
          />
          {/* Active Value Track */}
          <circle 
            cx="60" cy="60" r="50"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(135 60 60)"
            style={{ transition: isDragging ? 'none' : 'stroke-dashoffset 0.3s ease' }}
          />
        </svg>
        
        {/* Center Knob Head */}
        <div 
          className="rotation-dial__knob"
          style={{ transform: `rotate(${-135 + ((percentage / 100) * 270)}deg)` }}
        >
          <div className="rotation-dial__knob-indicator" style={{ backgroundColor: color }} />
        </div>
        
        {/* Value Display in the center */}
        <div className="rotation-dial__value-display">
          <span className="rotation-dial__num">{value}</span>
          <span className="rotation-dial__unit">{unit}</span>
        </div>
      </div>
      
      {/* Quick Input Box for exact value */}
      <input 
        type="number"
        value={value}
        onChange={(e) => onChange(Math.max(min, Math.min(max, Number(e.target.value) || min)))}
        className="rotation-dial__input-fallback"
        min={min} max={max}
      />
    </div>
  );
};


const GoalSettings = () => {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  // Sync with Supabase (or fallback to defaults)
  const [goals, setGoals] = useState({
    calories: user?.targets?.calories || 2000,
    protein: user?.targets?.protein || 120,
    carbs: user?.targets?.carbs || 200,
    fat: user?.targets?.fat || 60,
    water: user?.targets?.water || 8
  });

  // If user loads slowly, update goals when user data arrives
  useEffect(() => {
    if (user?.targets) {
      setGoals({
        calories: user.targets.calories || 2000,
        protein: user.targets.protein || 120,
        carbs: user.targets.carbs || 200,
        fat: user.targets.fat || 60,
        water: user.targets.water || 8
      });
    }
  }, [user]);

  const handleUpdate = (field, value) => {
    setGoals(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    
    // Save perfectly in Supabase auth metadata so it follows the user everywhere
    const { error } = await supabase.auth.updateUser({
      data: { targets: goals }
    });

    if (error) {
      toast.error('Failed to sync to database');
    } else {
      // Keep local sync just for immediate read cache
      localStorage.setItem('nutrivision_goals', JSON.stringify(goals));
      toast.success("Targets synced to Cloud! ☁️🎯");
      window.dispatchEvent(new Event('dashboard-goals-updated'));
    }
    setIsSaving(false);
  };

  return (
    <div className="glass-card goal-settings-panel">
      <div className="goal-settings-panel__header">
        <p className="goal-settings-panel__subtitle">
          Rotate the wheels to adjust your personalized daily health targets.
        </p>
      </div>

      <div className="rotation-wheels-grid">
        <RotationDial 
          label="Calories" 
          value={goals.calories} 
          onChange={(v) => handleUpdate('calories', v)} 
          min={1000} max={4000} 
          color="#3b82f6" 
          unit="kcal" 
        />
        <RotationDial 
          label="Protein" 
          value={goals.protein} 
          onChange={(v) => handleUpdate('protein', v)} 
          min={20} max={300} 
          color="#10b981" 
          unit="g" 
        />
        <RotationDial 
          label="Carbs" 
          value={goals.carbs} 
          onChange={(v) => handleUpdate('carbs', v)} 
          min={20} max={500} 
          color="#f59e0b" 
          unit="g" 
        />
        <RotationDial 
          label="Fat" 
          value={goals.fat} 
          onChange={(v) => handleUpdate('fat', v)} 
          min={10} max={200} 
          color="#ef4444" 
          unit="g" 
        />
        <RotationDial 
          label="Water" 
          value={goals.water} 
          onChange={(v) => handleUpdate('water', v)} 
          min={1} max={20} 
          color="#06b6d4" 
          unit="glasses" 
        />
      </div>

      <button className="goal-settings-panel__save-btn" onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Syncing..." : "Save Target Settings"}
      </button>
    </div>
  );
};

export default GoalSettings;
