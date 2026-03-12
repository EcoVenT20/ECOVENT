import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, MapPin, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "من نحن", href: "/about" },
    { name: "المنتجات", href: "/products" },
    { name: "الخدمات", href: "/services" },
    { name: "المشاريع", href: "/projects" },
    { name: "المدونة", href: "/blog" },
    { name: "أدوات AI", href: "/ai-tools", icon: Sparkles },
    { name: "الأسئلة الشائعة", href: "/faq" },
    { name: "تواصل معنا", href: "/contact" },
    { name: "الإدارة", href: "/admin" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="relative w-10 h-10 overflow-hidden rounded-full bg-primary flex items-center justify-center">
              <img 
                src="/images/logo.webp" 
                alt="ECOVENT Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white"><path d="M12 12c0-3 2.5-5.5 5.5-5.5S23 9 23 12H12z"/><path d="M12 12c0 3-2.5 5.5-5.5 5.5S1 15 1 12h11z"/><path d="M12 12c-3 0-5.5-2.5-5.5-5.5S9 1 12 1v11z"/><path d="M12 12c3 0 5.5 2.5 5.5 5.5S15 23 12 23V12z"/></svg>';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-heading font-bold text-primary leading-none tracking-tighter">
                ECOVENT
              </span>
              <span className="text-[10px] text-muted-foreground font-sans tracking-widest uppercase">
                Ventilation Solutions
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <div
                className={cn(
                  "text-sm font-bold uppercase tracking-wide transition-colors hover:text-primary relative py-2 cursor-pointer flex items-center gap-1",
                  location === link.href
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                    : "text-foreground/80 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
                )}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.name}
              </div>
            </Link>
          ))}
          <Button 
            variant="default" 
            size="sm" 
            className="bg-primary hover:bg-primary/90 text-white font-bold rounded-none skew-x-[-10deg]"
            onClick={() => window.location.href = '/contact'}
          >
            <span className="skew-x-[10deg]">طلب عرض سعر</span>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg animate-in slide-in-from-top-5">
          <nav className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <div
                  className={cn(
                    "text-lg font-medium py-2 border-b border-border/50 cursor-pointer",
                    location === link.href ? "text-primary" : "text-foreground"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </div>
              </Link>
            ))}
            <Button className="w-full mt-2" onClick={() => setIsMobileMenuOpen(false)}>
              طلب عرض سعر
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0a1f44] text-white pt-16 pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 12c0-3 2.5-5.5 5.5-5.5S23 9 23 12H12z"/><path d="M12 12c0 3-2.5 5.5-5.5 5.5S1 15 1 12h11z"/><path d="M12 12c-3 0-5.5-2.5-5.5-5.5S9 1 12 1v11z"/><path d="M12 12c3 0 5.5 2.5 5.5 5.5S15 23 12 23V12z"/></svg>
              </div>
              <span className="text-2xl font-heading font-bold">ECOVENT</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              حلول تهوية صناعية متكاملة تصنع الفرق. نقدم أحدث التقنيات في مجال التهوية والتكييف للمصانع والمستودعات والمباني التجارية.
            </p>
            <div className="flex gap-4">
              {/* Social Icons */}
              {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current opacity-80" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-6 border-l-4 border-primary pl-3">روابط سريعة</h3>
            <ul className="space-y-3">
              {[
                { name: "الرئيسية", href: "/" },
                { name: "من نحن", href: "/about" },
                { name: "المنتجات", href: "/products" },
                { name: "المشاريع", href: "/projects" },
                { name: "المدونة", href: "/blog" },
                { name: "الوظائف", href: "/careers" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <div className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2 cursor-pointer">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {link.name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-6 border-l-4 border-primary pl-3">خدماتنا</h3>
            <ul className="space-y-3">
              {[
                "التصميم والهندسة",
                "تصنيع مراوح التهوية",
                "أنظمة تنقية الهواء",
                "الصيانة والتشغيل",
                "فحص واختبار الأنظمة",
                "حلول كفاءة الطاقة"
              ].map((service) => (
                <li key={service} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-6 border-l-4 border-primary pl-3">تواصل معنا</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span className="text-gray-300">الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:966554070875" className="text-gray-300 hover:text-white dir-ltr">966554070875</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@ecovent-sa.com" className="text-gray-300 hover:text-white">info@ecovent-sa.com</a>
                  <a href="https://www.ecovent-sa.com" className="text-gray-300 hover:text-white">www.ecovent-sa.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2025 ECOVENT. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
