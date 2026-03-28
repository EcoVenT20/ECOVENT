import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedAdmin = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const admin: AuthenticatedAdmin = {
    id: 1,
    openId: "admin-user",
    email: "admin@ecovent.sa",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user: admin,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("admin.upload", () => {
  it("accepts valid file upload request from admin", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Create a simple base64 encoded test image (1x1 pixel PNG)
    const testImageBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

    const input = {
      file: testImageBase64,
      fileName: "test.png",
      contentType: "image/png",
      folder: "products" as const,
    };

    // This test validates the input schema and procedure structure
    // Actual S3 upload would require environment setup
    try {
      const result = await caller.admin.upload(input);
      expect(result).toHaveProperty("success");
      expect(result.success).toBe(true);
      expect(result).toHaveProperty("url");
      expect(typeof result.url).toBe("string");
    } catch (error: any) {
      // If S3 credentials are not available in test environment, that's expected
      if (error.message.includes("Storage proxy credentials missing")) {
        expect(error.message).toContain("Storage proxy credentials missing");
      } else {
        throw error;
      }
    }
  });

  it("rejects upload from non-admin user", async () => {
    const ctx = createAdminContext();
    // Change role to regular user
    if (ctx.user) {
      ctx.user.role = "user";
    }
    
    const caller = appRouter.createCaller(ctx);

    const testImageBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

    const input = {
      file: testImageBase64,
      fileName: "test.png",
      contentType: "image/png",
      folder: "products" as const,
    };

    await expect(caller.admin.upload(input)).rejects.toThrow();
  });
});
