import { useEffect } from "react";

interface ProjectSchemaProps {
  project: {
    id: number;
    titleAr: string;
    titleEn: string;
    descriptionAr?: string;
    descriptionEn?: string;
    imageUrl?: string;
    location?: string;
    completionDate?: string;
  };
}

export function ProjectSchema({ project }: ProjectSchemaProps) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org/",
      "@type": "CreativeWork",
      "name": project.titleAr,
      "alternateName": project.titleEn,
      "description": project.descriptionAr || project.descriptionEn || "",
      "image": project.imageUrl ? `https://www.ecovent-sa.com${project.imageUrl}` : undefined,
      "creator": {
        "@type": "Organization",
        "name": "ECOVENT",
        "url": "https://www.ecovent-sa.com"
      },
      "datePublished": project.completionDate || new Date().toISOString().split('T')[0],
      "inLanguage": ["ar", "en"],
      "locationCreated": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "SA",
          "addressLocality": project.location || "المملكة العربية السعودية"
        }
      }
    };

    // Add schema to head
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.id = `project-schema-${project.id}`;
    document.head.appendChild(script);

    // Cleanup
    return () => {
      const existingScript = document.getElementById(`project-schema-${project.id}`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [project]);

  return null; // This component doesn't render anything
}
