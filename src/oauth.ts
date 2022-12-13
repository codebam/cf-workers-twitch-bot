import { addSearchParams } from "./libs";

export default (client_id: string, client_secret: string, kv: KVNamespace) =>
  console.log(client_id, client_secret) === undefined &&
  fetch(
    addSearchParams(new URL("https://id.twitch.tv/oauth2/token"), {
      client_id,
      client_secret,
      grant_type: "client_credentials",
    }).href,
    { method: "POST" }
  )
    .then((response) => response.text())
    .then((text) => kv.put("oauth", text));
