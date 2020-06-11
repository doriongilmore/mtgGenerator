import axios from "axios";

class Http {
  constructor() {
    this.instance = axios.create({
      timeout: CONFIG.api.timeout,
      headers: {
        common: { ...CONFIG.api.defaultHeaders.common }
      }
    });
  }

  GET(url) {
    if (!this.instance) throw new Error("Need to register first");
    return this.instance.get(url);
  }

  POST(url, data) {
    if (!this.instance) throw new Error("Need to register first");
    return this.instance.post(url, data);
  }
}

export default new Http();
