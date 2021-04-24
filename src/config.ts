import * as Interfaces from "./types/interfaces";

export const ROUTE_GET_PING = "/ping";

export const ROUTE_GET_POSTS = "/posts";
export const ROUTE_GET_POSTS_BY_ID = `${ROUTE_GET_POSTS}/:id`;
export const ROUTE_POST_POSTS = ROUTE_GET_POSTS;
export const ROUTE_PUT_POSTS = `${ROUTE_GET_POSTS}/:id`;
export const ROUTE_DEL_POSTS = `${ROUTE_GET_POSTS}/:id`;

export const POST_MIN_TEXT_LENGTH = 10;

export const POST_MAX_TITLE_LENGTH = 64;
export const POST_MAX_DESCRIPTION_LENGTH = 1024;

export const POST_COMMENT_MAX_AUTHOR_LENGTH = 64;
export const POST_COMMENT_MAX_TEXT_LENGTH = 1024;

const config: Interfaces.IConfig = {
  port: parseInt(process.env.PORT ?? "3005"),
  db: "",
  cors: { origin: "*" },
};

export default config;
