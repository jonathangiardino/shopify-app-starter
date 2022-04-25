import segmentPlugin from "@analytics/segment";
import Analytics from "analytics";

const analytics = Analytics({
  app: "starter",
  plugins: [
    segmentPlugin({
      writeKey: "705pHjNlhlkrSCgdFtwkhD9L3BIFyw52",
    }),
  ],
});

export default analytics;
