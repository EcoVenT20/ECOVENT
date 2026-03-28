import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, TrendingDown, DollarSign, Calendar } from "lucide-react";

export default function EnergySavingsCalculator() {
  const [currentPower, setCurrentPower] = useState("");
  const [operatingHours, setOperatingHours] = useState("");
  const [electricityRate, setElectricityRate] = useState("0.18"); // Default SAR per kWh
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    currentCost: 0,
    newCost: 0,
    savings: 0,
    savingsPercent: 0,
    roiMonths: 0,
    co2Reduction: 0,
  });

  const calculateSavings = () => {
    const power = parseFloat(currentPower);
    const hours = parseFloat(operatingHours);
    const rate = parseFloat(electricityRate);

    // Current annual consumption (kWh)
    const currentAnnualConsumption = power * hours * 365;
    const currentAnnualCost = currentAnnualConsumption * rate;

    // ECOVENT systems are 30-40% more efficient
    const efficiencyImprovement = 0.35; // 35% average
    const newAnnualConsumption = currentAnnualConsumption * (1 - efficiencyImprovement);
    const newAnnualCost = newAnnualConsumption * rate;

    const annualSavings = currentAnnualCost - newAnnualCost;
    const savingsPercent = (annualSavings / currentAnnualCost) * 100;

    // Estimate system cost (rough)
    const estimatedSystemCost = power * 500; // 500 SAR per kW
    const roiMonths = (estimatedSystemCost / (annualSavings / 12));

    // CO2 reduction (0.5 kg CO2 per kWh in Saudi Arabia)
    const co2Reduction = (currentAnnualConsumption - newAnnualConsumption) * 0.5 / 1000; // tons

    setResults({
      currentCost: Math.round(currentAnnualCost),
      newCost: Math.round(newAnnualCost),
      savings: Math.round(annualSavings),
      savingsPercent: Math.round(savingsPercent),
      roiMonths: Math.round(roiMonths),
      co2Reduction: Math.round(co2Reduction * 10) / 10,
    });

    setShowResults(true);
  };

  const isValid = currentPower && operatingHours && parseFloat(currentPower) > 0 && parseFloat(operatingHours) > 0;

  return (
    <Card className="p-8 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-600 rounded-lg">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">حاسبة توفير الطاقة الذكية</h3>
          <p className="text-muted-foreground">
            احسب كم ستوفر من فاتورة الكهرباء مع أنظمة ECOVENT
          </p>
        </div>
      </div>

      {!showResults ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="currentPower">القدرة الحالية للنظام (كيلووات) *</Label>
              <Input
                id="currentPower"
                type="number"
                placeholder="مثال: 50"
                value={currentPower}
                onChange={(e) => setCurrentPower(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                إجمالي قدرة المراوح والمعدات الحالية
              </p>
            </div>

            <div>
              <Label htmlFor="operatingHours">ساعات التشغيل اليومية *</Label>
              <Input
                id="operatingHours"
                type="number"
                placeholder="مثال: 12"
                value={operatingHours}
                onChange={(e) => setOperatingHours(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                عدد ساعات التشغيل في اليوم الواحد
              </p>
            </div>

            <div>
              <Label htmlFor="electricityRate">سعر الكهرباء (ريال/كيلووات ساعة)</Label>
              <Input
                id="electricityRate"
                type="number"
                step="0.01"
                value={electricityRate}
                onChange={(e) => setElectricityRate(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                السعر الافتراضي: 0.18 ريال (متوسط السعودية)
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>ملاحظة:</strong> أنظمة ECOVENT توفر في المتوسط 30-40% من استهلاك الطاقة مقارنة بالأنظمة التقليدية، بفضل المحركات عالية الكفاءة والتصميم الهندسي المتطور.
            </p>
          </div>

          <Button
            onClick={calculateSavings}
            disabled={!isValid}
            className="w-full gap-2"
            size="lg"
          >
            <Zap className="w-5 h-5" />
            احسب التوفير
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 bg-white border-2 border-red-200">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-8 h-8 text-red-600" />
                <h4 className="font-bold text-lg">التكلفة الحالية</h4>
              </div>
              <p className="text-4xl font-bold text-red-600">
                {results.currentCost.toLocaleString()} ريال
              </p>
              <p className="text-sm text-muted-foreground mt-1">سنوياً</p>
            </Card>

            <Card className="p-6 bg-white border-2 border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-8 h-8 text-green-600" />
                <h4 className="font-bold text-lg">التكلفة مع ECOVENT</h4>
              </div>
              <p className="text-4xl font-bold text-green-600">
                {results.newCost.toLocaleString()} ريال
              </p>
              <p className="text-sm text-muted-foreground mt-1">سنوياً</p>
            </Card>
          </div>

          <Card className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-6 h-6" />
                  <h4 className="font-bold text-lg">التوفير السنوي</h4>
                </div>
                <p className="text-5xl font-bold mb-2">
                  {results.savings.toLocaleString()} ريال
                </p>
                <p className="text-lg opacity-90">
                  توفير بنسبة {results.savingsPercent}%
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-6 h-6" />
                  <span className="font-bold">فترة الاسترداد</span>
                </div>
                <p className="text-4xl font-bold">{results.roiMonths}</p>
                <p className="text-sm opacity-90">شهر</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-white">
              <h5 className="font-bold mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-600" />
                التوفير الشهري
              </h5>
              <p className="text-2xl font-bold text-green-600">
                {Math.round(results.savings / 12).toLocaleString()} ريال
              </p>
            </Card>

            <Card className="p-4 bg-white">
              <h5 className="font-bold mb-2">تقليل انبعاثات CO₂</h5>
              <p className="text-2xl font-bold text-blue-600">
                {results.co2Reduction} طن
              </p>
              <p className="text-xs text-muted-foreground mt-1">سنوياً</p>
            </Card>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 className="font-bold text-green-900 mb-2">ماذا يعني هذا؟</h5>
            <ul className="space-y-2 text-sm text-green-800">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>ستسترد تكلفة النظام خلال <strong>{results.roiMonths} شهر</strong> فقط من التوفير في فاتورة الكهرباء</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>بعد ذلك، ستوفر <strong>{Math.round(results.savings / 12).toLocaleString()} ريال شهرياً</strong> بشكل دائم</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>ستساهم في حماية البيئة بتقليل <strong>{results.co2Reduction} طن</strong> من انبعاثات الكربون سنوياً</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setShowResults(false)}
              variant="outline"
              className="flex-1"
            >
              حساب جديد
            </Button>
            <Button className="flex-1">
              احصل على عرض سعر مخصص
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
