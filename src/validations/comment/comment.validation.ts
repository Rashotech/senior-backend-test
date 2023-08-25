import { IsNotEmpty } from 'class-validator';

export class CommentValidation {
  @IsNotEmpty()
  content: string;
}
