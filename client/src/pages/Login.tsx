import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc"; // تأكد من المسار الصحيح للـ trpc
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function Login() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  // نستخدم الـ mutation مباشرة لتجنب أخطاء useAuth
  const loginMutation = trpc.auth?.login?.useMutation?.();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // إذا لم يكن السيرفر جاهزاً، سنقوم بتسجيل دخول تجريبي (للتطوير فقط)
      if (!loginMutation) {
        if (formData.username === "admin" && formData.password === "admin") {
          toast.success("دخول تجريبي ناجح");
          setLocation("/admin");
        } else {
          toast.error("بيانات تجريبية غير صحيحة");
        }
        return;
      }

      const result = await loginMutation.mutateAsync(formData);
      if (result.success) {
        toast.success("تم تسجيل الدخول بنجاح");
        setLocation("/admin");
      }
    } catch (error: any) {
      toast.error(error.message || "فشل الاتصال بالسيرفر");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">تسجيل دخول الإدارة</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              placeholder="اسم المستخدم" 
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
            <Input 
              type="password" 
              placeholder="كلمة المرور" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "جاري التحقق..." : "دخول"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}