/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  clientAuth,
  getUserAuth,
  userAuth,
} from "../src/components/spotifyAuth";
import randomSong from "../src/components/randomSong.js";
import managePlaylist from "../src/components/managePlaylist.js";
import {
  setBackground,
  setSongFrame,
  setPreviousSong,
  enableAddToPlaylist,
} from "../src/components/setItmes.js";

function App() {
  useEffect(() => {
    loadCurrentSong();
    requestToken();
    enablePreviusSong();
    userAuth();
    enableAddToPlaylist();
  }, []);
  return (
    <div className="container">
      <h1>RND SXNG</h1>
      <iframe
        id="reproductor"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
      <button className="main-btn" onClick={randomSong}>
        GET A SONG
      </button>
      <div>
        <button
          id="btnprevioussong"
          class="previous-btn"
          hidden="true"
          onClick={setPreviousSong}
        >
          ↩
        </button>
        <button
          title="Only for pre-added users."
          id="btnuseraccess"
          class="second-btn"
          onClick={getUserAuth}
        >
          GRANT PERMISSIONS
        </button>
        <button
          id="btnaddtoplaylist"
          class="second-btn"
          hidden
          onClick={managePlaylist}
        >
          ADD TO PLAYLIST
        </button>
      </div>
      <a
        href="https://linkedin.com/in/joaquin7ap"
        target="_blank"
        rel="noreferrer"
      >
        <h6> © 2023 \\ NXXQXXJ</h6>
      </a>
    </div>
  );
}

export default App;

function loadCurrentSong() {
  if (
    localStorage.getItem("current_id_song") != null &&
    localStorage.getItem("current_background") != null
  ) {
    setBackground();
    setSongFrame();
  }
}

function requestToken() {
  if (
    (localStorage.getItem("token_requested") != null &&
      (Date.now() - parseInt(localStorage.getItem("token_requested"))) / 1000 >
        3600) ||
    localStorage.getItem("access_token") == null
  ) {
    clientAuth();
  }
}

function enablePreviusSong() {
  if (
    localStorage.getItem("previous_id_song") != null &&
    localStorage.getItem("previous_background") != null
  )
    document.getElementById("btnprevioussong").hidden = false;
}
