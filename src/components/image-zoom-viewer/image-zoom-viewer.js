import React, { useState } from "react";
import { Dimensions } from "react-native";
import FastImage from "react-native-fast-image";
import ImageZoom from "react-native-image-pan-zoom";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ImageZoomViewer: () => React$Node = props => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  return (
    <ImageZoom
      cropWidth={ screenWidth }
      cropHeight={ screenHeight }
      imageWidth={width}
      imageHeight={height}
      enableDoubleClickZoom={true}
      doubleClickInterval={200}
    >
      
      <FastImage
        source={props.imageUrl}
        style={{width: width, height: height}}
        onLoad={(event) => {
          let imageWidth = event.nativeEvent.width;
          let imageHeight = event.nativeEvent.height;

          if (imageWidth > screenWidth) {
            const widthPixel = screenWidth / imageWidth;
            imageWidth *= widthPixel;
            imageHeight *= widthPixel;
          }
    
          if (imageHeight > screenHeight) {
            const HeightPixel = screenHeight / imageHeight;
            imageWidth *= HeightPixel;
            imageHeight *= HeightPixel;
          }
          setWidth(imageWidth);
          setHeight(imageHeight);
        }}
      />

    </ImageZoom>
  )
};

export default ImageZoomViewer;
