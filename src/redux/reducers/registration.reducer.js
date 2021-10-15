import { createReducer } from "reduxsauce";
import { RegistrationTypes as Types, UserTypes } from "../actions";
import storeInitialState from "../store/initial-state";
export const INITIAL_STATE = storeInitialState.registration;

const logout = (state, action) => INITIAL_STATE;

const setFirstName = (state, action) => ({
  ...state,
  firstName: action.firstName,
});

const setBirthDate = (state, action) => ({
  ...state,
  birthDate: action.birthDate,
});

const setGender = (state, action) => ({
  ...state,
  gender: action.gender,
});

const setLikeGender = (state, action) => ({
  ...state,
  likeGender: action.likeGender,
});

const setUsername = (state, action) => ({
  ...state,
  username: action.username,
});

const setPassword = (state, action) => ({
  ...state,
  password: action.password,
});

const setPicture1 = (state, action) => ({
  ...state,
  picture1: action.picture,
});
const setPicture2 = (state, action) => ({
  ...state,
  picture2: action.picture,
});
const setPicture3 = (state, action) => ({
  ...state,
  picture3: action.picture,
});

const setPhoneNumber = (state, action) => ({
  ...state,
  phoneNumber: action.phoneNumber,
});

const checkUsernameDone = (state, action) => ({
  ...state,
  isCheckingUsername: false,
});

const resetRegisration = (state, params) => INITIAL_STATE;

export const HANDLERS = {
  [Types.SET_FIRST_NAME]: setFirstName,
  [Types.SET_BIRTH_DATE]: setBirthDate,
  [Types.SET_GENDER]: setGender,
  [Types.SET_LIKE_GENDER]: setLikeGender,
  [Types.SET_USERNAME]: setUsername,
  [Types.SET_PASSWORD]: setPassword,
  [Types.SET_PICTURE1]: setPicture1,
  [Types.SET_PICTURE2]: setPicture2,
  [Types.SET_PICTURE3]: setPicture3,
  [Types.SET_PHONE_NUMBER]: setPhoneNumber,
  [Types.RESET_REGISTRATION]: resetRegisration,
  [Types.CHECK_USERNAME_DONE]: checkUsernameDone,
  [UserTypes.LOGOUT]: logout,
};

export default createReducer(INITIAL_STATE, HANDLERS);
