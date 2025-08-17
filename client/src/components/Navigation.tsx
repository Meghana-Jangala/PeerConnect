import { useLocation } from "wouter";
import { 
  Home, 
  Users, 
  MessageCircle, 
  HelpCircle, 
  UserCheck, 
  Trophy 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/matches", icon: Users, label: "Matches" },
  { path: "/chat", icon: MessageCircle, label: "Chat" },
  { path: "/forum", icon: HelpCircle, label: "Q&A" },
  { path: "/groups", icon: UserCheck, label: "Groups" },
  { path: "/leaderboard", icon: Trophy, label: "Ranking" },
];

export function Navigation() {
  const [location, navigate] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b theme-transition">
      <div className="flex justify-around items-center py-2 md:py-4 md:px-6 max-w-md mx-auto md:max-w-none">
        {navItems.map(({ path, icon: Icon, label }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={cn(
              "nav-item",
              location === path 
                ? "text-primary-500" 
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            )}
          >
            <Icon size={20} className="mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
