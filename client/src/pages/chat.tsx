// chat.tsx
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/components/ChatMessage";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Video, Phone, Paperclip, Send, Search, MessageCircle } from "lucide-react";

export default function ChatPage() {
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]); // will later come from backend

  if (!user) return null;

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setAllUsers(data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, []);

  // Filter only connected users
  const connectedUsers = allUsers.filter(u => user.connections?.includes(u._id));

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    const msg = {
      id: Date.now().toString(),
      text: newMessage,
      senderId: user._id,
      receiverId: selectedUser._id,
      createdAt: new Date().toISOString(),
    };

    // TODO: Send message to backend/socket
    setMessages(prev => [...prev, msg]);
    setNewMessage("");
  };

  return (
    <div className="pb-20 md:pb-4 md:pt-20 flex h-screen md:h-[calc(100vh-80px)] theme-transition">
      {/* Chat List */}
      <div className={`w-full md:w-1/3 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-hidden ${showMobileChat ? "hidden md:block" : ""}`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Messages</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input placeholder="Search connections..." className="pl-10" />
          </div>
        </div>

        <div className="overflow-y-auto h-full">
          {connectedUsers.map(connUser => (
            <div
              key={connUser._id}
              onClick={() => {
                setSelectedUser(connUser);
                setShowMobileChat(true);
              }}
              className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={connUser.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150"}
                  alt={connUser.firstName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {connUser.firstName} {connUser.lastName}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {(connUser.canTeach || [])[0]}
                  </p>
                  <div className="flex items-center mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {(connUser.canTeach || [])[0]} ↔ {(user.canTeach || [])[0]}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className={`flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 ${!showMobileChat && selectedUser ? "hidden md:flex" : showMobileChat ? "flex" : "hidden md:flex"}`}>
        {selectedUser ? (
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
                    src={selectedUser.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150"}
                    alt={selectedUser.firstName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {selectedUser.firstName} {selectedUser.lastName}
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
              {messages.map(message => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  sender={message.senderId === user._id ? user : selectedUser}
                  isCurrentUser={message.senderId === user._id}
                />
              ))}
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
                Choose a connection to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
