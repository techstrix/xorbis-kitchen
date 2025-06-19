import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { SanityPost } from '@/types/sanity';
import { urlFor } from '@/lib/sanity'; // Import urlFor for image URLs

interface Block {
  _type: 'block';
  children?: { _type: string; text?: string }[];
}

interface ImageBlock {
  _type: 'image';
  asset: { _ref: string };
  alt?: string;
}

type BodyBlock = Block | ImageBlock;

interface PostCardProps {
  post: SanityPost;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  const truncateText = (text: string, maxLength: number) =>
    text.length <= maxLength ? text : text.slice(0, maxLength) + '...';

  const getPreviewContent = (body: BodyBlock[] | undefined) => {
    if (!body || !Array.isArray(body)) return { text: 'No preview available', imageUrl: null };

    let text = '';
    let imageUrl = null;

    for (const block of body) {
      if (block._type === 'block' && block.children) {
        const blockText = block.children
          .filter((child): child is { _type: string; text: string } => child._type === 'span' && typeof child.text === 'string')
          .map((child) => child.text)
          .join(' ');
        text += (text ? ' ' : '') + blockText;
        if (text.length > 150) {
          text = truncateText(text, 150);
          break;
        }
      } else if (block._type === 'image') {
        imageUrl = urlFor((block as ImageBlock).asset._ref).width(300).height(200).auto('format').fit('max').url();
        break; // Stop after finding the first image
      }
    }

    return { text: text || 'No preview available', imageUrl };
  };

  const { text: previewText, imageUrl } = getPreviewContent(post.body);
  const formattedDate = post.publishedAt || post._createdAt ? new Date(post.publishedAt || post._createdAt || '').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="h-full bg-gradient-to-br from-cream-50 to-white border-orange-100 shadow-md hover:shadow-xl transition-all duration-300 group">
        <CardContent className="p-6 h-full flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-200">
              {post.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              {post.author && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              )}
              {formattedDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedDate}</span>
                </div>
              )}
            </div>
            <Separator className="mb-4" />
            {imageUrl && (
              <img
                src={imageUrl}
                alt={post.title || 'Post image'}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onError={(e) => (e.currentTarget.src = '/placeholder-image.jpg')} // Fallback image
              />
            )}
            <p className="text-gray-700 leading-relaxed mb-6">{previewText}</p>
          </div>
          <div className="mt-auto">
            <Button
              asChild
              className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Link to={`/post/${post.slug.current}`}>Read More</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}