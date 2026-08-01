import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Plus, ListChecks, Flame, CheckCircle2 } from "lucide-react";
import { useHabits } from "../context/HabitContext.js";
import HabitCard from "../components/HabitCard";
import WeeklyActivityChart from "../components/WeeklyActivityChart";
import gsap from "gsap";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const { user } = useUser();
  const { habits, addHabit, getStreak } = useHabits();
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const listRef = useRef(null);
  const statsRef = useRef(null);

  const today = new Date().toISOString().split("T")[0];
  const doneTodayCount = habits.filter((h) =>
    h.checkIns.includes(today),
  ).length;
  const bestStreak = habits.reduce((max, h) => Math.max(max, getStreak(h)), 0);

  useEffect(() => {
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, x: 16 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" },
      );
    }
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
    gsap.fromTo(
      listRef.current.children,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
    );
  }, [habits.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addHabit(name);
    setName("");
  };

  const stats = [
    {
      label: "Total Habits",
      value: habits.length,
      icon: ListChecks,
      color: "text-cyan-400",
    },
    {
      label: "Done Today",
      value: doneTodayCount,
      icon: CheckCircle2,
      color: "text-emerald-400",
    },
    {
      label: "Best Streak",
      value: bestStreak,
      icon: Flame,
      color: "text-amber-400",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8 group cursor-default">
        <p className="text-slate-400 text-sm">{getGreeting()},</p>
        <h1 className="font-display text-3xl font-bold text-white transition-colors duration-200 group-hover:text-cyan-300">
          {user?.firstName || user?.username || "there"}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Main column */}
        <div>
          <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Drink water"
              className="glass-input flex-1 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-500 transition-colors duration-200 hover:bg-white/10"
            />
            <button
              type="submit"
              className="flex items-center gap-1 bg-cyan-400/90 text-slate-900 font-medium px-4 py-2.5 rounded-xl hover:bg-cyan-300 hover:scale-105 active:scale-95 transition-transform duration-150"
            >
              <Plus size={18} />
              Add
            </button>
          </form>

          {habits.length === 0 ? (
            <div className="glass rounded-2xl p-10 text-center transition-colors duration-200 hover:bg-white/10">
              <p className="text-slate-400">
                No habits yet — add your first one above.
              </p>
            </div>
          ) : (
            <div ref={listRef} className="grid gap-4">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onClick={() => navigate(`/habits/${habit.id}`)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:sticky lg:top-24 space-y-4">
          <div ref={statsRef} className="grid grid-cols-3 lg:grid-cols-1 gap-3">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                className="glass group rounded-2xl p-4 lg:flex lg:items-center lg:gap-3 text-center lg:text-left transition-all duration-200 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <Icon
                  className={`mx-auto lg:mx-0 mb-1 lg:mb-0 transition-transform duration-200 group-hover:scale-125 ${color}`}
                  size={20}
                />
                <div>
                  <div className="font-mono text-xl font-semibold text-white">
                    {value}
                  </div>
                  <div className="text-xs text-slate-400">{label}</div>
                </div>
              </div>
            ))}
          </div>

          {habits.length > 0 && <WeeklyActivityChart />}
        </div>
      </div>
    </div>
  );
}
