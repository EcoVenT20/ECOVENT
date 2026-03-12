import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure } from "./_core/trpc";
import { TRPCError } from '@trpc/server';
import { z } from "zod";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";
import { invokeLLM } from "./_core/llm";
import { sdk } from "./_core/sdk";
import { eq } from "drizzle-orm";
import { users } from "../drizzle/schema";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  getAllServices,
  getServiceById,
  createContactRequest,
  createQuoteRequest,
  // Blog functions
  getAllBlogArticles,
  getBlogArticleBySlug,
  incrementBlogViews,
  createBlogArticle,
  updateBlogArticle,
  deleteBlogArticle,
  // Admin functions
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsAdmin,
  createProject,
  updateProject,
  deleteProject,
  getAllProjectsAdmin,
  createService,
  updateService,
  deleteService,
  getAllServicesAdmin,
  getAllContactRequests,
  updateContactRequestStatus,
  deleteContactRequest,
  getAllQuoteRequests,
  updateQuoteRequestStatus,
  deleteQuoteRequest,
  // Site Settings
  getSiteSetting,
  getAllSiteSettings,
  upsertSiteSetting,
  // Auth functions
  createUserWithPassword,
  getUserByUsername,
  verifyPassword,
  getDb
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    test: publicProcedure.query(() => {
      console.log('Test query called');
      return { message: 'Hello from auth' };
    }),
    me: publicProcedure.query(opts => opts.ctx.user),
    login: publicProcedure
      .input(z.object({ username: z.string(), password: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const { username, password } = input;

        console.log('Login attempt for username:', username);

        const isValid = await verifyPassword(username, password);

        console.log('Password valid:', isValid);

        if (!isValid) {
          console.log('Invalid credentials');
          throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentials' });
        }

        const user = await getUserByUsername(username);

        if (!user) {
          console.log('User not found');
          throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not found' });
        }

        console.log('Login successful for user:', user.id);

        // Update lastSignedIn
        const db = await getDb();
        if (db) {
          await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, user.id));
        }

        // Create session
        const sessionToken = await sdk.createSessionToken(user.openId || `local-${user.id}`, {
          name: user.name || '',
          expiresInMs: ONE_YEAR_MS,
        });

        console.log('Setting cookie');

        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

        return { success: true };
      }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Products API
  products: router({
    list: publicProcedure.query(async () => {
      return getAllProducts();
    }),
    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getProductById(input.id);
      }),
    byCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return getProductsByCategory(input.category);
      }),
  }),

  // Projects API
  projects: router({
    list: publicProcedure.query(async () => {
      return getAllProjects();
    }),
    featured: publicProcedure.query(async () => {
      return getFeaturedProjects();
    }),
    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getProjectById(input.id);
      }),
  }),

  // Services API
  services: router({
    list: publicProcedure.query(async () => {
      return getAllServices();
    }),
    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getServiceById(input.id);
      }),
  }),

  // Contact Form API
  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(2, "الاسم مطلوب"),
          email: z.string().email("البريد الإلكتروني غير صالح").optional(),
          phone: z.string().optional(),
          company: z.string().optional(),
          subject: z.string().optional(),
          message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
        })
      )
      .mutation(async ({ input }) => {
        await createContactRequest(input);
        return { success: true, message: "تم إرسال رسالتك بنجاح" };
      }),
  }),

  // Quote Request API
  quote: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(2, "الاسم مطلوب"),
          email: z.string().email("البريد الإلكتروني غير صالح").optional(),
          phone: z.string().optional(),
          company: z.string().optional(),
          projectType: z.string().optional(),
          projectDetails: z.string().optional(),
          budget: z.string().optional(),
          timeline: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await createQuoteRequest(input);
        return { success: true, message: "تم إرسال طلب عرض السعر بنجاح" };
      }),
  }),

  // ============ Blog APIs ============
  blog: router({  
    list: publicProcedure
      .input(z.object({ isPublished: z.boolean().optional() }).optional())
      .query(async ({ input }) => {
        return getAllBlogArticles(input?.isPublished);
      }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return getBlogArticleBySlug(input.slug);
      }),
    incrementViews: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await incrementBlogViews(input.id);
        return { success: true };
      }),
  }),

  // ============ Admin APIs ============
  admin: router({
    // Blog Management
    blog: router({
      list: adminProcedure.query(async () => {
        return getAllBlogArticles();
      }),
      create: adminProcedure
        .input(
          z.object({
            slug: z.string(),
            titleAr: z.string(),
            titleEn: z.string(),
            excerptAr: z.string(),
            excerptEn: z.string(),
            contentAr: z.string(),
            contentEn: z.string(),
            featuredImage: z.string().optional(),
            category: z.string(),
            tags: z.string(),
            metaDescriptionAr: z.string().optional(),
            metaDescriptionEn: z.string().optional(),
            metaKeywords: z.string().optional(),
            isPublished: z.boolean().default(false),
            publishedAt: z.date().optional(),
          })
        )
        .mutation(async ({ input }) => {
          await createBlogArticle(input);
          return { success: true };
        }),
      update: adminProcedure
        .input(
          z.object({
            id: z.number(),
            slug: z.string().optional(),
            titleAr: z.string().optional(),
            titleEn: z.string().optional(),
            excerptAr: z.string().optional(),
            excerptEn: z.string().optional(),
            contentAr: z.string().optional(),
            contentEn: z.string().optional(),
            featuredImage: z.string().optional(),
            category: z.string().optional(),
            tags: z.string().optional(),
            metaDescriptionAr: z.string().optional(),
            metaDescriptionEn: z.string().optional(),
            metaKeywords: z.string().optional(),
            isPublished: z.boolean().optional(),
            publishedAt: z.date().optional(),
          })
        )
        .mutation(async ({ input }) => {
          const { id, ...data } = input;
          await updateBlogArticle(id, data);
          return { success: true };
        }),
      delete: adminProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input }) => {
          await deleteBlogArticle(input.id);
          return { success: true };
        }),
    }),
    // File Upload
    upload: adminProcedure
      .input(
        z.object({
          file: z.string(), // base64 encoded file
          fileName: z.string(),
          contentType: z.string(),
          folder: z.enum(["products", "projects", "services"]).default("products"),
        })
      )
      .mutation(async ({ input }) => {
        const { file, fileName, contentType, folder } = input;
        
        // Decode base64
        const buffer = Buffer.from(file, "base64");
        
        // Generate unique file name
        const ext = fileName.split(".").pop();
        const uniqueName = `${folder}/${nanoid()}.${ext}`;
        
        // Upload to S3
        const { url } = await storagePut(uniqueName, buffer, contentType);
        
        return { success: true, url };
      }),
    // Products Management
    products: router({
      list: adminProcedure.query(async () => {
        return getAllProductsAdmin();
      }),
      create: adminProcedure
        .input(
          z.object({
            nameAr: z.string().min(1),
            nameEn: z.string().default(""),
            descriptionAr: z.string().optional(),
            descriptionEn: z.string().optional(),
            category: z.string().optional(),
            imageUrl: z.string().optional(),
            specifications: z.string().optional(),
            sortOrder: z.number().optional(),
            isActive: z.boolean().optional(),
          })
        )
        .mutation(async ({ input }) => {
          await createProduct(input);
          return { success: true };
        }),
      update: adminProcedure
        .input(
          z.object({
            id: z.number(),
            nameAr: z.string().optional(),
            nameEn: z.string().optional(),
            descriptionAr: z.string().optional(),
            descriptionEn: z.string().optional(),
            category: z.string().optional(),
            imageUrl: z.string().optional(),
            specifications: z.string().optional(),
            sortOrder: z.number().optional(),
            isActive: z.boolean().optional(),
          })
        )
        .mutation(async ({ input }) => {
          const { id, ...data } = input;
          await updateProduct(id, data);
          return { success: true };
        }),
      delete: adminProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input }) => {
          await deleteProduct(input.id);
          return { success: true };
        }),
    }),

    // Projects Management
    projects: router({
      list: adminProcedure.query(async () => {
        return getAllProjectsAdmin();
      }),
      create: adminProcedure
        .input(
          z.object({
            titleAr: z.string().min(1),
            titleEn: z.string().default(""),
            descriptionAr: z.string().optional(),
            descriptionEn: z.string().optional(),
            clientName: z.string().optional(),
            location: z.string().optional(),
            category: z.string().optional(),
            imageUrl: z.string().optional(),
            completionDate: z.string().optional(),
            isFeatured: z.boolean().optional(),
            sortOrder: z.number().optional(),
            isActive: z.boolean().optional(),
          })
        )
        .mutation(async ({ input }) => {
          const { completionDate, ...rest } = input;
          const data = {
            ...rest,
            ...(completionDate ? { completionDate: new Date(completionDate) } : {}),
          };
          await createProject(data as any);
          return { success: true };
        }),
      update: adminProcedure
        .input(
          z.object({
            id: z.number(),
            titleAr: z.string().optional(),
            titleEn: z.string().optional(),
            descriptionAr: z.string().optional(),
            descriptionEn: z.string().optional(),
            clientName: z.string().optional(),
            location: z.string().optional(),
            category: z.string().optional(),
            imageUrl: z.string().optional(),
            completionDate: z.string().optional(),
            isFeatured: z.boolean().optional(),
            sortOrder: z.number().optional(),
            isActive: z.boolean().optional(),
          })
        )
        .mutation(async ({ input }) => {
          const { id, completionDate, ...rest } = input;
          const data = {
            ...rest,
            ...(completionDate ? { completionDate: new Date(completionDate) } : {}),
          };
          await updateProject(id, data);
          return { success: true };
        }),
      delete: adminProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input }) => {
          await deleteProject(input.id);
          return { success: true };
        }),
    }),

    // Services Management
    services: router({
      list: adminProcedure.query(async () => {
        return getAllServicesAdmin();
      }),
      create: adminProcedure
        .input(
          z.object({
            titleAr: z.string().min(1),
            titleEn: z.string().default(""),
            descriptionAr: z.string().optional(),
            descriptionEn: z.string().optional(),
            icon: z.string().optional(),
            features: z.string().optional(),
            sortOrder: z.number().optional(),
            isActive: z.boolean().optional(),
          })
        )
        .mutation(async ({ input }) => {
          await createService(input);
          return { success: true };
        }),
      update: adminProcedure
        .input(
          z.object({
            id: z.number(),
            titleAr: z.string().optional(),
            titleEn: z.string().optional(),
            descriptionAr: z.string().optional(),
            descriptionEn: z.string().optional(),
            icon: z.string().optional(),
            features: z.string().optional(),
            sortOrder: z.number().optional(),
            isActive: z.boolean().optional(),
          })
        )
        .mutation(async ({ input }) => {
          const { id, ...data } = input;
          await updateService(id, data);
          return { success: true };
        }),
      delete: adminProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input }) => {
          await deleteService(input.id);
          return { success: true };
        }),
    }),

    // Contact Requests Management
    contacts: router({
      list: adminProcedure.query(async () => {
        return getAllContactRequests();
      }),
      updateStatus: adminProcedure
        .input(
          z.object({
            id: z.number(),
            status: z.enum(["new", "read", "replied", "archived"]),
            notes: z.string().optional(),
          })
        )
        .mutation(async ({ input }) => {
          await updateContactRequestStatus(input.id, input.status, input.notes);
          return { success: true };
        }),
      delete: adminProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input }) => {
          await deleteContactRequest(input.id);
          return { success: true };
        }),
    }),

    // Quote Requests Management
    quotes: router({
      list: adminProcedure.query(async () => {
        return getAllQuoteRequests();
      }),
      updateStatus: adminProcedure
        .input(
          z.object({
            id: z.number(),
            status: z.enum(["new", "reviewing", "quoted", "accepted", "rejected"]),
            notes: z.string().optional(),
          })
        )
        .mutation(async ({ input }) => {
          await updateQuoteRequestStatus(input.id, input.status, input.notes);
          return { success: true };
        }),
      delete: adminProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input }) => {
          await deleteQuoteRequest(input.id);
          return { success: true };
        }),
    }),

    // Site Settings Management
    settings: router({
      list: adminProcedure.query(async () => {
        return getAllSiteSettings();
      }),
      get: publicProcedure
        .input(z.object({ key: z.string() }))
        .query(async ({ input }) => {
          return getSiteSetting(input.key);
        }),
      upsert: adminProcedure
        .input(
          z.object({
            key: z.string(),
            value: z.string(),
            description: z.string().optional(),
          })
        )
        .mutation(async ({ input }) => {
          await upsertSiteSetting(input.key, input.value, input.description);
          return { success: true };
        }),
    }),
  }),

  // AI Features
  ai: router({
    generateVentilationDesign: publicProcedure
      .input(
        z.object({
          facilityType: z.string(),
          area: z.string(),
          height: z.string(),
          workers: z.string(),
          activity: z.string(),
          pollutionLevel: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const { invokeLLM } = await import("./_core/llm");

        const area = parseFloat(input.area);
        const height = parseFloat(input.height);
        const workers = parseInt(input.workers);
        const volume = area * height;

        // Calculate base CFM requirements
        let cfmPerPerson = 20; // Standard outdoor air requirement
        let airChangesPerHour = 6; // Base air changes

        // Adjust based on pollution level
        if (input.pollutionLevel === "medium") {
          airChangesPerHour = 12;
          cfmPerPerson = 30;
        } else if (input.pollutionLevel === "high") {
          airChangesPerHour = 20;
          cfmPerPerson = 50;
        }

        // Calculate required CFM
        const cfmFromVolume = (volume * airChangesPerHour) / 60;
        const cfmFromWorkers = workers * cfmPerPerson;
        const totalCFM = Math.max(cfmFromVolume, cfmFromWorkers);

        // Use LLM to generate recommendations
        const prompt = `أنت مهندس أنظمة تهوية صناعية خبير. بناءً على المعلومات التالية:

نوع المنشأة: ${input.facilityType}
المساحة: ${area} متر مربع
ارتفاع السقف: ${height} متر
عدد العاملين: ${workers}
نوع النشاط: ${input.activity}
مستوى التلوث: ${input.pollutionLevel}
معدل التدفق المحسوب: ${Math.round(totalCFM)} CFM

قدم توصيات مفصلة تشمل:
1. نوع المراوح الأنسب (محورية، طاردة مركزية، إلخ)
2. عدد المراوح المطلوب
3. مواقع التركيب المقترحة
4. أي معدات إضافية مطلوبة (فلاتر، مجاري هواء، إلخ)
5. نصائح للصيانة

قدم الإجابة على شكل نقاط واضحة ومختصرة (5-7 نقاط).`;

        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content:
                "أنت مهندس أنظمة تهوية صناعية متخصص في تصميم الأنظمة المثلى.",
            },
            { role: "user", content: prompt },
          ],
        });

        const content = response.choices[0].message.content;
        const aiRecommendations =
          typeof content === "string"
            ? content.split("\n").filter((line: string) => line.trim())
            : [];

        // Determine fan type and count
        let fanType = "مراوح محورية صناعية";
        let fanCount = Math.ceil(totalCFM / 10000); // Assume 10,000 CFM per fan

        if (input.pollutionLevel === "high") {
          fanType = "مراوح طاردة مركزية";
          fanCount = Math.ceil(totalCFM / 8000);
        }

        // Installation time
        const installationTime =
          area > 1000 ? "4-6 أسابيع" : area > 500 ? "2-4 أسابيع" : "1-2 أسبوع";

        return {
          cfm: Math.round(totalCFM),
          fanType,
          fanCount,
          installationTime,
          recommendations: aiRecommendations.slice(0, 7),
        };
      }),

    chat: publicProcedure
      .input(
        z.object({
          message: z.string(),
          history: z.array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string(),
            })
          ),
        })
      )
      .mutation(async ({ input }) => {
        const { message, history } = input;

        // Build conversation history for LLM
        const messages = [
          {
            role: "system" as const,
            content: `أنت مساعد ذكي متخصص في أنظمة التهوية الصناعية لشركة ECOVENT السعودية.

معلومات عن ECOVENT:
- شركة سعودية رائدة في تصنيع وتوريد أنظمة التهوية الصناعية
- تقدم مراوح محورية، مراوح طاردة مركزية، ومعدات معالجة الهواء
- متخصصة في تهوية المصانع، المستودعات، والمنشآت الصناعية
- أنظمتها توفر 30-40% من استهلاك الطاقة
- معتمدة بشهادة ISO 9001
- تقدم خدمات التصميم، التوريد، التركيب، والصيانة

مهمتك:
- الإجابة على أسئلة العملاء بشكل احترافي ومفيد
- تقديم نصائح تقنية دقيقة
- توجيه العملاء لطلب عرض سعر عند الحاجة
- استخدام لغة عربية فصحى مبسطة
- كن ودوداً ومساعداً

إذا سأل العميل عن أسعار محددة، أخبره أن الأسعار تعتمد على المواصفات والكمية، ووجهه لطلب عرض سعر مخصص.`,
          },
          ...history.map((msg) => ({
            role: msg.role as "user" | "assistant",
            content: msg.content,
          })),
          {
            role: "user" as const,
            content: message,
          },
        ];

        const response = await invokeLLM({
          messages,
        });

        const assistantMessage =
          typeof response.choices[0].message.content === "string"
            ? response.choices[0].message.content
            : "عذراً، لم أتمكن من فهم سؤالك. هل يمكنك إعادة صياغته؟";

        return {
          response: assistantMessage,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
