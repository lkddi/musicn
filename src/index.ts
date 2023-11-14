import { red } from 'colorette'
import command from './command'
import choose from './choose'
import searchMusic from './searchMusic'
import download from './download'
import qrcodeGenerator from './qrcode'
import { type SongInfo } from './types'

const cli = async () => {
  const {
    options: { qrcode, port, open },
  } = command
  if (qrcode) {
    return await qrcodeGenerator({ port, open })
  }
  const result = await searchMusic(<SongInfo>command)
  const { songs = [] } = await choose(<SongInfo>result)
  if (!songs.length) {
    console.error(red('请选择歌曲'))
    process.exit(1)
  }
  console.log("logger-[songs]", songs);
  await download(songs)
}

export default cli
