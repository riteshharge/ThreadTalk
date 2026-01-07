export interface Post {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
}

export interface Comment {
    _id: string;
    postId: string;
    content: string;
    parentCommentId: string | null;
    createdAt: string;
    replies: Comment[];
}

export interface CreatePostData {
    title: string;
    content: string;
}

export interface CreateCommentData {
    postId: string;
    content: string;
    parentCommentId?: string | null;
}
