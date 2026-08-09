import React from 'react';
import { BlogPost } from '../../types';
import { Clock, Calendar, ArrowRight, User } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  onReadMore?: (post: BlogPost) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onReadMore }) => {
  return (
    <article
      id={`blog-card-${post.id}`}
      className="bg-white rounded-3xl border border-slate-100 shadow-xs hover:border-blue-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden group"
    >
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute top-4 left-4 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
          {post.category}
        </span>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              {post.readTime}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
            {post.snippet}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <User className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold text-slate-700">{post.author}</span>
          </div>

          <button
            onClick={() => onReadMore?.(post)}
            id={`blog-read-more-${post.id}`}
            type="button"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group/btn"
          >
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
};
