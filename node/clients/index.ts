import { IOClients } from '@vtex/api'
import SearchMindAi from './searchmindai'
export class Clients extends IOClients {
  public get searchmindai() {
    return this.getOrSet('searchmindai', SearchMindAi)
  }
}
