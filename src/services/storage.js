const WATCH_LATER_KEY = "rockstreamer_watch_later";
const FAVORITES_KEY = "rockstreamer_favorites";

const getStoredVideos = (key) => {
  try {
    const stored = localStorage.getItem(key);

    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Unable to read saved videos:", error);

    return [];
  }
};

const saveStoredVideos = (key, videos) => {
  localStorage.setItem(
    key,
    JSON.stringify(videos)
  );
};

// -------------------------
// WATCH LATER
// -------------------------

export const getWatchLater = () => {
  return getStoredVideos(WATCH_LATER_KEY);
};

export const addToWatchLater = (video) => {
  const videos = getWatchLater();

  const exists = videos.some(
    (item) => item.id === video.id
  );

  if (!exists) {
    saveStoredVideos(
      WATCH_LATER_KEY,
      [...videos, video]
    );
  }
};

export const removeFromWatchLater = (videoId) => {
  const videos = getWatchLater();

  saveStoredVideos(
    WATCH_LATER_KEY,
    videos.filter(
      (video) => video.id !== videoId
    )
  );
};

export const isInWatchLater = (videoId) => {
  const videos = getWatchLater();

  return videos.some(
    (video) => video.id === videoId
  );
};

// -------------------------
// FAVORITES
// -------------------------

export const getFavorites = () => {
  return getStoredVideos(FAVORITES_KEY);
};

export const addToFavorites = (video) => {
  const videos = getFavorites();

  const exists = videos.some(
    (item) => item.id === video.id
  );

  if (!exists) {
    saveStoredVideos(
      FAVORITES_KEY,
      [...videos, video]
    );
  }
};

export const removeFromFavorites = (videoId) => {
  const videos = getFavorites();

  saveStoredVideos(
    FAVORITES_KEY,
    videos.filter(
      (video) => video.id !== videoId
    )
  );
};

export const isFavorite = (videoId) => {
  const videos = getFavorites();

  return videos.some(
    (video) => video.id === videoId
  );
};