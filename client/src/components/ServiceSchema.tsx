import { useEffect } from "react";

interface ServiceSchemaProps {
  service: {
    id: number;
    titleAr: string;
    titleEn: string;
    descriptionAr?: string;
    descriptionEn?: string;
  };
}

export function ServiceSchema({ service }: ServiceSchemaProps) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org/",
      "@type": "Service",
      "name": service.titleAr,
      "alternateName": service.titleEn,
      "description": service.descriptionAr || service.descriptionEn || "",
      "provider": {
        "@type": "Organization",
        "name": "ECOVENT",
        "url": "https://www.ecovent-sa.com",
        "telephone": "+966-xx-xxxx-xxxx",
        "areaServed": {
          "@type": "Place",
          "name": "السعودية"
        }
      },
      "serviceType": "Industrial Ventilation Services",
      "inLanguage": ["ar", "en"],
      "url": "https://www.ecovent-sa.com/services"
    };

    // Add schema to head
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.id = `service-schema-${service.id}`;
    document.head.appendChild(script);

    // Cleanup
    return () => {
      const existingScript = document.getElementById(`service-schema-${service.id}`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [service]);

  return null; // This component doesn't render anything
}
