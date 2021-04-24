import { Options } from "koa2-cors";

export interface IConfig {
  port: number;
  db: string;
  cors: Options;
}
