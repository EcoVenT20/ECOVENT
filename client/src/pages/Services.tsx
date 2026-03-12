import { Header, Footer } from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Loader2, Settings, Fan, Wind, ShieldCheck, Wrench, ClipboardCheck, Zap, HeadphonesIcon, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

// Default services data for when database is empty
const defaultServices = [
  {
    id: 1,
    titleAr: "التصميم والهندسة",
    titleEn: "Design & Engineering",
    descriptionAr: "نقدم خدمات تصميم هندسي متكاملة لأنظمة التهوية والتكييف، تشمل الدراسات الفنية والحسابات الهندسية والرسومات التنفيذية. فريقنا من المهندسين المتخصصين يضمن تصميم أنظمة فعالة وموفرة للطاقة.",
    icon: "Settings",
    features: JSON.stringify([
      "دراسات جدوى فنية",
       "تصميم شبكات التوزيع",
      "رسومات تنفيذية معتمدة",
      "محاكاة CFD"
    ])
  },
  {
    id: 2,
    titleAr: "تصنيع المعدات",
    titleEn: "Equipment Manufacturing",
    descriptionAr: "نمتلك مصنعاً متكاملاً لتصنيع مراوح التهوية ووحدات معالجة الهواء وفق أعلى معايير الجودة العالمية. جميع منتجاتنا مصنعة محلياً بأيدٍ سعودية ماهرة.",
    icon: "Fan",
    features: JSON.stringify([
      "مراوح طرد مركزي",
      "مراوح محورية",
      "وحدات معالجة الهواء",
      "مجاري الهواء",
      "ملحقات التهوية"
    ])
  },
  {
    id: 3,
    titleAr: "التركيب والتشغيل",
    titleEn: "Installation & Commissioning",
    descriptionAr: "فريق تركيب محترف يضمن تنفيذ المشاريع وفق الجدول الزمني المحدد وبأعلى معايير السلامة. نقدم خدمات التشغيل والاختبار لضمان الأداء الأمثل.",
    icon: "Wrench",
    features: JSON.stringify([
      "تركيب احترافي",
      "اختبارات الأداء",
      "موازنة الأنظمة",
      "تشغيل تجريبي",
      "تدريب المشغلين"
    ])
  },
  {
    id: 4,
    titleAr: "الصيانة الدورية",
    titleEn: "Preventive Maintenance",
    descriptionAr: "برامج صيانة دورية مخصصة للحفاظ على كفاءة أنظمة التهوية وإطالة عمرها الافتراضي. نقدم عقود صيانة سنوية بأسعار تنافسية.",
    icon: "ClipboardCheck",
    features: JSON.stringify([
      "فحص دوري شامل",
      "تنظيف الفلاتر",
      "فحص المحركات",
      "معايرة الأنظمة",
      "تقارير دورية"
    ])
  },
  {
    id: 5,
    titleAr: "حلول تحكم وكفاءة الطاقه",
    titleEn: "Energy Efficiency Solutions",
    descriptionAr: "نساعدك في تقليل استهلاك الطاقة وتحسين كفاءة أنظمة التهوية من خلال التقييم الشامل وتقديم حلول التحديث والتطوير.",
    icon: "Zap",
    features: JSON.stringify([
      "تدقيق الطاقة",
      "تحديث المحركات",
      "أنظمة التحكم الذكي",
      "استرداد الحرارة",
      "تقارير التوفير"
    ])
  },

  {
    id: 6,
    titleAr: "الدعم الفني",
    titleEn: "Technical Support",
    descriptionAr: "فريق دعم فني متخصص متاح على مدار الساعة للرد على استفساراتكم وحل المشكلات الطارئة. نضمن استجابة سريعة وحلول فعالة.",
    icon: "HeadphonesIcon",
    features: JSON.stringify([
      "دعم 24/7",
      "استجابة سريعة",
      "فنيين متخصصين",
      "قطع غيار أصلية",
      "ضمان الخدمة"
    ])
  }
];

const iconMap: { [key: string]: React.ReactNode } = {
  Settings: <Settings className="w-10 h-10" />,
  Fan: <Fan className="w-10 h-10" />,
  Wind: <Wind className="w-10 h-10" />,
  ShieldCheck: <ShieldCheck className="w-10 h-10" />,
  Wrench: <Wrench className="w-10 h-10" />,
  ClipboardCheck: <ClipboardCheck className="w-10 h-10" />,
  Zap: <Zap className="w-10 h-10" />,
  HeadphonesIcon: <HeadphonesIcon className="w-10 h-10" />,
};

export default function Services() {
  const { data: dbServices, isLoading } = trpc.services.list.useQuery();
  
  // Use database services if available, otherwise use defaults
  const services = dbServices && dbServices.length > 0 ? dbServices : defaultServices;

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans" dir="rtl">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-24 bg-[#0a1f44] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src="/images/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h4 className="text-primary font-bold tracking-wider uppercase mb-4">خدماتنا</h4>
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                حلول متكاملة لاحتياجاتك
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                نقدم مجموعة شاملة من الخدمات لضمان كفاءة وسلامة أنظمة التهوية في منشأتك
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <div 
                    key={service.id} 
                    className="bg-card p-8 rounded-lg shadow-lg border border-border hover:border-primary/50 transition-all duration-300 group hover:-translate-y-2"
                  >
                    <div className="w-20 h-20 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {iconMap[service.icon || "Settings"] || <Settings className="w-10 h-10" />}
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-2">{service.titleAr}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.titleEn}</p>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.descriptionAr}
                    </p>
                    {service.features && (
                      <ul className="space-y-2 mb-6">
                        {JSON.parse(service.features as string).map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link href="/quote">
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                        اطلب الخدمة
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h4 className="text-primary font-bold tracking-wider uppercase mb-2">كيف نعمل</h4>
              <h2 className="text-4xl font-heading font-bold mb-4">خطوات العمل معنا</h2>
              <p className="text-muted-foreground text-lg">
                نتبع منهجية واضحة ومنظمة لضمان تقديم أفضل الخدمات لعملائنا
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "التواصل", desc: "تواصل معنا لمناقشة احتياجاتك" },
                { step: "02", title: "الدراسة", desc: "نقوم بدراسة متطلبات مشروعك" },
                { step: "03", title: "العرض", desc: "نقدم لك عرضاً فنياً ومالياً" },
                { step: "04", title: "التنفيذ", desc: "ننفذ المشروع بأعلى جودة" },
              ].map((item, index) => (
                <div key={index} className="relative text-center">
                  <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-6 text-2xl font-heading font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-primary/20 -z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h4 className="text-primary font-bold tracking-wider uppercase mb-2">لماذا نحن</h4>
                <h2 className="text-4xl font-heading font-bold mb-6">
                  ما يميزنا عن غيرنا
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  نحن نفخر بتقديم خدمات استثنائية تجمع بين الخبرة العميقة والتقنيات الحديثة والالتزام بأعلى معايير الجودة.
                </p>
                <ul className="space-y-4">
                  {[
                    "فريق هندسي متخصص بخبرة تتجاوز 15 عاماً",
                    "منتجات مصنعة محلياً بمعايير عالمية",
                    "دعم فني متواصل على مدار الساعة",
                    "أسعار تنافسية وضمان شامل",
                    "التزام بالجدول الزمني للمشاريع",
                    "شهادات جودة معتمدة دولياً"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <img 
                  src="/images/about-img.jpg" 
                  alt="Why Choose Us" 
                  className="rounded-lg shadow-2xl"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800";
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              جاهز للبدء؟
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              تواصل معنا اليوم للحصول على استشارة مجانية وعرض سعر مخصص لمشروعك
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="text-primary font-bold">
                  تواصل معنا الآن
                </Button>
              </Link>
              <a href="tel:+966554070875">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  اتصل بنا: 966554070875
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
