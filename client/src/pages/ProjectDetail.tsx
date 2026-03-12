import { Header, Footer } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar, MapPin, Building2, Check } from "lucide-react";
import { Link, useParams } from "wouter";

// Mock data - في المستقبل سيتم جلبها من قاعدة البيانات
const projectsData: Record<string, any> = {
  "data-center": {
    id: "data-center",
    name: "مركز البيانات الرئيسي",
    nameEn: "Main Data Center",
    category: "تقني",
    client: "شركة الاتصالات السعودية",
    location: "جدة",
    year: "2024",
    description: "تركيب أنظمة تبريد دقيقة لمركز بيانات بسعة 500 خادم.",
    fullDescription: `مشروع متكامل لتوفير نظام تهوية وتبريد متطور لمركز بيانات رئيسي يحتوي على 500 خادم. تم تصميم النظام لضمان درجة حرارة ورطوبة مثالية على مدار الساعة، مع أنظمة احتياطية لضمان استمرارية العمل.

تضمن المشروع تركيب وحدات تكييف دقيقة، أنظمة توزيع هواء متقدمة، وأنظمة مراقبة وتحكم ذكية لضمان أعلى مستويات الأداء والموثوقية.`,
    image: "/images/projects/data-center.jpg",
    scope: [
      "دراسة وتصميم نظام التهوية والتبريد",
      "توريد وتركيب 20 وحدة تكييف دقيقة",
      "تركيب نظام توزيع هواء متقدم",
      "تركيب أنظمة مراقبة وتحكم ذكية",
      "اختبار وتشغيل النظام",
      "تدريب فريق الصيانة"
    ],
    challenges: [
      "الحفاظ على درجة حرارة ثابتة (22±2°C)",
      "ضمان رطوبة نسبية 45-55%",
      "توفير نظام احتياطي بنسبة 100%",
      "تقليل وقت التوقف إلى الصفر"
    ],
    solutions: [
      "استخدام وحدات تكييف دقيقة من الجيل الأحدث",
      "نظام توزيع هواء تحت الأرضية",
      "نظام مراقبة وتحكم مركزي متطور",
      "أنظمة احتياطية N+1 لجميع المكونات الحرجة"
    ],
    results: [
      "تحقيق درجة حرارة ثابتة ضمن النطاق المطلوب",
      "تقليل استهلاك الطاقة بنسبة 30%",
      "تحسين موثوقية النظام إلى 99.99%",
      "رضا العميل الكامل عن الأداء"
    ],
    duration: "6 أشهر",
    value: "2.5 مليون ريال",
    images: [
      "/images/projects/data-center-1.jpg",
      "/images/projects/data-center-2.jpg",
      "/images/projects/data-center-3.jpg"
    ]
  },
  "factory-ventilation": {
    id: "factory-ventilation",
    name: "مصنع الأغذية المتطور",
    nameEn: "Advanced Food Factory",
    category: "صناعي",
    client: "شركة الأغذية الوطنية",
    location: "الرياض",
    year: "2024",
    description: "نظام تهوية متكامل لمصنع أغذية بمساحة 10,000 متر مربع.",
    fullDescription: `مشروع شامل لتوفير نظام تهوية صناعي متطور لمصنع أغذية كبير. تم تصميم النظام لتلبية أعلى معايير النظافة والسلامة الغذائية، مع ضمان بيئة عمل مريحة للموظفين.

شمل المشروع تركيب مراوح شفط قوية، أنظمة فلترة متقدمة، ومجاري هواء من الفولاذ المقاوم للصدأ لضمان أعلى مستويات النظافة.`,
    image: "/images/projects/factory.jpg",
    scope: [
      "دراسة وتصميم نظام التهوية الصناعية",
      "توريد وتركيب 50 مروحة شفط",
      "تركيب 2000 متر من مجاري الهواء",
      "تركيب أنظمة فلترة HEPA",
      "تركيب نظام تحكم ومراقبة",
      "اختبار وتشغيل النظام"
    ],
    challenges: [
      "تلبية معايير السلامة الغذائية الصارمة",
      "التعامل مع أنواع مختلفة من الملوثات",
      "ضمان توزيع هواء متجانس",
      "تقليل استهلاك الطاقة"
    ],
    solutions: [
      "استخدام مواد غذائية معتمدة (Food Grade)",
      "نظام فلترة متعدد المراحل",
      "تصميم مجاري هواء محسّن بواسطة CFD",
      "مراوح عالية الكفاءة مع محركات EC"
    ],
    results: [
      "تحقيق معايير ISO 22000 للسلامة الغذائية",
      "تحسين جودة الهواء بنسبة 95%",
      "تقليل استهلاك الطاقة بنسبة 40%",
      "زيادة إنتاجية الموظفين بنسبة 15%"
    ],
    duration: "8 أشهر",
    value: "3.8 مليون ريال",
    images: [
      "/images/projects/factory-1.jpg",
      "/images/projects/factory-2.jpg",
      "/images/projects/factory-3.jpg"
    ]
  },
  "mall-hvac": {
    id: "mall-hvac",
    name: "مركز تسوق الواحة",
    nameEn: "Oasis Shopping Mall",
    category: "تجاري",
    client: "شركة الواحة للاستثمار",
    location: "الدمام",
    year: "2023",
    description: "نظام تكييف وتهوية متكامل لمركز تسوق بمساحة 50,000 متر مربع.",
    fullDescription: `مشروع ضخم لتوفير نظام تكييف وتهوية متكامل لمركز تسوق حديث. تم تصميم النظام لتوفير راحة مثالية للزوار مع كفاءة طاقة عالية.

شمل المشروع تركيب وحدات تكييف مركزية، نظام توزيع هواء متطور، وأنظمة تحكم ذكية لتحقيق أقصى كفاءة تشغيلية.`,
    image: "/images/projects/mall.jpg",
    scope: [
      "دراسة وتصميم نظام التكييف المركزي",
      "توريد وتركيب 10 وحدات تبريد مركزية",
      "تركيب 5000 متر من مجاري الهواء",
      "تركيب 500 وحدة توزيع هواء",
      "تركيب نظام BMS متطور",
      "اختبار وتشغيل النظام"
    ],
    challenges: [
      "التعامل مع أحمال تبريد متغيرة",
      "ضمان توزيع هواء متجانس في مساحة كبيرة",
      "تقليل استهلاك الطاقة",
      "العمل ضمن جدول زمني ضيق"
    ],
    solutions: [
      "استخدام وحدات تبريد VRF متغيرة السعة",
      "نظام توزيع هواء محسّن بتقنية VAV",
      "نظام BMS ذكي لإدارة الطاقة",
      "تخطيط دقيق وتنسيق مع المقاولين الآخرين"
    ],
    results: [
      "تحقيق راحة حرارية مثالية في جميع المناطق",
      "تقليل استهلاك الطاقة بنسبة 35%",
      "تسليم المشروع في الموعد المحدد",
      "حصول المركز على شهادة LEED الفضية"
    ],
    duration: "12 شهر",
    value: "8.5 مليون ريال",
    images: [
      "/images/projects/mall-1.jpg",
      "/images/projects/mall-2.jpg",
      "/images/projects/mall-3.jpg"
    ]
  }
};

export default function ProjectDetail() {
  const params = useParams();
  const projectId = params.id || "data-center";
  
  // Try to get project from static data first
  let project = projectsData[projectId];
  
  // If not found and projectId is numeric, map to static IDs
  if (!project && !isNaN(Number(projectId))) {
    const idMap: Record<string, string> = {
      "1": "factory-ventilation",
      "2": "data-center",
      "3": "mall-hvac"
    };
    const mappedId = idMap[projectId];
    if (mappedId) {
      project = projectsData[mappedId];
    }
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-background" dir="rtl">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">المشروع غير موجود</h1>
            <Link href="/projects">
              <Button>
                <ArrowRight className="ml-2 w-4 h-4" />
                العودة إلى المشاريع
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-l from-[#0a2540] to-[#1a4d7a] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-secondary text-white">{project.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                {project.name}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {project.nameEn}
              </p>
              <div className="flex flex-wrap gap-6 text-white/80 mb-8">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  <span>{project.client}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{project.year}</span>
                </div>
              </div>
              <p className="text-lg text-white/80 mb-8 max-w-2xl">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/quote">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                    طلب مشروع مماثل
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    تواصل معنا
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Project Image */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-[400px] object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/1200x400/0a2540/ffffff?text=" + encodeURIComponent(project.name);
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Project Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-heading font-bold mb-6">نظرة عامة على المشروع</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line mb-8">
                {project.fullDescription}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">{project.duration}</div>
                  <div className="text-sm text-muted-foreground">مدة التنفيذ</div>
                </Card>
                <Card className="p-6 text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">{project.value}</div>
                  <div className="text-sm text-muted-foreground">قيمة المشروع</div>
                </Card>
                <Card className="p-6 text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">{project.year}</div>
                  <div className="text-sm text-muted-foreground">سنة التنفيذ</div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Scope of Work */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-heading font-bold mb-8">نطاق العمل</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.scope.map((item: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Challenges & Solutions */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Challenges */}
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-6">التحديات</h3>
                  <div className="space-y-4">
                    {project.challenges.map((challenge: string, index: number) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-foreground">{challenge}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Solutions */}
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-6">الحلول</h3>
                  <div className="space-y-4">
                    {project.solutions.map((solution: string, index: number) => (
                      <Card key={index} className="p-4 bg-secondary/5 border-secondary/20">
                        <div className="flex items-start gap-3">
                          <Check className="w-6 h-6 text-secondary flex-shrink-0" />
                          <span className="text-foreground">{solution}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-heading font-bold mb-8">النتائج والإنجازات</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.results.map((result: string, index: number) => (
                  <Card key={index} className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5" />
                      </div>
                      <span className="text-foreground font-medium">{result}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-l from-[#0a2540] to-[#1a4d7a] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              هل لديك مشروع مماثل؟
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر مخصص لمشروعك
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/quote">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                  طلب عرض سعر
                </Button>
              </Link>
              <Link href="/projects">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <ArrowRight className="ml-2 w-4 h-4" />
                  عرض المزيد من المشاريع
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
