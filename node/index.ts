import type { ClientsConfig } from "@vtex/api";
import { LRUCache, method, Service } from "@vtex/api";

import { Clients } from "./clients";
import { builtwithMiddleware } from "./middlewares/builtwith";

const TIMEOUT_MS = 800;
const memoryCache = new LRUCache<string, never>({ max: 5000 });

metrics.trackCache("status", memoryCache);

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: { retries: 2, timeout: TIMEOUT_MS },
    status: { memoryCache },
  },
};

export default new Service({
  clients,
  routes: {
    builtwith: method({
      POST: builtwithMiddleware,
    }),
  },
});
