import { useState, useEffect } from 'react';
import type { Post } from '../types';
import { fetchPosts } from '../api/api';
import PostCard from '../components/PostCard';

const HomePage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            setIsLoading(true);
            const data = await fetchPosts();
            setPosts(data);
            setError(null);
        } catch (err) {
            setError('Failed to load posts. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 
                     bg-clip-text text-transparent mb-4">
                    Discussion Threads
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Join the conversation. Share your thoughts, ideas, and engage with our community.
                </p>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-400">Loading posts...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button onClick={loadPosts} className="btn-secondary">
                        Try Again
                    </button>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && posts.length === 0 && (
                <div className="card p-12 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-700/50 
                        flex items-center justify-center">
                        <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">No Posts Yet</h2>
                    <p className="text-slate-400 mb-6">Be the first to start a conversation!</p>
                </div>
            )}

            {/* Posts List */}
            {!isLoading && !error && posts.length > 0 && (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
