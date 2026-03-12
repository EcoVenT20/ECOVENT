import { Header, Footer } from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin, Calendar, Building2 } from "lucide-react";
import { Link } from "wouter";

// Default projects data for when database is empty
const defaultProjects = [
  {
    id: 1,
    titleAr: "مجمع الخير التجاري",
    titleEn: "Al Khair Mall",
    descriptionAr: "تصميم وتنفيذ نظام تهوية متكامل للمجمع بمساحة 10,000 متر مربع، يشمل أنظمة التبريد والتحكم في الرطوبة والتعقيم.",
    clientName: "الشيخه هيا العجلان",
    location: "الرياض",
    completionDate: "2024-06",
    imageUrl: "/images/blog/العجلان(1).png",
    category: "commercial",
    isFeatured: true
  },
  {
    id: 2,
    titleAr: "مجمع السيف التجاري",
    titleEn: "Al Seef Mall",
    descriptionAr: "تركيب أنظمة تهويه مركزيه وأنظمة التحكم في الدخان وأنظمة ضغط السلالم والمصاعد.",
    clientName: "شركة السيف",
    location: "الرياض",
    completionDate: "2024-03",
    imageUrl: "/images/blog/حراج الكمبيوتر.png",
    category: "technology",
    isFeatured: true
  },
  {
    id: 3,
    titleAr: "برج سنام التجاري",
    titleEn: "sanam Tower",
    descriptionAr: "توريد وتركيب أنظمة التهويه لعدد 4 باركينج وأنظمة تحكم بالدخان ل 9 أدوار وأنظمة ضغط السلالم والمصاعد",
    clientName: "شركة العدوان للتطوير العقاري",
    location: "الرياض",
    completionDate: "2023-12",
    imageUrl: "/images/blog/برج سلام.png",
    category: "commercial",
    isFeatured: true
  },
  {
   // id: 4,
   // titleAr: "مصنع البتروكيماويات",
   // titleEn: "Petrochemical Plant",
   // descriptionAr: "تصميم وتنفيذ أنظمة شفط الأبخرة والغازات الخطرة مع أنظمة السلامة المتقدمة.",
   // clientName: "سابك",
   // location: "الجبيل",
   // completionDate: "2023-09",
   // imageUrl: "/images/project-4.jpg",
   // category: "industrial",
   // isFeatured: false
  },
  {
   // id: 5,
   // titleAr: "مجمع الأفنيوز التجاري",
   // titleEn: "Avenues Mall",
   // descriptionAr: "تركيب أنظمة تكييف مركزي لمجمع تجاري بمساحة 200,000 متر مربع مع التحكم الذكي في المناطق.",
   // clientName: "مجموعة الفطيم",
   // location: "الرياض",
   // completionDate: "2023-06",
   // imageUrl: "/images/project-5.jpg",
   // category: "commercial",
   // isFeatured: false
  },
  {
    //id: 6,
   // titleAr: "مصنع الأدوية الحيوية",
   // titleEn: "Pharmaceutical Factory",
  //  descriptionAr: "تجهيز غرف نظيفة بمعايير GMP لإنتاج الأدوية مع أنظمة ترشيح HEPA وتحكم دقيق في الضغط.",
   // clientName: "شركة الدواء السعودية",
   // location: "المدينة المنورة",
   // completionDate: "2023-03",
   // imageUrl: "/images/project-6.jpg",
   // category: "pharmaceutical",
   // isFeatured: false
  }
];

const categories = [
  { id: "all", name: "جميع المشاريع" },
//  { id: "industrial", name: "صناعي" },
 // { id: "commercial", name: "تجاري" },
 // { id: "healthcare", name: "صحي" },
 // { id: "technology", name: "تقني" },
];

export default function Projects() {
  const { data: dbProjects, isLoading } = trpc.projects.list.useQuery();
  
  // Use database projects if available, otherwise use defaults
  const projects = dbProjects && dbProjects.length > 0 ? dbProjects : defaultProjects;

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
              <h4 className="text-primary font-bold tracking-wider uppercase mb-4">مشاريعنا</h4>
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                سجل حافل بالإنجازات
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                نفخر بتنفيذ مئات المشاريع الناجحة في مختلف القطاعات الصناعية والتجارية والصحية
              </p>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h4 className="text-primary font-bold tracking-wider uppercase mb-2">مشاريع مميزة</h4>
              <h2 className="text-4xl font-heading font-bold mb-4">أبرز إنجازاتنا</h2>
              <p className="text-muted-foreground text-lg">
                نماذج من المشاريع الكبرى التي نفذناها بنجاح
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
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
                {projects.map((project) => (
                  <div key={project.id} className="group relative overflow-hidden rounded-lg shadow-lg">
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={project.imageUrl || "/images/project-placeholder.jpg"}
                        alt={project.titleAr}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      
                      {/* Featured Badge */}
                      {project.isFeatured && (
                        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                          مميز
                        </div>
                      )}
                      
                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-center gap-4 mb-3 text-sm opacity-80">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {project.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {project.completionDate ? new Date(project.completionDate).getFullYear() : "2024"}
                          </span>
                        </div>
                        <h3 className="text-2xl font-heading font-bold mb-2">{project.titleAr}</h3>
                        <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                          {project.descriptionAr}
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <Building2 className="w-4 h-4 text-primary" />
                          <span>{project.clientName}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link href={`/projects/${project.id}`}>
                        <Button variant="secondary" className="text-primary font-bold">
                          عرض التفاصيل
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "500+", label: "مشروع منجز" },
                { number: "15+", label: "سنة خبرة" },
                { number: "200+", label: "عميل راضٍ" },
                { number: "50+", label: "مهندس متخصص" },
              ].map((stat, index) => (
                <div key={index}>
                  <p className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">{stat.number}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              هل لديك مشروع قادم؟
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              دعنا نساعدك في تحقيق رؤيتك. تواصل معنا للحصول على استشارة مجانية وعرض سعر مخصص
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="text-primary font-bold">
                  طلب عرض سعر
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  استعرض منتجاتنا
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
