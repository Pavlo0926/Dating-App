import PropTypes from "prop-types";
import React, { Component } from "react";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import { Text } from "../text";
import { Image } from "../image";
import Images from "@assets/Images";

import styles from "./user-count.style";

class UserCount extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var { count, style, iconStyle, textStyle } = this.props;

    return (
      <LinearGradient
        colors={GRADIENT.BUTTON}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 1 }}
        style={[styles.container, style]}
      >
        <Image source={Images.app.icUser} style={[styles.userIcon, iconStyle]} />
        <Text style={[styles.userCount, textStyle]}>{count}</Text>
      </LinearGradient>
    );
  }
}

UserCount.propTypes = {
  count: PropTypes.number.isRequired,
  style: PropTypes.any,
  iconStyle: PropTypes.any,
  textStyle: PropTypes.any,
};

UserCount.defaultProps = {
  count: 0,
  style: {},
  textStyle: {},
  iconStyle: {},
};

export default UserCount;
