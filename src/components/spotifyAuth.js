import {
  CLIENT_ID,
  CLIENT_SECRET,
  TOKEN_EXPIRATION,
  REDIRECT_URI,
  URL_API_TOKEN,
  SCOPE,
  AUTHORIZATION_URL,
} from "./config.js";

// CLIENT AUTHENTICATION
export async function clientAuth() {
  if (
    (localStorage.getItem("token_requested") != null &&
      (Date.now() - parseInt(localStorage.getItem("token_requested"))) / 1000 >
        TOKEN_EXPIRATION) ||
    localStorage.getItem("access_token") == null
  ) {
    //solo se solicita un token en caso de que no tenga uno o se haya vencido el actual
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
}

// USER AUTHENTICATION
export function getUserAuth() {
  let url = AUTHORIZATION_URL;
  url += "client_id=" + CLIENT_ID;
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI(REDIRECT_URI);
  url += "&scope=" + SCOPE;
  url += "&show_dialog=true";

  window.location.href = url;
}

export async function userAuth() {
  if (
    window.location.search.length > 0 &&
    localStorage.getItem("user_access_token") == null
  ) {
    let code = getCode();

    if (code != null) {
      var body = "grant_type=authorization_code";
      body += "&code=" + code;
      body += "&redirect_uri=" + encodeURI(REDIRECT_URI);

      const userToken = await fetch(URL_API_TOKEN, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
        },
        body: body,
      });
      var datos = await userToken.json();

      if (localStorage.getItem("user_access_token") == null) {
        localStorage.setItem("user_access_token", datos.access_token);
        localStorage.setItem("user_refresh_token", datos.refresh_token);
        var requested = Date.now().toString();
        localStorage.setItem("user_token_requested", requested);
      }

      window.location.href = REDIRECT_URI;
    }
  }
}

function getCode() {
  let code = null;
  const queryString = window.location.search;
  if (
    queryString.length > 0 &&
    localStorage.getItem("user_access_token") == null
  ) {
    const urlParams = new URLSearchParams(window.location.search);
    code = urlParams.get("code");
  }
  return code;
}
