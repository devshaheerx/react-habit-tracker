import { useRef } from "react";
import { Flame, Trash2 } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { useHabits } from "../context/HabitContext.js";
import gsap from "gsap";

export default function HabitCard({ habit, onClick }) {
  const { toggleCheckIn, deleteHabit, getStreak } = useHabits();
  const streak = getStreak(habit);
  const today = new Date().toISOString().split("T")[0];
  const doneToday = habit.checkIns.includes(today);
  const flameRef = useRef(null);
  const cardRef = useRef(null);
  const sparkRef = useRef(null);

  const sparkData = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const dateStr = d.toISOString().split("T")[0];
    return { day: i, value: habit.checkIns.includes(dateStr) ? 1 : 0 };
  });

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

    gsap.fromTo(
      sparkRef.current,
      { scale: 0.9, opacity: 0.4 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" },
    );
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="glass group flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 cursor-pointer transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/10"
    >
      <div className="flex-1 min-w-[140px]">
        <h3 className="font-display font-semibold text-sm sm:text-base text-slate-100 group-hover:text-white transition-colors truncate">
          {habit.name}
        </h3>
        <div className="flex items-center gap-1 text-xs sm:text-sm text-amber-400 mt-1 font-mono">
          <span ref={flameRef} className="inline-flex">
            <Flame size={13} fill={doneToday ? "#FBBF24" : "none"} />
          </span>
          {streak} day streak
        </div>
      </div>

      <div
        ref={sparkRef}
        className="hidden sm:block w-16 md:w-20 h-10 opacity-70 group-hover:opacity-100 transition-opacity shrink-0"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparkData}>
            <defs>
              <linearGradient
                id={`spark-${habit.id}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#22D3EE"
              strokeWidth={1.5}
              fill={`url(#spark-${habit.id})`}
              isAnimationActive={true}
              animationDuration={600}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <button
          onClick={handleCheckIn}
          className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 hover:scale-105 active:scale-95 whitespace-nowrap ${
            doneToday
              ? "bg-cyan-400/20 text-cyan-300 hover:bg-cyan-400/30"
              : "bg-white/5 text-slate-300 hover:bg-white/15"
          }`}
        >
          {doneToday ? "Done ✓" : "Mark done"}
        </button>
        <button
          onClick={handleDelete}
          className="p-1.5 rounded-lg text-red-300 hover:bg-red-400/10 hover:scale-110 active:scale-95 transition-all duration-150 shrink-0"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}
