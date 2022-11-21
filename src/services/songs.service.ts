import { PayloadService } from './payload.service'
import type { SongRequest, SongResponse } from '../interfaces/song.interface'

export class SongsService extends PayloadService {
  constructor() {
    super()
  }

  public detailsById = async (ids: string): Promise<SongResponse[]> => {
    // api v4 does not contain media_preview_url
    const response = await this.http<{ songs: SongRequest[] }>(this.endpoints.songs.id, false, {
      pids: ids,
    })

    const songResults = response.songs.map((song) => this.songPayload(song))

    return songResults
  }

  public detailsByLink = async (link: string): Promise<SongResponse[]> => {
    let token = ''
    if (link.includes(`jiosaavn.com/song/`)) {
      token = link.split(`song/`)[1].split('/')[1].slice(0, 11)
    }

    // api v4 does not contain media_preview_url
    const response = await this.http<{ songs: SongRequest[] }>(this.endpoints.songs.link, false, {
      token,
      type: 'song',
    })

    const songResults = response.songs.map((song) => this.songPayload(song))

    return songResults
  }
}
