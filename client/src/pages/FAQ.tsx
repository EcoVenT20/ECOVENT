import { Helmet } from "react-helmet-async";
import { Header, Footer } from "@/components/Layout";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: "عام",
    question: "ما هي التهوية الصناعية؟",
    questionEn: "What is industrial ventilation?",
    answer: "التهوية الصناعية هي نظام متكامل لتبادل الهواء في المباني الصناعية والمصانع والمستودعات، يهدف إلى توفير بيئة عمل صحية وآمنة من خلال إزالة الملوثات والحرارة الزائدة وتوفير هواء نقي للعاملين.",
    answerEn: "Industrial ventilation is an integrated system for air exchange in industrial buildings, factories, and warehouses, aimed at providing a healthy and safe work environment by removing pollutants, excess heat, and providing fresh air for workers."
  },
  {
    category: "عام",
    question: "لماذا أحتاج إلى نظام تهوية في مصنعي؟",
    questionEn: "Why do I need a ventilation system in my factory?",
    answer: "نظام التهوية ضروري للحفاظ على صحة العاملين، تحسين الإنتاجية، الامتثال للوائح السلامة والصحة المهنية، منع تراكم الغازات الضارة، التحكم في درجة الحرارة والرطوبة، وحماية المعدات من التلف.",
    answerEn: "A ventilation system is essential for maintaining worker health, improving productivity, complying with occupational safety and health regulations, preventing harmful gas accumulation, controlling temperature and humidity, and protecting equipment from damage."
  },
  {
    category: "المراوح",
    question: "ما الفرق بين مراوح الشفط ومراوح الدفع؟",
    questionEn: "What is the difference between exhaust fans and supply fans?",
    answer: "مراوح الشفط (Exhaust Fans) تسحب الهواء الملوث من الداخل إلى الخارج، بينما مراوح الدفع (Supply Fans) تدفع الهواء النقي من الخارج إلى الداخل. النظام المتوازن يستخدم كلا النوعين لضمان تدفق هواء مثالي.",
    answerEn: "Exhaust fans pull contaminated air from inside to outside, while supply fans push fresh air from outside to inside. A balanced system uses both types to ensure optimal airflow."
  },
  {
    category: "المراوح",
    question: "كيف أختار حجم المروحة المناسب؟",
    questionEn: "How do I choose the right fan size?",
    answer: "يعتمد اختيار حجم المروحة على عدة عوامل: حجم المساحة (بالمتر المكعب)، نوع النشاط الصناعي، عدد العاملين، مصادر الحرارة، ومعدل تبديل الهواء المطلوب (ACH). نوصي باستشارة مهندسينا لحساب دقيق.",
    answerEn: "Fan size selection depends on several factors: space volume (cubic meters), type of industrial activity, number of workers, heat sources, and required air changes per hour (ACH). We recommend consulting our engineers for accurate calculations."
  },
  {
    category: "التركيب",
    question: "كم يستغرق تركيب نظام التهوية؟",
    questionEn: "How long does ventilation system installation take?",
    answer: "يعتمد وقت التركيب على حجم المشروع. المشاريع الصغيرة (1-3 مراوح) تستغرق 1-2 يوم، المشاريع المتوسطة (4-10 مراوح) تستغرق 3-7 أيام، والمشاريع الكبيرة قد تستغرق 2-4 أسابيع. نقدم جدولاً زمنياً مفصلاً قبل البدء.",
    answerEn: "Installation time depends on project size. Small projects (1-3 fans) take 1-2 days, medium projects (4-10 fans) take 3-7 days, and large projects may take 2-4 weeks. We provide a detailed timeline before starting."
  },
  {
    category: "التكلفة",
    question: "ما هي تكلفة نظام التهوية الصناعية؟",
    questionEn: "What is the cost of an industrial ventilation system?",
    answer: "التكلفة تختلف حسب حجم المساحة، نوع المراوح، عدد الوحدات، ومتطلبات التركيب. بشكل عام، تبدأ الأسعار من 15,000 ريال للمشاريع الصغيرة. نقدم عروض أسعار مجانية بعد معاينة الموقع.",
    answerEn: "Cost varies based on space size, fan type, number of units, and installation requirements. Generally, prices start from 15,000 SAR for small projects. We provide free quotations after site inspection."
  },
  {
    category: "الصيانة",
    question: "هل تحتاج أنظمة التهوية إلى صيانة دورية؟",
    questionEn: "Do ventilation systems need regular maintenance?",
    answer: "نعم، الصيانة الدورية ضرورية لضمان الأداء الأمثل وإطالة عمر النظام. نوصي بصيانة كل 3-6 أشهر تشمل: تنظيف المراوح والفلاتر، فحص المحركات، شد الأحزمة، وفحص التوصيلات الكهربائية.",
    answerEn: "Yes, regular maintenance is essential for optimal performance and extending system life. We recommend maintenance every 3-6 months including: cleaning fans and filters, motor inspection, belt tightening, and electrical connection checks."
  },
  {
    category: "الصيانة",
    question: "ما هي علامات الحاجة إلى صيانة؟",
    questionEn: "What are the signs that maintenance is needed?",
    answer: "العلامات الشائعة تشمل: انخفاض كفاءة التهوية، أصوات غير طبيعية، اهتزاز زائد، ارتفاع استهلاك الكهرباء، روائح غير عادية، أو توقف المروحة عن العمل بشكل متكرر.",
    answerEn: "Common signs include: decreased ventilation efficiency, abnormal sounds, excessive vibration, increased electricity consumption, unusual odors, or frequent fan shutdowns."
  },
  {
    category: "الكفاءة",
    question: "كيف يمكنني توفير الطاقة في نظام التهوية؟",
    questionEn: "How can I save energy in the ventilation system?",
    answer: "لتوفير الطاقة: استخدم مراوح عالية الكفاءة (EC Motors)، ركّب أجهزة التحكم المتغيرة السرعة (VFD)، نظّف الفلاتر بانتظام، استخدم أجهزة استشعار لتشغيل تلقائي، وأغلق النظام عند عدم الحاجة.",
    answerEn: "To save energy: use high-efficiency fans (EC Motors), install variable frequency drives (VFD), clean filters regularly, use sensors for automatic operation, and turn off the system when not needed."
  },
  {
    category: "التقنية",
    question: "ما هو معدل تبديل الهواء (ACH) الموصى به؟",
    questionEn: "What is the recommended Air Changes per Hour (ACH)?",
    answer: "يختلف حسب نوع المنشأة: المستودعات (4-6 ACH)، المصانع الخفيفة (6-10 ACH)، المصانع الثقيلة (10-20 ACH)، المطابخ الصناعية (15-30 ACH)، ومناطق اللحام (20-40 ACH).",
    answerEn: "It varies by facility type: warehouses (4-6 ACH), light factories (6-10 ACH), heavy factories (10-20 ACH), industrial kitchens (15-30 ACH), and welding areas (20-40 ACH)."
  },
  {
    category: "التقنية",
    question: "ما الفرق بين التهوية الطبيعية والميكانيكية؟",
    questionEn: "What is the difference between natural and mechanical ventilation?",
    answer: "التهوية الطبيعية تعتمد على فتحات ونوافذ لحركة الهواء بشكل طبيعي (أقل تكلفة لكن غير موثوقة). التهوية الميكانيكية تستخدم مراوح كهربائية للتحكم الدقيق في تدفق الهواء (أعلى تكلفة لكن أكثر فعالية).",
    answerEn: "Natural ventilation relies on openings and windows for natural air movement (lower cost but unreliable). Mechanical ventilation uses electric fans for precise airflow control (higher cost but more effective)."
  },
  {
    category: "السلامة",
    question: "هل أنظمة التهوية آمنة في بيئات العمل الخطرة؟",
    questionEn: "Are ventilation systems safe in hazardous work environments?",
    answer: "نعم، نوفر أنظمة تهوية مصممة خصيصاً للبيئات الخطرة مع مراوح مقاومة للانفجار (ATEX)، مواد مقاومة للتآكل، وأنظمة فلترة متقدمة لإزالة الغازات السامة والجسيمات الخطرة.",
    answerEn: "Yes, we provide ventilation systems specifically designed for hazardous environments with explosion-proof fans (ATEX), corrosion-resistant materials, and advanced filtration systems to remove toxic gases and hazardous particles."
  }
];

const categories = ["الكل", "عام", "المراوح", "التركيب", "التكلفة", "الصيانة", "الكفاءة", "التقنية", "السلامة"];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFAQs = activeCategory === "الكل" 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>الأسئلة الشائعة حول التهوية والمراوح الصناعية | ايكوفنت</title>
        <meta name="description" content="إجابات شاملة على جميع أسئلتك حول أنظمة التهوية الصناعية والمراوح. دليل كامل للتهوية والمراوح الصناعية في السعودية." />
        <meta name="keywords" content="أسئلة شائعة تهوية، FAQ تهوية صناعية، أسئلة مراوح صناعية، دليل التهوية، استفسارات التهوية" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background" dir="rtl">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary py-20">
            <div className="container mx-auto px-4 text-center text-white">
              <h1 className="text-5xl font-heading font-bold mb-6">
                الأسئلة الشائعة
              </h1>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                إجابات شاملة على جميع أسئلتك حول أنظمة التهوية الصناعية والمراوح
              </p>
            </div>
          </section>

          {/* Categories Filter */}
          <section className="py-8 bg-muted/30 sticky top-0 z-10 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      activeCategory === category
                        ? "bg-primary text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Items */}
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all hover:shadow-lg"
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full px-6 py-5 flex items-start justify-between text-right hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {faq.question}
                        </h3>
                        <p className="text-sm text-gray-500">{faq.questionEn}</p>
                      </div>
                      <ChevronDown
                        className={`w-6 h-6 text-primary flex-shrink-0 mr-4 transition-transform ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    
                    {openIndex === index && (
                      <div className="px-6 pb-5 pt-2 border-t border-gray-100 bg-gray-50">
                        <p className="text-gray-700 leading-relaxed mb-3">
                          {faq.answer}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed italic">
                          {faq.answerEn}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">
                    لا توجد أسئلة في هذا التصنيف
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-r from-primary to-secondary">
            <div className="container mx-auto px-4 text-center text-white">
              <h2 className="text-3xl font-heading font-bold mb-4">
                لم تجد إجابة لسؤالك؟
              </h2>
              <p className="text-xl mb-8 opacity-90">
                تواصل معنا الآن وسيجيب فريقنا على جميع استفساراتك
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  تواصل معنا
                </a>
                <a
                  href="/quote"
                  className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors"
                >
                  احصل على عرض سعر
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
