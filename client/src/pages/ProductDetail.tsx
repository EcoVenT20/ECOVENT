import { Header, Footer } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check, Download, Phone, Mail } from "lucide-react";
import { Link, useParams } from "wouter";
import { ProductSchema } from "@/components/ProductSchema";
import { Breadcrumb } from "@/components/BreadcrumbSchema";

// Mock data - في المستقبل سيتم جلبها من قاعدة البيانات
const productsData: Record<string, any> = {
  "axial-fans": {
    id: "axial-fans",
    name: "مراوح محورية صناعية",
    nameEn: "Industrial Axial Fans",
    category: "تهوية صناعية",
    description: "مراوح محورية قوية للتهوية العامة والتبريد، مثالية للمستودعات والمصانع الكبيرة.",
    fullDescription: `تُعد مراوحنا المحورية الصناعية الحل الأمثل لتوفير تهوية فعالة وموثوقة في المنشآت الصناعية الكبيرة. صُممت هذه المراوح باستخدام أحدث التقنيات لتوفير أداء عالي مع استهلاك طاقة منخفض.

تتميز مراوحنا بقدرتها على تحريك كميات كبيرة من الهواء بكفاءة عالية، مما يجعلها مثالية للمستودعات والمصانع والمنشآت الصناعية التي تتطلب تهوية مستمرة وفعالة.`,
    image: "/images/blog/66.png",
    specs: {
      flowRate: "حتى 184,000 م³/ساعة",
      pressure: "حتى 800 باسكال",
      diameter: "حتى 1600 مم",
      power: "حتى 75 كيلوواط",
      temperature: "حتى 400°C",
      noise: "أقل من 75 ديسيبل"
    },
    features: [
      "كفاءة طاقة عالية تصل إلى 85%",
      "تصميم محكم ضد الغبار والرطوبة (IP55)",
      "ريش مصنوعة من الألومنيوم المقاوم للتآكل",
      "محركات عالية الجودة من علامات تجارية عالمية",
      "سهولة الصيانة والتركيب",
      "ضمان لمدة2 سنوات"
    ],
    applications: [
      "المستودعات والمخازن الكبيرة",
      "المصانع والورش الصناعية",
      "محطات معالجة المياه",
      "الأنفاق والمواقف تحت الأرض",
      "المنشآت الزراعية والدفيئات",
      "مراكز البيانات"
    ],
    certifications: ["ISO 9001", "CE Mark", "SASO","IE3", "UL LISTED"],
    deliveryTime: "2-3 أسابيع"
  },
  "centrifugal-fans": {
    id: "centrifugal-fans",
    name: "مراوح طاردة مركزية",
    nameEn: "Centrifugal Fans",
    category: "تهوية صناعية",
    description: "مراوح طاردة مركزية عالية الضغط، مثالية لأنظمة التكييف والتهوية المركزية.",
    fullDescription: `مراوحنا الطاردة المركزية مصممة لتوفير ضغط عالي مع كفاءة استثنائية، مما يجعلها الخيار المثالي لأنظمة التكييف المركزي والتطبيقات التي تتطلب ضغطاً ثابتاً.

تتميز بتصميم هندسي متقدم يضمن أداءً موثوقاً وعمراً افتراضياً طويلاً، مع الحد الأدنى من الضوضاء والاهتزاز.`,
    image: "/images/blog/44.png",
    specs: {
      flowRate: "الى 52,000 م³/ساعة",
      pressure: "حتى 2,500 باسكال",
      diameter: "حتى 1000 مم",
      power: "حتى 25  كيلوواط",
      temperature: "حتى 400°C",
      noise: "أقل من 120 ديسيبل"
    },
    features: [
      "تصميم هندسي محسّن لأقصى كفاءة",
      "ريش مصنوعة من الفولاذ المقاوم للصدأ",
      "عزل صوتي متقدم",
      "نظام توازن ديناميكي دقيق",
      "متوافق مع أنظمة التحكم الذكية",
      "ضمان لمدة 2 سنوات"
    ],
    applications: [
      "أنظمة التكييف المركزي",
      "غرف الأفران والمجففات",
      "أنظمة شفط الأدخنة والأبخرة",
      "المطابخ التجارية",
      "المستشفيات والمختبرات",
      "صناعات الأغذية والأدوية"
    ],
    certifications: ["ISO 9001", "CE Mark", "SASO","IE3", "UL LISTED"],
    deliveryTime: "2-3 أسابيع"
  },
  "exhaust-systems": {
    id: "exhaust-systems",
    name: "أنظمة شفط الهواء",
    nameEn: "Exhaust Systems",
    category: "أنظمة متكاملة",
    description: "أنظمة شفط متكاملة للأدخنة والأبخرة والروائح، مع فلاتر متقدمة.",
    fullDescription: `أنظمة شفط الهواء المتكاملة من ECOVENT مصممة لإزالة الملوثات والروائح والأبخرة بكفاءة عالية، مع الحفاظ على بيئة عمل صحية وآمنة.

تشمل أنظمتنا مراوح شفط قوية، مجاري هواء محكمة، وفلاتر متقدمة لضمان جودة هواء مثالية داخل المنشأة.`,
    image: "/images/blog/smoke_extraction_system_diagram.png",
    specs: {
      filterEfficiency: "99.97% (HEPA)",
      Temperature: "حتى 400°C",
      noise: "أقل من 120 ديسيبل"
    },
    features: [
      "نظام فلترة متعدد المراحل",
      "مراوح شفط عالية الكفاءة",
      "مجاري هواء محكمة ومعزولة",
      "نظام تحكم ذكي بالسرعة",
      "أجهزة استشعار لجودة الهواء",
      "ضمان لمدة 2 سنوات"
    ],
    applications: [
      "المطابخ الصناعية والتجارية",
      "ورش اللحام والقطع",
      "مصانع الكيماويات",
      "المختبرات والمعامل",
      "صناعات الطلاء والدهان",
      "محطات معالجة النفايات"
    ],
    certifications: ["ISO 9001", "CE Mark", "NFPA 96","UL LISTED"],
    deliveryTime: "2-4 أسابيع"
  },

     
  "ceiling-fans": {
    id: "ceiling-fans",
    name: "مراوح سقف صناعية",
    nameEn: "Industrial Ceiling Fans",
    category: "تهوية عامة",
    description: "مراوح سقف عالية الأداء مصممة للمساحات المفتوحة الكبيرة لتوفير حركة هواء مثالية.",
    fullDescription: `مراوح السقف الصناعية من ECOVENT توفر حلاً اقتصادياً وفعالاً لتحريك الهواء في المساحات الشاسعة. تتميز بتصميم ريش متطور يسمح بتدفق هواء كبير مع استهلاك طاقة منخفض جداً.`,
    image: "/images/blog/55.png",
    specs: {
      flowRate: "حتى 50,000م³/ساعة",
      diameter: "الى 900 مم",
      power: "حتى 22 كيلوواط",
      noise: "أقل من 100 ديسيبل"
    },
    features: ["محركات موفرة للطاقة", "تشغيل هادئ جداً"],
    applications: ["المساجد", "المولات", "المستودعات المكيفة"],
    certifications: ["ISO 9001","CE", "UL LISTED"],
    deliveryTime: "2-3 أسبوع"
  },

  "smoke-extraction": {
    id: "smoke-extraction",
    name: "أنظمة شفط الدخان",
    nameEn: "Smoke Extraction Systems",
    category: "أنظمة السلامة",
    description: "أنظمة متخصصة لطرد الدخان والحرارة في حالات الطوارئ لضمان إخلاء آمن للمنشآت.",
    fullDescription: `تعتبر أنظمة شفط الدخان من ECOVENT خط الدفاع الأول في حالات الحريق. صُممت هذه الأنظمة لتعمل بكفاءة تحت درجات حرارة قصوى تصل إلى 400 درجة مئوية.
    تعمل هذه المراوح على سحب الغازات السامة والدخان الكثيف من الممرات ومواقف السيارات، مما يسمح لفرق الإنقاذ بالدخول ويضمن رؤية أوضح للأشخاص أثناء الإخلاء.`,
    image: "/images/blog/smoke0.png",
    specs: {
      flowRate: "10,000 - 150,000 م³/ساعة",
      pressure: "حتى 2,500 باسكال",
      temperature: "F400 (400°C لمدة 120 دقيقة)",
      power: "2.2 - 110 كيلوواط",
      noise: "أقل من 85 ديسيبل"
    },
    features: [
      "محركات متخصصة مقاومة للحريق ومعزولة تماماً",
      "ريش من الفولاذ الصلب متزنة ديناميكياً",
      "هيكل خارجي مقاوم للتآكل والصدأ",
      "إمكانية الربط مع لوحة إنذار الحريق المركزية",
      "متوفرة بتصاميم تناسب التركيب السطحي أو داخل الدكت"
    ],
    applications: [
      "مواقف السيارات تحت الأرض",
      "الأنفاق والممرات الطويلة",
      "المراكز التجارية والمولات",
      "المصانع والمستودعات الكبرى",
      "المستشفيات والمباني الحكومية"
    ],
    certifications: ["EN 12101-3", "UL Listed", "SASO", "CE"],
    price: "حسب التصميم الفني",
    deliveryTime: "4-6 أسابيع"
  },
  "industrial-filters": {
    id: "industrial-filters",
    name: "فلاتر الهواء الصناعية",
    nameEn: "Industrial Air Filters",
    category: "تنقية الهواء",
    description: "حلول تنقية متطورة لإزالة الغبار، الأبخرة، والملوثات الدقيقة في البيئات الصناعية.",
    fullDescription: `توفر ECOVENT أنظمة فلترة متكاملة تبدأ من الفلاتر الأولية (Pre-filters) وحتى الفلاتر فائقة الدقة (HEPA). 
    هذه الأنظمة مصممة لحماية جودة الهواء الداخلي والحفاظ على كفاءة المعدات الميكانيكية من خلال منع تراكم الأتربة والشوائب داخلها.`,
    image: "/images/blog/air.jpeg",
    specs: {
      filterEfficiency: "99,7% , (HEPA)",
      flowRate: "تصميم مخصص حسب حجم النظام",
      pressureDrop: "فقد ضغط منخفض جداً لتوفير الطاقة",
      material: "ألياف زجاجية، بوليستر، أو كربون نشط",
    },
    features: [
      "كفاءة احتجاز جزيئات تصل إلى 99.99%",
      "إطارات قوية تمنع تسريب الهواء من الجوانب",
      "قدرة عالية على تخزين الغبار لعمر أطول",
      "مطابقة للمعايير الصحية والبيئية الدولية",
      "سهولة الفك والتركيب للصيانة الدورية"
    ],
    applications: [
      "غرف العمليات والمختبرات",
      "صناعات الأدوية والأغذية",
      "مصانع الإلكترونيات والدقائق",
      "أنظمة التكييف المركزية (AHU)",
      "ورش الطلاء والدهان"
    ],
    certifications: ["ISO 16890", "EN 1822", "ASHRAE 52.2"],
    deliveryTime: "1-2 أسبوع"
  }
};


export default function ProductDetail() {
  const params = useParams();
  const productId = params.id || "axial-fans";
  
  // Try to get product from static data first
  let product = productsData[productId];
  
  // If not found and productId is numeric, map to static IDs
  if (!product && !isNaN(Number(productId))) {
    const idMap: Record<string, string> = {
      "1": "centrifugal-fans",
      "2": "axial-fans",
      "3": "exhaust-systems",
      "4":"ceiling-fans", // أنظمة شفط الدخان
      "5": "industrial-filters" // فلاتر الهواء الصناعية
      
    };
    const mappedId = idMap[productId];
    if (mappedId) {
      product = productsData[mappedId];
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background" dir="rtl">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">المنتج غير موجود</h1>
            <Link href="/products">
              <Button>
                <ArrowRight className="ml-2 w-4 h-4" />
                العودة إلى المنتجات
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
      <ProductSchema product={{
        id: parseInt(product.id) || 0,
        nameAr: product.name,
        nameEn: product.nameEn,
        descriptionAr: product.description,
        imageUrl: product.image,
        category: product.category
      }} />
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb items={[
            { name: "الرئيسية", url: "https://www.ecovent-sa.com/" },
            { name: "المنتجات", url: "https://www.ecovent-sa.com/products" },
            { name: product.name, url: `https://www.ecovent-sa.com/products/${product.id}` }
          ]} />
        </div>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-l from-[#0a2540] to-[#1a4d7a] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-secondary text-white">{product.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {product.nameEn}
              </p>
              <p className="text-lg text-white/80 mb-8 max-w-2xl">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/quote">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                    طلب عرض سعر
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

        {/* Product Image */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-[400px] object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/1200x400/0a2540/ffffff?text=" + encodeURIComponent(product.name);
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-heading font-bold mb-6">نظرة عامة</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line">
                {product.fullDescription}
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-heading font-bold mb-8">المواصفات الفنية</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specs).map(([key, value]: [string, any]) => (
                  <Card key={key} className="p-6">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-foreground">
                        {key === "flowRate" && "معدل التدفق"}
                        {key === "pressure" && "الضغط"}
                        {key === "diameter" && "القطر"}
                        {key === "power" && "القدرة"}
                        {key === "temperature" && "درجة الحرارة"}
                        {key === "noise" && "مستوى الضوضاء"}
                        {key === "filterEfficiency" && "كفاءة الفلترة"}
                      </span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-heading font-bold mb-8">المزايا والخصائص</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-heading font-bold mb-8">التطبيقات والاستخدامات</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.applications.map((app: string, index: number) => (
                  <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                      <span className="text-foreground">{app}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications & Pricing */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Certifications */}
                <Card className="p-8">
                  <h3 className="text-2xl font-bold mb-4">الشهادات والاعتمادات</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.certifications.map((cert: string) => (
                      <Badge key={cert} variant="outline" className="text-base py-2 px-4">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </Card>

                {/* Pricing */}
                <Card className="p-8 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                  <h3 className="text-2xl font-bold mb-4">معلومات الطلب</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground"></span>
                      <p className="text-xl font-bold text-secondary">{product.price}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">مدة التوريد</span>
                      <p className="font-medium">{product.deliveryTime}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-l from-[#0a2540] to-[#1a4d7a] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              هل أنت مهتم بهذا المنتج؟
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
              <a href="tel:507947078">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Phone className="ml-2 w-4 h-4" />
                  اتصل بنا
                </Button>
              </a>
              <a href="mailto:info@ecovent-sa.com">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Mail className="ml-2 w-4 h-4" />
                  راسلنا
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
