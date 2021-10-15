import Svg, {
  Defs,
  LinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";
import * as React from "react";
import { View } from "react-native";
import styles from "./shadow.style";

function colorRgb(color) {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  let sColor = color.toLowerCase();
  const rgb = [];
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    for (let i = 1; i < 7; i += 2) {
      rgb.push(parseInt("0x" + sColor.slice(i, i + 2), 10));
    }
    return rgb;
  } else {
    throw Error("Invalid Color!");
  }
}

export default class BoxShadow extends React.PureComponent {
  render() {
    // get the shadow settings and give them default values
    const {
      setting: {
        width = 0,
        height = 0,
        color = "#000",
        offsetX = 0,
        offsetY = 0,
        blur = 0,
        spread = 0,
        _borderRadius = 0,
        opacity = 1,
        style = {},
      },
      children,
    } = this.props;

    const borderRadius =
      _borderRadius > Math.min(width, height) / 2
        ? Math.min(width, height) / 2
        : _borderRadius;

    // define the lengths
    const rectInnerWidth = width + spread * 2 - blur;
    const rectInnerHeight = height + spread * 2 - blur;
    const rectOuterWidth = width + spread * 2 + blur;
    const rectOuterHeight = height + spread * 2 + blur;
    const innerRadius =
      borderRadius > 0 ? Math.max(0, borderRadius + spread - blur / 2) : 0;
    const outerRadius =
      borderRadius > 0 ? Math.max(0, borderRadius + spread + blur / 2) : blur;
    const borderWidth = (rectOuterWidth - rectInnerWidth) / 2;

    // format the color
    const rgb = colorRgb(color);

    // the same parts for gradients
    const linear = key => {
      return [
        <Stop offset='0' stopColor={color} stopOpacity={opacity} key={key + "Linear0"} />,
        <Stop offset='1' stopColor={color} stopOpacity='0' key={key + "Linear1"} />,
      ];
    };
    const radial = key => {
      return [
        <Stop offset='0' stopColor={color} stopOpacity={opacity} key={key + "Radial0"} />,
        <Stop
          offset={Math.max(0, innerRadius / outerRadius).toString()}
          stopColor={color}
          stopOpacity={opacity}
          key={key + "Radial1"}
        />,
        <Stop offset='1' stopColor={color} stopOpacity='0' key={key + "Radial2"} />,
      ];
    };

    // return a view, whose background is a svg picture
    return (
      <View
        style={[
          styles.container,
          {
            width: rectOuterWidth,
            height: rectOuterHeight,
            left: -blur / 2 - spread + offsetX,
            top: -blur / 2 - spread + offsetY,
          },
          style,
        ]}
      >
        <Svg width={rectOuterWidth} height={rectOuterHeight}>
          <Defs>
            <LinearGradient id='top' x1='0%' x2='0%' y1='100%' y2='0%'>
              {linear("BoxTop")}
            </LinearGradient>
            <LinearGradient id='bottom' x1='0%' x2='0%' y1='0%' y2='100%'>
              {linear("BoxBottom")}
            </LinearGradient>
            <LinearGradient id='left' x1='100%' y1='0%' x2='0%' y2='0%'>
              {linear("BoxLeft")}
            </LinearGradient>
            <LinearGradient id='right' x1='0%' y1='0%' x2='100%' y2='0%'>
              {linear("BoxRight")}
            </LinearGradient>

            <RadialGradient
              id='border-left-top'
              rx='100%'
              ry='100%'
              cx='100%'
              cy='100%'
              fx='100%'
              fy='100%'
            >
              {radial("BoxLeftTop")}
            </RadialGradient>
            <RadialGradient
              id='border-left-bottom'
              rx='100%'
              ry='100%'
              cx='100%'
              cy='0%'
              fx='100%'
              fy='0%'
            >
              {radial("BoxLeftBottom")}
            </RadialGradient>
            <RadialGradient
              id='border-right-top'
              rx='100%'
              ry='100%'
              cx='0%'
              cy='100%'
              fx='0%'
              fy='100%'
            >
              {radial("BoxRightTop")}
            </RadialGradient>
            <RadialGradient
              id='border-right-bottom'
              rx='100%'
              ry='100%'
              cx='0%'
              cy='0%'
              fx='0%'
              fy='0%'
            >
              {radial("BoxRightBottom")}
            </RadialGradient>
          </Defs>

          <Path
            d={`
            M 0 ${outerRadius},
            a ${outerRadius} ${outerRadius} 0 0 1 ${outerRadius} ${-outerRadius}
            v ${blur}
            a ${innerRadius} ${innerRadius} 0 0 0 ${-innerRadius} ${innerRadius}
            z
          `}
            fill='url(#border-left-top)'
          />
          <Path
            d={`
            M ${rectOuterWidth - outerRadius} 0,
            a ${outerRadius} ${outerRadius} 0 0 1 ${outerRadius} ${outerRadius}
            h ${-blur}
            a ${innerRadius} ${innerRadius} 0 0 0 ${-innerRadius} ${-innerRadius}
            z
          `}
            fill='url(#border-right-top)'
          />
          <Path
            d={`
            M ${rectOuterWidth} ${rectOuterHeight - outerRadius},
            a ${outerRadius} ${outerRadius} 0 0 1 ${-outerRadius} ${outerRadius}
            v ${-blur}
            a ${innerRadius} ${innerRadius} 0 0 0 ${innerRadius} ${-innerRadius}
            z
          `}
            fill='url(#border-right-bottom)'
          />
          <Path
            d={`
            M ${outerRadius} ${rectOuterHeight},
            a ${outerRadius} ${outerRadius} 0 0 1 ${-outerRadius} ${-outerRadius}
            h ${blur}
            a ${innerRadius} ${innerRadius} 0 0 0 ${innerRadius} ${innerRadius}
            z
          `}
            fill='url(#border-left-bottom)'
          />
          <Rect
            x={outerRadius}
            y={0}
            width={rectInnerWidth - innerRadius * 2}
            height={blur}
            fill='url(#top)'
          />

          <Rect
            x={rectOuterWidth - blur}
            y={outerRadius}
            width={blur}
            height={rectInnerHeight - innerRadius * 2}
            fill='url(#right)'
          />
          <Rect
            x={outerRadius}
            y={rectOuterHeight - blur}
            width={rectInnerWidth - innerRadius * 2}
            height={blur}
            fill='url(#bottom)'
          />
          <Rect
            x={0}
            y={outerRadius}
            width={blur}
            height={rectInnerHeight - innerRadius * 2}
            fill='url(#left)'
          />
          <Path
            d={`
            M ${borderWidth} ${borderWidth + innerRadius},
            a ${innerRadius} ${innerRadius} 0 0 1 ${innerRadius} ${-innerRadius},
            h ${rectInnerWidth - innerRadius * 2},
            a ${innerRadius} ${innerRadius} 0 0 1 ${innerRadius} ${innerRadius},
            v ${rectInnerHeight - innerRadius * 2},
            a ${innerRadius} ${innerRadius} 0 0 1 ${-innerRadius} ${innerRadius},
            h ${-rectInnerWidth + innerRadius * 2},
            a ${innerRadius} ${innerRadius} 0 0 1 ${-innerRadius} ${-innerRadius}
            z
          `}
            fill={`rgba(${rgb[0]},${rgb[1]},${rgb[2]},${opacity || 1})`}
          />
        </Svg>
        {children}
      </View>
    );
  }
}
