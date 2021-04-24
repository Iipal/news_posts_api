import Koa from "koa";
import KoaLogger from "koa-logger";
import KoaBodyparser from "koa-bodyparser";
import KoaCors from "koa2-cors";
import KoaJson from "koa-json";
import mongoose from "mongoose";

import config from "./config";
import pingRoutes from "./routes/ping";
import postsRoutes from "./routes/posts";

const PORT = config.port;

const app = new Koa();

app.use(KoaLogger());
app.use(KoaJson());
app.use(KoaBodyparser());
app.use(KoaCors({ ...config.cors }));

app.use(pingRoutes.routes());
app.use(postsRoutes.routes());

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://<username>:<password>@cluster0.mcfwl.mongodb.net/posts",
      {
        useNewUrlParser: true,
        useFindAndModify: false,
      }
    );

    app
      .listen(PORT, async () => {
        console.log("Server listening on PORT:", PORT);
      })
      .on("error", (err) => {
        console.error(err);
      });
  } catch (e) {
    console.log(e);
  }
}

start();
