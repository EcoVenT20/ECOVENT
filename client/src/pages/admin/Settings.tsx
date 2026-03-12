import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FileUpload } from "@/components/FileUpload";
import { Loader2, Save, Image as ImageIcon } from "lucide-react";

export default function AdminSettings() {
  // Protect the page - redirect to login if not authenticated
  useAuth({ redirectOnUnauthenticated: true, redirectPath: "/login" });
  
  const { data: settings, isLoading, refetch } = trpc.admin.settings.list.useQuery();
  const upsertSetting = trpc.admin.settings.upsert.useMutation({
    onSuccess: () => {
      toast.success("تم حفظ الإعدادات بنجاح");
      refetch();
    },
    onError: (error) => {
      toast.error(`خطأ: ${error.message}`);
    },
  });

  const [heroImage, setHeroImage] = useState("");
  const [aboutImage, setAboutImage] = useState("");
  const [saving, setSaving] = useState(false);

  // Load current settings
  useState(() => {
    if (settings) {
      const hero = settings.find(s => s.settingKey === "hero_image");
      const about = settings.find(s => s.settingKey === "about_image");
      if (hero) setHeroImage(hero.settingValue || "");
      if (about) setAboutImage(about.settingValue || "");
    }
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      if (heroImage) {
        await upsertSetting.mutateAsync({
          key: "hero_image",
          value: heroImage,
          description: "صورة خلفية القسم الرئيسي في الصفحة الرئيسية",
        });
      }
      if (aboutImage) {
        await upsertSetting.mutateAsync({
          key: "about_image",
          value: aboutImage,
          description: "صورة قسم من نحن في الصفحة الرئيسية",
        });
      }
      toast.success("تم حفظ جميع الإعدادات بنجاح");
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">إعدادات الموقع</h1>
        <p className="text-muted-foreground mt-2">
          إدارة صور ومحتوى الموقع الإلكتروني
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            صور الصفحة الرئيسية
          </CardTitle>
          <CardDescription>
            تحديث الصور المعروضة في الصفحة الرئيسية
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Hero Image */}
          <div className="space-y-2">
            <FileUpload
              folder="projects"
              onUploadSuccess={setHeroImage}
              accept="image/*"
              label="اختر صورة خلفية القسم الرئيسي"
              currentUrl={heroImage}
            />
            <p className="text-sm text-muted-foreground">
              الحجم الموصى به: 1920x1080 بكسل
            </p>
          </div>

          {/* About Image */}
          <div className="space-y-2">
            <FileUpload
              folder="projects"
              onUploadSuccess={setAboutImage}
              accept="image/*"
              label="اختر صورة قسم من نحن"
              currentUrl={aboutImage}
            />
            <p className="text-sm text-muted-foreground">
              الحجم الموصى به: 800x600 بكسل
            </p>
          </div>

          <Button
            onClick={handleSave}
            disabled={saving || (!heroImage && !aboutImage)}
            className="w-full sm:w-auto"
            size="lg"
          >
            {saving ? (
              <>
                <Loader2 className="ml-2 w-4 h-4 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              <>
                <Save className="ml-2 w-4 h-4" />
                حفظ الإعدادات
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ملاحظات</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• بعد تحديث الصور، قد تحتاج إلى تحديث الصفحة لرؤية التغييرات</p>
          <p>• استخدم صوراً عالية الجودة للحصول على أفضل مظهر</p>
          <p>• تأكد من أن الصور لا تتجاوز 5 ميجابايت لسرعة التحميل</p>
        </CardContent>
      </Card>
    </div>
  );
}
