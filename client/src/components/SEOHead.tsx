import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
}

export function SEOHead({
  title = "ECOVENT - حلول تهوية صناعية متطورة",
  description = "إيكوفنت - شركة رائدة في تصنيع وتوريد أنظمة التهوية الصناعية في السعودية. نقدم حلول تهوية مبتكرة للمصانع والمستودعات بأعلى معايير الجودة.",
  keywords = "تهوية صناعية، أنظمة تهوية، مراوح صناعية، تكييف صناعي، تهوية مصانع، تهوية مستودعات، إيكوفنت، ECOVENT، السعودية، رؤية 2030",
  image = "https://www.ecovent-sa.com/images/og-image.jpg",
  url = "https://www.ecovent-sa.com",
  type = "website"
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    };

    // Standard meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:site_name", "ECOVENT", true);
    updateMetaTag("og:locale", "ar_SA", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Additional tags
    updateMetaTag("robots", "index, follow");
    updateMetaTag("language", "Arabic");
    updateMetaTag("author", "ECOVENT");
  }, [title, description, keywords, image, url, type]);

  return null; // This component doesn't render anything
}
