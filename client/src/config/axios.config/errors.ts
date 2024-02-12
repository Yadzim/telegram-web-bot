import { message } from "antd";
import { AxiosError } from "axios";

export class ResponseError {
  error!: AxiosError;

  constructor(error: AxiosError) {
    this.error = error;
    this.errors(error.response?.status);
  }

  private errors(status: number | undefined) {
    switch (status) {
      case 400:
        this[400]();
        break;
      case 401:
        this[401]();
        break;
      case 403:
        this[403]();
        break;
      case 404:
        this[404]();
        break;
      case 422:
        this[422]();
        break;
      case 500:
        this[500]();
        break;
      default:
        this.withoutStatusError();
    }
  }

  private 400(): void {
    if (
      JSON.parse(this.error?.request?.response)?.hasOwnProperty("detail") &&
      typeof JSON.parse(this.error?.request?.response)?.detail === "string"
    ) {
      // message.error(JSON.parse(this.error?.request?.response)?.detail);
    }
  }

  private 401(): void {
    message.error("Login  yoki parol xato!");
    localStorage.removeItem("access_token");
    // redirect("/signin");
  }

  private 403(): void {
    // createBrowserHistory().push('/signin')
  }

  private 404(): void {}
  private 422(): void {}
  private 500(): void {
    message.error("Internal server error!");
  }

  private withoutStatusError() {}
}
