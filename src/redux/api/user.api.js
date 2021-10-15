import { API } from "@helpers";
import { API_ENDPOINTS } from "@config";

export function login(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.LOGIN}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

export function getProfile(accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.PROFILE}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
  }).then(response => response);
}

export function checkPhone(data) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.CHECK_PHONE}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

export function phoneLoginSendCode(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.LOGIN_PHONE_SEND_CODE}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

export function phoneLoginConfirmCode(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.LOGIN_PHONE_VERIFY_CODE}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

export function checkUsername(data) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.CHECK_USERNAME}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

export function register(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.REGISTER}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

export function phoneVerificationSendCode(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.VERIFY_PHONE_SEND_CODE}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

export function phoneVerificationConfirmCode(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.VERIFY_PHONE_CONFIRM_CODE}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

export function forgotPasswordSendCode(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.FORGOT_PASSWORD_SEND_CODE}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

export function forgotPasswordConfirmCode(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.FORGOT_PASSWORD_CONFIRM_CODE}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

export function resetPassword(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.RESET_PASSWORD}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

export function changePassword(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.UPDATE_PASSWORD}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function updateUser(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.UPDATE_USER}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function deleteImage(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.DELETE_IMAGE}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function reorderImages(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.REORDER_IMAGES}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function deleteAccount(accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.DELETE_ACCOUNT}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
  }).then(response => response);
}

export function getLikedUsers(accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.GET_LIKED_USERS}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
  }).then(response => response);
}

export function updatePhoneSend(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.UPDATE_PHONE_SEND}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function updatePhoneConfirm(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.UPDATE_PHONE_CONFIRM}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function report(data, accessToken, type) {
  return API.request({
    method: "post",
    url: type === "user" ? `${API_ENDPOINTS.USER_REPORT}` : `${API_ENDPOINTS.STREAM_REPORT}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function requestHelp(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.HELP_REQUEST}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function userBlock(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.USER_BLOCK}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function userUnblock(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.USER_UNBLOCK}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function getBlockedUsers(accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.GET_BLOCKED_UESRS}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    silent: true,
  }).then(response => response);
}

export function userOnline(data, accessToken, type) {
  return API.request({
    method: "post",
    url: type === "online" ? `${API_ENDPOINTS.USER_ONLINE}` : `${API_ENDPOINTS.USER_OFFLINE}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}
