import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}
export function ConciergePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your STL AI Concierge. I can help you build an itinerary, find the best BBQ in town, or suggest family-friendly activities near Forest Park. What are you looking for today?"
    }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    // Mock response
    setTimeout(() => {
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: "That sounds like a great plan! If you like BBQ, you should definitely check out Sugarfire Smokehouse or Pappy's. Would you like me to add one of these to your itinerary?" 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-screen bg-background relative max-w-3xl mx-auto border-x shadow-2xl">
      <header className="p-4 border-b flex items-center justify-between bg-background/80 backdrop-blur-lg sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold leading-none">STL Concierge</h2>
            <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mt-1">Online & AI Powered</p>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse [animation-delay:0.2s]" />
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse [animation-delay:0.4s]" />
        </div>
      </header>
      <ScrollArea className="flex-1 p-4" viewportRef={scrollRef}>
        <div className="space-y-6 pb-4">
          {messages.map((m) => (
            <div key={m.id} className={cn(
              "flex w-full max-w-[85%] animate-scale-in",
              m.role === 'user' ? "ml-auto justify-end" : "justify-start"
            )}>
              <div className={cn(
                "rounded-2xl px-4 py-3 text-sm shadow-sm",
                m.role === 'user' 
                  ? "bg-orange-500 text-white rounded-br-none" 
                  : "bg-secondary text-foreground rounded-bl-none"
              )}>
                {m.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <footer className="p-4 border-t bg-background">
        <div className="flex gap-2 bg-secondary/50 p-1.5 rounded-2xl items-center focus-within:ring-2 ring-orange-500/20 transition-all">
          <Input 
            placeholder="Ask anything about STL..." 
            className="border-none bg-transparent focus-visible:ring-0 shadow-none h-10"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button 
            size="icon" 
            onClick={handleSend}
            disabled={!input.trim()}
            className="rounded-xl bg-orange-500 hover:bg-orange-600 h-10 w-10 shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-[10px] text-center text-muted-foreground mt-3 uppercase tracking-tighter">AI may provide inaccurate info. Verify key details.</p>
      </footer>
    </div>
  );
}