import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { PortableText, PortableTextReactComponents, PortableTextListComponent } from '@portabletext/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { sanityClient, postBySlugQuery, urlFor } from '@/lib/sanity';
import type { SanityPost } from '@/types/sanity';

// Define block renderers
const blockRenderers = {
  normal: ({ children }) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
  h1: ({ children }) => <h1 className="text-3xl font-bold mb-6 text-gray-900">{children}</h1>,
  h2: ({ children }) => <h2 className="text-2xl font-semibold mb-4 text-gray-900">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl font-semibold mb-3 text-gray-900">{children}</h3>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-orange-400 pl-4 my-6 italic text-gray-600 bg-orange-50 py-2">
      {children}
    </blockquote>
  ),
} as PortableTextReactComponents['block'];

// Define list renderers with PortableTextListComponent type
const listRenderers: { [key: string]: PortableTextListComponent } = {
  bullet: ({ children }) => <ul className="list-disc list-inside mb-4 text-gray-700">{children}</ul>,
  number: ({ children }) => <ol className="list-decimal list-inside mb-4 text-gray-700">{children}</ol>,
};

const portableTextComponents: PortableTextReactComponents = {
  block: blockRenderers,
  list: listRenderers, // Correctly assign listRenderers to list
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  }, // Ensure listItem is populated
  unknownList: ({ children }) => <ul className="list-disc list-inside mb-4">{children}</ul>,
  unknownListItem: ({ children }) => <li className="mb-1">{children}</li>,
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
 types: {
    image: ({ value }) => {
      if (!value || !value.asset || !value.asset._ref) {
        return <div>Image data unavailable</div>; // Fallback for missing image data
      }
      return (
        <figure className="my-6">
          <img
            src={urlFor(value.asset._ref).width(4000).height(900).auto('format').fit('scale').url()} // Optimized image
            alt={value.alt || 'Image from post'}
            className="rounded-lg shadow-md max-w-full h-auto "
            onError={(e) => (e.currentTarget.src = '/placeholder-image.jpg')} // Fallback image
          />
          {value.alt && <figcaption className="text-sm text-gray-600 mt-2 italic">{value.alt}</figcaption>}
        </figure>
      );
    },
  },
  // Fallback renderers for unknown cases
  hardBreak: () => <br />,
  unknownBlockStyle: ({ children }) => <p>{children}</p>,
  unknownMark: ({ children }) => <span>{children}</span>,
  unknownType: ({ value }) => <div>Unsupported content: {JSON.stringify(value)}</div>,
};
export function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<SanityPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const result = await sanityClient.fetch<SanityPost | null>(postBySlugQuery, { slug });
        // console.log('Fetched post:', result);
        if (result && typeof result === 'object' && 'body' in result) {
          setPost(result);
        } else {
          setError('Invalid post data received');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-orange-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-32"></div>
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="h-10 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
                <div className="h-px bg-gray-200 my-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-orange-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Button asChild aria-label="Back to Home" className="mb-8 bg-orange-500 hover:bg-orange-600">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
              <p className="text-gray-600">The post you're looking for doesn't exist or failed to load.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const formattedDate = post.publishedAt || post._createdAt ? new Date(post.publishedAt || post._createdAt || '').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button asChild aria-label="Back to Home" className="mb-8 bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg transition-all duration-200">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-white shadow-xl border-orange-100">
            <CardContent className="p-8 md:p-12">
              <header className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                  {post.author && (
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-orange-500" />
                      <span className="font-medium">{post.author}</span>
                    </div>
                  )}
                  {formattedDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-orange-500" />
                      <span>{formattedDate}</span>
                    </div>
                  )}
                </div>
                <Separator className="bg-gradient-to-r from-orange-200 to-transparent" />
              </header>
              <article className="prose prose-lg max-w-none">
                <PortableText value={post.body} components={portableTextComponents} />
              </article>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}