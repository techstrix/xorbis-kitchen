import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mt-16 mb-8"
    >
      <Card className="bg-gradient-to-r from-orange-100 to-cream-100 border-orange-200">
        <div className="px-6 py-8 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              asChild
              variant="ghost"
              className="text-orange-700 hover:text-orange-800 hover:bg-orange-200 font-medium"
            >
              <a
                href="https://www.sanity.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Powered by Sanity
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>
          <p className="text-sm text-orange-600 mt-2">
            Content management made simple
          </p>
        </div>
      </Card>
    </motion.footer>
  );
}