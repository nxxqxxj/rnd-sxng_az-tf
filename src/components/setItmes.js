export function setSongFrame() {
  var link = "https://open.spotify.com/embed?uri=spotify:track:";
  document
    .querySelector("#reproductor")
    .setAttribute("src", link + localStorage.getItem("current_id_song"));
}

export function setBackground() {
  document.body.style.backgroundImage =
    "url(" + localStorage.getItem("current_background") + ")";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
}

export function setPreviousSong() {
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

export function enableAddToPlaylist() {
  if (localStorage.getItem("user_access_token") != null) {
    document.getElementById("btnuseraccess").hidden = true;
    document.getElementById("btnaddtoplaylist").hidden = false;
  } else {
    document.getElementById("btnuseraccess").hidden = false;
    document.getElementById("btnaddtoplaylist").hidden = true;
  }
}
