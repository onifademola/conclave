import axios from "axios";

const devUrl = "https://localhost:44315/api/v1";
const prodUrl = "https://abimealy.azurewebsites.net/api/v1";

const baseUri = prodUrl;

const apiCall = async (token, method, uri, data = null) => {
  return axios({
    method,
    url: `${baseUri}/${uri}`,
    data,
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  })
    .then((res) => res)
    .catch((err) => err);
}

export const HttpGet = async (token = "", uri) => apiCall(token, "get", uri, null);

export const HttpPost = async (token, uri, data) => apiCall(token, "post", uri, data);

export const HttpPut = async (token, uri, data) => apiCall(token, "put", uri, data);

export const HttpPatch = async (token, uri, data) =>
  apiCall(token, "patch", uri, data);

export const HttpDelete = async (token, uri) => apiCall(token, "delete", uri, null);
