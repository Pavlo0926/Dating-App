import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { AuthStack } from "../navigation/auth-navigator";
import Home from "./home";
import { SCREENS } from "@constants";

const RootStack = createSwitchNavigator(
  {
    [SCREENS.AUTHSTACK]: AuthStack,
    [SCREENS.HOMESTACK]: Home,
  },
  {
    initialRouteName: SCREENS.AUTHSTACK,
    navigationOptions: {
      header: "none",
    },
  },
);

const AppContainer = createAppContainer(RootStack);

export { AppContainer };
