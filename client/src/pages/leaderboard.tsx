import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockUsers } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Crown, TrendingUp } from "lucide-react";

export default function LeaderboardPage() {
  const { user } = useAuth();
  
  // Sort users by reputation for leaderboard
  const sortedUsers = [...mockUsers].sort((a, b) => (b.reputation || 0) - (a.reputation || 0));
  const topThree = sortedUsers.slice(0, 3);
  const remaining = sortedUsers.slice(3);

  const userRank = sortedUsers.findIndex(u => u.id === user?.id) + 1;

  return (
    <div className="pb-20 md:pb-4 md:pt-20 theme-transition">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm p-4 sticky top-0 z-40 theme-transition">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leaderboard</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Top contributors and learning champions
              </p>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Button variant="default" size="sm">All Time</Button>
            <Button variant="outline" size="sm">This Month</Button>
            <Button variant="outline" size="sm">This Week</Button>
            <select className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm">
              <option>All Subjects</option>
              <option>Computer Science</option>
              <option>Mathematics</option>
              <option>Physics</option>
            </select>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Second Place */}
          <div className="md:order-1">
            <Card className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-center p-6 relative theme-transition">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <img
                src={topThree[1]?.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"}
                alt={topThree[1]?.firstName}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-300 object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {topThree[1]?.firstName} {topThree[1]?.lastName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {topThree[1]?.university}
              </p>
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Badge className="badge-info text-xs">
                  {(topThree[1]?.badges || [])[0]}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                {topThree[1]?.reputation} pts
              </p>
            </Card>
          </div>

          {/* First Place */}
          <div className="md:order-2">
            <Card className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-700 dark:to-yellow-800 text-center p-6 relative transform md:scale-105 theme-transition">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <Crown className="w-8 h-8 text-yellow-500" />
              </div>
              <img
                src={topThree[0]?.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"}
                alt={topThree[0]?.firstName}
                className="w-24 h-24 rounded-full mx-auto mb-4 mt-6 border-4 border-yellow-400 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {topThree[0]?.firstName} {topThree[0]?.lastName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {topThree[0]?.university}
              </p>
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Badge className="badge-warning text-xs">
                  {(topThree[0]?.badges || [])[0]}
                </Badge>
                <Badge className="badge-success text-xs">
                  {(topThree[0]?.badges || [])[1]}
                </Badge>
              </div>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {topThree[0]?.reputation} pts
              </p>
            </Card>
          </div>

          {/* Third Place */}
          <div className="md:order-3">
            <Card className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-700 dark:to-orange-800 text-center p-6 relative theme-transition">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <img
                src={topThree[2]?.profileImage || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"}
                alt={topThree[2]?.firstName}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-orange-300 object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {topThree[2]?.firstName} {topThree[2]?.lastName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {topThree[2]?.university}
              </p>
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Badge className="badge-info text-xs">
                  {(topThree[2]?.badges || [])[0]}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {topThree[2]?.reputation} pts
              </p>
            </Card>
          </div>
        </div>

        {/* Full Leaderboard */}
        <Card className="theme-transition">
          <CardHeader>
            <CardTitle>Full Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {remaining.map((userData, index) => (
                <div key={userData.id} className="py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-gray-400 w-8">
                        #{index + 4}
                      </div>
                      <img
                        src={userData.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"}
                        alt={userData.firstName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {userData.firstName} {userData.lastName}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {userData.university}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        {(userData.badges || []).map((badge) => (
                          <Badge key={badge} variant="secondary" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {userData.reputation} pts
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +50 this week
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Your Ranking */}
        {user && (
          <Card className="mt-6 bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-200 dark:border-primary-800 theme-transition">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Ranking</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold text-primary-500">#{userRank}</div>
                  <img
                    src={user.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"}
                    alt={user.firstName}
                    className="w-16 h-16 rounded-full border-2 border-primary-300 object-cover"
                  />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {user.firstName} {user.lastName}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">{user.university}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {(user.badges || []).map((badge) => (
                        <Badge key={badge} className="badge-primary text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {user.reputation} pts
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">+45 this week</p>
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                    {userRank <= 10 ? "Top 10!" : `${10 - userRank + 1} spots to top 10!`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
