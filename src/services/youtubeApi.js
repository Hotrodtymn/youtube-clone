const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const searchVideos = async (query) => {
  const url = new URL(`${BASE_URL}/search`);

  url.searchParams.set("part", "snippet");
  url.searchParams.set("q", query);
  url.searchParams.set("type", "video");
  url.searchParams.set("maxResults", "20");
  url.searchParams.set("regionCode", "US");
  url.searchParams.set("key", API_KEY);

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    console.error("YouTube API error:", data);

    throw new Error(
      data.error?.message || "Failed to fetch YouTube videos"
    );
  }

  return data.items;
};

export const getVideo = async (videoId) => {
  const url = new URL(`${BASE_URL}/videos`);

  url.searchParams.set("part", "snippet,statistics");
  url.searchParams.set("id", videoId);
  url.searchParams.set("key", API_KEY);

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    console.error("YouTube API error:", data);

    throw new Error(
      data.error?.message || "Failed to fetch YouTube video"
    );
  }

  return data.items[0];
};

export const getChannel = async (channelId) => {
  const url = new URL(`${BASE_URL}/channels`);

  url.searchParams.set("part", "snippet,statistics");
  url.searchParams.set("id", channelId);
  url.searchParams.set("key", API_KEY);

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    console.error("YouTube API error:", data);

    throw new Error(
      data.error?.message || "Failed to fetch YouTube channel"
    );
  }

  return data.items[0];
};

export const getComments = async (videoId) => {
  const url = new URL(`${BASE_URL}/commentThreads`);

  url.searchParams.set("part", "snippet");
  url.searchParams.set("videoId", videoId);
  url.searchParams.set("maxResults", "20");
  url.searchParams.set("order", "relevance");
  url.searchParams.set("textFormat", "plainText");
  url.searchParams.set("key", API_KEY);

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    console.warn(
      "Comments unavailable:",
      data.error?.message
    );

    return [];
  }

  return data.items || [];
};