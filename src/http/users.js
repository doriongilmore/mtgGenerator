import shajs from "sha.js";
import API from "src/http";

export class APIUsers {
  /**
   *  @typedef User
   *  @property {string} id
   *  @property {string} email
   *  @property {string} username
   *  @property {array<string>} roles
   *  @property {string} gravatar
   *  @property {string} apiToken
   */

  /**
   *
   * @param userData
   * {
   *   "email": string,
   *   "password": string,
   *   "username": string,
   *   "roles": string[]
   * }
   * @returns {Promise<User>}
   */
  static createUser(userData) {
    if(!userData.password) userData.password = "password";

    userData.password = shajs("sha256")
      .update(userData.password)
      .digest("hex");
    return API.POST("users", userData);
  }

  /**
   *
   * @param userId
   * @param userData
   * {
   *   "email": string,
   *   "password": string,
   *   "username": string,
   *   "roles": string[]
   * }
   * @returns {Promise<User>}
   */
  static editUser(userId, userData) {
    if (userData.password) {
      userData.password = shajs("sha256")
        .update(userData.password)
        .digest("hex");
    }
    return API.POST("users/" + userId, userData);
  }

  /**
   *
   * @param userId
   * @returns {Promise<User>}
   */
  static getUserData(userId) {
    return API.GET("users/" + userId);
  }

  /**
   *
   * @param userId
   * @returns {Promise<void>}
   */
  static deleteUser(userId) {
    return API.DELETE("users/" + userId);
  }

  static checkMail(email) {
    return API.POST("checkEmail", {email});
  }

  static getUsersList() {
    return API.GET("users");
  }
}
