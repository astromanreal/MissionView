
import type { Metadata } from 'next';
import { ExploreClient } from '@/components/explore-client';

export const metadata: Metadata = {
  title: 'Explore Missions',
  description: 'Search, filter, and explore a comprehensive database of space missions. View statistics and discover missions by year, agency, type, and more.',
};

export default function ExplorePage() {
  return <ExploreClient />;
}
