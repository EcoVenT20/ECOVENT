import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Sparkles, Download, CheckCircle2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface DesignFormData {
  facilityType: string;
  area: string;
  height: string;
  workers: string;
  activity: string;
  pollutionLevel: string;
}

export default function AIVentilationDesigner() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<DesignFormData>({
    facilityType: "",
    area: "",
    height: "",
    workers: "",
    activity: "",
    pollutionLevel: "",
  });
  const [design, setDesign] = useState<any>(null);

  const generateDesign = trpc.ai.generateVentilationDesign.useMutation({
    onSuccess: (data) => {
      setDesign(data);
      setStep(3);
    },
  });

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Generate design
      generateDesign.mutate(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      facilityType: "",
      area: "",
      height: "",
      workers: "",
      activity: "",
      pollutionLevel: "",
    });
    setDesign(null);
  };

  const isStep1Valid = formData.facilityType && formData.area && formData.height;
  const isStep2Valid = formData.workers && formData.activity && formData.pollutionLevel;

  return (
    <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary rounded-lg">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">مساعد تصميم أنظمة التهوية الذكي</h3>
          <p className="text-muted-foreground">
            احصل على تصميم مخصص لنظام التهوية خلال دقائق
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                s <= step
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {s < step || (s === 3 && design) ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                s
              )}
            </div>
            {s < 3 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  s < step ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <Label htmlFor="facilityType">نوع المنشأة *</Label>
            <Select
              value={formData.facilityType}
              onValueChange={(value) =>
                setFormData({ ...formData, facilityType: value })
              }
            >
              <SelectTrigger id="facilityType">
                <SelectValue placeholder="اختر نوع المنشأة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="factory">مصنع</SelectItem>
                <SelectItem value="warehouse">مستودع</SelectItem>
                <SelectItem value="workshop">ورشة</SelectItem>
                <SelectItem value="kitchen">مطبخ صناعي</SelectItem>
                <SelectItem value="laboratory">مختبر</SelectItem>
                <SelectItem value="other">أخرى</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="area">مساحة المنشأة (متر مربع) *</Label>
            <Input
              id="area"
              type="number"
              placeholder="مثال: 500"
              value={formData.area}
              onChange={(e) =>
                setFormData({ ...formData, area: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="height">ارتفاع السقف (متر) *</Label>
            <Input
              id="height"
              type="number"
              placeholder="مثال: 6"
              value={formData.height}
              onChange={(e) =>
                setFormData({ ...formData, height: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              onClick={handleNext}
              disabled={!isStep1Valid}
              className="gap-2"
            >
              التالي
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Activity Details */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <Label htmlFor="workers">عدد العاملين *</Label>
            <Input
              id="workers"
              type="number"
              placeholder="مثال: 20"
              value={formData.workers}
              onChange={(e) =>
                setFormData({ ...formData, workers: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="activity">نوع النشاط الصناعي *</Label>
            <Select
              value={formData.activity}
              onValueChange={(value) =>
                setFormData({ ...formData, activity: value })
              }
            >
              <SelectTrigger id="activity">
                <SelectValue placeholder="اختر نوع النشاط" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="welding">لحام وقطع معادن</SelectItem>
                <SelectItem value="painting">دهان ورش</SelectItem>
                <SelectItem value="chemical">عمليات كيميائية</SelectItem>
                <SelectItem value="food">تصنيع أغذية</SelectItem>
                <SelectItem value="textile">نسيج وملابس</SelectItem>
                <SelectItem value="woodwork">نجارة وأخشاب</SelectItem>
                <SelectItem value="assembly">تجميع وتعبئة</SelectItem>
                <SelectItem value="other">أخرى</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="pollutionLevel">مستوى التلوث المتوقع *</Label>
            <Select
              value={formData.pollutionLevel}
              onValueChange={(value) =>
                setFormData({ ...formData, pollutionLevel: value })
              }
            >
              <SelectTrigger id="pollutionLevel">
                <SelectValue placeholder="اختر مستوى التلوث" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">منخفض (تهوية عامة)</SelectItem>
                <SelectItem value="medium">متوسط (أدخنة خفيفة)</SelectItem>
                <SelectItem value="high">عالي (أدخنة كثيفة أو غازات)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between gap-3">
            <Button onClick={handleBack} variant="outline">
              السابق
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStep2Valid || generateDesign.isPending}
              className="gap-2"
            >
              {generateDesign.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جاري التصميم...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  تصميم النظام
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {step === 3 && design && (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-green-900 mb-1">
                تم إنشاء التصميم بنجاح!
              </h4>
              <p className="text-green-700 text-sm">
                تم تحليل بياناتك وإنشاء تصميم مخصص لنظام التهوية الأمثل لمنشأتك
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <h5 className="font-bold mb-2">معدل التدفق المطلوب</h5>
              <p className="text-3xl font-bold text-primary">
                {design.cfm.toLocaleString()} CFM
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                قدم مكعب في الدقيقة
              </p>
            </Card>

            <Card className="p-4">
              <h5 className="font-bold mb-2">عدد المراوح الموصى به</h5>
              <p className="text-3xl font-bold text-primary">
                {design.fanCount} مروحة
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {design.fanType}
              </p>
            </Card>

            <Card className="p-4">
              <h5 className="font-bold mb-2">مدة التنفيذ</h5>
              <p className="text-3xl font-bold text-primary">
                {design.installationTime}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                من تاريخ الطلب
              </p>
            </Card>
          </div>

          <Card className="p-4 bg-blue-50 border-blue-200">
            <h5 className="font-bold mb-2">التوصيات</h5>
            <ul className="space-y-2">
              {design.recommendations.map((rec: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="flex justify-between gap-3">
            <Button onClick={handleReset} variant="outline">
              تصميم جديد
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                تحميل التقرير PDF
              </Button>
              <Button className="gap-2">طلب عرض سعر</Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
