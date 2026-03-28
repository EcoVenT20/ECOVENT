import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Loader2, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: "products" | "projects" | "services" | "blog";
  label?: string;
  required?: boolean;
}

export function ImageUpload({ value, onChange, folder = "products", label = "الصورة", required = false }: ImageUploadProps) {
  // Map blog folder to products for API compatibility
  const apiFolder: "products" | "projects" | "services" = folder === "blog" ? "products" : folder;
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(value);

  const uploadMutation = trpc.admin.upload.useMutation({
    onSuccess: (data) => {
      setPreviewUrl(data.url);
      onChange(data.url);
      toast.success("تم رفع الصورة بنجاح");
      setIsUploading(false);
    },
    onError: (error) => {
      toast.error(error.message || "فشل رفع الصورة");
      setIsUploading(false);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("يرجى اختيار ملف صورة");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
      return;
    }

    setIsUploading(true);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const base64Data = base64.split(",")[1]; // Remove data:image/...;base64, prefix

        uploadMutation.mutate({
          file: base64Data,
          fileName: file.name,
          contentType: file.type,
          folder: apiFolder,
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("حدث خطأ أثناء قراءة الملف");
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(undefined);
    onChange("");
  };

  return (
    <div className="space-y-2">
      <Label>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      
      {previewUrl ? (
        <div className="relative w-full h-48 border border-border rounded-lg overflow-hidden group">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
            >
              <X className="w-4 h-4 ml-2" />
              حذف
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
            id={`image-upload-${folder}`}
          />
          <Label
            htmlFor={`image-upload-${folder}`}
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">جاري رفع الصورة...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">اضغط لرفع صورة</span>
                </div>
                <span className="text-xs text-muted-foreground">PNG, JPG, WEBP (حد أقصى 5MB)</span>
              </div>
            )}
          </Label>
        </div>
      )}

      {/* Manual URL input as fallback */}
      <div className="pt-2">
        <Label className="text-xs text-muted-foreground">أو أدخل رابط الصورة يدوياً</Label>
        <Input
          type="url"
          value={value || ""}
          onChange={(e) => {
            onChange(e.target.value);
            setPreviewUrl(e.target.value);
          }}
          placeholder="https://example.com/image.jpg"
          className="mt-1"
        />
      </div>
    </div>
  );
}
