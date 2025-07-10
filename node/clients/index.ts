import { IOClients } from "@vtex/api";
import BuiltWith from "./builtwith";
export class Clients extends IOClients {
  public get builtwith() {
    return this.getOrSet("builtwith", BuiltWith);
  }
}
