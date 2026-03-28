import { Header, Footer } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Eye, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Blog() {
  const { data: articles, isLoading } = trpc.blog.list.useQuery({ isPublished: true });

  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-l from-primary to-primary/80 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
                مدونة إيكوفنت
              </h1>
              <p className="text-xl text-white/90">
               مقالات تقنية ونصائح احترافية حول أنظمة التهوية الصناعية والتكييف 
              </p>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-muted" />
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded mb-4" />
                      <div className="h-4 bg-muted rounded w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : articles && articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article: any) => (
                  <Link key={article.id} href={`/blog/${article.slug}`}>
                    <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full">
                      {article.featuredImage && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={article.featuredImage}
                            alt={article.titleAr}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          {article.category && (
                            <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-bold">
                              {article.category}
                            </div>
                          )}
                        </div>
                      )}
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {article.titleAr}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {article.excerptAr}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {article.publishedAt
                                ? new Date(article.publishedAt).toLocaleDateString("ar-SA")
                                : ""}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{article.viewCount || 0}</span>
                          </div>
                        </div>

                        <Button variant="link" className="p-0 h-auto font-bold group/btn">
                          اقرأ المزيد
                          <ArrowLeft className="mr-2 w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">لا توجد مقالات متاحة حالياً</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
