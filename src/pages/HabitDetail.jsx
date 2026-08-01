import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Flame, Trash2, Calendar } from "lucide-react";
import { useHabits } from "../context/HabitContext.js";
import gsap from "gsap";

export default function HabitDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { habits, toggleCheckIn, deleteHabit, getStreak } = useHabits();
  const streakRef = useRef(null);
  const panelRef = useRef(null);

  const habit = habits.find((h) => h.id === id);
  const streak = habit ? getStreak(habit) : 0;

  useEffect(() => {
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4 },
    );
  }, []);

  useEffect(() => {
    if (!streakRef.current) return;
    const counter = { val: 0 };
    gsap.to(counter, {
      val: streak,
      duration: 0.6,
      ease: "power1.out",
      onUpdate: () => {
        streakRef.current.textContent = Math.round(counter.val);
      },
    });
  }, [streak]);

  if (!habit) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <p className="text-slate-400 mb-4">Habit not found.</p>
        <button
          onClick={() => navigate("/")}
          className="text-cyan-400 font-medium hover:underline"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const doneToday = habit.checkIns.includes(today);

  const handleDelete = () => {
    deleteHabit(habit.id);
    navigate("/");
  };

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-1 text-slate-400 hover:text-slate-200 mb-6 text-sm"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div ref={panelRef} className="glass-strong rounded-2xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="font-display text-xl font-bold text-white">
              {habit.name}
            </h1>
            <div className="flex items-center gap-1 text-amber-400 mt-1 font-mono">
              <Flame size={16} />
              <span ref={streakRef}>0</span> day streak
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg text-red-300 hover:bg-red-400/10 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <button
          onClick={() => toggleCheckIn(habit.id)}
          className={`w-full py-2.5 rounded-xl font-medium mb-6 transition ${
            doneToday
              ? "bg-cyan-400/20 text-cyan-300"
              : "bg-cyan-400/90 text-slate-900 hover:bg-cyan-300"
          }`}
        >
          {doneToday ? "Done Today ✓" : "Mark as Done Today"}
        </button>

        <div>
          <div className="flex items-center gap-1 text-sm text-slate-400 mb-2">
            <Calendar size={14} />
            Last 7 days
          </div>
          <div className="flex gap-2">
            {last7Days.map((date) => {
              const checked = habit.checkIns.includes(date);
              const day = new Date(date).toLocaleDateString("en-US", {
                weekday: "short",
              });
              return (
                <div key={date} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono ${
                      checked
                        ? "bg-cyan-400 text-slate-900"
                        : "bg-white/5 text-slate-500"
                    }`}
                  >
                    {checked ? "✓" : ""}
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    {day[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
