import { useEffect } from "react";

interface ProductSchemaProps {
  product: {
    id: number;
    nameAr: string;
    nameEn: string;
    descriptionAr?: string;
    descriptionEn?: string;
    imageUrl?: string;
    category?: string;
    specifications?: string;
  };
}

export function ProductSchema({ product }: ProductSchemaProps) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.nameAr,
      "alternateName": product.nameEn,
      "description": product.descriptionAr || product.descriptionEn || "",
      "image": product.imageUrl ? `https://www.ecovent-sa.com${product.imageUrl}` : undefined,
      "brand": {
        "@type": "Brand",
        "name": "ECOVENT"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "ECOVENT",
        "url": "https://www.ecovent-sa.com"
      },
      "category": product.category || "Industrial Ventilation",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "SAR",
        "url": `https://www.ecovent-sa.com/products/${product.id}`
      }
    };

    // Add schema to head
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.id = `product-schema-${product.id}`;
    document.head.appendChild(script);

    // Cleanup
    return () => {
      const existingScript = document.getElementById(`product-schema-${product.id}`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [product]);

  return null; // This component doesn't render anything
}
