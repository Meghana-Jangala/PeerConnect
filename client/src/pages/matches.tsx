import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCard } from "@/components/UserCard";
import { mockUsers } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Filter, List, LayoutGrid } from "lucide-react";

export default function MatchesPage() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<"list" | "cards">("list");
  
  if (!user) return null;

  const matches = mockUsers.filter(u => u.id !== user.id);

  return (
    <div className="pb-20 md:pb-4 md:pt-20 theme-transition">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm p-4 sticky top-0 z-40 theme-transition">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Find Learning Partners
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Discover peers who can help you learn new subjects
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button 
                variant={viewMode === "cards" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("cards")}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        {/* Filters */}
        <Card className="mb-6 theme-transition">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4">
              <select className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option>All Universities</option>
                <option>MIT</option>
                <option>Stanford</option>
                <option>Harvard</option>
                <option>UC Berkeley</option>
              </select>
              <select className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option>All Subjects</option>
                <option>Computer Science</option>
                <option>Mathematics</option>
                <option>Physics</option>
                <option>Engineering</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Matches List */}
        <div className="space-y-4">
          {matches.map((match) => (
            <UserCard
              key={match.id}
              user={match}
              showConnectButton={true}
              onConnect={() => console.log("Connect with", match.firstName)}
              onSkip={() => console.log("Skip", match.firstName)}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Matches
          </Button>
        </div>
      </div>
    </div>
  );
}
