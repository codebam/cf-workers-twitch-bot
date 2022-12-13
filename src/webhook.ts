import { JSONResponse, sha256, addSearchParams, responseToJSON } from "./libs";

export default class Webhook {
  api: URL;
  client_id: string;
  kv: KVNamespace;
  url: URL;

  constructor(api: URL, client_id: string, kv: KVNamespace, url: URL) {
    this.api = api;
    this.client_id = client_id;
    this.kv = kv;
    this.url = url;
  }

  // trigger getMe command of BotAPI
  getMe = () => this.execute(new URL(`${this.api}/getMe`));

  set = async (): Promise<Response> =>
    sha256(this.client_id).then((access_key) =>
      this.execute(
        addSearchParams(new URL(this.api.href), {
          type: "channel....... and we're done
          callback: `${this.url.href}/${access_key}`,
        })
      )
    );

  get = async (): Promise<Response> =>
    this.execute(new URL(`${this.api.href}/getWebhookInfo`));

  delete = async (): Promise<Response> =>
    this.execute(new URL(`${this.api.href}/deleteWebhook`));

  execute = async (url: URL): Promise<Response> =>
    fetch(url.href)
      .then((response) => responseToJSON(response))
      .then((json) => JSONResponse(json));

  webhookCommands = {
    setWebhook: this.set,
    getWebhook: this.get,
    delWebhook: this.delete,
    getMe: this.getMe,
    default: JSONResponse({ error: "Invalid command" }, 400),
  };

  process = async (url: URL): Promise<Response> =>
    this.webhookCommands[url.searchParams.get("command")]?.() ??
    this.webhookCommands.default;
}
