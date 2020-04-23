import { AxiosBase } from "./AxiosBase";

export class PostBeanFunctions extends AxiosBase {
  async StoreImageRequest(file) {
    const result = await this.PostRequest(
      "http://localhost:3000/inventory/uploadimage",
      file
    );
    return result;
  }

  async AddNewBean(content) {
    const result = await this.PostRequest(
      "http://localhost:3000/inventory",
      content
    );
    return result;
  }
}
