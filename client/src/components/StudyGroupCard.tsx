import { StudyGroup } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, Bookmark } from "lucide-react";

interface StudyGroupCardProps {
  group: StudyGroup;
  isJoined?: boolean;
  onJoin?: () => void;
  onBookmark?: () => void;
}

export function StudyGroupCard({ group, isJoined = false, onJoin, onBookmark }: StudyGroupCardProps) {
  const getGroupIcon = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'javascript':
        return '💻';
      case 'machine learning':
        return '🧠';
      case 'database':
        return '🗄️';
      case 'operating systems':
        return '⚙️';
      default:
        return '📚';
    }
  };

  return (
    <Card className="card-hover theme-transition">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white text-xl">
              {getGroupIcon(group.subject)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {group.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {group.description}
              </p>
            </div>
          </div>
          <button 
            onClick={onBookmark}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {group.memberCount} members
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            5 posts this week
          </span>
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          {(group.tags || []).slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {/* Mock member avatars */}
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
              alt="Member"
              className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
              alt="Member"
              className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
              alt="Member"
              className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
            />
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">+5</span>
            </div>
          </div>
          
          <Button 
            variant={isJoined ? "outline" : "default"} 
            size="sm" 
            onClick={onJoin}
            className="transition-colors"
          >
            {isJoined ? "Joined" : "Join Group"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
