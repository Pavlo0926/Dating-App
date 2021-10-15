import React from "react";
import { Image } from "../image";
import { Touchable } from "../touchable";
import Images from "@assets/Images";

import styles from "./back-down-button.style";

const BackDownButton: () => React$Node = props => {
  return (
    <Touchable style={styles.backButton} onPress={props.onPress}>
      <Image source={Images.app.icBack} style={styles.backImage} />
    </Touchable>
  );
};

export default BackDownButton;
