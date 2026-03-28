import { Header, Footer } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";
import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "مرحباً! أنا مساعد ECOVENT الذكي. كيف يمكنني مساعدتك اليوم؟ يمكنني الإجابة على أسئلتك حول منتجاتنا، خدماتنا، أو مشاريعنا.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: input,
        sender: "user",
      };
      setMessages([...messages, userMessage]);
      setInput("");

      // Simulate bot response
      setTimeout(() => {
        const botResponse = getBotResponse(input);
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: botResponse,
            sender: "bot",
          },
        ]);
      }, 1000);
    }
  };

  const getBotResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes("منتجات")) {
      return "نقدم مجموعة واسعة من مراوح التهوية، أنظمة تنقية الهواء، وأجهزة التكييف الصناعية. هل تريد تفاصيل عن منتج معين؟";
    } else if (lowerInput.includes("خدمات")) {
      return "خدماتنا تشمل التصميم والهندسة، التصنيع، الصيانة، والفحص. كيف يمكننا مساعدتك؟";
    } else if (lowerInput.includes("مشاريع")) {
      return "لدينا مشاريع ناجحة في مصانع ومستودعات. يمكنك زيارة صفحة المشاريع للمزيد من التفاصيل.";
    } else if (lowerInput.includes("تواصل")) {
      return "يمكنك التواصل معنا عبر البريد الإلكتروني info@ecovent-sa.com أو الهاتف 966554070875.";
    } else {
      return "شكراً لسؤالك! لمزيد من المساعدة، يرجى زيارة موقعنا أو التواصل مع فريقنا.";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans" dir="rtl">
      <Header />
      <main className="flex-grow flex flex-col">
        <section className="bg-gradient-to-l from-[#0a2540] to-[#1a4d7a] text-white py-10">
          <div className="container mx-auto px-4 text-center">
            <Bot className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl md:text-4xl font-heading font-bold">مساعد ECOVENT الذكي</h1>
            <p className="text-xl text-white/90 mt-2">
              اسألني عن أي شيء يتعلق بشركتنا أو خدماتنا
            </p>
          </div>
        </section>

        <section className="flex-grow py-8">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto h-[500px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-6 h-6" />
                  محادثة مع المساعد
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.sender === "bot" && (
                      <Bot className="w-8 h-8 text-primary flex-shrink-0" />
                    )}
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === "user"
                          ? "bg-primary text-white"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {message.text}
                    </div>
                    {message.sender === "user" && (
                      <User className="w-8 h-8 text-primary flex-shrink-0" />
                    )}
                  </div>
                ))}
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="اكتب رسالتك هنا..."
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  />
                  <Button onClick={handleSend}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}