import { Application, Router } from "https://deno.land/x/oak/mod.ts"

import {
  viewEngine,
  ejsEngine,
  oakAdapter,
} from "https://deno.land/x/view_engine@v10.5.1/mod.ts"

const router = new Router()

const app = new Application()

app.use(
  viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./views",
  })
)

const obj = {}

router
    .post("/", async (ctx) => {

        const body = ctx.request.body({ type: "form" })

        const value = body.value

        const qty = (await value).get("numero")

        for (let i = 0; i < qty; i++) {
            let num = Math.floor(Math.random() * 99)
            !obj[num] ? obj[num] = 1 : obj[num]++
        }

        ctx.response.redirect("/")

    })
    .get("/", (ctx) => {
        ctx.render("random.ejs", { obj })
    })

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 8000 })