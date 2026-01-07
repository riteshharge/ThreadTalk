import { IsNotEmpty, IsString, IsOptional, IsMongoId } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsMongoId()
    postId: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsMongoId()
    parentCommentId?: string | null;
}
