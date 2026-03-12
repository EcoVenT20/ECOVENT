import { useEffect } from "react";

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export function GoogleAnalytics({ measurementId = "G-XXXXXXXXXX" }: GoogleAnalyticsProps) {
  useEffect(() => {
    // Only load in production
    if (import.meta.env.DEV || !measurementId || measurementId === "G-XXXXXXXXXX") {
      console.log("[GA] Skipped in development or no valid ID provided");
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    // Initialize Google Analytics
    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
    `;
    document.head.appendChild(script2);

    console.log("[GA] Initialized with ID:", measurementId);

    return () => {
      // Cleanup scripts on unmount
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [measurementId]);

  return null; // This component doesn't render anything
}

// Google Search Console verification component
interface SearchConsoleProps {
  verificationCode?: string;
}

export function GoogleSearchConsole({ verificationCode }: SearchConsoleProps) {
  useEffect(() => {
    if (!verificationCode) {
      console.log("[GSC] No verification code provided");
      return;
    }

    // Add Google Search Console verification meta tag
    const meta = document.createElement("meta");
    meta.name = "google-site-verification";
    meta.content = verificationCode;
    document.head.appendChild(meta);

    console.log("[GSC] Verification meta tag added");

    return () => {
      document.head.removeChild(meta);
    };
  }, [verificationCode]);

  return null;
}
