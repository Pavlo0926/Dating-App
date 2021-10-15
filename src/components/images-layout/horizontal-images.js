import PropTypes from "prop-types";
import React, { Component } from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import { widthPercentageToDP as wp } from "@helpers";

import styles, { screenWidth } from "./horizontal-image.style";

const fullWidth = screenWidth - wp(20);

class HorizontalImagesLayout extends Component {
  render() {
    var { images } = this.props;

    let divideWidth = Math.ceil(images.length / 2, 10);
    let divideHeight = 4;
    if (images.length === 2) {
      divideWidth = 2;
      divideHeight = 2;
    }

    if (images.length === 1) {
      return (
        <View style={styles.container}>
          <FastImage source={{ uri: images[0] }} style={styles.imageOne} />
        </View>
      );
    }

    if (images.length % 2 === 0) {
      return (
        <View style={styles.container}>
          {images.map((item, index) => {
            return (
              <FastImage
                source={{ uri: item }}
                style={{
                  width: fullWidth / divideWidth,
                  height: fullWidth / divideHeight,
                }}
                key={index}
              />
            );
          })}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {images.map((item, index) => {
          return index === 0 ? (
            <FastImage
              source={{ uri: item }}
              style={{ width: fullWidth / divideWidth, height: fullWidth / 2 }}
              key={index}
            />
          ) : (
            <FastImage
              source={{ uri: item }}
              style={{ width: fullWidth / divideWidth, height: fullWidth / divideHeight }}
              key={index}
            />
          );
        })}
      </View>
    );
  }
}

HorizontalImagesLayout.propTypes = {
  images: PropTypes.array.isRequired,
};

HorizontalImagesLayout.defaultProps = {
  images: [],
};

export default HorizontalImagesLayout;
