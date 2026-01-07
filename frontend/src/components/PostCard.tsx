import { Link } from 'react-router-dom';
import type { Post } from '../types';

interface PostCardProps {
    post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <Link to={`/post/${post._id}`} className="block group">
            <article className="card p-6 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        {/* Title */}
                        <h2 className="text-xl font-semibold text-white group-hover:text-purple-400 
                         transition-colors duration-200 line-clamp-2 mb-2">
                            {post.title}
                        </h2>

                        {/* Content Preview */}
                        <p className="text-slate-400 line-clamp-2 mb-4">
                            {post.content}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {formatDate(post.createdAt)}
                            </span>
                        </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700/50 
                        flex items-center justify-center group-hover:bg-purple-600/20 
                        group-hover:text-purple-400 transition-all duration-200">
                        <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default PostCard;
