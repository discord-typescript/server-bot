import { Description, On, ArgsOf } from "@typeit/discord";
import { MessageEmbed, Role } from "discord.js";
import { COLOR } from "../enums/colors.enum";
import { ID } from "../enums/id.enum";
import { IMAGE } from "../enums/images.enum";
import { Logger } from "../services/logger.service";

@Description("Discord Member Event Handlers")
export abstract class MemberEvents {
  logger = Logger.prototype.getInstance();

  /**
   * @name memberJoin
   * @param param member - member that has just joined the server
   * @description
   * When a user joins greet them and add the member role.
   */
  @On("guildMemberAdd")
  async memberJoin([member]: ArgsOf<"guildMemberAdd">): Promise<void> {
    this.logger.info(
      `User : ${member.user.username} has joined the Discord Server.`
    );
    const guild = member.guild;

    guild.systemChannel.send(`Hello ${member}! Welcome to the **Discord.ts Library** Discord!`)

    guild.roles.fetch(ID.MEMBER_ROLE).then((role: Role) => {
      member.roles
        .add(role)
        .then((newMember) => {
          this.logger.info(`Role added to ${newMember.id}`);
        })
        .catch(() => {
          this.logger.error(`Failed to put member role on ${member.id}`);
        });
    });

    const embed = new MessageEmbed();
    embed
      .setTitle(`Welcome to Discord.TS`)
      .setDescription(
        `Hello ${member}, Please take a look at <#${ID.RULES_CHANNEL}> and <#${ID.INFO_CHANNEL}>!\n` +
        `If you have a question related to **Discord.TS** ask in one of the Help channels.`
      )
      .setColor(COLOR.BLUE)
      .setThumbnail(IMAGE.ICON);
    member.send({ embed }).then((messageSent) => {
      this.logger.info(`Sent Welcome : message id ${messageSent.id}`);
    }).catch((error) => {
      this.logger.error('Welcome DM : error', error);
    });
  }
}
