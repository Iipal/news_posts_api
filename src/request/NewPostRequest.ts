import { IsString, Length } from "class-validator";
import * as Config from "../config";

export interface NewPostRequestProps {
  title: string;
  description: string;
}

export class NewPostRequest {
  @IsString()
  @Length(Config.POST_MIN_TEXT_LENGTH, Config.POST_MAX_TITLE_LENGTH)
  title!: string;

  @IsString()
  @Length(Config.POST_MIN_TEXT_LENGTH, Config.POST_MAX_DESCRIPTION_LENGTH)
  description!: string;

  constructor({ title, description }: NewPostRequestProps) {
    this.title = title;
    this.description = description;
  }

  getProps(): NewPostRequestProps {
    return { title: this.title, description: this.description };
  }
}
