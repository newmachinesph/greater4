import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS home-screen icon. SVG favicons are ignored by Apple, so the brand
 * numeral is rasterised here through the same lockup paths the header uses
 * (public/brand/greater4-lockup.svg, the "4" glyph). iOS applies its own
 * corner mask, so the tile is full-bleed ink with no radius of its own.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0b09",
        }}
      >
        {/* viewBox is the glyph's own bbox, so the "4" fills the frame. */}
        <svg width="76" height="124" viewBox="1084 -1 177 291" fill="#f6f4ee">
          <path d="M1189.44 0.293335C1202.86 -0.0799984 1216.3 0.373333 1229.71 0C1229.79 49.44 1229.72 98.8933 1229.7 148.333C1239.83 148.44 1249.96 148.387 1260.11 148.253C1260.22 157.747 1260.08 167.253 1260.19 176.76C1250.07 176.787 1239.95 176.773 1229.84 176.773C1229.68 204.427 1229.67 232.107 1229.79 259.76C1229.51 264.973 1234.84 268.107 1235.31 273.12C1236.7 279.24 1233.82 287.4 1226.82 288.253C1217.74 288.587 1208.6 288.72 1199.54 288.333C1191.18 287.093 1188.68 276.293 1191.95 269.6C1193.55 266.373 1196.36 263.467 1196.18 259.613C1196.28 232 1196.24 204.373 1196.14 176.747C1159.06 176.813 1121.96 176.693 1084.88 176.747C1085 168.387 1084.82 160.013 1084.79 151.653C1091.18 140.253 1099.43 130 1106.68 119.12C1134.3 79.5333 1161.62 39.7333 1189.44 0.293335ZM1122.06 148.28C1143.82 148.6 1165.6 148.173 1187.38 148.467C1193.15 148.573 1198.88 146.973 1204 144.32C1219.39 136.333 1226.87 115.893 1219.63 99.9867C1215.74 89.6267 1206.54 82.3467 1196.19 79.08C1196.23 66.0933 1196.04 53.0934 1196.19 40.1067C1171.23 76 1146.68 112.173 1122.06 148.28Z" />
        </svg>
      </div>
    ),
    size,
  );
}
