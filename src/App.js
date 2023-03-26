/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getToken } from "../src/components/clientAuth.js";
import randomSong from "../src/components/randomSong.js";
import { setBackground, setSongFrame } from "../src/components/setItmes.js";

function App() {
  useEffect(() => {
    loadCurrentSong();
    loadToken();
    enablePreviusSong();
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
        <button id="btnuseraccess" class="second-btn">
          GRANT PERMISSIONS
        </button>
        <button id="btnaddtoplaylist" class="second-btn" hidden>
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

function loadToken() {
  if (
    (localStorage.getItem("token_requested") != null &&
      (Date.now() - parseInt(localStorage.getItem("token_requested"))) / 1000 >
        3600) ||
    localStorage.getItem("access_token") == null
  ) {
    getToken();
  }
}

function enablePreviusSong() {
  if (
    localStorage.getItem("previous_id_song") != null &&
    localStorage.getItem("previous_background") != null
  )
    document.getElementById("btnprevioussong").hidden = false;
}

function setPreviousSong() {
  var auxSongId = localStorage.getItem("previous_id_song");
  var auxBackground = localStorage.getItem("previous_background");

  localStorage.setItem(
    "previous_id_song",
    localStorage.getItem("current_id_song")
  );
  localStorage.setItem("current_id_song", auxSongId);
  localStorage.setItem(
    "previous_background",
    localStorage.getItem("current_background")
  );
  localStorage.setItem("current_background", auxBackground);

  setSongFrame();
  setBackground();
}
