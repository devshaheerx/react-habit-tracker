import { useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { useHabits } from "../context/HabitContext.js";
import { Trash2 } from "lucide-react";
import gsap from "gsap";

export default function Settings() {
  const { user } = useUser();
  const { clearAllHabits } = useHabits();
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current.children,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
    );
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
      <h1 className="font-display text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
        Settings
      </h1>

      <div ref={ref} className="space-y-3 sm:space-y-4">
        <div className="glass rounded-2xl p-4 sm:p-6">
          <h2 className="font-display font-semibold text-slate-100 mb-2 text-sm sm:text-base">
            Account
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono break-all">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>

        <div className="glass rounded-2xl p-4 sm:p-6">
          <h2 className="font-display font-semibold text-slate-100 mb-2 text-sm sm:text-base">
            Danger Zone
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mb-4">
            This will permanently delete all your habits and check-in history.
          </p>
          <button
            onClick={clearAllHabits}
            className="flex items-center gap-2 bg-red-400/10 text-red-300 px-3 sm:px-4 py-2 rounded-xl font-medium text-sm hover:bg-red-400/20 transition"
          >
            <Trash2 size={16} />
            Clear All Habits
          </button>
        </div>
      </div>
    </div>
  );
}
