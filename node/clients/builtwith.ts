import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class BuiltWith extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://eshopper-global-app.vercel.app', context, options)
  }

  public getBuiltWith(url: string) {
    return this.http.get(`/api/cliente?url=${url}`)
  }
}
