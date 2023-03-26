const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const URL_API_TOKEN = "https://accounts.spotify.com/api/token";

async function clientAuth() {
  const token = await fetch(URL_API_TOKEN, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
    },
    body: "grant_type=client_credentials",
  });
  var datos = await token.json();

  localStorage.setItem("access_token", datos.access_token);
  localStorage.setItem("token_expires_in", datos.expires_in);
  var requested = Date.now().toString();
  localStorage.setItem("token_requested", requested);
}

export default clientAuth;
