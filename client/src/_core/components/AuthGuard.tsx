import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  requireOwner?: boolean;
}

export function AuthGuard({ children, requireOwner = false }: AuthGuardProps) {
  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (loading) return;
    
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    // Check if user is owner/admin when requireOwner is true
    if (requireOwner && user && user.role !== 'admin') {
      window.location.href = "/";
    }
  }, [loading, isAuthenticated, user, requireOwner]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requireOwner && user && user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">غير مصرح</h1>
          <p className="text-muted-foreground">ليس لديك صلاحية للوصول إلى هذه الصفحة</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
