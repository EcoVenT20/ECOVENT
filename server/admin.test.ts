import { describe, it, expect, beforeAll } from "vitest";
import { getDb } from "./db";
import { products, projects, services, contactRequests, quoteRequests } from "../drizzle/schema";
import { eq } from "drizzle-orm";

describe("Admin API - Database Operations", () => {
  // Test product ID for cleanup
  let testProductId: number | null = null;
  let testProjectId: number | null = null;

  describe("Products Management", () => {
    it("should create a new product", async () => {
      const db = await getDb();
      if (!db) {
        console.log("Database not available, skipping test");
        return;
      }

      const newProduct = {
        nameAr: "منتج اختبار",
        nameEn: "Test Product",
        descriptionAr: "وصف المنتج الاختباري",
        descriptionEn: "Test product description",
        category: "test",
        isActive: true,
      };

      const [inserted] = await db.insert(products).values(newProduct).$returningId();
      testProductId = inserted.id;

      expect(inserted.id).toBeDefined();
      expect(inserted.id).toBeGreaterThan(0);

      // Cleanup
      if (testProductId) {
        await db.delete(products).where(eq(products.id, testProductId));
      }
    });

    it("should fetch all products", async () => {
      const db = await getDb();
      if (!db) {
        console.log("Database not available, skipping test");
        return;
      }

      const allProducts = await db.select().from(products);
      
      expect(Array.isArray(allProducts)).toBe(true);
    });
  });

  describe("Projects Management", () => {
    it("should create a new project", async () => {
      const db = await getDb();
      if (!db) {
        console.log("Database not available, skipping test");
        return;
      }

      const newProject = {
        titleAr: "مشروع اختبار",
        titleEn: "Test Project",
        descriptionAr: "وصف المشروع الاختباري",
        clientName: "عميل اختبار",
        location: "الرياض",
        isActive: true,
        isFeatured: false,
      };

      const [inserted] = await db.insert(projects).values(newProject).$returningId();
      testProjectId = inserted.id;

      expect(inserted.id).toBeDefined();
      expect(inserted.id).toBeGreaterThan(0);

      // Cleanup
      if (testProjectId) {
        await db.delete(projects).where(eq(projects.id, testProjectId));
      }
    });

    it("should fetch all projects", async () => {
      const db = await getDb();
      if (!db) {
        console.log("Database not available, skipping test");
        return;
      }

      const allProjects = await db.select().from(projects);
      
      expect(Array.isArray(allProjects)).toBe(true);
    });
  });

  describe("Services", () => {
    it("should fetch all services", async () => {
      const db = await getDb();
      if (!db) {
        console.log("Database not available, skipping test");
        return;
      }

      const allServices = await db.select().from(services);
      
      expect(Array.isArray(allServices)).toBe(true);
    });
  });

  describe("Contact Requests", () => {
    it("should fetch all contact requests", async () => {
      const db = await getDb();
      if (!db) {
        console.log("Database not available, skipping test");
        return;
      }

      const allContacts = await db.select().from(contactRequests);
      
      expect(Array.isArray(allContacts)).toBe(true);
    });
  });

  describe("Quote Requests", () => {
    it("should fetch all quote requests", async () => {
      const db = await getDb();
      if (!db) {
        console.log("Database not available, skipping test");
        return;
      }

      const allQuotes = await db.select().from(quoteRequests);
      
      expect(Array.isArray(allQuotes)).toBe(true);
    });
  });
});
