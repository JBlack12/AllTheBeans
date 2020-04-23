import { AxiosBase } from "./AxiosBase";

export class GetBotdApiFunctions extends AxiosBase {
  async GetBotdInfo(url) {
    const result = this.GetRequest(url);
    return result;
  }
}
