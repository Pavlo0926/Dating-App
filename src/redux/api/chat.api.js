import { API } from "@helpers";
import { API_ENDPOINTS } from "@config";

export function getCurrentChat(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.GET_CURRENT_CHAT}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function getChatUser(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.GET_CHAT_USER}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function sendMsg(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.SEND_MSG}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function readMsg(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.READ_MSG}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function openedChat(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.OPEN_CHAT}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function closeChat(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.CLOSE_CHAT}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}
