import { JanusClient } from "@vtex/api";

export class InfoClient extends JanusClient {
  public async getInfo(sku: any): Promise<any> {
    const info = await this.http.get(
      `/api/catalog/pvt/stockkeepingunit/${sku}`,
      {
        headers: {
          VtexIdclientAutCookie: this.context.authToken,
        },
      }
    );

    return info;
  }
}
