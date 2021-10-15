import React from "react";
import { SafeAreaView } from "react-native";
import { Touchable } from "../touchable";
import styles from "./tab-bar.style";
import { GRADIENT } from "@config";
import LinearGradient from "react-native-linear-gradient";

const TabBar = props => {
  const {
    activeTintColor,
    inactiveTintColor,
    renderIcon,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation,
  } = props;
  const { routes, index: activeRouteIndex } = navigation.state;

  return (
    <SafeAreaView
      style={[
        styles.container,
        activeRouteIndex === 1 ? styles.transparentTab : styles.normalTab,
      ]}
    >
      <LinearGradient
        colors={GRADIENT.FADE_UP}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.fadeContainer}
      />
      <SafeAreaView
        style={[
          styles.tabContainer,
          activeRouteIndex === 1 ? styles.transparentTab : styles.normalTab,
        ]}
      >
        {routes.map((route, routeIndex) => {
          const isRouteActive = routeIndex === activeRouteIndex;
          const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

          return (
            <Touchable
              key={routeIndex}
              style={styles.tabButton}
              onPress={() => {
                onTabPress({ route });
              }}
              onLongPress={() => {
                onTabLongPress({ route });
              }}
              accessibilityLabel={getAccessibilityLabel({ route })}
            >
              {renderIcon({ route, focused: isRouteActive, tintColor })}
            </Touchable>
          );
        })}
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default TabBar;
