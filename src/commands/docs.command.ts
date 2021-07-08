import { Description, Discord, Guard, Slash } from "@typeit/discord";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { COLOR } from "../enums/colors.enum";
import { IMAGE } from "../enums/images.enum";
import { LINK } from "../enums/links.enum";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";

@Discord()
export abstract class Docs {

  logger = Logger.prototype.getInstance();

  /**
   * @name docs
   * @param command
   * object is command message from the author.
   * @description
   * Sends the Discord.TS Documentation link to the author.
   */
  @Slash("docs")
  @Guard(NotBot)
  @Description("Sends documentation for writing a discord bot with discord.ts.")
  async docs(interaction: CommandInteraction): Promise<void> {
    this.logger.info("Sending Docs");
    
    const embed = new MessageEmbed();
    embed
    .setTitle(`Discord.TS Documentation`)
    .setURL(LINK.DISCORD_TS_DOCS)
    .setDescription(
      `Here is the link to the Docs for the [Discord.TS](${LINK.REPOSITORY}) library.\nPlease check the [Discord.JS](${LINK.DISCORD_JS_DOCS}) docs as well!\n`
      )
      .setColor(COLOR.BLUE)
      .setThumbnail(IMAGE.ICON)
      .setFooter("Clicking the blue text will take you to the docs.");

    interaction.reply({ embeds: [embed] }).then(() => {
      this.logger.info(`Sent Docs`);
    }).catch((error) => {
      this.logger.error('Docs message : error', error);
    });
  }
}
