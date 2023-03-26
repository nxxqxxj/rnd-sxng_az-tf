/* eslint-disable jsx-a11y/iframe-has-title */
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getToken } from "../src/components/clientAuth.js";
import { getRNDSong } from "../src/components/randomSong.js";

function App() {
  if (
    (localStorage.getItem("token_requested") != null &&
      (Date.now() - parseInt(localStorage.getItem("token_requested"))) / 1000 >
        3600) ||
    localStorage.getItem("access_token") == null
  ) {
    getToken();
  }
  return (
    <div className="container">
      <h1>RND SXNG</h1>
      <iframe
        id="reproductor"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
      <button className="main-btn" onClick={getRNDSong}>
        GET A SONG
      </button>
      <div>
        <button id="btnprevioussong" class="previous-btn">
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
