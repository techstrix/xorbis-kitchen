import { motion } from 'framer-motion';
import { ChefHat } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full mb-12"
    >
      <Card className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 border-none shadow-lg">
        <div className="px-8 py-12 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <ChefHat className="h-12 w-12 text-white" />
            <h1 className="text-5xl font-bold text-white tracking-tight">
              xorbi's kitchen
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-orange-50 font-light"
          >
           Covering programming,tech and much more :)
          </motion.p>
        </div>
      </Card>
    </motion.header>
  );
}