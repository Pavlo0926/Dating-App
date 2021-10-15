import { API } from "@helpers";
import { API_ENDPOINTS } from "@config";

export function streamUpdate(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_UPDATE}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function streamStart(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_START}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function streamStop(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_STOP}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function streamUserType(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_USER_TYPE}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function streamJoin(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_JOIN}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function streamLeave(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_LEAVE}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function streamAskJoin(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_ASK_JOIN}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function streamAcceptJoin(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_ACCEPT_JOIN}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function streamRefusedJoin(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_REFUSED_JOIN}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function streamDisconnectBroad(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_DISCONNECT_BROAD}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function userAskJoin(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_USER_ASK_JOIN}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function userAcceptJoin(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_USER_ACCEPT_JOIN}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function userRefusedJoin(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_USER_REFUSED_JOIN}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function userCancelAsk(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_USER_CANCEL_ASK}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function streamBanUser(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_BAN_USER}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function streamKickUser(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_KICK_USER}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function streamBanList(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_BAN_LIST}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function streamList(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_LIST}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function streamUserList(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_USER_LIST}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function streamChatAddMsg(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_CHAT_ADD_MSG}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function getLiveSettings(accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.GET_LIVE_SETTINGS}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    silent: true,
  }).then(response => response);
}

export function setLiveSettings(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.SET_LIVE_SETTINGS}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}