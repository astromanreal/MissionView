
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Newspaper, BookOpen, Rocket, Atom, Users, Edit, CalendarDays, UserCircle, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { mockBlogPosts } from '@/lib/mock-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Resources',
  description: 'Explore articles, news, and educational content about space exploration, missions, and technology from the MissionView team.',
};


interface EducationalResource {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: string;
}

const mockEducationalResources: EducationalResource[] = [
  {
    id: 'edu-1',
    title: 'Understanding Space Agencies',
    description: 'Learn about the major space agencies around the world, their history, and key contributions to space exploration.',
    icon: Users,
    category: 'Agencies',
  },
  {
    id: 'edu-2',
    title: 'Types of Space Missions',
    description: 'A comprehensive guide to different mission types, from planetary probes and human spaceflight to satellite deployment.',
    icon: Rocket,
    category: 'Missions',
  },
  {
    id: 'edu-3',
    title: 'Celestial Bodies: Planets, Moons, and More',
    description: 'Explore the diverse objects in our solar system and beyond, including their characteristics and significance.',
    icon: Atom, // Using Atom for a general science/celestial body feel
    category: 'Astronomy',
  },
  {
    id: 'edu-4',
    title: 'The Science of Rocketry',
    description: 'Delve into the fundamental principles of rocket propulsion, launch mechanics, and orbital dynamics.',
    icon: Edit, // Placeholder, could be Rocket or a more specific science icon
    category: 'Technology',
  },
];


export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-10">
        <Newspaper className="w-12 h-12 text-primary mr-6" />
        <div>
          <h1 className="text-4xl font-bold text-primary">MissionView Insights</h1>
          <p className="text-lg text-muted-foreground">Explore articles, news, and educational content about space exploration.</p>
        </div>
      </div>

      {/* Latest Blog Posts Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-foreground mb-8 flex items-center">
          <Edit className="w-8 h-8 mr-3 text-primary" /> Latest Articles
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBlogPosts.map((post) => (
            <Card key={post.id} className="flex flex-col shadow-lg hover:shadow-primary/30 transition-shadow duration-300">
              <CardHeader>
                <Badge variant="outline" className="mb-2 w-fit">{post.category}</Badge>
                <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
                 <div className="text-xs text-muted-foreground pt-2 space-y-1">
                  <div className="flex items-center">
                      <UserCircle className="w-3.5 h-3.5 mr-1.5" />
                      By {post.author}
                  </div>
                  <div className="flex items-center">
                      <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="line-clamp-4">{post.excerpt}</CardDescription>
              </CardContent>
              <CardFooter>
                <Link href={`/blog/${post.id}`} passHref className="w-full">
                  <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary/10">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Educational Resources Section */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-8 flex items-center">
          <BookOpen className="w-8 h-8 mr-3 text-primary" /> Educational Resources
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockEducationalResources.map((resource) => (
            <Card key={resource.id} className="flex flex-col shadow-md hover:shadow-primary/20 transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <resource.icon className="w-12 h-12 text-primary mb-3" />
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <CardDescription>{resource.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full hover:bg-primary/20">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
