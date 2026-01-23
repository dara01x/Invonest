import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { renderMarkdown } from "@/lib/markdown";
import { blogPosts } from "@/lib/blogData";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const post = blogPosts.find(p => p.id === slug);

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto max-w-4xl px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/blog')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </Layout>
    );
  }

  // Calculate reading time (average reading speed: 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <Layout>
      <div className="min-h-screen bg-background" dir={language === 'en' ? 'ltr' : 'rtl'}>
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/blog')}
            className="mb-6"
          >
            <ArrowLeft className={`h-4 w-4 ${language === 'en' ? 'mr-2' : 'ml-2'} ${language !== 'en' ? 'scale-x-[-1]' : ''}`} />
            Back to Blog
          </Button>

          {/* Article Header */}
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{readingTime} min read</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{post.author}</p>
                  <p className="text-sm text-muted-foreground">{post.authorBio}</p>
                </div>
              </div>

              {post.description && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {post.description}
                </p>
              )}
            </header>

            {/* Article Content */}
            <Card className="border-2">
              <CardContent className="p-6 sm:p-8 lg:p-10">
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none
                    prose-headings:font-bold 
                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                    prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4
                    prose-ul:my-4 prose-li:text-foreground
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                  {renderMarkdown(post.content)}
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Related Posts / CTA */}
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">More Articles</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {blogPosts
                .filter(p => p.id !== post.id)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => navigate(`/blog/${relatedPost.id}`)}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
