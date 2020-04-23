import { AxiosBase } from "./AxiosBase";

export class GetBotdApiFunctions extends AxiosBase {
    async GetBotdInfo() {
    const result = this.GetRequest("http://localhost:3000/inventory");
    return result;
  }
}
