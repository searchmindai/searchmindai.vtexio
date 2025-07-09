import { JanusClient } from '@vtex/api'

export class InfoClient extends JanusClient {
  public async getInfo() {
    const info = await this.http.get('/api/vlm/account', {
      headers: {
        VtexIdclientAutCookie: this.context.authToken,
      },
    })

    return info
  }
}
