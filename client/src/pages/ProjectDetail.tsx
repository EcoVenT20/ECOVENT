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
    name: "مجمع السيف التجاري",
    nameEn: "Al-Seif Commercial Complex",
    category: "تجاري",
    client: "شركة السيف التجارية",
    location: "الرياض",
    year: "2024",
    description: "توريد وتركيب نظام تحكم بالدخان ونظام ضغط السلالم والمصاعد وكذلك تهوية الباركينج عن طريق JETFAN",
    fullDescription: `توريد وتركيب نظام تحكم بالدخان ونظام ضغط السلالم والمصاعد وكذلك تهوية الباركينج عن طريق JETFAN.`,
    image: "/images/blog/حراج الكمبيوتر.png",
    scope: [
      "نظام تحكم بالدخان",
      "نظام ضغط السلالم ",
      "نظام تحكم شامل",
      "نظام تهوية JETFAN",
      "توريد وتركيسب عدد 20 مروحه",
      "اختبار وتشغيل النظام"
    ],
    challenges: [
      "ضيق لمساحات والارتفاعات",
      "توزيع الهواء المتكافئ",
      "المبنى قائم وقديم",
      //"تقليل وقت التوقف إلى الصفر"
    ],
    solutions: [
      "من خلال تعدد خيارات المراوح",
      "استخدام تقنية CFD ",
      "استخدام الانظمه الموجوده بقدر كبير مع كفاءه عاليه جدا",
      //"أنظمة احتياطية N+1 لجميع المكونات الحرجة"
    ],
    results: [
      "تحقيق درجة حرارة ثابتة ضمن النطاق المطلوب",
      "تقليل استهلاك الطاقة ",
      //"تحسين موثوقية النظام إلى 99.99%",
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
    name: "مجمع الخير التجاري",
    nameEn: "Al-Khair Commercial Complex",
    category: "تجاري",
    client: "الشيخه هيا العجلان",
    location: "الرياض",
    year: "2024",
    description: "نظام تهوية متكامل بعدد 2 باركينج.",
    fullDescription: `مشروع شامل لنظام تهويه متكامل لعدد 2 باركينج في مجمع الخير 1 والربط بأنظمة الانذار و أنظمة التحكم في مستويات أول أكسيد الكربون وكذلك تركيب أنظمة تهوية المطاعم المركزيه بالمحلات التجاريه`,
    image: "/images/blog/العجلان(1).png",
    scope: [
      "تهويه مركزيه",
      "التحكم بأول أكسيد الكربون",
      "نظام تحكم بالمراوح",
      "توريد وتركيب عدد 8 مراوح تهويه 30,000CFM وأكثر",

    ],
    challenges: [
      "مشكله في الارتفاعات والتنسيق بين الانظمه",
      "كمية مجاري الهواء كبيره جدا بالتصميم",
      //"ضمان توزيع هواء متجانس",
      "تقليل التكلفة"
    ],
    solutions: [
      
      "تم عمل مخطط تنفيذي احترافي منسق مع جميع الانظمه",
    "تم عمل نمذجه وتقليل الكميات بكفاءه عاليه",
      //"مراوح عالية الكفاءة مع محركات EC"
    ],
    results: [
      "تقليل استهلاك الطاقه",
      "الكفاءه في التصميم",
      //"تقليل استهلاك الطاقة بنسبة 40%",
      //"زيادة إنتاجية الموظفين بنسبة 15%"
    ],
    duration: "8 أشهر",
    images: [
      "/images/projects/factory-1.jpg",
      "/images/projects/factory-2.jpg",
      "/images/projects/factory-3.jpg"
    ]
  },
  "mall-hvac": {
    id: "mall-hvac",
    name: "برج سنام التجاري",
    nameEn: "Snam Commercial Tower",
    category: "تجاري",
    client: "شركة العدوان للتطوير العقاري",
    location: "الرياض",
    year: "2023",
    description: "نظام تكييف وتهوية متكامل لمركز تسوق بمساحة 50,000 متر مربع.",
    fullDescription: `مشروع ضخم لتوفير نظام تهوية متكامل للبرج. يشمل أنظمةالتحكم بادخان وأنظمة ضغط السلالموالمصاعد وتهوية عدد 4 باركينج في مده زمنيه قصيره جدا.`,
    image: "/images/blog/GhQywgiWYAAYV7F.jpg",
    scope: [
      "نظام التحكم  بالدخان",
      "نظام ضغط السلالم",
      "نظام تهوية باركينج عن طريق مجاري الهواء",
      "نظام تحكم شامل",
      "توريد وتركيب عدد 18 مروحه",
      "اختبار وتشغيل النظام"
    ],
    challenges: [
      "ضيق المده الزمنيه المتاحه للتنفيذ",
      "ضيق المساحات والارتفاعات",
      //"تقليل استهلاك الطاقة",
     // "العمل ضمن جدول زمني ضيق"
    ],
    solutions: [
      "باجتهاد فريقنا الكبير والمتكامل تمكنا من تنفيذ المشروع في 50 يوم",
      "تصميم مجاري الهواء بطريقه احترافيه",
     // "نظام BMS ذكي لإدارة الطاقة",
      //"تخطيط دقيق وتنسيق مع المقاولين الآخرين"
    ],
    results: [
      "تسليم المشروع في الموعد المحدد",
      "تركيب الانظمه بارتفاعات مكتمله حسب الاستاندر والكود المحلي",
      "التناسق بين الانظمه والتصميم المعماري",
      //"حصول المركز على شهادة LEED الفضية"
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
