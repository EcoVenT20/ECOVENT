import { useState, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Streamdown } from "streamdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);

  const chatMutation = trpc.ai.chat.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    },
  });

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setMessages([
        {
          role: "assistant",
          content:
            "مرحباً بك في ECOVENT! 👋\\n\\nأنا مساعدك الذكي المتخصص في أنظمة التهوية الصناعية. يمكنني مساعدتك في:\\n\\n• اختيار نظام التهوية المناسب\\n• الإجابة على الأسئلة التقنية\\n• تقديم نصائح الصيانة\\n• حساب متطلبات التهوية\\n\\nكيف يمكنني مساعدتك اليوم؟",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  const handleSend = () => {
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setShowWelcome(false);

    chatMutation.mutate({
      message: userMessage,
      history: messages,
    });
  };

  const suggestedQuestions = [
    "ما أنواع المراوح الصناعية المتوفرة؟",
    "كيف أختار نظام التهوية المناسب؟",
    "ما هي تكلفة تركيب نظام تهوية؟",
    "كم مرة يجب صيانة المراوح؟",
  ];

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 w-16 h-16 rounded-full shadow-2xl z-50 group hover:scale-110 transition-transform"
          size="icon"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 left-6 w-[400px] h-[600px] shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">مساعد ECOVENT الذكي</h3>
                <p className="text-xs opacity-90">متصل الآن</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-white border border-border"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Streamdown className="text-sm">{msg.content}</Streamdown>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}

            {chatMutation.isPending && (
              <div className="flex justify-start">
                <div className="bg-white border border-border rounded-lg p-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">جاري الكتابة...</span>
                </div>
              </div>
            )}

            {/* Suggested Questions */}
            {showWelcome && messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground text-center">أسئلة شائعة:</p>
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      setInput(question);
                      setTimeout(() => handleSend(), 100);
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full text-right justify-start text-xs h-auto py-2"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="اكتب سؤالك هنا..."
                disabled={chatMutation.isPending}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || chatMutation.isPending}
                size="icon"
              >
                {chatMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
