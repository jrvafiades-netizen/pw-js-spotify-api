// small script to get a refresh token from Spotify

const dotenv = require("dotenv");

dotenv.config();

async function main() {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", process.env.SPOTIFY_AUTH_CODE);
  params.append("redirect_uri", "http://127.0.0.1:3000/callback");

  const authHeader =
    "Basic " +
    Buffer.from(
      process.env.SPOTIFY_CLIENT_ID +
        ":" +
        process.env.SPOTIFY_CLIENT_SECRET
    ).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const data = await res.json();
  console.log(data);
}

main();
