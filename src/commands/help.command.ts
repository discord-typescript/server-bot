import { Description, Discord, Guard, Slash } from "@typeit/discord";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { COLOR } from "../enums/colors.enum";
import { IMAGE } from "../enums/images.enum";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";

@Discord()
export abstract class Help {

  logger = Logger.prototype.getInstance();

  /**
   * @name help
   * @param command
   * object is command message from the author.
   * @description
   * Sends the list of commands as a dm to the author.
   */
  @Slash("help")
  @Guard(NotBot)
  @Description("Send a list of the available commands.")
  async help(interaction: CommandInteraction): Promise<void> {
    this.logger.info("Sending Help");

    const embed = new MessageEmbed();
    embed
      .setTitle(`Discord.TS Help`)
      .setDescription(
        `Here is a list of my available commands.\n`
      )
      .addField('docs', 'Provides a link to the __Discord TS__ and __Discord JS__ Documentation.')
      .addField('help', 'Sends this list of my commands to the author.')
      .addField('shard', 'Sends the __Discord TS__ and __Discord JS__ guides for sharding.')
      .setColor(COLOR.BLUE)
      .setThumbnail(IMAGE.ICON);

      interaction.reply({ embeds: [embed], ephemeral: true }).then(() => {
        this.logger.info(`Sent Help`);
      }).catch((error) => {
        this.logger.error('Help message : error', error);
      });
  }
}
