import { useState } from "react";
import { AdminLayout } from "./Dashboard";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Eye, Trash2, Loader2, Mail, Phone, Building, Calendar, FileText, Clock, DollarSign } from "lucide-react";

interface QuoteRequest {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  projectType: string | null;
  projectDetails: string | null;
  budget: string | null;
  timeline: string | null;
  status: string;
  notes: string | null;
  createdAt: Date;
}

const statusLabels: Record<string, string> = {
  new: "جديد",
  reviewing: "قيد المراجعة",
  quoted: "تم التسعير",
  accepted: "مقبول",
  rejected: "مرفوض",
};

const statusColors: Record<string, string> = {
  new: "bg-purple-100 text-purple-700",
  reviewing: "bg-blue-100 text-blue-700",
  quoted: "bg-yellow-100 text-yellow-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminQuotes() {
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [notes, setNotes] = useState("");

  const utils = trpc.useUtils();
  const quotesQuery = trpc.admin.quotes.list.useQuery();
  
  const updateStatusMutation = trpc.admin.quotes.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث الحالة بنجاح");
      utils.admin.quotes.list.invalidate();
      setIsViewDialogOpen(false);
    },
    onError: (error) => toast.error(error.message),
  });

  const deleteMutation = trpc.admin.quotes.delete.useMutation({
    onSuccess: () => {
      toast.success("تم حذف الطلب بنجاح");
      utils.admin.quotes.list.invalidate();
      setIsDeleteDialogOpen(false);
      setSelectedQuote(null);
    },
    onError: (error) => toast.error(error.message),
  });

  const openViewDialog = (quote: QuoteRequest) => {
    setSelectedQuote(quote);
    setNewStatus(quote.status);
    setNotes(quote.notes || "");
    setIsViewDialogOpen(true);
  };

  const openDeleteDialog = (quote: QuoteRequest) => {
    setSelectedQuote(quote);
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateStatus = () => {
    if (selectedQuote) {
      updateStatusMutation.mutate({
        id: selectedQuote.id,
        status: newStatus as any,
        notes: notes || undefined,
      });
    }
  };

  const handleDelete = () => {
    if (selectedQuote) {
      deleteMutation.mutate({ id: selectedQuote.id });
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const newCount = quotesQuery.data?.filter(q => q.status === 'new').length || 0;

  return (
    <AdminLayout title="طلبات عروض الأسعار">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <p className="text-muted-foreground">
            إجمالي الطلبات: {quotesQuery.data?.length || 0}
          </p>
          {newCount > 0 && (
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              {newCount} جديدة
            </span>
          )}
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-right p-4 font-medium">العميل</th>
                <th className="text-right p-4 font-medium">نوع المشروع</th>
                <th className="text-right p-4 font-medium">الميزانية</th>
                <th className="text-right p-4 font-medium">التاريخ</th>
                <th className="text-right p-4 font-medium">الحالة</th>
                <th className="text-right p-4 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {quotesQuery.data?.map((quote) => (
                <tr 
                  key={quote.id} 
                  className={`border-t border-border hover:bg-muted/30 ${
                    quote.status === 'new' ? 'bg-purple-50/50' : ''
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-700 font-bold">{quote.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium">{quote.name}</p>
                        <p className="text-sm text-muted-foreground">{quote.company || quote.email || '-'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-muted rounded-full text-sm">
                      {quote.projectType || '-'}
                    </span>
                  </td>
                  <td className="p-4 text-sm">{quote.budget || '-'}</td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {formatDate(quote.createdAt)}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${statusColors[quote.status]}`}>
                      {statusLabels[quote.status]}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => openViewDialog(quote)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => openDeleteDialog(quote)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!quotesQuery.data || quotesQuery.data.length === 0) && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    لا توجد طلبات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle>تفاصيل طلب عرض السعر</DialogTitle>
          </DialogHeader>
          
          {selectedQuote && (
            <div className="space-y-6">
              {/* Client Info */}
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-700 font-bold text-lg">{selectedQuote.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg">{selectedQuote.name}</p>
                    {selectedQuote.company && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {selectedQuote.company}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  {selectedQuote.email && (
                    <a href={`mailto:${selectedQuote.email}`} className="flex items-center gap-1 text-primary hover:underline">
                      <Mail className="w-4 h-4" />
                      {selectedQuote.email}
                    </a>
                  )}
                  {selectedQuote.phone && (
                    <a href={`tel:${selectedQuote.phone}`} className="flex items-center gap-1 text-primary hover:underline">
                      <Phone className="w-4 h-4" />
                      {selectedQuote.phone}
                    </a>
                  )}
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedQuote.createdAt)}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">نوع المشروع</span>
                  </div>
                  <p className="font-medium">{selectedQuote.projectType || '-'}</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">الميزانية</span>
                  </div>
                  <p className="font-medium">{selectedQuote.budget || '-'}</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">الجدول الزمني</span>
                  </div>
                  <p className="font-medium">{selectedQuote.timeline || '-'}</p>
                </div>
              </div>

              {/* Project Details */}
              {selectedQuote.projectDetails && (
                <div>
                  <h3 className="font-bold mb-2">تفاصيل المشروع</h3>
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed bg-muted/30 p-4 rounded-lg">
                    {selectedQuote.projectDetails}
                  </p>
                </div>
              )}

              {/* Status Update */}
              <div className="border-t border-border pt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>تحديث الحالة</Label>
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">جديد</SelectItem>
                        <SelectItem value="reviewing">قيد المراجعة</SelectItem>
                        <SelectItem value="quoted">تم التسعير</SelectItem>
                        <SelectItem value="accepted">مقبول</SelectItem>
                        <SelectItem value="rejected">مرفوض</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>ملاحظات داخلية</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="أضف ملاحظات للمتابعة أو تفاصيل عرض السعر..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              إغلاق
            </Button>
            <Button onClick={handleUpdateStatus} disabled={updateStatusMutation.isPending}>
              {updateStatusMutation.isPending && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف طلب "{selectedQuote?.name}" نهائياً. هذا الإجراء لا يمكن التراجع عنه.
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
