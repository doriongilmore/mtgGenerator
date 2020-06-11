import axios from "axios";
import shajs from "sha.js";

function getEndpoint() {
  const isLocal = window.location.origin.includes('localhost')
      || window.location.origin.includes('file://');
  let endpoint = isLocal ? CONFIG.api.endpoint : window.location.origin + window.location.pathname;
  if (endpoint.endsWith('/')) {
    endpoint = endpoint.substr(0,endpoint.length - 1);
  }
  return endpoint;
}

class SecureHttp {
  constructor(token) {
    this.token = token;
    this.instance = axios.create({
      baseURL: getEndpoint(),
      timeout: CONFIG.api.timeout,
      headers: {
        common: { "X-AUTH-TOKEN": token, ...CONFIG.api.defaultHeaders.common }
      }
    });
  }

  get token() {
    return this._token;
  }
  set token(t) {
    this._token = t;
  }

  apiGet(url) {
    return this.instance.get(url).then(res => res.data);
  }

  apiPost(url, data) {
    return this.instance.post(url, data).then(res => res.data);
  }

  apiDelete(url) {
    return this.instance.delete(url).then(res => res.data);
  }
}

class Http {
  constructor() {
    this.endpoint = getEndpoint();
    this.secureInstance = null;
  }

  /**
   *
   * @param email:string
   * @param password:string
   * @returns {Promise<{"id": number,"email": string,"username": string,"roles": string[],"gravatar": string}>}
   */
  login(email, password) {
    password = shajs("sha256")
      .update(password)
      .digest("hex");

    return axios
      .post(`${this.endpoint}/login`,{email, password})
      .then(res => {
        this.secureInstance = new SecureHttp(res.data.apiToken);
        return res.data;
      });
  }

  /**
   *
   * @param email
   * @returns {Promise<AxiosResponse<string>>}
   */
  resetPassword(email) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  loginWithToken(apiToken) {
    return axios
        .post(`${this.endpoint}/loginByToken`,null, {
          headers: {
            common: {"X-AUTH-TOKEN": apiToken}
          }
        })
        .then(res => {
          this.secureInstance = new SecureHttp(res.data.apiToken);
          return res.data;
        });
  }

  GET(url) {
    if (!this.secureInstance) throw new Error("Need to register first");
    return this.secureInstance.apiGet(url);
  }

  POST(url, data) {
    if (!this.secureInstance) throw new Error("Need to register first");
    return this.secureInstance.apiPost(url, data);
  }

  DELETE(url) {
    if (!this.secureInstance) throw new Error("Need to register first");
    return this.secureInstance.apiDelete(url);
  }
}

export default new Http();
