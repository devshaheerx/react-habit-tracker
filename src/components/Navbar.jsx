import { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { CheckCircle2, Settings, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import gsap from "gsap";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
    );
    gsap.to(logoRef.current, {
      rotate: 8,
      duration: 1.6,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out");
      navigate("/sign-in");
    } catch (err) {
      toast.error("Failed to sign out");
    }
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 hover:scale-105 ${
      isActive
        ? "bg-cyan-400/15 text-cyan-300"
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <nav
      ref={navRef}
      className="glass sticky top-4 z-50 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 mx-2 sm:mx-4 mt-2 sm:mt-4 rounded-2xl"
    >
      <NavLink
        to="/"
        className="flex items-center gap-2 font-display font-bold text-base sm:text-lg text-white hover:opacity-80 transition-opacity"
      >
        <span ref={logoRef} className="text-cyan-400">
          <CheckCircle2 size={20} />
        </span>
        <span>HabitTracker</span>
      </NavLink>

      {isSignedIn && (
        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" end className={linkClass}>
            <span className="hidden sm:inline">Dashboard</span>
            <CheckCircle2 size={16} className="sm:hidden" />
          </NavLink>
          <NavLink to="/settings" className={linkClass}>
            <Settings size={16} />
            <span className="hidden sm:inline">Settings</span>
          </NavLink>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-lg text-sm font-medium text-red-300 hover:bg-red-400/10 hover:scale-105 active:scale-95 transition-all duration-150"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      )}
    </nav>
  );
}
