import { useEffect } from "react";
import { Header, Footer } from "@/components/Layout";
import { Calendar, Eye, ArrowLeft, Share2 } from "lucide-react";
import { Link, useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Streamdown } from "streamdown";

export default function BlogDetail() {
  const params = useParams();
  const slug = params.slug as string;
  
  const { data: article, isLoading } = trpc.blog.getBySlug.useQuery({ slug });
  const incrementViews = trpc.blog.incrementViews.useMutation();

  useEffect(() => {
    if (article?.id) {
      incrementViews.mutate({ id: article.id });
    }
  }, [article?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background" dir="rtl">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-64 bg-muted rounded" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-5/6" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-background" dir="rtl">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">المقال غير موجود</h1>
            <p className="text-muted-foreground mb-8">عذراً، لم نتمكن من العثور على المقال المطلوب</p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="mr-2 w-4 h-4" />
                العودة إلى المدونة
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl">
      <Header />
      
      <main className="flex-grow">
        {/* Article Header */}
        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link href="/">الرئيسية</Link>
                <span>/</span>
                <Link href="/blog">المدونة</Link>
                <span>/</span>
                <span className="text-foreground">{article.titleAr}</span>
              </div>

              {/* Category Badge */}
              {article.category && (
                <div className="mb-4">
                  <span className="inline-block bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-bold">
                    {article.category}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
                {article.titleAr}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center gap-6 text-muted-foreground mb-8 pb-8 border-b">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString("ar-SA", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  <span>{article.viewCount || 0} مشاهدة</span>
                </div>
                <Button variant="ghost" size="sm" className="mr-auto">
                  <Share2 className="w-4 h-4 ml-2" />
                  مشاركة
                </Button>
              </div>

              {/* Featured Image */}
              {article.featuredImage && (
                <div className="mb-12 rounded-lg overflow-hidden">
                  <img
                    src={article.featuredImage}
                    alt={article.titleAr}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <Streamdown>{article.contentAr}</Streamdown>
              </div>

              {/* Tags */}
              {article.tags && (
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-lg font-bold mb-4">الوسوم:</h3>
                  <div className="flex flex-wrap gap-2">
                    {JSON.parse(article.tags).map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to Blog */}
              <div className="mt-12 pt-8 border-t">
                <Link href="/blog">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    العودة إلى المدونة
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
