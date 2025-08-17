import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StudyGroupCard } from "@/components/StudyGroupCard";
import { mockStudyGroups } from "@/data/mockData";
import { Plus, Filter } from "lucide-react";

export default function StudyGroupsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Groups" },
    { id: "my", name: "My Groups" },
    { id: "computer-science", name: "Computer Science" },
    { id: "mathematics", name: "Mathematics" },
    { id: "physics", name: "Physics" },
  ];

  const filteredGroups = selectedCategory === "all" 
    ? mockStudyGroups 
    : mockStudyGroups.filter(group => 
        group.subject.toLowerCase().includes(selectedCategory.replace("-", " "))
      );

  return (
    <div className="pb-20 md:pb-4 md:pt-20 theme-transition">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm p-4 sticky top-0 z-40 theme-transition">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Study Groups</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Join subject-based groups for collaborative learning
              </p>
            </div>
            <Button className="gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="transition-colors"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <StudyGroupCard
              key={group.id}
              group={group}
              isJoined={group.id === "2"} // Mock: user is joined to ML group
              onJoin={() => console.log("Join group", group.id)}
              onBookmark={() => console.log("Bookmark group", group.id)}
            />
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No groups found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters or create a new study group
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
