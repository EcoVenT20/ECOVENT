import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";

export default function AdminBlog() {
  // Protect the page - redirect to login if not authenticated
  useAuth({ redirectOnUnauthenticated: true, redirectPath: "/login" });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [formData, setFormData] = useState({
    slug: "",
    titleAr: "",
    titleEn: "",
    excerptAr: "",
    excerptEn: "",
    contentAr: "",
    contentEn: "",
    featuredImage: "",
    category: "",
    tags: "",
    metaDescriptionAr: "",
    metaDescriptionEn: "",
    metaKeywords: "",
    isPublished: false,
  });

  const { data: articles, refetch } = trpc.admin.blog.list.useQuery();
  const createMutation = trpc.admin.blog.create.useMutation({
    onSuccess: () => {
      toast.success("تم إضافة المقال بنجاح");
      refetch();
      closeDialog();
    },
    onError: (error) => {
      toast.error("فشل إضافة المقال: " + error.message);
    },
  });

  const updateMutation = trpc.admin.blog.update.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث المقال بنجاح");
      refetch();
      closeDialog();
    },
    onError: (error) => {
      toast.error("فشل تحديث المقال: " + error.message);
    },
  });

  const deleteMutation = trpc.admin.blog.delete.useMutation({
    onSuccess: () => {
      toast.success("تم حذف المقال بنجاح");
      refetch();
    },
    onError: (error) => {
      toast.error("فشل حذف المقال: " + error.message);
    },
  });

  const openDialog = (article?: any) => {
    if (article) {
      setEditingArticle(article);
      setFormData({
        slug: article.slug,
        titleAr: article.titleAr,
        titleEn: article.titleEn,
        excerptAr: article.excerptAr,
        excerptEn: article.excerptEn,
        contentAr: article.contentAr,
        contentEn: article.contentEn,
        featuredImage: article.featuredImage || "",
        category: article.category,
        tags: article.tags,
        metaDescriptionAr: article.metaDescriptionAr || "",
        metaDescriptionEn: article.metaDescriptionEn || "",
        metaKeywords: article.metaKeywords || "",
        isPublished: article.isPublished,
      });
    } else {
      setEditingArticle(null);
      setFormData({
        slug: "",
        titleAr: "",
        titleEn: "",
        excerptAr: "",
        excerptEn: "",
        contentAr: "",
        contentEn: "",
        featuredImage: "",
        category: "",
        tags: "",
        metaDescriptionAr: "",
        metaDescriptionEn: "",
        metaKeywords: "",
        isPublished: false,
      });
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingArticle(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingArticle) {
      updateMutation.mutate({
        id: editingArticle.id,
        ...formData,
        publishedAt: formData.isPublished ? new Date() : undefined,
      });
    } else {
      createMutation.mutate({
        ...formData,
        publishedAt: formData.isPublished ? new Date() : undefined,
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا المقال؟")) {
      deleteMutation.mutate({ id });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">إدارة المدونة</h1>
        <Button onClick={() => openDialog()}>
          <Plus className="ml-2 h-4 w-4" />
          إضافة مقال جديد
        </Button>
      </div>

      <div className="grid gap-4">
        {articles?.map((article) => (
          <Card key={article.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{article.titleAr}</h3>
                  {article.isPublished ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      منشور
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      مسودة
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {article.excerptAr}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {article.viewCount} مشاهدة
                  </span>
                  <span>{article.category}</span>
                  <span>
                    {new Date(article.publishedAt || article.createdAt).toLocaleDateString(
                      "ar-SA"
                    )}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openDialog(article)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(article.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingArticle ? "تعديل المقال" : "إضافة مقال جديد"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="titleAr">العنوان بالعربية *</Label>
                <Input
                  id="titleAr"
                  value={formData.titleAr}
                  onChange={(e) =>
                    setFormData({ ...formData, titleAr: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="titleEn">العنوان بالإنجليزية *</Label>
                <Input
                  id="titleEn"
                  value={formData.titleEn}
                  onChange={(e) =>
                    setFormData({ ...formData, titleEn: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="slug">الرابط (Slug) *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="example-article-slug"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">التصنيف *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <ImageUpload
                  value={formData.featuredImage}
                  onChange={(url) => setFormData({ ...formData, featuredImage: url })}
                  folder="blog"
                  label="الصورة المميزة"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="tags">الوسوم (مفصولة بفاصلة)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                placeholder='["وسم1", "وسم2", "وسم3"]'
              />
            </div>

            <div>
              <Label htmlFor="excerptAr">المقتطف بالعربية *</Label>
              <Textarea
                id="excerptAr"
                value={formData.excerptAr}
                onChange={(e) =>
                  setFormData({ ...formData, excerptAr: e.target.value })
                }
                rows={2}
                required
              />
            </div>

            <div>
              <Label htmlFor="excerptEn">المقتطف بالإنجليزية *</Label>
              <Textarea
                id="excerptEn"
                value={formData.excerptEn}
                onChange={(e) =>
                  setFormData({ ...formData, excerptEn: e.target.value })
                }
                rows={2}
                required
              />
            </div>

            <div>
              <Label htmlFor="contentAr">المحتوى بالعربية (Markdown) *</Label>
              <Textarea
                id="contentAr"
                value={formData.contentAr}
                onChange={(e) =>
                  setFormData({ ...formData, contentAr: e.target.value })
                }
                rows={10}
                required
              />
            </div>

            <div>
              <Label htmlFor="contentEn">المحتوى بالإنجليزية (Markdown) *</Label>
              <Textarea
                id="contentEn"
                value={formData.contentEn}
                onChange={(e) =>
                  setFormData({ ...formData, contentEn: e.target.value })
                }
                rows={10}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="metaDescriptionAr">الوصف التعريفي (عربي)</Label>
                <Textarea
                  id="metaDescriptionAr"
                  value={formData.metaDescriptionAr}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      metaDescriptionAr: e.target.value,
                    })
                  }
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="metaDescriptionEn">
                  الوصف التعريفي (إنجليزي)
                </Label>
                <Textarea
                  id="metaDescriptionEn"
                  value={formData.metaDescriptionEn}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      metaDescriptionEn: e.target.value,
                    })
                  }
                  rows={2}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="metaKeywords">الكلمات المفتاحية (SEO)</Label>
              <Input
                id="metaKeywords"
                value={formData.metaKeywords}
                onChange={(e) =>
                  setFormData({ ...formData, metaKeywords: e.target.value })
                }
                placeholder="كلمة1، كلمة2، كلمة3"
              />
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Switch
                id="isPublished"
                checked={formData.isPublished}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isPublished: checked })
                }
              />
              <Label htmlFor="isPublished">نشر المقال</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                إلغاء
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {editingArticle ? "تحديث" : "إضافة"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
