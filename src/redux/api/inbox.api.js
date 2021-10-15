import { API } from "@helpers";
import { API_ENDPOINTS } from "@config";

export function getChat(accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.GET_CHAT}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
  }).then(response => response);
}

export function getChatList(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.GET_CHAT_MSG}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function getFriends(accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.GET_FRIENDS}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
  }).then(response => response);
}

export function acceptFriend(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.ACCEPT_FRIEND_REQUEST}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function rejectFriend(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.REJECT_FRIEND_REQUEST}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function addFriendByUsername(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.ADD_FRIEND_USERNAME}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function getPendingRequests(accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.GET_FRIEND_REQUESTS}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
  }).then(response => response);
}

export function readFlag(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.READ_FLAG}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}
