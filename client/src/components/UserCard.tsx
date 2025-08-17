import { User } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, Video } from "lucide-react";

interface UserCardProps {
  user: User;
  showConnectButton?: boolean;
  onConnect?: () => void;
  onSkip?: () => void;
}

export function UserCard({ user, showConnectButton = false, onConnect, onSkip }: UserCardProps) {
  return (
    <Card className="card-hover theme-transition">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <img
              src={user.profileImage || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150`}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user.university} • {user.major}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  4.8 (127 reviews)
                </span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                  Can Teach:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {(user.canTeach || []).slice(0, 3).map((subject) => (
                    <Badge key={subject} className="badge-success text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                  Wants to Learn:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {(user.wantToLearn || []).slice(0, 2).map((subject) => (
                    <Badge key={subject} className="badge-info text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Usually responds in 2h
                </span>
                <span className="flex items-center">
                  <Video className="w-4 h-4 mr-1" />
                  Video calls available
                </span>
              </div>
              {showConnectButton && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={onSkip}>
                    Skip
                  </Button>
                  <Button size="sm" onClick={onConnect}>
                    Connect
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
