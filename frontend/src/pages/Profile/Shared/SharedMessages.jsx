import React, { useState, useEffect, useRef } from 'react';
import { useProfile } from './ProfileContext';
import { Send, User, MessageSquare } from 'lucide-react';

export default function SharedMessages() {
  const { messages, members, profile, sendMessage } = useProfile();
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const filteredMessages = messages.filter(m =>
    activeChat ? (m.senderId === activeChat || m.receiverId === activeChat) : !m.receiverId
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [filteredMessages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage, activeChat);
      setNewMessage('');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[600px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="md:col-span-1 border-r border-gray-200 flex flex-col h-full bg-gray-50">
        <div className="p-4 border-b border-gray-200 font-semibold text-gray-900">
          Messages
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <button
            onClick={() => setActiveChat(null)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${activeChat === null ? "bg-blue-50 shadow-sm text-blue-700 border border-blue-100" : "hover:bg-gray-100 text-gray-600"
              }`}
          >
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${activeChat === null ? "bg-blue-800 text-white" : "bg-gray-100 text-gray-400"}`}>
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className={activeChat === null ? "text-gray-900" : ""}>Public Channel</p>
              <p className="text-xs text-gray-500">General</p>
            </div>
          </button>

          <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Direct Messages
          </div>

          {members.map(member => (
            <button
              key={member.id}
              onClick={() => setActiveChat(member.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${activeChat === member.id ? "bg-blue-50 shadow-sm text-blue-900 border border-blue-100" : "hover:bg-gray-100 text-gray-600"
                }`}
            >
              <div className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 font-medium">
                {member.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className={activeChat === member.id ? "text-gray-900" : ""}>{member.name}</p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="md:col-span-3 flex flex-col h-full bg-white">
        <div className="p-4 border-b border-gray-200 flex items-center gap-3 bg-white">
          <h3 className="font-semibold text-lg text-gray-900">{activeChat ? members.find(m => m.id === activeChat)?.name : "Public Channel"}</h3>
          {activeChat && <span className="h-2 w-2 bg-green-500 rounded-full" />}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          {filteredMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <MessageSquare className="h-12 w-12 mb-2 opacity-20" />
              <p>No messages yet.</p>
            </div>
          ) : (
            filteredMessages.map((msg) => {
              const isMe = msg.senderName === profile.name;
              return (
                <div key={msg.id} className={`flex gap-3 max-w-[80%] ${isMe ? "ml-auto flex-row-reverse" : ""}`}>
                  <div className="h-8 w-8 rounded-full bg-gray-200 shrink-0 flex items-center justify-center text-xs font-medium text-gray-500">
                    {msg.senderName.charAt(0)}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${isMe ? "bg-blue-600 text-white rounded-tr-none shadow-sm" : "bg-white text-gray-700 rounded-tl-none border border-gray-200 shadow-sm"
                    }`}>
                    <div className="flex items-baseline gap-2 mb-1 opacity-80 text-xs">
                      <span className="font-bold">{msg.senderName}</span>
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p>{msg.content}</p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-gray-200">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              className="flex-1 h-10 rounded-full border border-gray-300 bg-gray-50 px-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
