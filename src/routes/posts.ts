import { validate } from "class-validator";
import KoaRouter from "koa-router";

import * as Config from "../config";
import { NewPostRequest } from "../request/NewPostRequest";
import Post from "../../models/Post";

const router = new KoaRouter();

router.get([Config.ROUTE_GET_POSTS, Config.ROUTE_GET_POSTS_BY_ID], async (ctx) => {
  const id = ctx.params.id;
  let posts = [];

  if (typeof id === "string") {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      ctx.body = {
        status: "error",
        data: `No post with _id: ${id}`,
      };
      return ctx;
    } else {
      posts = await Post.find({ _id: id });
    }
  } else {
    posts = await Post.find({});
  }

  ctx.body = [...posts];
});

router.post(Config.ROUTE_POST_POSTS, async (ctx) => {
  const validatorOptions = {};
  const npr = new NewPostRequest({ ...ctx.request.body });
  const errors = await validate(npr, validatorOptions);

  if (errors?.length) {
    ctx.status = 400;
    ctx.body = {
      status: "error",
      data: errors,
    };
  }

  try {
    const post = new Post({ ...npr.getProps() });
    await post.save();

    ctx.body = {
      status: "success",
      data: post,
    };
  } catch (e) {
    console.log(e);
    ctx.body = {
      status: "error",
      data: e,
    };
  }
});

router.put(Config.ROUTE_PUT_POSTS, async (ctx) => {
  const id: string = ctx.params.id;
  const validatorOptions = {};
  const npr = new NewPostRequest({ ...ctx.request.body });
  const errors = await validate(npr, validatorOptions);

  if (errors.length) {
    ctx.body = {
      status: "error",
      data: errors,
    };
  } else if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    ctx.body = {
      status: "error",
      data: `No post with _id: ${id}`,
    };
  } else {
    await Post.updateOne({ _id: id }, { ...npr.getProps() });
    ctx.body = { status: "success" };
  }
});

router.del(Config.ROUTE_DEL_POSTS, async (ctx) => {
  const id: string = ctx.params.id;

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    await Post.deleteOne({ _id: id });
    ctx.body = { status: "success" };
  } else {
    ctx.body = {
      status: "error",
      data: `No post with _id: ${id}`,
    };
  }
});

export default router;
