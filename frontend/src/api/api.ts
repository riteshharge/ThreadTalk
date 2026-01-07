import type { Post, Comment, CreatePostData, CreateCommentData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Posts API
export const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return response.json();
};

export const fetchPost = async (id: string): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch post');
    }
    return response.json();
};

export const createPost = async (data: CreatePostData): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to create post');
    }
    return response.json();
};

// Comments API
export const fetchComments = async (postId: string): Promise<Comment[]> => {
    const response = await fetch(`${API_BASE_URL}/comments/post/${postId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch comments');
    }
    return response.json();
};

export const createComment = async (data: CreateCommentData): Promise<Comment> => {
    const response = await fetch(`${API_BASE_URL}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to create comment');
    }
    return response.json();
};
