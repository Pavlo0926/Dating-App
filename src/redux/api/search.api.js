import { API } from "@helpers";
import { API_ENDPOINTS } from "@config";

export function search(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.SEARCH}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}
