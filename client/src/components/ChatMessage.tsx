import { Message, User } from "@shared/schema";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
  sender: User;
  isCurrentUser: boolean;
}

export function ChatMessage({ message, sender, isCurrentUser }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex items-start space-x-3 animation-slide-up",
      isCurrentUser ? "justify-end" : ""
    )}>
      {!isCurrentUser && (
        <img
          src={sender.profileImage || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150`}
          alt={sender.firstName}
          className="w-8 h-8 rounded-full object-cover"
        />
      )}
      
      <div className={cn(
        "max-w-xs lg:max-w-md px-4 py-3 rounded-lg",
        isCurrentUser 
          ? "bg-primary-500 text-white" 
          : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      )}>
        <p>{message.content}</p>
        <span className={cn(
          "text-xs mt-1 block",
          isCurrentUser 
            ? "text-primary-100" 
            : "text-gray-500 dark:text-gray-400"
        )}>
          {message.createdAt ? new Date(message.createdAt).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          }) : ''}
        </span>
      </div>
      
      {isCurrentUser && (
        <img
          src={sender.profileImage || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150`}
          alt={sender.firstName}
          className="w-8 h-8 rounded-full object-cover"
        />
      )}
    </div>
  );
}
