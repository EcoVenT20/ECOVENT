import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { 
  Package, 
  FolderKanban, 
  MessageSquare, 
  FileText, 
  Settings,
  LayoutDashboard,
  Menu,
  X,
  ChevronLeft,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "لوحة التحكم" },
    { href: "/admin/products", icon: Package, label: "المنتجات" },
    { href: "/admin/projects", icon: FolderKanban, label: "المشاريع" },
    { href: "/admin/blog", icon: BookOpen, label: "المدونة" },
    { href: "/admin/contacts", icon: MessageSquare, label: "طلبات التواصل" },
    { href: "/admin/quotes", icon: FileText, label: "طلبات الأسعار" },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return location === "/admin";
    return location.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-muted/30" dir="rtl">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center justify-between px-4">
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
        <h1 className="font-bold text-lg">لوحة التحكم</h1>
        <div className="w-10" />
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 right-0 h-full w-64 bg-[#0a1f44] text-white z-40 transform transition-transform duration-300
        lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">العودة للموقع</span>
          </Link>
          <h2 className="text-xl font-bold mt-4">ECOVENT</h2>
          <p className="text-sm text-gray-400"></p>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer
                ${isActive(item.href) 
                  ? 'bg-primary text-white' 
                  : 'text-gray-300 hover:bg-white/10'}
              `}>
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>


      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:mr-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          <h1 className="text-2xl font-bold mb-6">{title}</h1>
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  const productsQuery = trpc.admin.products.list.useQuery();
  const projectsQuery = trpc.admin.projects.list.useQuery();
  const contactsQuery = trpc.admin.contacts.list.useQuery();
  const quotesQuery = trpc.admin.quotes.list.useQuery();

  const stats = [
    {
      label: "المنتجات",
      value: productsQuery.data?.length || 0,
      icon: Package,
      href: "/admin/products",
      color: "bg-blue-500",
    },
    {
      label: "المشاريع",
      value: projectsQuery.data?.length || 0,
      icon: FolderKanban,
      href: "/admin/projects",
      color: "bg-green-500",
    },
    {
      label: "طلبات التواصل",
      value: contactsQuery.data?.length || 0,
      icon: MessageSquare,
      href: "/admin/contacts",
      color: "bg-orange-500",
    },
    {
      label: "طلبات الأسعار",
      value: quotesQuery.data?.length || 0,
      icon: FileText,
      href: "/admin/quotes",
      color: "bg-purple-500",
    },
  ];

  const newContacts = contactsQuery.data?.filter(c => c.status === 'new').length || 0;
  const newQuotes = quotesQuery.data?.filter(q => q.status === 'new').length || 0;

  return (
    <AdminLayout title="لوحة التحكم">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link key={stat.href} href={stat.href}>
            <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Alerts */}
      {(newContacts > 0 || newQuotes > 0) && (
        <div className="bg-card p-6 rounded-xl border border-border mb-8">
          <h2 className="font-bold text-lg mb-4">تنبيهات</h2>
          <div className="space-y-3">
            {newContacts > 0 && (
              <Link href="/admin/contacts">
                <div className="flex items-center gap-3 p-3 bg-orange-50 text-orange-700 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span>لديك {newContacts} رسالة جديدة تحتاج للمراجعة</span>
                </div>
              </Link>
            )}
            {newQuotes > 0 && (
              <Link href="/admin/quotes">
                <div className="flex items-center gap-3 p-3 bg-purple-50 text-purple-700 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors">
                  <FileText className="w-5 h-5" />
                  <span>لديك {newQuotes} طلب عرض سعر جديد</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">آخر الرسائل</h2>
            <Link href="/admin/contacts">
              <Button variant="ghost" size="sm">عرض الكل</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {contactsQuery.data?.slice(0, 5).map((contact) => (
              <div key={contact.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">{contact.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{contact.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{contact.subject || contact.message}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  contact.status === 'new' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {contact.status === 'new' ? 'جديد' : contact.status === 'read' ? 'مقروء' : contact.status}
                </span>
              </div>
            ))}
            {(!contactsQuery.data || contactsQuery.data.length === 0) && (
              <p className="text-center text-muted-foreground py-4">لا توجد رسائل</p>
            )}
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">آخر طلبات الأسعار</h2>
            <Link href="/admin/quotes">
              <Button variant="ghost" size="sm">عرض الكل</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {quotesQuery.data?.slice(0, 5).map((quote) => (
              <div key={quote.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-700 font-bold">{quote.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{quote.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{quote.projectType || 'طلب عرض سعر'}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  quote.status === 'new' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {quote.status === 'new' ? 'جديد' : quote.status}
                </span>
              </div>
            ))}
            {(!quotesQuery.data || quotesQuery.data.length === 0) && (
              <p className="text-center text-muted-foreground py-4">لا توجد طلبات</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
