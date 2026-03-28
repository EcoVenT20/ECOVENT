import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, MapPin, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

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
    //{ name: "الإدارة", href: "/admin" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-0.5"
          : "bg-transparent py-1"
      )}
    >
      <div className="container mx-auto px-1 flex justify-between items-center relative">
        {/* Logo فقط */}
        <Link href="/">
          <div className="relative w-16 h-24 overflow-hidden flex items-center justify-center">
            <img
              src="/images/blog/eco.png"
              alt="ECOVENT Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <div
                className={cn(
                  "text-xs font-bold uppercase tracking-wide px-1 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1",
                  location === link.href
                    ? "text-black bg-white"
                    : "text-black/80 bg-white/70 hover:text-black hover:bg-white"
                )}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.name}
              </div>
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 p-4">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <div className="py-2 text-black hover:text-primary">{link.name}</div>
            </Link>
          ))}
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
              نقدم أحدث أنظمة  التهوية المركزيه والمراوح المصممه خصيصا لتهوية المباني التجاريه والسكنيه بأعلى معايير الجوده والكفاءه.".
            </p>
            <div className="flex gap-4">
              {/* Social Icons */}
              <div className="flex gap-4">
                <a href="https://www.facebook.com/profile.php?id=61587995447753" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Twitter className="w-5 h-5 text-white" />
                </a>
                <a href="https://www.linkedin.com/in/ecovent-sa/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                <a href="https://www.instagram.com/p/DU3L5s4DPGR/?img_index=1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-6 border-l-4 border-primary pl-3">روابط سريعة</h3>
            <ul className="space-y-3">
              {([
                { name: "الرئيسية", href: "/" },
                { name: "من نحن", href: "/about" },
                { name: "المنتجات", href: "/products" },
                { name: "المشاريع", href: "/projects" },
                { name: "المدونة", href: "/blog" },
                { name: "الوظائف", href: "/careers" },
              ]).map((link) => (
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
              {([
                "التصميم والهندسة",
                "تصنيع مراوح التهوية",
                "أنظمة تنقية الهواء",
                "الصيانة والتشغيل",
                "فحص واختبار الأنظمة",
                "حلول كفاءة الطاقة"
              ]).map((service) => (
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
