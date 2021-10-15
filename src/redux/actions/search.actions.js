import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  requestSearch: ["keyword", "token"],
  searchSuccess: ["results"],
  searchFailure: null,

  requestNewPeople: null,
  newPeopleSuccess: ["data"],
  newPeopleFail: null,

  updateSearchLive: ["data"],

  initializeSearch: null,
});

export const SearchTypes = Types;
export const SearchCreators = Creators;
