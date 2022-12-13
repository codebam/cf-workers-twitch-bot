////////////////////////////////////////////////////////////////////
////             Twitch Bot using Cloudflare Worker             ////
////////////////////////////////////////////////////////////////////
////  Author: Nikhil John                                       ////
////  Repo: https://github.com/nikhiljohn10/telegram-bot-worker ////
////  License: MIT                                              ////
////                                                            ////
////  Author: Sean Behan                                        ////
////  Repo: https://github.com/codebam/cf-workers-telegram-bot  ////
////  License: Apache-2.0                                       ////
////                                                            ////
////  Author: Sean Behan                                        ////
////  Repo: https://github.com/codebam/cf-workers-twitch-bot    ////
////  License: Apache-2.0                                       ////
////////////////////////////////////////////////////////////////////

import commands from "./commands";
import Handler from "./handler";
import renew_oauth from "./oauth";

interface Environment {
  SECRET_TWITCH_CLIENT_ID: string;
  SECRET_TWITCH_CLIENT_SECRET: string;
  KV_TWITCH_STORAGE: KVNamespace;
}

export default {
  scheduled: async (
    event: Event,
    env: Environment,
    ctx: EventContext<Environment, string, string>
  ) =>
    ctx.waitUntil(
      renew_oauth(
        env.SECRET_TWITCH_CLIENT_ID,
        env.SECRET_TWITCH_CLIENT_SECRET,
        env.KV_TWITCH_STORAGE
      )
    ),
  fetch: async (request: Request, env: Environment) =>
    new Handler([
      {
        bot_name: "cf-workers-twitch-bot",
        client_id: env.SECRET_TWITCH_CLIENT_ID,
        commands: {
          "!ping": commands.ping,
          "!toss": commands.toss,
          "!epoch": commands.epoch,
          "!kanye": commands.kanye,
          "!bored": commands.bored,
          "!joke": commands.joke,
          "!roll": commands.roll,
          "!get": commands._get,
          "!set": commands._set,
          "!code": commands.code,
        },
        kv: env.KV_TWITCH_STORAGE,
      },
    ]).handle(request),
};
