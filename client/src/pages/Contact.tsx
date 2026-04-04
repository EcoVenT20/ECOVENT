import { useState } from "react";
import { Header, Footer } from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
    },
    onError: (error) => {
      toast.error(error.message || "حدث خطأ أثناء إرسال الرسالة");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "العنوان",
      details: [ "الصناعية القديمه/مجمع الوسط"],
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "الهاتف",
      details: ["+966554070875"],
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "البريد الإلكتروني",
      details: ["info@ecovent.sa", 
               "www.ecovent-sa.com"],
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "ساعات العمل",
      details: ["السبت - الخميس:9 ص - 5 م", "الجمعة: مغلق"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans" dir="rtl">
      <SEO
        title="اتصل بنا | ECOVENT"
        description="تواصل مع ECOVENT للاستفسار عن منتجاتنا وخدماتنا. فريقنا جاهز للرد على جميع استفساراتك حول حلول التهوية"
        keywords="تواصل معنا، استفسارات، خدمة العملاء، ECOVENT، السعودية"
        canonical="https://www.ecovent-sa.com/contact"
      />
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-24 bg-[#0a1f44] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src="/images/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h4 className="text-primary font-bold tracking-wider uppercase mb-4">تواصل معنا</h4>
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                نحن هنا لمساعدتك
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                تواصل معنا للحصول على استشارة مجانية أو عرض سعر مخصص لمشروعك
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 bg-background -mt-12 relative z-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-card p-6 rounded-lg shadow-lg border border-border text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    {info.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-muted-foreground text-sm">{detail}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="bg-card p-10 rounded-lg shadow-lg border border-border">
                <h2 className="text-3xl font-heading font-bold mb-2">أرسل لنا رسالة</h2>
                <p className="text-muted-foreground mb-8">
                  املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="أدخل اسمك"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="05X XXX XXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">اسم الشركة</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="اسم شركتك (اختياري)"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">الموضوع</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="موضوع الرسالة"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">الرسالة *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="اكتب رسالتك هنا..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="ml-2 w-5 h-5 animate-spin" />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send className="ml-2 w-5 h-5" />
                        إرسال الرسالة
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Map & Quick Contact */}
              <div className="space-y-8">
                {/* Map Placeholder */}
                <div className="bg-card rounded-lg shadow-lg border border-border overflow-hidden h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3626.847203448933!2d46.74115425919753!3d24.628950654571632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f056b1d380d35%3A0xb2c11ae6d5f08f4a!2z2YXYsdin2YjYrSDYqtmH2YjZitipICjYp9mK2YPZiNmB2YbYqikgRUNPVkVOVA!5e0!3m2!1sar!2ssa!4v1772439012040!5m2!1sar!2ssa" 
                    width="600" height="450" style={{border:0}}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                    title="موقع ايكوفنت على الخريطة"
                </div>

                {/* Quick Contact */}
                <div className="bg-primary text-white p-8 rounded-lg">
                  <h3 className="text-2xl font-heading font-bold mb-4">تواصل سريع</h3>
                  <p className="text-primary-foreground/80 mb-6">
                    للاستفسارات العاجلة، يمكنك التواصل معنا مباشرة عبر الهاتف أو الواتساب
                  </p>
                  <div className="space-y-4">
                    <a 
                      href="tel:966554070875" 
                      className="flex items-center gap-3 bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Phone className="w-6 h-6" />
                      <div>
                        <p className="text-sm opacity-80">اتصل بنا</p>
                        <p className="font-bold text-lg">966554070875</p>
                      </div>
                    </a>
                    <a 
                      href="https://wa.me/966554070875" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-green-500/20 p-4 rounded-lg hover:bg-green-500/30 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <div>
                        <p className="text-sm opacity-80">واتساب</p>
                        <p className="font-bold text-lg">تواصل عبر واتساب</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Features */}
                <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
                  <h3 className="font-bold text-lg mb-4">لماذا تتواصل معنا؟</h3>
                  <ul className="space-y-3">
                    {[
                      "استشارة مجانية من خبرائنا",
                      "عروض أسعار تنافسية",
                      "استجابة سريعة خلال 24 ساعة",
                      "حلول مخصصة لاحتياجاتك"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
