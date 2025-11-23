import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { ChatMessage } from '../types';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'bot',
      content: 'Hello! Welcome to GridGo Interiors. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const currentHour = new Date().getHours();
  const isBusinessHours = currentHour >= 9 && currentHour < 18;

  useState(() => {
    setIsOnline(isBusinessHours);
  });

  const quickReplies = [
    'Services offered',
    'Project timeline',
    'Get a quote',
    'View portfolio',
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    setTimeout(() => {
      const botResponse = generateBotResponse(text.toLowerCase());
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const generateBotResponse = (input: string): ChatMessage => {
    let response = '';

    if (input.includes('service')) {
      response =
        'We offer comprehensive interior services including Steel Fabrication, Glass Applications, Marble Craftsmanship, Bespoke Furniture, Artistic Décor, and Premium Painting. Which service interests you?';
    } else if (input.includes('timeline') || input.includes('time')) {
      response =
        'Project timelines vary based on scope. Typically, residential projects take 2-4 months, while commercial projects take 3-6 months. Would you like to discuss your specific project?';
    } else if (input.includes('quote') || input.includes('price') || input.includes('cost')) {
      response =
        'I can help you get a personalized quote. Could you share your name and email so our team can reach out with detailed pricing?';
    } else if (input.includes('portfolio') || input.includes('projects')) {
      response =
        'We have completed 200+ projects across India in residential, commercial, and retail sectors. You can view our portfolio on the Portfolio page. Would you like me to share some featured projects?';
    } else if (input.includes('contact') || input.includes('call') || input.includes('phone')) {
      response =
        'You can reach us via email at info@gridgointeriors.com or through our contact form. Would you like to schedule a consultation?';
    } else if (input.includes('location') || input.includes('where')) {
      response =
        'GridGo Interiors operates across major cities in India. We serve clients nationwide with our comprehensive interior solutions. Which city are you located in?';
    } else {
      response =
        'Thanks for your message! Our team specializes in creating stunning interiors. Would you like to know about our services, view our portfolio, or get a quote?';
    }

    return {
      role: 'bot',
      content: response,
      timestamp: new Date(),
    };
  };

  const handleLeadCapture = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadCaptured(true);
    const botMessage: ChatMessage = {
      role: 'bot',
      content: `Thank you, ${userName}! Our team will reach out to you at ${userEmail} shortly. Is there anything else I can help you with?`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="relative bg-emerald-dark hover:bg-emerald text-white p-4 rounded-full shadow-luxury hover:shadow-luxury-hover transition-all duration-200 ease-out hover:scale-110 hover:-translate-y-1 active:scale-95 group focus-ring"
            aria-label="Open chat"
          >
            <MessageCircle size={28} />
            <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse ${
              isOnline ? 'bg-green-400' : 'bg-gray-400'
            } border-2 border-white`} />
          </button>
          <div className="absolute bottom-full right-0 mb-2 bg-white px-3 py-2 rounded-lg shadow-lg text-xs font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {isOnline ? "We're online — chat with us" : "All agents are busy — leave a message"}
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] bg-white rounded-lg shadow-luxury-hover flex flex-col animate-fade-in-up">
          <div className="bg-emerald text-white p-4 rounded-t-lg flex justify-between items-center transition-all duration-200">
            <div className="flex items-center">
              <MessageCircle size={24} className="mr-2" />
              <div>
                <h3 className="font-sans font-bold">GridGo Assistant</h3>
                <p className="text-xs flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full animate-pulse ${
                    isOnline ? 'bg-green-300' : 'bg-gray-300'
                  }`} />
                  {isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-silver-light transition-all duration-200 hover:scale-110 focus-ring rounded p-1"
              aria-label="Close chat"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex animate-fade-in-up ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg transition-all duration-200 ${
                    msg.role === 'user'
                      ? 'bg-emerald text-white hover:shadow-lg'
                      : 'bg-silver-light text-charcoal hover:shadow-lg'
                  }`}
                >
                  <p className="font-sans text-sm">{msg.content}</p>
                </div>
              </div>
            ))}

            {!leadCaptured && messages.length > 2 && (
              <div className="bg-ivory p-4 rounded-lg border-2 border-emerald/20 animate-fade-in-up">
                <p className="font-sans text-sm text-charcoal mb-3">
                  Share your details for personalized assistance:
                </p>
                <form onSubmit={handleLeadCapture} className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-silver focus-visible:border-emerald focus-visible:ring-2 focus-visible:ring-emerald/30 focus-visible:scale-[1.01] outline-none text-sm transition-all duration-200"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-silver focus-visible:border-emerald focus-visible:ring-2 focus-visible:ring-emerald/30 focus-visible:scale-[1.01] outline-none text-sm transition-all duration-200"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-emerald text-white py-2 rounded font-sans font-semibold text-sm hover:bg-emerald-dark transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={reply}
                    onClick={() => handleSendMessage(reply)}
                    className="bg-silver-light hover:bg-silver text-charcoal px-3 py-2 rounded-full text-xs font-sans transition-all duration-200 hover:scale-105 active:scale-95 animate-fade-in-up"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-silver-light">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputMessage);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full border-2 border-silver focus-visible:border-emerald focus-visible:ring-2 focus-visible:ring-emerald/20 outline-none transition-all duration-200"
              />
              <button
                type="submit"
                className="bg-emerald hover:bg-emerald-dark text-white p-2 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 focus-ring"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
