import { useRef } from "react";
import { Flame, Trash2 } from "lucide-react";
import { useHabits } from "../context/HabitContext.js";
import gsap from "gsap";

export default function HabitCard({ habit, onClick }) {
  const { toggleCheckIn, deleteHabit, getStreak } = useHabits();
  const streak = getStreak(habit);
  const today = new Date().toISOString().split("T")[0];
  const doneToday = habit.checkIns.includes(today);
  const flameRef = useRef(null);
  const cardRef = useRef(null);

  const handleDelete = (e) => {
    e.stopPropagation();
    gsap.to(cardRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.25,
      onComplete: () => deleteHabit(habit.id),
    });
  };

  const handleCheckIn = (e) => {
    e.stopPropagation();
    toggleCheckIn(habit.id);
    gsap.fromTo(
      flameRef.current,
      { scale: 0.6, rotate: -10 },
      {
        scale: 1.3,
        rotate: 0,
        duration: 0.35,
        ease: "elastic.out(1, 0.4)",
        yoyo: true,
        repeat: 1,
      },
    );
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="glass group flex items-center justify-between rounded-2xl px-5 py-4 cursor-pointer transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/10"
    >
      <div>
        <h3 className="font-display font-semibold text-slate-100 group-hover:text-white transition-colors">
          {habit.name}
        </h3>
        <div className="flex items-center gap-1 text-sm text-amber-400 mt-1 font-mono">
          <span ref={flameRef} className="inline-flex">
            <Flame size={14} fill={doneToday ? "#FBBF24" : "none"} />
          </span>
          {streak} day streak
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleCheckIn}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 hover:scale-105 active:scale-95 ${
            doneToday
              ? "bg-cyan-400/20 text-cyan-300 hover:bg-cyan-400/30"
              : "bg-white/5 text-slate-300 hover:bg-white/15"
          }`}
        >
          {doneToday ? "Done ✓" : "Mark done"}
        </button>
        <button
          onClick={handleDelete}
          className="p-1.5 rounded-lg text-red-300 hover:bg-red-400/10 hover:scale-110 active:scale-95 transition-all duration-150"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
