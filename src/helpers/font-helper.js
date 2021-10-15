import _ from "lodash";

// use post script names for font families
const Monsterrat = {
  "100": { fontFamily: "Montserrat-Thin" },
  "100italic": { fontFamily: "Montserrat-ThinItalic" },
  "200": { fontFamily: "Montserrat-ExtraLight" },
  "200italic": { fontFamily: "Montserrat-ExtraLightItalic" },
  "300": { fontFamily: "Montserrat-Light" },
  "300italic": { fontFamily: "Montserrat-LightItalic" },
  "400": { fontFamily: "Montserrat-Regular" },
  "400italic": { fontFamily: "Montserrat-Italic" },
  "500": { fontFamily: "Montserrat-Medium" },
  "500italic": { fontFamily: "Montserrat-MediumItalic" },
  "600": { fontFamily: "Montserrat-SemiBold" },
  "600italic": { fontFamily: "Montserrat-SemiBoldItalic" },
  "700": { fontFamily: "Montserrat-Bold" },
  "700italic": { fontFamily: "Montserrat-BoldItalic" },
  bold: { fontFamily: "Montserrat-Bold" },
  bolditalic: { fontFamily: "Montserrat-BoldItalic" },
  "800": { fontFamily: "Montserrat-Black" },
  "800italic": { fontFamily: "Montserrat-BlackItalic" },
  "900": { fontFamily: "Montserrat-ExtraBold" },
  "900italic": { fontFamily: "Montserrat-ExtraBoldItalic" },
};

const OpenSans = {
  "400": { fontFamily: "OpenSans-Regular" },
  "600": { fontFamily: "OpenSans-SemiBold" },
  "700": { fontFamily: "OpenSans-Bold" },
};

const FONTS = {
  Monsterrat,
  OpenSans,
};

/*
  Helper class for cross-platform font styles
*/
class FontHelper {
  static font(fontParams) {
    let { fontFamily, fontWeight, fontStyle } = fontParams;
    fontFamily = fontFamily || "Monsterrat";
    fontWeight = fontWeight || "400";
    fontStyle = fontStyle || "";

    const styles = {
      ..._.omit(fontParams, ["fontFamily", "fontWeight", "fontStyle"]),
      ...FONTS[fontFamily][fontWeight + fontStyle],
    };

    return styles;
  }
}

export { FontHelper };
