import KoaRouter from "koa-router";
import * as Config from "../config";

const router = new KoaRouter();

router.get(Config.ROUTE_GET_PING, async (ctx) => {
  try {
    ctx.body = {
      status: "success",
      data: "pong",
    };
  } catch (e) {
    console.error(e);
  }
});

export default router;
