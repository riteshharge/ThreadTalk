import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Post, Comment as CommentType } from '../types';
import { fetchPost, fetchComments, createComment } from '../api/api';
import CommentComponent from '../components/Comment';
import CommentForm from '../components/CommentForm';

const PostDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [replyingTo, setReplyingTo] = useState<{ id: string; content: string } | null>(null);

    useEffect(() => {
        if (id) {
            loadData();
        }
    }, [id]);

    const loadData = async () => {
        if (!id) return;

        try {
            setIsLoading(true);
            const [postData, commentsData] = await Promise.all([
                fetchPost(id),
                fetchComments(id),
            ]);
            setPost(postData);
            setComments(commentsData);
            setError(null);
        } catch (err) {
            setError('Failed to load post. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddComment = async (content: string) => {
        if (!id) return;

        await createComment({
            postId: id,
            content,
            parentCommentId: replyingTo?.id || null,
        });

        setReplyingTo(null);
        // Reload comments to get the updated tree
        const updatedComments = await fetchComments(id);
        setComments(updatedComments);
    };

    const handleReply = (commentId: string, commentContent: string) => {
        setReplyingTo({ id: commentId, content: commentContent });
        // Scroll to comment form
        document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-400">Loading post...</p>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20">
                <div className="card p-12 text-center">
                    <p className="text-red-400 mb-4">{error || 'Post not found'}</p>
                    <button onClick={() => navigate('/')} className="btn-secondary">
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="btn-ghost mb-6 flex items-center gap-2 text-slate-400"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Posts
            </button>

            {/* Post Content */}
            <article className="card p-8 mb-8">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-4 text-slate-400 text-sm">
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {formatDate(post.createdAt)}
                        </span>
                    </div>
                </header>

                <div className="prose prose-invert max-w-none">
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap text-lg">
                        {post.content}
                    </p>
                </div>
            </article>

            {/* Comments Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Comments ({comments.length})
                    </h2>
                </div>

                {/* Comment Form */}
                <div id="comment-form" className="card p-6">
                    <CommentForm
                        onSubmit={handleAddComment}
                        replyingTo={replyingTo?.content}
                        onCancelReply={() => setReplyingTo(null)}
                        placeholder={replyingTo ? "Write your reply..." : "Share your thoughts..."}
                    />
                </div>

                {/* Comments List */}
                {comments.length === 0 ? (
                    <div className="card p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 
                          flex items-center justify-center">
                            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">No comments yet</h3>
                        <p className="text-slate-400">Be the first to share your thoughts!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <CommentComponent
                                key={comment._id}
                                comment={comment}
                                onReply={handleReply}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default PostDetailPage;
