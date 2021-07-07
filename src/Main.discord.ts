import "reflect-metadata";

import { Client } from "@typeit/discord";
import { config as configDotenv } from "dotenv";
import { resolve } from "path";
import { Intents } from "discord.js";
import * as Path from "path";

  async function start() {
    const client = new Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
      ],
      slashGuilds: ["734970202122354709"],
      classes: [
        Path.join(__dirname, "commands", "*.{js,ts}"),
        Path.join(__dirname, "member", "*.{js,ts}"),
        Path.join(__dirname, "*.{js,ts}"),
      ],
    });
  
    client.once("ready", async () => {
      await client.initSlashes();
    });
  
    client.on("interaction", (interaction) => {
      client.executeSlash(interaction);
    });

    configDotenv({
      path: resolve(resolve(__dirname, "../env/env.variables")),
    });
  
    await client.login(process.env.DISCORD_TOKEN);
  }

start();
