import { IOClients } from '@vtex/api'
import { InfoClient } from './infoclient'

export class Clients extends IOClients {
  public get infoclient() {
    return this.getOrSet('infoclient', InfoClient)
  }
}
