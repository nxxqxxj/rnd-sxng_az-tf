/* eslint-disable jsx-a11y/iframe-has-title */
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  document.body.style.backgroundImage =
    "url(https://i.scdn.co/image/ab67616d0000b273d5ce51ee5b501fed52852a44)";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
  return (
    <div className="container">
      <h1>RND SXNG</h1>
      <iframe
        id="reproductor"
        src="https://open.spotify.com/embed?uri=spotify:track:49pWgSwj8XTlUledbsx0O0"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
      <button className="main-btn"> GET A SONG </button>
    </div>
  );
}

export default App;
