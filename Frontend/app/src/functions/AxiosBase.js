import axios from "axios";

export class AxiosBase {
  handleResponse(response) {
    if (response.data.StatusCode === 200) {
      return {
        isSuccess: true,
        body: response.data.Body,
      };
    } else {
      return {
        isSuccess: false,
        body: response.data.Body,
      };
    }
  }

  async GetRequest(endpoint) {
    return await axios
      .get(endpoint)
      .then((response) => {
        return this.handleResponse(response);
      })
      .catch((error) => {
        return {
          isSuccess: false,
          error: error,
        };
      });
  }

  async PostRequest(endpoint, bodyContent) {
    return await axios
      .post(endpoint, bodyContent)
      .then((response) => {
        return this.handleResponse(response);
      })
      .catch((error) => {
        return {
          isSuccess: false,
          error: error,
        };
      });
  }
}
