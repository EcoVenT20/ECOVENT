import { Header, Footer } from "@/components/Layout";
import AIVentilationDesigner from "@/components/AIVentilationDesigner";
import EnergySavingsCalculator from "@/components/EnergySavingsCalculator";
import { Sparkles, Zap } from "lucide-react";

export default function AITools() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans" dir="rtl">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary to-primary/80 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-sm font-bold mb-6 backdrop-blur-sm">
              <Sparkles className="w-5 h-5" />
              <span>أدوات ذكاء اصطناعي متقدمة</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              أدوات الذكاء الاصطناعي
            </h1>

            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              استخدم أحدث تقنيات الذكاء الاصطناعي للحصول على توصيات مخصصة لأنظمة التهوية
              وحساب التوفير المتوقع في استهلاك الطاقة بدقة عالية
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-secondary" />
                <span>نتائج فورية</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" />
                <span>توصيات مخصصة</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-secondary" />
                <span>حسابات دقيقة</span>
              </div>
            </div>
          </div>
        </section>

        {/* AI Ventilation Designer */}
        <AIVentilationDesigner />

        {/* Energy Savings Calculator */}
        <EnergySavingsCalculator />

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">هل تحتاج إلى استشارة متخصصة؟</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              فريقنا الهندسي جاهز لمساعدتك في اختيار الحل الأمثل لمنشأتك
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors"
              >
                اطلب عرض سعر مخصص
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-primary text-primary rounded-lg font-bold hover:bg-primary/5 transition-colors"
              >
                تواصل معنا
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
