import axios from "axios";
import { ApiRoutes } from "./api-routes";
import { fetchLoggedInUser } from "./storage";

const devUrl = "https://localhost:44315/api/v1";
const prodUrl = "https://abimealy.azurewebsites.net/api/v1";

const baseUri = prodUrl;

const apiCall = async (method, uri, data = null) => {
  const read_user = uri !== ApiRoutes.login ? await fetchLoggedInUser() : "";
  return axios({
    method,
    url: `${baseUri}/${uri}`,
    data,
    headers: {
      "Content-Type": "application/json",
      // Accept: "application/json",
      "x-auth-token": uri !== ApiRoutes.login ? read_user.Token : "",
    },
  })
    .then((res) => res)
    .catch((err) => err);
}

export const HttpGet = async (uri) => apiCall("get", uri, null);

export const HttpPost = async (uri, data) => apiCall("post", uri, data);

export const HttpPut = async (uri, data) => apiCall("put", uri, data);

export const HttpPatch = async (uri, data) => apiCall("patch", uri, data);

export const HttpDelete = async (uri) => apiCall("delete", uri, null);
