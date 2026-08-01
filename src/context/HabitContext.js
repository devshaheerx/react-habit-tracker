import {
  createContext,
  useContext,
  useEffect,
  useState,
  createElement,
} from "react";
import { useUser } from "@clerk/clerk-react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const HabitContext = createContext();

export function HabitProvider({ children }) {
  const { user, isLoaded } = useUser();
  const [habits, setHabits] = useState([]);
  const storageKey = user ? `habits_${user.id}` : null;

  useEffect(() => {
    if (!isLoaded || !user) return;
    try {
      const saved = localStorage.getItem(storageKey);
      setHabits(saved ? JSON.parse(saved) : []);
    } catch (err) {
      toast.error("Failed to load saved habits — data may be corrupted");
      setHabits([]);
    }
  }, [isLoaded, user, storageKey]);

  useEffect(() => {
    if (!storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(habits));
    } catch (err) {
      toast.error("Failed to save habits — storage may be full");
    }
  }, [habits, storageKey]);

  const addHabit = (name) => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("Habit name cannot be empty");
      return;
    }

    const alreadyExists = habits.some(
      (h) => h.name.toLowerCase() === trimmedName.toLowerCase(),
    );
    if (alreadyExists) {
      toast.error("You already have a habit with this name");
      return;
    }

    const newHabit = {
      id: uuidv4(),
      name: trimmedName,
      createdAt: new Date().toISOString(),
      checkIns: [],
    };
    setHabits((prev) => [...prev, newHabit]);
    toast.success("Habit added!");
  };

  const deleteHabit = (id) => {
    const habit = habits.find((h) => h.id === id);

    if (!habit) {
      toast.error("Habit not found");
      return;
    }

    setHabits((prev) => prev.filter((h) => h.id !== id));
    toast.success("Habit deleted");
  };

  const toggleCheckIn = (id) => {
    const habit = habits.find((h) => h.id === id);

    if (!habit) {
      toast.error("Habit not found");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const alreadyChecked = habit.checkIns.includes(today);

    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        return {
          ...h,
          checkIns: alreadyChecked
            ? h.checkIns.filter((d) => d !== today)
            : [...h.checkIns, today],
        };
      }),
    );

    toast.success(
      alreadyChecked ? "Check-in removed" : "Marked as done today!",
    );
  };

  const clearAllHabits = () => {
    if (habits.length === 0) {
      toast.error("No habits to clear");
      return;
    }
    setHabits([]);
    toast.success("All habits cleared");
  };

  const getStreak = (habit) => {
    let streak = 0;
    let date = new Date();
    while (true) {
      const dateStr = date.toISOString().split("T")[0];
      if (habit.checkIns.includes(dateStr)) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  return createElement(
    HabitContext.Provider,
    {
      value: {
        habits,
        addHabit,
        deleteHabit,
        toggleCheckIn,
        clearAllHabits,
        getStreak,
      },
    },
    children,
  );
}

export const useHabits = () => useContext(HabitContext);
