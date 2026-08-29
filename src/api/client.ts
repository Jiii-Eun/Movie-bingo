import * as streamingAvailability from "streaming-availability";

const API_KEY = process.env.STREAMING_AVAILABILITY_API_KEY;

if (!API_KEY) {
  throw new Error("STREAMING_AVAILABILITY_API_KEY is not set");
}

export const streamingClient = new streamingAvailability.Client(
  new streamingAvailability.Configuration({
    apiKey: API_KEY,
  }),
);
