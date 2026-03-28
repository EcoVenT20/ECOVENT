import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Wind, Zap, CheckCircle, Fan } from "lucide-react";

interface FormData {
  roomType: string;
  area: string;
  height: string;
  occupants: string;
  activity: string;
}

interface Results {
  recommendedFan: string;
  ductSize: string;
  filters: string;
  controls: string;
  energyEfficiency: string;
  additionalFeatures: string;
}

export default function AIVentilationDesigner() {
  const [formData, setFormData] = useState<FormData>({
    roomType: "",
    area: "",
    height: "",
    occupants: "",
    activity: "",
  });

  const [results, setResults] = useState<Results | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const calculateDesign = () => {
    setIsCalculating(true);

    // Simulate AI calculation based on ECOVENT products
    setTimeout(() => {
      const area = parseFloat(formData.area) || 0;
      const height = parseFloat(formData.height) || 0;
      const occupants = parseInt(formData.occupants) || 0;

      // Basic calculations based on ASHRAE standards and ECOVENT product ranges
      const volume = area * height;
      let airChangesPerHour = 6; // Default for low activity

      if (formData.activity === "high") {
        airChangesPerHour = 15; // For factories, high activity
      } else if (formData.activity === "medium") {
        airChangesPerHour = 10; // For offices, moderate
      }

      // Add occupant factor (20 CFM per person)
      const occupantAirflow = occupants * 20;
      const totalAirflow = Math.max((volume * airChangesPerHour) / 60, occupantAirflow); // CFM

      // Recommend ECOVENT fan based on airflow
      let recommendedFan = "";
      let ductSize = "";
      let filters = "";
      let controls = "";

      if (totalAirflow <= 1000) {
        recommendedFan = "ECOVENT Axial Fan 1000 CFM";
        ductSize = "8-10 inch diameter duct";
        filters = "Standard Pre-filter";
        controls = "Basic Speed Control";
      } else if (totalAirflow <= 5000) {
        recommendedFan = "ECOVENT Centrifugal Fan 3000 CFM";
        ductSize = "12-14 inch diameter duct";
        filters = "HEPA Filter + Pre-filters";
        controls = "Variable Frequency Drive (VFD)";
      } else if (totalAirflow <= 10000) {
        recommendedFan = "ECOVENT Industrial Blower 8000 CFM";
        ductSize = "16-18 inch diameter duct";
        filters = "HEPA + Activated Carbon Filters";
        controls = "Smart PLC Control System";
      } else {
        recommendedFan = "ECOVENT High-Capacity Fan System 15000+ CFM";
        ductSize = "20+ inch diameter duct";
        filters = "Advanced Multi-stage Filtration";
        controls = "IoT-Enabled Control System";
      }

      const design: Results = {
        recommendedFan,
        ductSize,
        filters,
        controls,
        energyEfficiency: "IE3 Premium Efficiency Motor (95%+ efficiency)",
        additionalFeatures: "Noise Reduction, Vibration Dampening, Remote Monitoring",
      };

      setResults(design);
      setIsCalculating(false);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      roomType: "",
      area: "",
      height: "",
      occupants: "",
      activity: "",
    });
    setResults(null);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-4">
              <Calculator className="w-5 h-5" />
              <span>مساعد تصميم ذكي</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">مساعد تصميم أنظمة التهوية الذكي</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              احصل على تصميم مخصص لنظام التهوية خلال دقائق. أدخل تفاصيل مساحتك واحصل على توصيات دقيقة من منتجات ECOVENT.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wind className="w-6 h-6" />
                  أدخل تفاصيل المساحة
                </CardTitle>
                <CardDescription>
                  املأ البيانات التالية للحصول على تصميم مخصص من منتجاتنا
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="roomType">نوع الغرفة</Label>
                    <Select value={formData.roomType} onValueChange={(value) => handleInputChange("roomType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الغرفة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office">مكتب</SelectItem>
                        <SelectItem value="factory">مصنع</SelectItem>
                        <SelectItem value="warehouse">مستودع</SelectItem>
                        <SelectItem value="restaurant">مطعم</SelectItem>
                        <SelectItem value="hospital">مستشفى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="activity">مستوى النشاط</Label>
                    <Select value={formData.activity} onValueChange={(value) => handleInputChange("activity", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر مستوى النشاط" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">منخفض</SelectItem>
                        <SelectItem value="medium">متوسط</SelectItem>
                        <SelectItem value="high">عالي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="area">المساحة (م²)</Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="مثال: 100"
                      value={formData.area}
                      onChange={(e) => handleInputChange("area", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="height">الارتفاع (م)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="مثال: 3"
                      value={formData.height}
                      onChange={(e) => handleInputChange("height", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="occupants">عدد الأشخاص</Label>
                    <Input
                      id="occupants"
                      type="number"
                      placeholder="مثال: 20"
                      value={formData.occupants}
                      onChange={(e) => handleInputChange("occupants", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={calculateDesign}
                    disabled={isCalculating || !formData.area || !formData.height}
                    className="flex-1"
                  >
                    {isCalculating ? "جاري الحساب..." : "احسب التصميم"}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    إعادة تعيين
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  التصميم الموصى به
                </CardTitle>
                <CardDescription>
                  {results ? "النتائج بناءً على منتجات ECOVENT" : "املأ النموذج للحصول على النتائج"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Fan className="w-5 h-5 text-primary" />
                          <span className="font-semibold">المروحة الموصى بها</span>
                        </div>
                        <p className="text-2xl font-bold text-primary">{results.recommendedFan}</p>
                      </div>

                      <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Wind className="w-5 h-5 text-secondary" />
                          <span className="font-semibold">حجم القناة</span>
                        </div>
                        <p className="text-lg">{results.ductSize}</p>
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-semibold">الفلاتر والتحكم</span>
                        </div>
                        <div className="space-y-1">
                          <Badge variant="outline">{results.filters}</Badge>
                          <Badge variant="outline">{results.controls}</Badge>
                          <Badge variant="outline">{results.energyEfficiency}</Badge>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold">ميزات إضافية</span>
                        </div>
                        <p className="text-sm">{results.additionalFeatures}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-4">
                        هذه التوصيات مبنية على معايير ASHRAE ومنتجات ECOVENT. لتصميم دقيق، يرجى التواصل مع مهندسينا.
                      </p>
                      <Button className="w-full" asChild>
                        <a href="/quote">اطلب عرض سعر مفصل</a>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      املأ النموذج للحصول على تصميم مخصص من منتجات ECOVENT
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
