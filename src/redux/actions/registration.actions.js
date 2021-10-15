import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  setFirstName: ["firstName"],
  setBirthDate: ["birthDate"],
  setGender: ["gender"],
  setLikeGender: ["likeGender"],
  setUsername: ["username"],
  setPassword: ["password"],
  setPicture1: ["picture"],
  setPicture2: ["picture"],
  setPicture3: ["picture"],
  setPhoneNumber: ["phoneNumber"],
  resetRegistration: null,

  checkUsernameDone: null,
});

export const RegistrationTypes = Types;
export const RegistrationCreators = Creators;
