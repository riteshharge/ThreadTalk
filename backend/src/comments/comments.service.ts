import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

export interface NestedComment {
    _id: string;
    postId: string;
    content: string;
    parentCommentId: string | null;
    createdAt: Date;
    replies: NestedComment[];
}

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    ) { }

    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        const createdComment = new this.commentModel({
            postId: new Types.ObjectId(createCommentDto.postId),
            content: createCommentDto.content,
            parentCommentId: createCommentDto.parentCommentId
                ? new Types.ObjectId(createCommentDto.parentCommentId)
                : null,
        });
        return createdComment.save();
    }

    async findByPostId(postId: string): Promise<NestedComment[]> {
        // Fetch all comments for the post
        const comments = await this.commentModel
            .find({ postId: new Types.ObjectId(postId) } as any)
            .sort({ createdAt: 1 })
            .lean()
            .exec();

        // Build nested tree structure
        return this.buildCommentTree(comments as any[]);
    }

    private buildCommentTree(comments: any[]): NestedComment[] {
        const commentMap = new Map<string, NestedComment>();
        const rootComments: NestedComment[] = [];

        // First pass: create map of all comments with empty replies array
        comments.forEach((comment) => {
            commentMap.set(comment._id.toString(), {
                _id: comment._id.toString(),
                postId: comment.postId.toString(),
                content: comment.content,
                parentCommentId: comment.parentCommentId
                    ? comment.parentCommentId.toString()
                    : null,
                createdAt: comment.createdAt,
                replies: [],
            });
        });

        // Second pass: build tree structure
        commentMap.forEach((comment) => {
            if (comment.parentCommentId) {
                const parent = commentMap.get(comment.parentCommentId);
                if (parent) {
                    parent.replies.push(comment);
                }
            } else {
                rootComments.push(comment);
            }
        });

        return rootComments;
    }
}
