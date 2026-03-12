import { Header, Footer } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Fan, Wind, Settings, ArrowRight, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

// Default products data for when database is empty
const defaultProducts = [
  {
    id: 1,
    nameAr: "مراوح الطرد المركزي",
    nameEn: "Centrifugal Fans",
    descriptionAr: "مراوح طرد مركزي عالية الكفاءة مصممة للتطبيقات الصناعية الثقيلة. توفر تدفق هواء قوي ومستقر مع مستويات ضوضاء منخفضة.",
    category: "industrial",
    imageUrl: "/images/blog/تصميم بدون عنوان.png",
    specifications: JSON.stringify({
      "معدل التدفق": "1,000 - 50,000 م³/ساعة",
      "الضغط": "حتى 3,000 باسكال",
      "درجة الحرارة": "-20 إلى +400 درجة مئوية",
      "المواد": "فولاذ كربوني / ستانلس ستيل"
    })
  },
  {
    id: 2,
    nameAr: "مراوح محورية صناعية",
    nameEn: "Industrial Axial Fans",
    descriptionAr: "مراوح محورية قوية للتهوية العامة والتبريد. مثالية للمستودعات والمصانع الكبيرة.",
    category: "industrial",
    imageUrl: "/images/blog/whatsapp1.png",
    specifications: JSON.stringify({
      "معدل التدفق": "5,000 - 200,000 م³/ساعة",
      "الضغط": "حتى 1,500 باسكال",
      "القطر": "400 - 2,000 مم",
      "الكفاءة": "حتى 85%"
    })
  },
  
  {id: 3,
    nameAr: "أنظمة شفط الدخان",
    nameEn: "Smoke Extraction Systems",
    descriptionAr: "أنظمة شفط دخان متقدمة للسلامة من الحرائق، معتمدة وفق المعايير الدولية.",
    category: "safety",
    imageUrl: "/images/blog/smoke22.png",
    specifications: JSON.stringify({
      "درجة الحرارة": "حتى 400°C لمدة 2 ساعة",
      "الاعتماد": "EN 12101-3",
      "التحكم": "أوتوماتيكي / يدوي",
      "التكامل": "مع أنظمة إنذار الحريق"
    })
    
  },
  {id: 4,
    nameAr: "مراوح السقف",
    nameEn: "Roof Fans",
    descriptionAr: "مراوح سقف مقاومة للعوامل الجوية للتهوية الطبيعية والميكانيكية للمباني الصناعية والتجارية.",
    category: "commercial",
    imageUrl: "/images/blog/rooftopfan.jpg",
    specifications: JSON.stringify({
      "معدل التدفق": "500 - 30,000 م³/ساعة",
      "الحماية": "IP55",
      "المواد": "ألومنيوم مطلي",
      "الضمان": "5 سنوات"
    })
  },
  {
    id: 5,
    nameAr: "فلاتر الهواء الصناعية",
    nameEn: "Industrial Air Filters",
    descriptionAr: "فلاتر هواء عالية الكفاءة لتنقية الهواء من الجسيمات والملوثات في البيئات الصناعية.",
    category: "filtration",
    imageUrl: "/images/blog/air.jpeg",
    specifications: JSON.stringify({
      "الكفاءة": "85% - 99.995%",
      "الفئة": "G4 - U17",
      "الأبعاد": "مخصصة",
      "العمر الافتراضي": "6-24 شهر"
    })
  }
];

const categories = [
  { id: "all", name: "جميع المنتجات" },
  //{ id: "industrial", name: "صناعي" },
  //{ id: "commercial", name: "تجاري" },
  //{ id: "hvac", name: "تكييف" },
  //{ id: "safety", name: "السلامة" },
  //{ id: "filtration", name: "الترشيح" },
];

export default function Products() {
  const { data: dbProducts, isLoading } = trpc.products.list.useQuery();
  
  // Use database products if available, otherwise use defaults
  // if the database has products but some lack imageUrl, merge with defaults to supply images
  let products = dbProducts && dbProducts.length > 0 ? dbProducts : defaultProducts;
  if (dbProducts && dbProducts.length > 0) {
    products = dbProducts.map((p) => {
      if (p.imageUrl) return p;
      const def = defaultProducts.find((d) => d.id === p.id);
      return def ? { ...p, imageUrl: def.imageUrl } : p;
    });
  }

  const getIcon = (category: string | null) => {
    switch (category) {
      case "industrial":
        return <Fan className="w-6 h-6" />;
      case "hvac":
        return <Wind className="w-6 h-6" />;
      default:
        return <Settings className="w-6 h-6" />;
    }
  };

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
              <h4 className="text-primary font-bold tracking-wider uppercase mb-4">منتجاتنا</h4>
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                حلول تهوية متكاملة لكل احتياج
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                نقدم مجموعة واسعة من منتجات التهوية الصناعية والتجارية المصممة بأعلى معايير الجودة
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={cat.id === "all" ? "default" : "outline"}
                  className="rounded-full"
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50">
                    <div className="relative h-64 overflow-hidden bg-muted">
                      <img
                        src={product.imageUrl || "/images/product-placeholder.jpg"}
                        alt={product.nameAr}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600";
                        }}
                      />
                      <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                        {product.category}
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          {getIcon(product.category)}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{product.nameAr}</CardTitle>
                          <CardDescription className="text-sm">{product.nameEn}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {product.descriptionAr}
                      </p>
                      {product.specifications && (
                        <div className="space-y-2 mb-4">
                          {Object.entries(JSON.parse(product.specifications as string)).slice(0, 3).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{key}:</span>
                              <span className="font-medium">{value as string}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <Link href={`/products/${product.id}`}>
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                          عرض التفاصيل
                          <ArrowRight className="mr-2 w-4 h-4" style={{ transform: 'scaleX(-1)' }} />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              لم تجد المنتج المناسب؟
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              نقدم حلول مخصصة تناسب احتياجاتك الخاصة. تواصل معنا للحصول على استشارة مجانية
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="text-primary font-bold">
                تواصل معنا الآن
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
