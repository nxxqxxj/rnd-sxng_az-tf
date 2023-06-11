export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
export const TOKEN_EXPIRATION = 3600;

export const GET_PLAYLIST_URL =
  "https://api.spotify.com/v1/me/playlists?limit=50&offset=0";
export const GET_USER_INFO_URL = "https://api.spotify.com/v1/me";
export const ADD_PUBLIC_PLAYLIST = "https://api.spotify.com/v1/users/";
export const ADD_ITEM_TO_PLAYLIST = "https://api.spotify.com/v1/playlists/";
export const URL_API_TOKEN = "https://accounts.spotify.com/api/token";
export const SONG_URI = "spotify:track:";
export const SCOPE =
  "playlist-modify-private playlist-modify-public user-read-private";
export const AUTHORIZATION_URL = "https://accounts.spotify.com/authorize?";

export const REDIRECT_URI = "https://rnd-sxng.joaquin7ap.com/"; //prod
//export const REDIRECT_URI = "http://localhost:3000/"; //dev
