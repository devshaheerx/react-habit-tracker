import { useMemo, useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { useHabits } from "../context/HabitContext.js";
import gsap from "gsap";

export default function WeeklyActivityChart() {
  const { habits } = useHabits();
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  const data = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dateStr = d.toISOString().split("T")[0];
      const label = d.toLocaleDateString("en-US", { weekday: "short" });
      const isToday = i === 6;
      const count = habits.filter((h) => h.checkIns.includes(dateStr)).length;
      return { day: label, count, isToday };
    });
  }, [habits]);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      titleRef.current,
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
    ).fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.92, y: 16 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.4)" },
      "-=0.2",
    );
  }, []);

  return (
    <div className="glass rounded-2xl p-3 sm:p-4 overflow-hidden">
      <h3
        ref={titleRef}
        className="font-display text-xs sm:text-sm font-semibold text-slate-300 mb-2"
      >
        This Week's Activity
      </h3>
      <div ref={containerRef}>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart
            data={data}
            margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
          >
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94A3B8",
                fontSize: 10,
                fontFamily: "IBM Plex Mono",
              }}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{
                background: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "0.75rem",
                fontSize: "12px",
                color: "#E2E8F0",
              }}
              labelStyle={{ color: "#94A3B8" }}
            />
            <Bar
              dataKey="count"
              radius={[6, 6, 0, 0]}
              maxBarSize={24}
              animationDuration={900}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.isToday ? "#FBBF24" : "#22D3EE"}
                  fillOpacity={entry.isToday ? 1 : 0.75}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
