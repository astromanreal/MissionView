
import React from 'react';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarDays, UserCircle, Hash } from 'lucide-react';
import { mockBlogPosts } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const post = mockBlogPosts.find((p) => p.id === id);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: `${post.title} | MissionView Blog`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}


// Helper function to format titles from object keys
const formatTitle = (key: string) => {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Recursive component to render the structured content
const ContentRenderer: React.FC<{ data: Record<string, any> }> = ({ data }) => {
  return (
    <>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="mb-8">
          <h2 className="text-2xl font-semibold text-primary/90 mb-4 border-b border-primary/20 pb-2">{formatTitle(key)}</h2>
          {typeof value === 'string' && <p className="text-foreground/90 leading-relaxed">{value}</p>}
          {typeof value === 'object' && !Array.isArray(value) && value !== null && (
            <div className="space-y-5 pl-4 border-l-2 border-primary/30">
              {Object.entries(value).map(([subKey, subValue]) => (
                <div key={subKey}>
                  <h3 className="text-xl font-medium text-foreground">{formatTitle(subKey)}</h3>
                  <p className="text-muted-foreground leading-relaxed mt-1">{subValue as string}</p>
                </div>
              ))}
            </div>
          )}
          {Array.isArray(value) && (
            <ul className="list-disc list-inside space-y-2 text-foreground/90 pl-2">
              {value.map((item, index) => (
                <li key={index} className="pl-2">{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );
};


export default function BlogPostPage({ params }: Props) {
  const { id } = params;

  const post = mockBlogPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <article>
        <header className="mb-8 border-b pb-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-6 -ml-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all articles
            </Button>
          </Link>
          <Badge variant="outline" className="mb-4">{post.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-4">
            {post.title}
          </h1>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center">
              <UserCircle className="w-5 h-5 mr-2" />
              <span>By {post.author}</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="w-5 h-5 mr-2" />
              <span>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
           <div className="flex flex-wrap items-center gap-2 mt-6">
                <Hash className="w-4 h-4 text-muted-foreground" />
                {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
                ))}
            </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none text-lg leading-relaxed">
          <p className="text-xl italic text-muted-foreground mb-12">{post.excerpt}</p>
          <ContentRenderer data={post.content} />
        </div>
      </article>
    </div>
  );
}
