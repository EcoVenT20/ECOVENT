import { Header, Footer } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Home, Info, Package, Briefcase, BookOpen, Mail, FileText, Sparkles } from "lucide-react";

export default function Sitemap() {
  const sitemapSections = [
    {
      title: "الصفحات الرئيسية",
      icon: Home,
      links: [
        { name: "الصفحة الرئيسية", path: "/" },
        { name: "من نحن", path: "/about" },
        { name: "تواصل معنا", path: "/contact" },
        { name: "طلب عرض سعر", path: "/quote" },
      ]
    },
    {
      title: "المنتجات والخدمات",
      icon: Package,
      links: [
        { name: "المنتجات", path: "/products" },
        { name: "الخدمات", path: "/services" },
        { name: "المشاريع", path: "/projects" },
      ]
    },
    {
      title: "المدونة",
      icon: BookOpen,
      links: [
        { name: "المدونة", path: "/blog" },
        { name: "أنواع المراوح الصناعية واستخداماتها", path: "/blog/types-of-industrial-fans" },
        { name: "كيفية اختيار نظام التهوية المناسب لمصنعك", path: "/blog/choosing-ventilation-system" },
        { name: "دليل الصيانة الدورية لأنظمة التهوية الصناعية", path: "/blog/ventilation-maintenance-guide" },
      ]
    },
    {
      title: "أدوات وموارد",
      icon: Sparkles,
      links: [
        { name: "أدوات AI", path: "/ai-tools" },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl">
      <Header />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">خريطة الموقع</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              استكشف جميع صفحات وأقسام موقع ECOVENT بسهولة
            </p>
          </div>

          {/* Sitemap Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {sitemapSections.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link href={link.path}>
                          <a className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 py-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                            {link.name}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <Card className="max-w-3xl mx-auto bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div className="text-right">
                    <h3 className="font-bold mb-2">هل تحتاج إلى مساعدة؟</h3>
                    <p className="text-muted-foreground mb-4">
                      إذا لم تجد ما تبحث عنه، لا تتردد في التواصل معنا. فريقنا جاهز لمساعدتك.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Link href="/contact">
                        <a className="inline-flex items-center gap-2 text-primary hover:underline">
                          <Mail className="w-4 h-4" />
                          تواصل معنا
                        </a>
                      </Link>
                      <a 
                        href="/sitemap.xml" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary hover:underline"
                      >
                        <FileText className="w-4 h-4" />
                        عرض XML Sitemap
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
