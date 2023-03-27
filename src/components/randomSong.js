import { setSongFrame, setBackground } from "./setItmes.js";
import clientAuth from "./clientAuth.js";

const GEN_LIST = [
  "acoustic",
  "afrobeat",
  "alt-rock",
  "alternative",
  "ambient",
  "anime",
  "black-metal",
  "bluegrass",
  "blues",
  "bossanova",
  "brazil",
  "breakbeat",
  "british",
  "cantopop",
  "chicago-house",
  "children",
  "chill",
  "classical",
  "club",
  "comedy",
  "country",
  "dance",
  "dancehall",
  "death-metal",
  "deep-house",
  "detroit-techno",
  "disco",
  "disney",
  "drum-and-bass",
  "dub",
  "dubstep",
  "edm",
  "electro",
  "electronic",
  "emo",
  "folk",
  "french",
  "funk",
  "garage",
  "german",
  "gospel",
  "goth",
  "grindcore",
  "groove",
  "grunge",
  "guitar",
  "happy",
  "hard-rock",
  "hardcore",
  "hardstyle",
  "heavy-metal",
  "hip-hop",
  "holidays",
  "honky-tonk",
  "house",
  "idm",
  "indian",
  "indie",
  "indie-pop",
  "industrial",
  "iranian",
  "j-dance",
  "j-idol",
  "j-pop",
  "j-rock",
  "jazz",
  "k-pop",
  "kids",
  "latin",
  "latino",
  "malay",
  "mandopop",
  "metal",
  "metal-misc",
  "metalcore",
  "minimal-techno",
  "movies",
  "mpb",
  "new-age",
  "new-release",
  "opera",
  "pagode",
  "party",
  "philippines-opm",
  "piano",
  "pop",
  "pop-film",
  "post-dubstep",
  "power-pop",
  "progressive-house",
  "psych-rock",
  "punk",
  "punk-rock",
  "r-n-b",
  "rainy-day",
  "reggae",
  "reggaeton",
  "road-trip",
  "rock",
  "rock-n-roll",
  "rockabilly",
  "romance",
  "sad",
  "salsa",
  "samba",
  "sertanejo",
  "show-tunes",
  "singer-songwriter",
  "ska",
  "sleep",
  "songwriter",
  "soul",
  "soundtracks",
  "spanish",
  "study",
  "summer",
  "swedish",
  "synth-pop",
  "tango",
  "techno",
  "trance",
  "trip-hop",
  "turkish",
  "work-out",
  "world-music",
];
var req = {
  genres: GEN_LIST,
  genre: null,
  year: null,
  limit: 10,
  offset: null,
  mrkt: "ES",
  song: null,
};
var rndSong = {
  name: null,
  id: null,
  artist: null,
  album: null,
  cover: null,
  url: null,
};

async function randomSong() {
  if (
    (localStorage.getItem("token_requested") != null &&
      (Date.now() - parseInt(localStorage.getItem("token_requested"))) / 1000 >
        3600) ||
    localStorage.getItem("access_token") == null
  ) {
    clientAuth();
  }

  req.genre = Math.floor(Math.random() * (127 - 0)) + 0; //1 genero random entre los 127 que hay actualmente en Spotify
  req.year =
    Math.floor(Math.random() * (new Date().getFullYear() + 1 - 1950)) + 1950; //año random entre 1950 y actual
  req.offset = Math.floor(Math.random() * (1000 - 1)) + 1; //nro de página de los resultados 1 a 1000
  req.song = Math.floor(Math.random() * (10 - 0)) + 0; //nro en lista de cada pags de resultados

  const search = await fetch(
    "https://api.spotify.com/v1/search?q=genre:" +
      req.genres[req.genre] +
      "+year:" +
      req.year +
      "&type=track&market=" +
      req.mrkt +
      "&limit=" +
      req.limit +
      "&offset=" +
      req.offset,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    }
  );

  if (search.status === 200) {
    var data = await search.json();
    if (data.tracks.items.length === 0) {
      //si el length de items es 0 significa que logró hacer la apicall pero con los datos randoms asignados no hay resultados
      randomSong(); //ejecuta nuevamente con nuevos datos random
    } else {
      rndSong.name = data.tracks.items[req.song].name;
      rndSong.id = data.tracks.items[req.song].id;
      rndSong.artist = data.tracks.items[req.song].artists[0].name;
      rndSong.album = data.tracks.items[req.song].album.name;
      rndSong.cover = data.tracks.items[req.song].album.images[0].url;
      rndSong.url = data.tracks.items[req.song].external_urls.spotify;

      if (
        localStorage.getItem("current_id_song") != null &&
        localStorage.getItem("current_background") != null
      ) {
        localStorage.setItem(
          "previous_id_song",
          localStorage.getItem("current_id_song")
        );
        localStorage.setItem(
          "previous_background",
          localStorage.getItem("current_background")
        );
      }

      localStorage.setItem("current_id_song", rndSong.id);
      localStorage.setItem("current_background", rndSong.cover);

      setBackground();
      setSongFrame();
    }
  } else if (search.status === 401 || search.status === 404) randomSong();
  else
    window.alert(search.status + " - Something went wrong, try again later.");

  if (
    localStorage.getItem("previous_id_song") != null &&
    localStorage.getItem("previous_background") != null
  )
    document.getElementById("btnprevioussong").hidden = false;
}

export default randomSong;
