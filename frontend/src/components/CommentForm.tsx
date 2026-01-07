import { useState } from 'react';

interface CommentFormProps {
    onSubmit: (content: string) => Promise<void>;
    replyingTo?: string | null;
    onCancelReply?: () => void;
    placeholder?: string;
}

const CommentForm = ({
    onSubmit,
    replyingTo,
    onCancelReply,
    placeholder = "Share your thoughts..."
}: CommentFormProps) => {
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await onSubmit(content);
            setContent('');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {replyingTo && (
                <div className="flex items-center gap-2 text-sm bg-purple-500/10 border border-purple-500/20 
                      rounded-lg px-4 py-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    <span className="text-purple-300">
                        Replying to: <span className="text-purple-400 font-medium">"{replyingTo.slice(0, 50)}..."</span>
                    </span>
                    <button
                        type="button"
                        onClick={onCancelReply}
                        className="ml-auto text-slate-400 hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            <div className="relative">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={placeholder}
                    rows={3}
                    className="textarea-field pr-24"
                />
                <button
                    type="submit"
                    disabled={!content.trim() || isSubmitting}
                    className="absolute right-3 bottom-3 btn-primary py-2 px-4 text-sm 
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Posting...
                        </span>
                    ) : (
                        replyingTo ? 'Reply' : 'Comment'
                    )}
                </button>
            </div>
        </form>
    );
};

export default CommentForm;
