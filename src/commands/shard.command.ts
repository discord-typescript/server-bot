import { Description, Discord, Guard, Slash } from "@typeit/discord";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { COLOR } from "../enums/colors.enum";
import { IMAGE } from "../enums/images.enum";
import { LINK } from "../enums/links.enum";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";

@Discord()
export abstract class Help {

  logger = Logger.prototype.getInstance();

  /**
   * @name shard
   * @param command
   * object is command message from the author.
   * @description
   * Sends the Discord.TS & Discord.JS Documentation link for sharding.
   */
  @Slash("shard")
  @Guard(NotBot)
  @Description("Important information for sharding.")
  async shard(interaction: CommandInteraction): Promise<void> {
    this.logger.info("Sending Sharding Docs");

    const embed = new MessageEmbed();
    embed
      .setTitle(`Discord.TS Sharding`)
      .setURL(LINK.SHARDING_GUIDE)
      .setDescription(
        `If you are in **2,000** guilds and your bot compiles with **tsc** sharding is possible!\n` +
        `Click the title to see the guide!\n` +
        `Please read [discord.js sharding guide](${LINK.DISCORD_JS_SHARDING}) as well.`
      )
      .setColor(COLOR.BLUE)
      .setThumbnail(IMAGE.ICON);

      interaction.reply({ embeds: [embed] }).then(() => {
        this.logger.info(`Sent Sharding`);
      }).catch((error) => {
        this.logger.error('Sharding message : error', error);
      });
  }
}
