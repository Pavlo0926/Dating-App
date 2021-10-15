import { NavigationActions, StackActions } from "react-navigation";

let _navigator = null;

function isNavigator() {
  return _navigator !== null;
}

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  if (_navigator === null || !routeName) return false;
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
  return true;
}

function popToTop(routeName, params) {
  _navigator.dispatch(StackActions.popToTop());
}

export const NavigationService = {
  popToTop,
  navigate,
  setTopLevelNavigator,
  isNavigator,
};
