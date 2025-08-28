import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCard } from "@/components/UserCard";
import { useAuth } from "@/contexts/AuthContext";
import { Filter, List, LayoutGrid } from "lucide-react";

export default function MatchesPage() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<"list" | "cards">("list");
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");

    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch users");

        // ✅ Normalize IDs and exclude current user
        const currentUserId = user._id || user.id;
        const otherUsers = data.filter(
          (u: any) => (u._id || u.id) !== currentUserId
        );

        setMatches(otherUsers);
      } catch (err) {
        console.error("❌ Error fetching matches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  if (!user) return null;

  if (loading) {
    return <div className="p-8 text-center">Loading matches...</div>;
  }

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
        {matches.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            No matches found.
          </div>
        ) : (
          <div
            className={
              viewMode === "list"
                ? "space-y-4"
                : "grid grid-cols-1 sm:grid-cols-2 gap-4"
            }
          >
            {matches.map((match) => (
              <UserCard
                key={match._id || match.id}
                user={match}
                showConnectButton={(match._id || match.id) !== (user._id || user.id)}
                onConnect={() => console.log("Connect with", match.firstName)}
                onSkip={() => console.log("Skip", match.firstName)}
              />
            ))}
          </div>
        )}

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
