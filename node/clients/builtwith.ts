import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class BuiltWith extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://dev.api.searchmindai.com', context, options)
  }


  public getBuiltWith() {
    return this.http.post("/v2/search", {
      chatConfigId: 29,
      query: "faca pequena",
      limit: 10,
      offset: 0,
      documentType: "product",
    }, {
      headers: {
        'API-KEY': 'vtexTramontinaTest_GgwcBaIErD',
      }
    })
  }
}
