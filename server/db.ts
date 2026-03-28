import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import bcrypt from 'bcrypt';
import { 
  InsertUser, users, 
  products, Product, InsertProduct,
  projects, Project, InsertProject,
  services, Service, InsertService,
  contactRequests, ContactRequest, InsertContactRequest,
  quoteRequests, QuoteRequest, InsertQuoteRequest,
  siteSettings, SiteSetting, InsertSiteSetting,
  blogArticles, BlogArticle, InsertBlogArticle
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createUserWithPassword(username: string, password: string, name?: string, email?: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    username,
    password: hashedPassword,
    name,
    email,
    loginMethod: 'local',
    lastSignedIn: new Date(),
  });
}

export async function getUserByUsername(username: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.username, username)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function verifyPassword(username: string, password: string): Promise<boolean> {
  console.log('Verifying password for username:', username);
  const user = await getUserByUsername(username);
  console.log('User found:', !!user);
  if (!user || !user.password) return false;

  const result = await bcrypt.compare(password, user.password);
  console.log('Password match:', result);
  return result;
}

// ============ Products ============
export async function getAllProducts(): Promise<Product[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).where(eq(products.isActive, true)).orderBy(products.sortOrder);
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result[0];
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).where(eq(products.category, category)).orderBy(products.sortOrder);
}

// ============ Projects ============
export async function getAllProjects(): Promise<Project[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(projects).where(eq(projects.isActive, true)).orderBy(projects.sortOrder);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(projects).where(eq(projects.isFeatured, true)).orderBy(projects.sortOrder);
}

export async function getProjectById(id: number): Promise<Project | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result[0];
}

// ============ Services ============
export async function getAllServices(): Promise<Service[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(services).where(eq(services.isActive, true)).orderBy(services.sortOrder);
}

export async function getServiceById(id: number): Promise<Service | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
  return result[0];
}

// ============ Contact Requests ============
export async function createContactRequest(data: InsertContactRequest): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(contactRequests).values(data);
}

export async function getAllContactRequests(): Promise<ContactRequest[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contactRequests).orderBy(contactRequests.createdAt);
}

// ============ Quote Requests ============
export async function createQuoteRequest(data: InsertQuoteRequest): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(quoteRequests).values(data);
}

export async function getAllQuoteRequests(): Promise<QuoteRequest[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(quoteRequests).orderBy(quoteRequests.createdAt);
}

// ============ Admin: Products CRUD ============
export async function createProduct(data: InsertProduct): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(products).values(data);
}

export async function updateProduct(id: number, data: Partial<InsertProduct>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(products).set(data).where(eq(products.id, id));
}

export async function deleteProduct(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(products).where(eq(products.id, id));
}

export async function getAllProductsAdmin(): Promise<Product[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).orderBy(products.sortOrder);
}

// ============ Admin: Projects CRUD ============
export async function createProject(data: InsertProject): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(projects).values(data);
}

export async function updateProject(id: number, data: Partial<InsertProject>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(projects).set(data).where(eq(projects.id, id));
}

export async function deleteProject(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(projects).where(eq(projects.id, id));
}

export async function getAllProjectsAdmin(): Promise<Project[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(projects).orderBy(projects.sortOrder);
}

// ============ Admin: Services CRUD ============
export async function createService(data: InsertService): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(services).values(data);
}

export async function updateService(id: number, data: Partial<InsertService>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(services).set(data).where(eq(services.id, id));
}

export async function deleteService(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(services).where(eq(services.id, id));
}

export async function getAllServicesAdmin(): Promise<Service[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(services).orderBy(services.sortOrder);
}

// ============ Admin: Contact Requests ============
export async function updateContactRequestStatus(id: number, status: string, notes?: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contactRequests).set({ status: status as any, notes }).where(eq(contactRequests.id, id));
}

export async function deleteContactRequest(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(contactRequests).where(eq(contactRequests.id, id));
}

// ============ Admin: Quote Requests ============
export async function updateQuoteRequestStatus(id: number, status: string, notes?: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(quoteRequests).set({ status: status as any, notes }).where(eq(quoteRequests.id, id));
}

export async function deleteQuoteRequest(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(quoteRequests).where(eq(quoteRequests.id, id));
}

// ============ Site Settings ============
export async function getSiteSetting(key: string): Promise<SiteSetting | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(siteSettings).where(eq(siteSettings.settingKey, key)).limit(1);
  return result[0];
}

export async function getAllSiteSettings(): Promise<SiteSetting[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(siteSettings);
}

export async function upsertSiteSetting(key: string, value: string, description?: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getSiteSetting(key);
  if (existing) {
    await db.update(siteSettings)
      .set({ settingValue: value, description, updatedAt: new Date() })
      .where(eq(siteSettings.settingKey, key));
  } else {
    await db.insert(siteSettings).values({
      settingKey: key,
      settingValue: value,
      description
    });
  }
}

// ============ Blog Articles ============
export async function getAllBlogArticles(isPublished?: boolean): Promise<BlogArticle[]> {
  const db = await getDb();
  if (!db) return [];
  
  let query = db.select().from(blogArticles);
  
  if (isPublished !== undefined) {
    query = query.where(eq(blogArticles.isPublished, isPublished)) as any;
  }
  
  return query.orderBy(desc(blogArticles.publishedAt));
}

export async function getBlogArticleBySlug(slug: string): Promise<BlogArticle | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogArticles).where(eq(blogArticles.slug, slug)).limit(1);
  return result[0];
}

export async function incrementBlogViews(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const article = await db.select().from(blogArticles).where(eq(blogArticles.id, id)).limit(1);
  if (article[0]) {
    await db.update(blogArticles)
      .set({ viewCount: (article[0].viewCount || 0) + 1 })
      .where(eq(blogArticles.id, id));
  }
}

export async function createBlogArticle(data: InsertBlogArticle): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(blogArticles).values(data);
}

export async function updateBlogArticle(id: number, data: Partial<InsertBlogArticle>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(blogArticles).set(data).where(eq(blogArticles.id, id));
}

export async function deleteBlogArticle(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(blogArticles).where(eq(blogArticles.id, id));
}
