import { Question, User } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronUp, ChevronDown, MessageCircle, Eye, Coins } from "lucide-react";
import { mockUsers } from "@/data/mockData";

interface QuestionCardProps {
  question: Question;
  onUpvote?: () => void;
  onDownvote?: () => void;
}

export function QuestionCard({ question, onUpvote, onDownvote }: QuestionCardProps) {
  const author = mockUsers.find(user => user.id === question.authorId);
  
  return (
    <Card className="card-hover theme-transition">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex flex-col items-center space-y-1">
            <button 
              onClick={onUpvote}
              className="text-gray-400 hover:text-primary-500 transition-colors"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {question.upvotes}
            </span>
            <button 
              onClick={onDownvote}
              className="text-gray-400 hover:text-primary-500 transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
            {question.isResolved && (
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-2">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-500 cursor-pointer">
                {question.title}
              </h3>
              <div className="flex items-center space-x-2 ml-4">
                {(question.coinReward || 0) > 0 && (
                  <Badge className="badge-warning">
                    <Coins className="w-3 h-3 mr-1" />
                    {question.coinReward || 0} coins
                  </Badge>
                )}
                {question.isResolved && (
                  <Badge className="badge-success">
                    Solved
                  </Badge>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {question.content}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={author?.profileImage || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150`}
                    alt={author?.firstName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Asked by {author?.firstName} {author?.lastName}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {question.createdAt ? new Date(question.createdAt).toLocaleDateString() : ''}
                </span>
                <div className="flex items-center space-x-1">
                  {(question.tags || []).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  8 answers
                </span>
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {question.views} views
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
