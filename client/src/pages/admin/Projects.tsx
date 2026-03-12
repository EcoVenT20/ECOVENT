import { useState } from "react";
import { AdminLayout } from "./Dashboard";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Star } from "lucide-react";
import { FileUpload } from "@/components/FileUpload";

interface Project {
  id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string | null;
  descriptionEn: string | null;
  clientName: string | null;
  location: string | null;
  category: string | null;
  imageUrl: string | null;
  isFeatured: boolean;
  sortOrder: number | null;
  isActive: boolean;
}

const emptyProject = {
  titleAr: "",
  titleEn: "",
  descriptionAr: "",
  descriptionEn: "",
  clientName: "",
  location: "",
  category: "",
  imageUrl: "",
  isFeatured: false,
  sortOrder: 0,
  isActive: true,
};

export default function AdminProjects() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState(emptyProject);

  const utils = trpc.useUtils();
  const projectsQuery = trpc.admin.projects.list.useQuery();
  
  const createMutation = trpc.admin.projects.create.useMutation({
    onSuccess: () => {
      toast.success("تم إضافة المشروع بنجاح");
      utils.admin.projects.list.invalidate();
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => toast.error(error.message),
  });

  const updateMutation = trpc.admin.projects.update.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث المشروع بنجاح");
      utils.admin.projects.list.invalidate();
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => toast.error(error.message),
  });

  const deleteMutation = trpc.admin.projects.delete.useMutation({
    onSuccess: () => {
      toast.success("تم حذف المشروع بنجاح");
      utils.admin.projects.list.invalidate();
      setIsDeleteDialogOpen(false);
      setSelectedProject(null);
    },
    onError: (error) => toast.error(error.message),
  });

  const resetForm = () => {
    setFormData(emptyProject);
    setSelectedProject(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (project: Project) => {
    setSelectedProject(project);
    setFormData({
      titleAr: project.titleAr,
      titleEn: project.titleEn,
      descriptionAr: project.descriptionAr || "",
      descriptionEn: project.descriptionEn || "",
      clientName: project.clientName || "",
      location: project.location || "",
      category: project.category || "",
      imageUrl: project.imageUrl || "",
      isFeatured: project.isFeatured,
      sortOrder: project.sortOrder || 0,
      isActive: project.isActive,
    });
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProject) {
      updateMutation.mutate({ id: selectedProject.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = () => {
    if (selectedProject) {
      deleteMutation.mutate({ id: selectedProject.id });
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <AdminLayout title="إدارة المشاريع">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          إجمالي المشاريع: {projectsQuery.data?.length || 0}
        </p>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 ml-2" />
          إضافة مشروع
        </Button>
      </div>

      {/* Projects Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-right p-4 font-medium">المشروع</th>
                <th className="text-right p-4 font-medium">العميل</th>
                <th className="text-right p-4 font-medium">الموقع</th>
                <th className="text-right p-4 font-medium">مميز</th>
                <th className="text-right p-4 font-medium">الحالة</th>
                <th className="text-right p-4 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {projectsQuery.data?.map((project) => (
                <tr key={project.id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {project.imageUrl ? (
                        <img 
                          src={project.imageUrl} 
                          alt={project.titleAr}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground text-xs">لا صورة</span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{project.titleAr}</p>
                        <p className="text-sm text-muted-foreground">{project.category || '-'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{project.clientName || '-'}</td>
                  <td className="p-4">{project.location || '-'}</td>
                  <td className="p-4">
                    {project.isFeatured && (
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      project.isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {project.isActive ? 'نشط' : 'معطل'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => openEditDialog(project)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => openDeleteDialog(project)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!projectsQuery.data || projectsQuery.data.length === 0) && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    لا توجد مشاريع
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle>
              {selectedProject ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="titleAr">العنوان بالعربي *</Label>
                <Input
                  id="titleAr"
                  value={formData.titleAr}
                  onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="titleEn">العنوان بالإنجليزي</Label>
                <Input
                  id="titleEn"
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descriptionAr">الوصف بالعربي</Label>
              <Textarea
                id="descriptionAr"
                value={formData.descriptionAr}
                onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">اسم العميل</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">الموقع</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">التصنيف</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="مثال: industrial, healthcare"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sortOrder">الترتيب</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <FileUpload
                folder="projects"
                label="رفع صورة أو فيديو المشروع"
                accept="image/*,video/*"
                currentUrl={formData.imageUrl}
                onUploadSuccess={(url) => setFormData({ ...formData, imageUrl: url })}
              />
              <div className="mt-2">
                <Label htmlFor="imageUrl">أو أدخل رابط الصورة/الفيديو</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
                />
                <Label htmlFor="isFeatured">مشروع مميز</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="isActive">مشروع نشط</Label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                إلغاء
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
                {selectedProject ? 'تحديث' : 'إضافة'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف المشروع "{selectedProject?.titleAr}" نهائياً. هذا الإجراء لا يمكن التراجع عنه.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
