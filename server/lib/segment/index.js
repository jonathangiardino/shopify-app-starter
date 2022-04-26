import Analytics from "analytics-node";
import "dotenv/config";

const analytics = new Analytics(process.env.VITE_SEGMENT_WRITE_KEY);

export default analytics;
