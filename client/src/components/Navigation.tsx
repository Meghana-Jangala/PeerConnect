import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { 
  Home, 
  MessageCircle, 
  HelpCircle, 
  Users, 
  UserCheck, 
  Trophy,
  Settings,
  LogOut,
  Sun,
  Moon,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const mainNavItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/forum", icon: HelpCircle, label: "Q&A" },
  { path: "/chat", icon: MessageCircle, label: "Chat" },
];

const secondaryNavItems = [
  { path: "/matches", icon: Users, label: "Matches" },
  { path: "/groups", icon: UserCheck, label: "Groups" },
  { path: "/leaderboard", icon: Trophy, label: "Leaderboard" },
];

export function Navigation() {
  const [location, navigate] = useLocation();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  if (location === "/auth") {
    return null;
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow pt-5 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-4 mb-8">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">PeerLearn</h1>
          </div>

          {/* Main Navigation */}
          <div className="flex flex-col flex-1 px-3">
            <nav className="space-y-1">
              {mainNavItems.map(({ path, icon: Icon, label }) => (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={cn(
                    "w-full group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors",
                    location === path
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <Icon
                    className={cn(
                      "mr-3 h-5 w-5",
                      location === path
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                    )}
                  />
                  {label}
                </button>
              ))}
            </nav>

            {/* Divider */}
            <div className="my-6 border-t border-gray-200 dark:border-gray-700" />

            {/* Secondary Navigation */}
            <nav className="space-y-1">
              {secondaryNavItems.map(({ path, icon: Icon, label }) => (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={cn(
                    "w-full group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    location === path
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <Icon
                    className={cn(
                      "mr-3 h-4 w-4",
                      location === path
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                    )}
                  />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* User Profile & Settings */}
          <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center mb-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.profileImage || ""} />
                <AvatarFallback>
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.coins || 0} coins
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="flex justify-around items-center py-2">
          {mainNavItems.map(({ path, icon: Icon, label }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center px-3 py-2 text-xs font-medium",
                location === path
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              )}
            >
              <Icon size={20} className="mb-1" />
              <span>{label}</span>
            </button>
          ))}
          <button
            onClick={() => navigate("/matches")}
            className={cn(
              "flex flex-col items-center px-3 py-2 text-xs font-medium",
              location === "/matches"
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            )}
          >
            <Users size={20} className="mb-1" />
            <span>More</span>
          </button>
        </div>
      </div>
    </>
  );
}
