import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  requestLogin: ["params"],
  loginSuccess: ["sessionData"],
  loginFailure: null,

  requestProfile: ["token"],
  loadProfileSuccess: ["sessionData"],
  loadProfileFailure: null,

  requestCheckPhone: ["phoneNumber", "screenName"],
  checkPhoneSuccess: null,
  checkPhoneFailure: null,

  requestPhoneLoginSendCode: ["phoneNumber", "shouldNavigate"],
  phoneLoginSendCodeSuccess: null,
  phoneLoginSendCodeFailure: null,

  requestPhoneLoginConfirmCode: ["phoneNumber", "code"],
  phoneLoginConfirmCodeSuccess: ["sessionData"],
  phoneLoginConfirmCodeFailure: null,

  requestRegistration: null,
  registrationSuccess: ["sessionData"],
  registrationFailure: null,

  requestPhoneVerificationSendCode: ["phoneNumber"],
  phoneVerificationSendCodeSuccess: null,
  phoneVerificationSendCodeFailure: null,

  requestPhoneVerificationConfirmCode: ["phoneNumber", "code", "isSignUp"],
  phoneVerificationConfirmCodeSuccess: ["sessionData"],
  phoneVerificationConfirmCodeFailure: null,

  requestForgotPasswordSendCode: ["phoneNumber", "shouldNavigate"],
  forgotPasswordSendCodeSuccess: null,
  forgotPasswordSendCodeFailure: null,

  requestForgotPasswordConfirmCode: ["phoneNumber", "code"],
  forgotPasswordConfirmCodeSuccess: null,
  forgotPasswordConfirmCodeFailure: null,

  requestResetPassword: ["phoneNumber", "passwordResetToken", "password"],
  resetPasswordSuccess: null,
  resetPasswordFailure: null,

  requestUpdateUser: ["params", "token"],
  updateUserSuccess: ["sessionData"],
  updateUserFailure: null,

  updateLocation: ["location"],

  requestDeleteImage: ["imageId", "token"],
  deleteImageSuccess: ["sessionData"],
  deleteImageFailure: null,

  requestReorderImages: ["params", "token"],

  requestDeleteAccount: ["token"],
  deleteAccountSuccess: null,
  deleteAccountFailure: null,

  requestUpdatePhoneSendCode: ["phone", "token"],
  updatePhoneSendCodeSuccess: null,
  updatePhoneSendCodeFail: null,

  requestUpdatePhoneConfirmCode: ["code", "token"],
  updatePhoneConfirmCodeSuccess: null,
  updatePhoneConfirmCodeFail: null,

  updateNotification: ["data"],
  updatePushStatus: ["status"],

  // block users
  requestBlockUser: ["user_id", "token"],
  requestUnblockUser: ["user_id", "token"],
  requestBlockedUsers: ["token"],
  loadBlockedUsersSuccess: ["data"],

  logout: null,
});

export const UserTypes = Types;
export const UserCreators = Creators;
