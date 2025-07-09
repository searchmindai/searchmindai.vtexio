import { IOClients } from '@vtex/api'

import BuiltWith from './builtwith'
import { InfoClient } from './infoclient'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get builtwith() {
    return this.getOrSet('builtwith', BuiltWith)
  }

  public get infoclient() {
    return this.getOrSet('infoclient', InfoClient)
  }
}
