import { IOClients } from '@vtex/api'

import BuiltWith from './builtwith'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get builtwith() {
    return this.getOrSet('builtwith', BuiltWith)
  }
}
