import { AxiosBase } from "./AxiosBase";

export class LoginApiFunctions extends AxiosBase {
  async login(content) {
    const result = await this.PostRequest("http://localhost:3000/user", content);
    return result;
  }
}
