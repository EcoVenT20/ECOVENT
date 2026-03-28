import { useState } from "react";
import { AdminLayout } from "./Dashboard";
import { useAuth } from "@/_core/hooks/useAuth";
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
import { Eye, Trash2, Loader2, Mail, Phone, Building, Calendar } from "lucide-react";

interface ContactRequest {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  status: string;
  notes: string | null;
  createdAt: Date;
}

const statusLabels: Record<string, string> = {
  new: "جديد",
  read: "مقروء",
  replied: "تم الرد",
  archived: "مؤرشف",
};

const statusColors: Record<string, string> = {
  new: "bg-orange-100 text-orange-700",
  read: "bg-blue-100 text-blue-700",
  replied: "bg-green-100 text-green-700",
  archived: "bg-gray-100 text-gray-700",
};

export default function AdminContacts() {
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactRequest | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [notes, setNotes] = useState("");

  const utils = trpc.useUtils();
  const contactsQuery = trpc.admin.contacts.list.useQuery();
  
  const updateStatusMutation = trpc.admin.contacts.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث الحالة بنجاح");
      utils.admin.contacts.list.invalidate();
      setIsViewDialogOpen(false);
    },
    onError: (error) => toast.error(error.message),
  });

  const deleteMutation = trpc.admin.contacts.delete.useMutation({
    onSuccess: () => {
      toast.success("تم حذف الرسالة بنجاح");
      utils.admin.contacts.list.invalidate();
      setIsDeleteDialogOpen(false);
      setSelectedContact(null);
    },
    onError: (error) => toast.error(error.message),
  });

  const openViewDialog = (contact: ContactRequest) => {
    setSelectedContact(contact);
    setNewStatus(contact.status);
    setNotes(contact.notes || "");
    setIsViewDialogOpen(true);
  };

  const openDeleteDialog = (contact: ContactRequest) => {
    setSelectedContact(contact);
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateStatus = () => {
    if (selectedContact) {
      updateStatusMutation.mutate({
        id: selectedContact.id,
        status: newStatus as any,
        notes: notes || undefined,
      });
    }
  };

  const handleDelete = () => {
    if (selectedContact) {
      deleteMutation.mutate({ id: selectedContact.id });
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

  const newCount = contactsQuery.data?.filter(c => c.status === 'new').length || 0;

  return (
    <AdminLayout title="طلبات التواصل">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <p className="text-muted-foreground">
            إجمالي الرسائل: {contactsQuery.data?.length || 0}
          </p>
          {newCount > 0 && (
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
              {newCount} جديدة
            </span>
          )}
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-right p-4 font-medium">المرسل</th>
                <th className="text-right p-4 font-medium">الموضوع</th>
                <th className="text-right p-4 font-medium">التاريخ</th>
                <th className="text-right p-4 font-medium">الحالة</th>
                <th className="text-right p-4 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {contactsQuery.data?.map((contact) => (
                <tr 
                  key={contact.id} 
                  className={`border-t border-border hover:bg-muted/30 ${
                    contact.status === 'new' ? 'bg-orange-50/50' : ''
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold">{contact.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.email || contact.phone || '-'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="truncate max-w-xs">{contact.subject || contact.message.slice(0, 50)}</p>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {formatDate(contact.createdAt)}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${statusColors[contact.status]}`}>
                      {statusLabels[contact.status]}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => openViewDialog(contact)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => openDeleteDialog(contact)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!contactsQuery.data || contactsQuery.data.length === 0) && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    لا توجد رسائل
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle>تفاصيل الرسالة</DialogTitle>
          </DialogHeader>
          
          {selectedContact && (
            <div className="space-y-6">
              {/* Sender Info */}
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">{selectedContact.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg">{selectedContact.name}</p>
                    {selectedContact.company && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {selectedContact.company}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  {selectedContact.email && (
                    <a href={`mailto:${selectedContact.email}`} className="flex items-center gap-1 text-primary hover:underline">
                      <Mail className="w-4 h-4" />
                      {selectedContact.email}
                    </a>
                  )}
                  {selectedContact.phone && (
                    <a href={`tel:${selectedContact.phone}`} className="flex items-center gap-1 text-primary hover:underline">
                      <Phone className="w-4 h-4" />
                      {selectedContact.phone}
                    </a>
                  )}
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedContact.createdAt)}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div>
                {selectedContact.subject && (
                  <h3 className="font-bold mb-2">{selectedContact.subject}</h3>
                )}
                <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                  {selectedContact.message}
                </p>
              </div>

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
                        <SelectItem value="read">مقروء</SelectItem>
                        <SelectItem value="replied">تم الرد</SelectItem>
                        <SelectItem value="archived">مؤرشف</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>ملاحظات داخلية</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="أضف ملاحظات للمتابعة..."
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
              سيتم حذف رسالة "{selectedContact?.name}" نهائياً. هذا الإجراء لا يمكن التراجع عنه.
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
