import { Header, Footer } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { CheckCircle2, Target, Eye, Award, Users, Factory, Globe } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "الجودة",
      description: "نلتزم بأعلى معايير الجودة العالمية في جميع منتجاتنا وخدماتنا"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "العملاء أولاً",
      description: "نضع احتياجات عملائنا في مقدمة أولوياتنا ونسعى لتجاوز توقعاتهم"
    },
    {
      icon: <Factory className="w-8 h-8" />,
      title: "الابتكار",
      description: "نستثمر في البحث والتطوير لتقديم حلول مبتكرة ومتطورة"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "الاستدامة",
      description: "نلتزم بالممارسات البيئية المستدامة في جميع عملياتنا"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans" dir="rtl">
      <SEO 
        title="من نحن - ECOVENT | حلول التهوية الصناعية"
        description="تعرف على إيكوفنت، الشركة السعودية الرائدة في تصنيع وتوريد أنظمة التهوية الصناعية. نقدم حلول مبتكرة وموثوقة منذ سنوات."
        keywords="من نحن إيكوفنت، شركة تهوية سعودية، تصنيع تهوية صناعية، ECOVENT about"
        canonical="https://www.ecovent-sa.com/about"
        ogUrl="https://www.ecovent-sa.com/about"
      />
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-24 bg-[#0a1f44] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src="/images/aboutUS.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h4 className="text-primary font-bold tracking-wider uppercase mb-4">من نحن</h4>
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                رواد صناعة التهوية في المملكة العربية السعودية
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                منذ تأسيسنا، نسعى لتقديم أفضل حلول التهوية الصناعية التي تلبي احتياجات السوق السعودي والخليجي
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="relative rounded-lg overflow-hidden shadow-2xl">
                  <img 
                    src="/images/blog/aboutUS.jpg" 
                    alt="قصة ECOVENT" 
                    className="w-full h-[500px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-primary text-white p-8 rounded-lg shadow-xl max-w-xs hidden md:block">
                  <p className="text-5xl font-heading font-bold mb-2">2030</p>
                  <p className="text-sm opacity-90">نحو رؤية المملكة</p>
                </div>
              </div>

              <div>
                <h4 className="text-primary font-bold tracking-wider uppercase mb-2">قصتنا</h4>
                <h2 className="text-4xl font-heading font-bold mb-6">
                  مسيرة نجاح مستمرة منذ سنوات
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    تأسست شركة ECOVENT برؤية واضحة لتكون الرائدة في مجال حلول التهوية الصناعية في المملكة العربية السعودية. بدأنا رحلتنا بفريق صغير من المهندسين المتخصصين الذين يشتركون في شغف واحد: تقديم حلول تهوية عالية الجودة تصنع الفرق.
                  </p>
                  <p>
                    على مر السنين، نمت شركتنا لتصبح واحدة من أبرز الشركات في قطاع التهوية الصناعية، حيث نخدم مئات العملاء في مختلف القطاعات الصناعية والتجارية.
                  </p>
                  <p>
                    اليوم، نفخر بأننا نساهم في تحقيق رؤية المملكة 2030 من خلال تصنيع منتجات محلية عالية الجودة وتوفير فرص عمل للكفاءات السعودية.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Vision */}
              <div className="bg-card p-10 rounded-lg shadow-lg border border-border">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">رؤيتنا</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  أن نكون الشركة الرائدة في صناعة معالجة الهواء في المنطقة، من خلال توفير منتجات وخدمات مبتكرة وموثوقة تتجاوز توقعات عملائنا، مع الالتزام بأعلى معايير الجودة والاستدامة.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-card p-10 rounded-lg shadow-lg border border-border">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">رسالتنا</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  تقديم حلول تهوية صناعية متكاملة ومخصصة تلبي احتياجات عملائنا، من خلال فريق من الخبراء المتخصصين وأحدث التقنيات، مع الحفاظ على أعلى معايير الجودة والسلامة والكفاءة في استهلاك الطاقة.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h4 className="text-primary font-bold tracking-wider uppercase mb-2">قيمنا</h4>
              <h2 className="text-4xl font-heading font-bold mb-4">المبادئ التي توجهنا</h2>
              <p className="text-muted-foreground text-lg">
                نؤمن بأن النجاح المستدام يبنى على أساس قيم راسخة نلتزم بها في كل ما نقوم به
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-8 bg-card rounded-lg shadow-lg border border-border hover:border-primary/50 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h4 className="text-primary font-bold tracking-wider uppercase mb-2">الاعتمادات</h4>
              <h2 className="text-4xl font-heading font-bold mb-4">شهادات الجودة والاعتماد</h2>
              <p className="text-muted-foreground text-lg">
                نفخر بحصولنا على أهم الشهادات والاعتمادات العالمية التي تؤكد التزامنا بأعلى معايير الجودة
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {["ISO 9001:2015", "ISO 14001:2015", "OHSAS 18001", "CE Mark", "UL Listed"].map((cert, index) => (
                <div key={index} className="bg-card p-8 rounded-lg shadow-lg border border-border text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <p className="font-bold text-lg">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
