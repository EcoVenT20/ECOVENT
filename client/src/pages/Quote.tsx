import { useState } from "react";
import { Header, Footer } from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Send, Loader2, CheckCircle2, FileText, Clock, Shield } from "lucide-react";

export default function Quote() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    projectDetails: "",
    budget: "",
    timeline: "",
  });

  const quoteMutation = trpc.quote.submit.useMutation({
    onSuccess: () => {
      toast.success("تم إرسال طلب عرض السعر بنجاح! سنتواصل معك قريباً");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        projectDetails: "",
        budget: "",
        timeline: "",
      });
    },
    onError: (error) => {
      toast.error(error.message || "حدث خطأ أثناء إرسال الطلب");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    quoteMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const projectTypes = [
    "تهوية صناعية",
    "تكييف مركزي",
    "أنظمة شفط الدخان",
    "غرف نظيفة",
    "تبريد مراكز البيانات",
    "تهوية مستشفيات",
    "أخرى",
  ];

  const budgetRanges = [
    "أقل من 50,000 ريال",
    "50,000 - 100,000 ريال",
    "100,000 - 500,000 ريال",
    "500,000 - 1,000,000 ريال",
    "أكثر من 1,000,000 ريال",
  ];

  const timelines = [
    "عاجل (خلال شهر)",
    "قصير المدى (1-3 أشهر)",
    "متوسط المدى (3-6 أشهر)",
    "طويل المدى (أكثر من 6 أشهر)",
  ];

  const benefits = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "عرض سعر مفصل",
      description: "نقدم لك عرض سعر شامل يتضمن كافة التفاصيل الفنية والمالية"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "استجابة سريعة",
      description: "نرد على طلبات عروض الأسعار خلال 24-48 ساعة عمل"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "ضمان شامل",
      description: "جميع منتجاتنا مشمولة بضمان شامل وخدمة ما بعد البيع"
    },
  ];

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
              <h4 className="text-primary font-bold tracking-wider uppercase mb-4">طلب عرض سعر</h4>
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                احصل على عرض سعر مخصص
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                أخبرنا عن مشروعك وسنقدم لك عرض سعر تنافسي يناسب احتياجاتك
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-background -mt-12 relative z-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-card p-6 rounded-lg shadow-lg border border-border text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card p-10 rounded-lg shadow-lg border border-border">
                <h2 className="text-3xl font-heading font-bold mb-2">نموذج طلب عرض السعر</h2>
                <p className="text-muted-foreground mb-8">
                  يرجى تعبئة النموذج أدناه بأكبر قدر من التفاصيل للحصول على عرض سعر دقيق
                </p>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 pb-2 border-b border-border">معلومات التواصل</h3>
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
                      <div className="space-y-2">
                        <Label htmlFor="phone">رقم الهاتف *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="05X XXX XXXX"
                          required
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
                  </div>

                  {/* Project Info */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 pb-2 border-b border-border">تفاصيل المشروع</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="projectType">نوع المشروع</Label>
                        <Select
                          value={formData.projectType}
                          onValueChange={(value) => handleSelectChange("projectType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر نوع المشروع" />
                          </SelectTrigger>
                          <SelectContent>
                            {projectTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget">الميزانية التقديرية</Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) => handleSelectChange("budget", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر نطاق الميزانية" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="timeline">الجدول الزمني المتوقع</Label>
                        <Select
                          value={formData.timeline}
                          onValueChange={(value) => handleSelectChange("timeline", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الجدول الزمني" />
                          </SelectTrigger>
                          <SelectContent>
                            {timelines.map((timeline) => (
                              <SelectItem key={timeline} value={timeline}>
                                {timeline}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-2">
                    <Label htmlFor="projectDetails">وصف المشروع</Label>
                    <Textarea
                      id="projectDetails"
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleChange}
                      placeholder="يرجى وصف مشروعك بالتفصيل: المساحة، نوع المبنى، المتطلبات الخاصة، إلخ..."
                      rows={6}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={quoteMutation.isPending}
                  >
                    {quoteMutation.isPending ? (
                      <>
                        <Loader2 className="ml-2 w-5 h-5 animate-spin" />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send className="ml-2 w-5 h-5" />
                        إرسال طلب عرض السعر
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-6 bg-card rounded-lg shadow-lg border border-border">
                <h3 className="font-bold text-lg mb-4">ماذا يحدث بعد إرسال الطلب؟</h3>
                <ol className="space-y-3">
                  {[
                    "سيتم مراجعة طلبك من قبل فريقنا الفني",
                    "سنتواصل معك لمناقشة التفاصيل إذا لزم الأمر",
                    "سنقوم بإعداد عرض سعر مفصل خلال 24-48 ساعة",
                    "سنرسل لك العرض عبر البريد الإلكتروني أو الواتساب"
                  ].map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
