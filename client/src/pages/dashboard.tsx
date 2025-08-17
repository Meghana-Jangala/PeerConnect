import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCard } from "@/components/UserCard";
import { mockUsers, mockActivity } from "@/data/mockData";
import { 
  Coins, 
  Star, 
  Handshake, 
  Trophy, 
  Presentation, 
  GraduationCap, 
  Moon, 
  Sun,
  Clock 
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  if (!user) return null;

  const suggestedMatches = mockUsers.filter(u => u.id !== user.id).slice(0, 3);

  return (
    <div className="pb-20 md:pb-4 md:pt-20 theme-transition">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm p-4 sticky top-0 z-40 theme-transition">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={user.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user.firstName} {user.lastName}
              </h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {user.university}
                </span>
                <Badge className="badge-primary text-xs">
                  {user.major}
                </Badge>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="theme-transition"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Welcome Section */}
        <Card className="gradient-primary text-white overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {user.firstName}! 👋
                </h1>
                <p className="text-primary-100 mb-4">Ready to learn something new today?</p>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">24</div>
                    <div className="text-sm text-primary-100">Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">47</div>
                    <div className="text-sm text-primary-100">Questions Answered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-sm text-primary-100">Study Groups</div>
                  </div>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
                alt="Learning illustration"
                className="hidden lg:block w-48 h-32 object-cover rounded-lg opacity-80"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="card-hover theme-transition">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Coins</p>
                  <p className="text-2xl font-bold text-yellow-500">{user.coins}</p>
                </div>
                <Coins className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover theme-transition">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Reputation</p>
                  <p className="text-2xl font-bold text-green-500">{user.reputation}</p>
                </div>
                <Star className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover theme-transition">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Matches</p>
                  <p className="text-2xl font-bold text-blue-500">23</p>
                </div>
                <Handshake className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover theme-transition">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Rank</p>
                  <p className="text-2xl font-bold text-purple-500">#12</p>
                </div>
                <Trophy className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Skills Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="card-hover theme-transition">
            <CardHeader>
              <CardTitle className="flex items-center text-green-600 dark:text-green-400">
                <Presentation className="w-5 h-5 mr-2" />
                I Can Teach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {(user.canTeach || []).map((subject) => (
                  <Badge key={subject} className="badge-success">
                    {subject}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover theme-transition">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600 dark:text-blue-400">
                <GraduationCap className="w-5 h-5 mr-2" />
                I Want to Learn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {(user.wantToLearn || []).map((subject) => (
                  <Badge key={subject} className="badge-info">
                    {subject}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suggested Matches */}
        <Card className="card-hover theme-transition">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Handshake className="w-5 h-5 mr-2 text-primary-500" />
                Suggested Matches
              </CardTitle>
              <Button variant="link" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedMatches.map((match) => (
                <div key={match.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 card-hover">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={match.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"}
                      alt={match.firstName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {match.firstName} {match.lastName}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {match.university}
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 text-sm">
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      Offers: {(match.canTeach || []).slice(0, 2).join(", ")}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Wants: {(match.wantToLearn || []).slice(0, 2).join(", ")}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">Connect</Button>
                    <Button variant="outline" size="sm">Skip</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="card-hover theme-transition">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gray-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 py-2">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'coins_earned' ? 'bg-green-500' :
                    activity.type === 'new_match' ? 'bg-blue-500' :
                    'bg-purple-500'
                  }`} />
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">
                    {activity.description}
                  </p>
                  <span className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
