import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Sun, Moon } from "lucide-react";

export default function ProfileSection({ user, theme, setTheme }: any) {
  const { logout } = useAuth();

  return (
    <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt={user.firstName}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xl font-bold">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}
