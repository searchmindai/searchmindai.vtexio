import type { ServiceContext } from '@vtex/api'

declare global {
  type Context = ServiceContext<Clients>

  type SearchRequest = {
    chatConfigId: number
    query: string
    limit: number
    offset: number
    documentType: 'product' | string
    returnFields?: string[]
  }
}
