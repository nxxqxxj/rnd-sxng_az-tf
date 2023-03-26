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
