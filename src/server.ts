import * as _ from 'lodash'
import Koa from 'koa'
import Routers from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import search from './services/search'
import download from './download'

const router = new Routers()

/**
 * get music data
 *
 * @param {String} 
 */
router.post('/musicn/list', async (ctx: any) => {
  const body: string = ctx.request.body;
  const { searchSongs, totalSongCount } = await search['migu']({
    text: body.searchKey,
    pageNum: 1,
    pageSize: 20,
    songListId: undefined,
  })
  ctx.body = { code: 0, msg: '成功', data: { searchSongs, totalSongCount }}
})

/**
 * download music
 *
 * @param {String} 
 */
router.post('/musicn/download', async (ctx: any) => {
  const body: any = ctx.request.body;
  try {
    await download(body)
    ctx.body = { code: 0, msg: '成功', data: []}
  } catch (e) {
  console.log("logger-[e]", e);
    ctx.body = { code: 0, msg: '失败', data: e}
  }
})

router.post('/musicn/download-one', async (ctx: any) => {
  const body: any = ctx.request.body;
  try {
    await download([body])
    ctx.body = { code: 0, msg: '成功', data: []}
  } catch (e) {
  console.log("logger-[e]", e);
    ctx.body = { code: 0, msg: '失败', data: e}
  }
})
/**
 * server
 *
 * @param {String}
 */
const app = new Koa()
const PORT = 3000

app.use(bodyParser())
app.use(cors())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`)
})

export { app }
