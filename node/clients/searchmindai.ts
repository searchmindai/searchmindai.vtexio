import type { InstanceOptions, IOContext } from "@vtex/api";
import { ExternalClient } from "@vtex/api";

export default class SearchMindAI extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super("https://dev.api.searchmindai.com", context, options);
  }

  public getSearchMind({ body, config }: { body: SearchRequest; config?: any }) {
    return this.http.post("/v2/search", body, {
      headers: { "API-KEY": config?.appKey || "" },
    });
  }
}
