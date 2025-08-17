import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/components/ChatMessage";
import { Badge } from "@/components/ui/badge";
import { mockConversations, mockMessages, mockUsers } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Video, Phone, Paperclip, Send, Search, MessageCircle } from "lucide-react";

export default function ChatPage() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  if (!user) return null;

  const conversations = mockConversations.filter(conv => 
    conv.participants.includes(user.id)
  );

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);
  const messages = mockMessages.filter(msg => msg.conversationId === selectedConversation);
  const otherParticipant = selectedConv ? 
    mockUsers.find(u => u.id === selectedConv.participants.find(id => id !== user.id)) : null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // TODO: Send message to backend
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  return (
    <div className="pb-20 md:pb-4 md:pt-20 flex h-screen md:h-[calc(100vh-80px)] theme-transition">
      {/* Chat List */}
      <div className={`w-full md:w-1/3 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-hidden ${showMobileChat ? 'hidden md:block' : ''}`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Messages</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto h-full">
          {conversations.map((conversation) => {
            const otherUser = mockUsers.find(u => 
              u.id === conversation.participants.find(id => id !== user.id)
            );
            if (!otherUser) return null;

            return (
              <div
                key={conversation.id}
                onClick={() => {
                  setSelectedConversation(conversation.id);
                  setShowMobileChat(true);
                }}
                className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={otherUser.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"}
                    alt={otherUser.firstName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {otherUser.firstName} {otherUser.lastName}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {conversation.lastMessageAt ? 
                          new Date(conversation.lastMessageAt).toLocaleDateString() : ''}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {conversation.lastMessage}
                    </p>
                    <div className="flex items-center mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {(otherUser.canTeach || [])[0]} ↔ {(user.canTeach || [])[0]}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-primary-500 rounded-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Window */}
      <div className={`flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 ${!showMobileChat && selectedConversation ? 'hidden md:flex' : showMobileChat ? 'flex' : 'hidden md:flex'}`}>
        {selectedConversation && otherParticipant ? (
          <>
            {/* Chat Header */}
            <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden"
                    onClick={() => setShowMobileChat(false)}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <img
                    src={otherParticipant.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"}
                    alt={otherParticipant.firstName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {otherParticipant.firstName} {otherParticipant.lastName}
                    </h3>
                    <p className="text-sm text-green-500">Online</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => {
                const sender = mockUsers.find(u => u.id === message.senderId);
                if (!sender) return null;
                
                return (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    sender={sender}
                    isCurrentUser={sender.id === user.id}
                  />
                );
              })}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <Button type="button" variant="outline" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button type="submit" size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose a conversation to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
