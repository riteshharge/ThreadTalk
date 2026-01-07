import type { Comment as CommentType } from '../types';

interface CommentProps {
    comment: CommentType;
    onReply: (commentId: string, commentContent: string) => void;
    level?: number;
}

const Comment = ({ comment, onReply, level = 0 }: CommentProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    // Different colors for different nesting levels
    const borderColors = [
        'border-purple-500',
        'border-indigo-500',
        'border-blue-500',
        'border-cyan-500',
        'border-teal-500',
    ];

    const borderColor = borderColors[level % borderColors.length];

    return (
        <div className={`${level > 0 ? 'ml-6 mt-4' : ''}`}>
            <div className={`relative pl-4 border-l-2 ${borderColor} transition-all duration-200`}>
                {/* Comment Header */}
                <div className="flex items-center gap-2 mb-2">
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 
                        flex items-center justify-center text-white text-sm font-semibold">
                        {level === 0 ? 'U' : 'R'}
                    </div>
                    <span className="text-slate-400 text-sm">
                        Anonymous User
                    </span>
                    <span className="text-slate-500 text-xs">•</span>
                    <span className="text-slate-500 text-sm">
                        {formatDate(comment.createdAt)}
                    </span>
                </div>

                {/* Comment Content */}
                <div className="bg-slate-800/30 rounded-lg p-4 mb-2">
                    <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {comment.content}
                    </p>
                </div>

                {/* Comment Actions */}
                <div className="flex items-center gap-4 mb-4">
                    <button
                        onClick={() => onReply(comment._id, comment.content)}
                        className="btn-ghost text-sm flex items-center gap-1.5 text-slate-400 
                     hover:text-purple-400"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                        Reply
                    </button>
                </div>

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="space-y-2">
                        {comment.replies.map((reply) => (
                            <Comment
                                key={reply._id}
                                comment={reply}
                                onReply={onReply}
                                level={level + 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;
