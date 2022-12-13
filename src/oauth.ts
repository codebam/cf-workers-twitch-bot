import { addSearchParams } from "./libs";

export default (client_id: string, client_secret: string, kv: KVNamespace) =>
  fetch(
    addSearchParams(new URL("https://id.twitch.tv/oauth2/token"), {
      client_id,
      client_secret,
      grant_type: "client_credentials",
    }).href
  )
    .then((response) => response.text())
    .then((text) => kv.put("oauth", text));
