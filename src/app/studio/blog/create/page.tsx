import { BlogCreateForm } from '@/components/studio/BlogCreateForm';

export const metadata = {
  title: 'Create Blog | Studio Radya Labs',
  robots: { index: false, follow: false },
};

export default function StudioCreateBlogPage() {
  return <BlogCreateForm />;
}
