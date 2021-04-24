import { IsString, Length } from "class-validator";
import * as Config from "../config";

export interface NewPostCommentRequestProps {
  author: string;
  text: string;
}

export class NewPostCommentRequest {
  @IsString()
  @Length(Config.POST_MIN_TEXT_LENGTH, Config.POST_COMMENT_MAX_AUTHOR_LENGTH)
  author!: string;

  @IsString()
  @Length(Config.POST_MIN_TEXT_LENGTH, Config.POST_COMMENT_MAX_TEXT_LENGTH)
  text!: string;

  constructor(props: NewPostCommentRequestProps) {
    this.author = props.author;
    this.text = props.text;
  }
}
