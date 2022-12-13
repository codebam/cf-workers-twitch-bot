import { addSearchParams } from "./libs";

export default (client_id: string, client_secret: string, kv: KVNamespace) =>
  fetch(
    addSearchParams(new URL("https://id.twitch.tv/oauth2/token"), {
      client_id,
      client_secret,
      grant_type: "client_credentials",
    }).href,
    { method: "POST" }
  )
    .then((response) => response.text())
    .then((text) => kv.put("OAUTH_TOKEN", text));
