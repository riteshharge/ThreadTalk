import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CommentsService, NestedComment } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './schemas/comment.schema';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Post()
    async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
        return this.commentsService.create(createCommentDto);
    }

    @Get('post/:postId')
    async findByPostId(
        @Param('postId') postId: string,
    ): Promise<NestedComment[]> {
        return this.commentsService.findByPostId(postId);
    }
}
