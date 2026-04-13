import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, Loader2 } from 'lucide-react';
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
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    // Mock response
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "That sounds like a great plan! If you like BBQ, you should definitely check out Sugarfire Smokehouse or Pappy's. Would you like me to add one of these to your itinerary?"
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };
  return (
    <div className="flex flex-col h-full bg-background relative max-w-3xl mx-auto md:border-x shadow-2xl overflow-hidden">
      <header className="p-4 border-b flex items-center justify-between bg-background/80 backdrop-blur-lg sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold leading-none">STL Concierge</h2>
            <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Online & AI Powered
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <Sparkles className="w-5 h-5 text-orange-400" />
        </div>
      </header>
      <div className="flex-1 overflow-hidden relative">
        <ScrollArea className="h-full w-full">
          <div className="p-4 space-y-6 pb-20">
            {messages.map((m) => (
              <div key={m.id} className={cn(
                "flex w-full max-w-[85%] animate-scale-in",
                m.role === 'user' ? "ml-auto justify-end" : "justify-start"
              )}>
                <div className={cn(
                  "rounded-2xl px-4 py-3 text-sm shadow-sm leading-relaxed",
                  m.role === 'user'
                    ? "bg-orange-500 text-white rounded-br-none"
                    : "bg-secondary text-foreground rounded-bl-none border border-border/50"
                )}>
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-scale-in">
                <div className="bg-secondary text-foreground rounded-2xl rounded-bl-none px-4 py-3 border border-border/50 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                  <span className="text-xs font-medium text-muted-foreground italic">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </ScrollArea>
      </div>
      <footer className="p-4 border-t bg-background sticky bottom-0 z-20">
        <div className="flex gap-2 bg-secondary/50 p-1.5 rounded-2xl items-center focus-within:ring-2 ring-orange-500/20 transition-all border border-transparent focus-within:border-orange-500/20">
          <Input
            placeholder="Ask anything about STL..."
            className="border-none bg-transparent focus-visible:ring-0 shadow-none h-10 text-base"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="rounded-xl bg-orange-500 hover:bg-orange-600 h-10 w-10 shrink-0 shadow-lg shadow-orange-500/20"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-[10px] text-center text-muted-foreground mt-3 uppercase tracking-tighter">AI may provide inaccurate info. Verify key details.</p>
      </footer>
    </div>
  );
}