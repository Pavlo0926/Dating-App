const BASE_URL = "https://api.pluzo.com";

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/login`,
  LOGIN_PHONE_SEND_CODE: `${BASE_URL}/login-sms-send`,
  LOGIN_PHONE_VERIFY_CODE: `${BASE_URL}/login-sms-code`,

  REGISTER: `${BASE_URL}/signup`,

  CHECK_USERNAME: `${BASE_URL}/check-username`,
  REORDER_IMAGES: `${BASE_URL}/sort-image`,
  PROFILE: `${BASE_URL}/profile`,
  USER_ONLINE: `${BASE_URL}/user-online`,
  USER_OFFLINE: `${BASE_URL}/user-offline`,

  CHECK_PHONE: `${BASE_URL}/check-number`,

  VERIFY_PHONE_SEND_CODE: `${BASE_URL}/verify-sms-send`,
  VERIFY_PHONE_CONFIRM_CODE: `${BASE_URL}/verify-sms-code`,

  FORGOT_PASSWORD_SEND_CODE: `${BASE_URL}/forgot-sms-send`,
  FORGOT_PASSWORD_CONFIRM_CODE: `${BASE_URL}/forgot-sms-code`,

  RESET_PASSWORD: `${BASE_URL}/new-pass-code`,
  UPDATE_PASSWORD: `${BASE_URL}/update-pass`,

  UPDATE_USER: `${BASE_URL}/update`,
  DELETE_IMAGE: `${BASE_URL}/delete-image`,
  DELETE_ACCOUNT: `${BASE_URL}/delete-account`,
  UPDATE_PHONE_SEND: `${BASE_URL}/update-phone-send`,
  UPDATE_PHONE_CONFIRM: `${BASE_URL}/update-phone-code`,

  GET_CHAT: `${BASE_URL}/get-chat`,
  GET_CHAT_MSG: `${BASE_URL}/get-chat-msg`,
  DELETE_CHAT: `${BASE_URL}/delete-chat`,
  SEND_MSG: `${BASE_URL}/send-msg`,
  READ_MSG: `${BASE_URL}/read-message`,
  UPDATE_MSG: `${BASE_URL}/update-msg`,
  DELETE_MSG: `${BASE_URL}/delete-msg`,
  GET_CURRENT_CHAT: `${BASE_URL}/get-current-chat`,
  GET_CHAT_USER: `${BASE_URL}/get-chat-user`,
  READ_FLAG: `${BASE_URL}/read-flag`,
  OPEN_CHAT: `${BASE_URL}/open-chat`,
  CLOSE_CHAT: `${BASE_URL}/close-chat`,
  CHECK_USER_STATUS: `${BASE_URL}/check-user-status`,

  GET_LIKED_USERS: `${BASE_URL}/get-liked-users`,
  GET_FRIENDS: `${BASE_URL}/get-friends`,
  GET_FRIEND_REQUESTS: `${BASE_URL}/friend-requests-to-me`,
  ACCEPT_FRIEND_REQUEST: `${BASE_URL}/add-friend`,
  REJECT_FRIEND_REQUEST: `${BASE_URL}/friend-requests-to-me-reject`,
  ADD_FRIEND_USERNAME: `${BASE_URL}/add-friend-username`,
  IS_FRIENDS: `${BASE_URL}/is-friend`,
  REMOVE_FRIEND: `${BASE_URL}/friend-remove`,

  GET_CARDS: `${BASE_URL}/swipe`,
  SEND_LIKE: `${BASE_URL}/send-like`,
  SEND_LIKE_ALL: `${BASE_URL}/send-like-all`,
  GET_MATCH: `${BASE_URL}/get-match`,
  GET_SWIPE_SETTING: `${BASE_URL}/get-swipe-setting`,
  SET_SWIPE_SETTING: `${BASE_URL}/set-swipe-setting`,
  RUN_BOOST: `${BASE_URL}/run-boost`,
  RUN_REWIND: `${BASE_URL}/run-rewind`,

  SEARCH: `${BASE_URL}/search`,

  // streaming
  STREAM_UPDATE: `${BASE_URL}/stream-update`,
  STREAM_BAN_USER: `${BASE_URL}/stream-ban-user`,
  STREAM_BAN_LIST: `${BASE_URL}/stream-ban-list`,
  STREAM_NEW_PEOPLE: `${BASE_URL}/stream-new-people`,
  STREAM_INVITE: `${BASE_URL}/stream-invite`,

  STREAM_START: `${BASE_URL}/stream-start`,
  STREAM_STOP: `${BASE_URL}/stream-stop`,
  STREAM_JOIN: `${BASE_URL}/stream-join`,
  STREAM_LEAVE: `${BASE_URL}/stream-disconnect`,
  STREAM_USER_TYPE: `${BASE_URL}/stream-user-type`,

  STREAM_ASK_JOIN: `${BASE_URL}/stream-ask-join`,
  STREAM_ACCEPT_JOIN: `${BASE_URL}/stream-accept-join`,
  STREAM_REFUSED_JOIN: `${BASE_URL}/stream-refused-join`,
  STREAM_DISCONNECT_BROAD: `${BASE_URL}/stream-disconnect-broad`,
  STREAM_USER_ASK_JOIN: `${BASE_URL}/stream-user-ask-join`,
  STREAM_USER_ACCEPT_JOIN: `${BASE_URL}/stream-user-accept-join`,
  STREAM_USER_REFUSED_JOIN: `${BASE_URL}/stream-user-refused-join`,
  STREAM_USER_CANCEL_ASK: `${BASE_URL}/stream-user-cancel-ask`,

  STREAM_BAN_USER: `${BASE_URL}/stream-ban-user`,
  STREAM_KICK_USER: `${BASE_URL}/stream-kick-user`,
  STREAM_BAN_LIST: `${BASE_URL}/stream-ban-list`,

  STREAM_CHAT_ADD_MSG: `${BASE_URL}/stream-chat-add-msg`,

  GET_LIVE_SETTINGS: `${BASE_URL}/get-live-setting`,
  SET_LIVE_SETTINGS: `${BASE_URL}/set-live-setting`,
  STREAM_LIST: `${BASE_URL}/stream-list`,
  STREAM_USER_LIST: `${BASE_URL}/stream-user-list-api`,

  // report
  STREAM_REPORT: `${BASE_URL}/stream-report`,
  USER_REPORT: `${BASE_URL}/user-report`,
  HELP_REQUEST: `${BASE_URL}/ask-question`,
  USER_BLOCK: `${BASE_URL}/user-block`,
  USER_UNBLOCK: `${BASE_URL}/user-unblock`,
  GET_BLOCKED_UESRS: `${BASE_URL}/get-blocked`,

  // payment
  ITEM_PAY: `${BASE_URL}/pay`,
};
