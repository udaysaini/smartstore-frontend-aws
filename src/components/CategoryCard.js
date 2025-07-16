'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import * as motion from 'motion/react-client';

export default function CategoryCard({ category, className = "" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      <Link href={`/category/${category.slug}`}>
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            
            {/* Category Icon */}
            <div className="absolute top-4 left-4 text-3xl bg-white/90 w-12 h-12 rounded-full flex items-center justify-center shadow-sm">
              {category.icon}
            </div>
          </div>
          
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-gray-600">
              {category.description}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
