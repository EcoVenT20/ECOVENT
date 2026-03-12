import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header, Footer } from "@/components/Layout";
import { ArrowRight, CheckCircle2, Fan, Settings, ShieldCheck, Wind, Phone, Mail, MapPin, Star } from "lucide-react";
import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";


export default function Home() {
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans" dir="rtl">
      <SEOHead 
        title="ايكوفينت - حلول تهوية صناعية متطورة | صنع في السعودية"
        description="إيكوفنت - شركة رائدة في تصنيع وتوريد أنظمة التهوية الصناعية في السعودية. نقدم حلول تهوية مبتكرة للمصانع والمستودعات بأعلى معايير الجودة."
        image="https://www.ecovent-sa.com/images/og-home.jpg"
        url="https://www.ecovent-sa.com/"
        type="website"
      />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section - Modern Design */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Background with Parallax Effect */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/hero-bg-new.jpg" 
              alt="Industrial Ventilation" 
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-primary/95 via-primary/85 to-primary/60" />
            {/* Animated Overlay Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-white space-y-8 animate-in slide-in-from-right-10 duration-700 fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border-2 border-secondary text-white text-sm font-bold backdrop-blur-md">
                  <Star className="w-4 h-4 fill-secondary text-secondary" />
                  <span>صنع في السعودية | Made in Saudi</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-heading font-bold leading-[1.1]">
                 ايكوفينت حلول تهوية  
                  <br />
                  <span className="text-secondary">تصنع الفرق</span>
                </h1>
                
                <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                  نقدم أحدث <Link href="/products" className="font-bold underline hover:text-secondary transition-colors">أنظمة التهوية الصناعية</Link> و<Link href="/products" className="font-bold underline hover:text-secondary transition-colors">المراوح الصناعية</Link> المصممة خصيصاً ل<strong>تهوية المصانع</strong> و<strong>تهوية المستودعات</strong> في <strong>السعودية</strong> بأعلى معايير الجودة والكفاءة. اطلع على <Link href="/faq" className="underline hover:text-secondary transition-colors">الأسئلة الشائعة</Link> لمعرفة المزيد.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/products">
                    <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 h-14 rounded-md font-bold shadow-2xl shadow-secondary/40 group">
                      اكتشف منتجاتنا
                      <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 h-14 rounded-md font-bold backdrop-blur-md transition-all">
                      تواصل معنا
                    </Button>
                  </Link>
                </div>


              </div>

              {/* Right Content - Feature Cards */}
              <div className="hidden lg:grid grid-cols-2 gap-4 animate-in slide-in-from-left-10 duration-700 delay-200 fade-in">
                {[
                  { icon: <Fan className="w-8 h-8" />, title: "تهوية صناعية", desc: "أنظمة متطورة" },
                  { icon: <Settings className="w-8 h-8" />, title: "صيانة دورية", desc: "دعم مستمر" },
                  { icon: <ShieldCheck className="w-8 h-8" />, title: "ضمان الجودة", desc: "ISO 9001" },
                  { icon: <Wind className="w-8 h-8" />, title: "كفاءة عالية", desc: "توفير الطاقة" }
                ].map((item, i) => (
                  <Card key={i} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6 text-white">
                      <div className="w-14 h-14 rounded-lg bg-secondary/20 flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:scale-110 transition-all">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-white/70">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* Services Section - Modern Cards */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h4 className="text-secondary font-bold tracking-wider uppercase mb-2">خدماتنا</h4>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">حلول متكاملة لاحتياجاتك</h2>
              <p className="text-muted-foreground text-lg">
                نقدم مجموعة شاملة من خدمات <strong>التهوية الصناعية</strong> و<strong>التكييف الصناعي</strong> لضمان كفاءة وسلامة أنظمة التهوية في منشأتك
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Settings className="w-10 h-10" />,
                  title: "التصميم والهندسة",
                  desc: "تصميم أنظمة تهوية مخصصة بناءً على دراسات هندسية دقيقة"
                },
                {
                  icon: <Fan className="w-10 h-10" />,
                  title: "توفير المعدات",
                  desc: "تصنيع وتوريد مراوح صناعية ومعدات تهوية متطورة"
                },
                {
                  icon: <Wind className="w-10 h-10" />,
                  title: "خدمات التشغيل",
                  desc: "تركيب وتشغيل الأنظمة مع ضمان الأداء الأمثل"
                },
                {
                  icon: <ShieldCheck className="w-10 h-10" />,
                  title: "خدمات ما بعد البيع",
                  desc: "عقود صيانة دورية ودعم فني سريع"
                }
              ].map((service, index) => (
                <Card key={index} className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-secondary">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {service.desc}
                    </p>
                    <Link href="/services">
                      <Button variant="link" className="p-0 h-auto text-secondary group-hover:gap-2 transition-all">
                        اعرف المزيد
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* AI Ventilation Designer Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-primary font-bold mb-4">
                <Star className="w-4 h-4 fill-primary" />
                <span>تقنية الذكاء الاصطناعي</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                صمم نظام التهوية المثالي
                <br />
                <span className="text-primary">بتقنية الذكاء الاصطناعي</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                احصل على تصميم مخصص وحسابات دقيقة لنظام التهوية الأمثل لمنشأتك خلال دقائق
              </p>
            </div>

          </div>
        </section>

        {/* About Section - Modern Layout */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative group order-2 lg:order-1">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-secondary rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/images/blog/industrial-air-quality(1).png" 
                    alt="About ECOVENT" 
                    className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 right-0 bg-secondary text-white p-8 rounded-tl-3xl">
                    <p className="text-5xl font-heading font-bold">2030</p>
                    <p className="text-sm opacity-90">رؤية المملكة</p>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <h4 className="text-secondary font-bold tracking-wider uppercase mb-2">من نحن</h4>
                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
                  رواد الحلول المبتكرة
                  <br />
                  <span className="text-primary">للتهوية المثالية</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  في ايكوفينت رؤيتنا هي أن نكون رواداً في صناعة معالجة الهواء من خلال توفير منتجات وخدمات مبتكرة وموثوقة لعملائنا.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    "جودة تصنيع عالية معتمدة عالمياً",
                    "حلول مخصصة لكل نوع من المنشآت",
                    "فريق هندسي خبير ومتخصص",
                    "دعم فني متواصل على مدار الساعة"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="text-secondary w-4 h-4" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/about">
                  <Button size="lg" className="group">
                    اقرأ المزيد عنا
                    <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Modern Design */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
            }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              جاهز لتحسين جودة الهواء في منشأتك؟
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              تواصل معنا اليوم للحصول على استشارة مجانية وعرض سعر مخصص لمشروعك
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold text-lg h-14 px-8 shadow-2xl">
                  تواصل معنا الآن
                </Button>
              </Link>
              <Link href="/quote">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg h-14 px-8 backdrop-blur-md">
                  احصل على عرض سعر
                </Button>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 text-white/90">
                <Phone className="w-5 h-5" />
                <span className="font-medium">966554070875</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-white/90">
                <Mail className="w-5 h-5" />
                <span className="font-medium">www.ecovent-sa.com</span>

              </div>
              <div className="flex items-center justify-center gap-3 text-white/90">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Helper component for arrow icon (RTL support)
function ArrowLeft({ className }: { className?: string }) {
  return <ArrowRight className={className} style={{ transform: 'scaleX(-1)' }} />;
}
