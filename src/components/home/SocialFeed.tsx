import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Music2, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
const SOCIAL_POSTS = [
  { id: 1, type: 'ig', user: '@stl_foodie', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&fit=crop', likes: '1.2k' },
  { id: 2, type: 'tiktok', user: '@travel314', img: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=400&fit=crop', likes: '5.8k' },
  { id: 3, type: 'ig', user: '@loop_life', img: 'https://images.unsplash.com/photo-1540031982925-bfbbe182f50f?q=80&w=400&fit=crop', likes: '942' },
  { id: 4, type: 'tiktok', user: '@arch_vibes', img: 'https://images.unsplash.com/photo-1577713430580-0370f1a9415c?q=80&w=400&fit=crop', likes: '12k' },
];
export function SocialFeed() {
  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h3 className="text-3xl font-display font-bold">Community Buzz</h3>
          <p className="text-muted-foreground text-sm">See what's happening right now via #ExploreSTL.</p>
        </div>
        <Button variant="outline" className="rounded-xl font-bold gap-2">
          <Instagram className="w-4 h-4" /> Follow @ExploreSTL
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SOCIAL_POSTS.map((post) => (
          <motion.div 
            key={post.id}
            whileHover={{ y: -5 }}
            className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-border/50 shadow-lg cursor-pointer"
          >
            <img 
              src={post.img} 
              alt="Social Post" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-4 right-4 z-10">
              {post.type === 'ig' ? (
                <Instagram className="w-5 h-5 text-white drop-shadow-lg" />
              ) : (
                <Music2 className="w-5 h-5 text-white drop-shadow-lg" />
              )}
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
              <p className="text-xs font-bold mb-2">{post.user}</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[10px]">
                  <Heart className="w-3 h-3 fill-pink-500 text-pink-500" /> {post.likes}
                </div>
                <div className="flex items-center gap-1 text-[10px]">
                  <MessageCircle className="w-3 h-3" /> 24
                </div>
                <Share2 className="w-3 h-3 ml-auto" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}