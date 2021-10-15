import { createStackNavigator } from "react-navigation-stack";
import { SCREENS } from "@constants";
import AuthSelection from "../screens/auth-selection";
import Login from "../screens/login";
import LoginPhoneNumber from "../screens/login-phone-number";
import LoginPhoneCodeVerification from "../screens/login-phone-code-verification";
import ForgotPassword from "../screens/forgot-password";
import ResetPasswordCodeVerification from "../screens/reset-password-code-verification";
import ResetPassword from "../screens/reset-password";
import SignupFirstName from "../screens/signup-first-name";
import SignupBirthDate from "../screens/signup-birthdate";
import SignupGenderSelect from "../screens/signup-gender-select";
import SignupUsername from "../screens/signup-username";
import SignupImage from "../screens/signup-image";
import SignupPhoneNumber from "../screens/signup-phone-number";
import SignupCodeVerification from "../screens/signup-code-verification";
import SignupSuccess from "../screens/signup-success";
import TermsOfService from "../screens/settings/terms-of-service";

import navigationConfig from "./navigation-config";

const AuthStack = createStackNavigator(
  {
    [SCREENS.AUTH_SELECTION]: { screen: AuthSelection },
    [SCREENS.LOGIN]: { screen: Login },
    [SCREENS.LOGIN_PHONE_NUMBER]: { screen: LoginPhoneNumber },
    [SCREENS.LOGIN_PHONE_CODE_VERIFICATION]: { screen: LoginPhoneCodeVerification },
    [SCREENS.FORGOT_PASSWORD]: { screen: ForgotPassword },
    [SCREENS.RESET_PASSWORD_CODE_VERIFICATION]: { screen: ResetPasswordCodeVerification },
    [SCREENS.RESET_PASSWORD]: { screen: ResetPassword },
    [SCREENS.SIGNUP_FIRST_NAME]: { screen: SignupFirstName },
    [SCREENS.SIGNUP_BIRTH_DATE]: { screen: SignupBirthDate },
    [SCREENS.SIGNUP_GENDER_SELECT]: { screen: SignupGenderSelect },
    [SCREENS.SIGNUP_USERNAME]: { screen: SignupUsername },
    [SCREENS.SIGNUP_IMAGE]: { screen: SignupImage },
    [SCREENS.SIGNUP_PHONE_NUMBER]: { screen: SignupPhoneNumber },
    [SCREENS.SIGNUP_CODE_VERIFICATION]: { screen: SignupCodeVerification },
    [SCREENS.SIGNUP_SUCCESS]: { screen: SignupSuccess },
    [SCREENS.TERMS_OF_SERVICE]: { screen: TermsOfService },
  },
  {
    initialRouteName: SCREENS.AUTH_SELECTION,
    headerMode: "none",
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: "transparent",
      },
      ...navigationConfig,
    },
  },
);

AuthStack.navigationOptions = {
  cardStyle: {
    backgroundColor: "transparent",
  },
  ...navigationConfig,
};

export { AuthStack };
