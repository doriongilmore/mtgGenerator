import API from "src/http";

export class APIUsers {

  static getUsersList() {
    return API.GET("users");
  }
}
