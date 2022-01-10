
const { MessageEmbed, MessageButton, Permissions, Message, Client, MessageActionRow }= require("discord.js");

module.exports = {
	name: "weryfikacja",
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
    run: async (client, message, args) =>{
    if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return; /// Jeśli użytkownik nie ma permisji `Administrator` nie będzie mógł wykonać komendy
    const embed = new MessageEmbed()
    .setColor("#009cc3") /// Kolor embeda
    .setTitle('System weryfikacji') /// Tytuł embeda
    .setDescription(`Kliknij aby się zweryfikować`) /// Opis embeda
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId('weryfikacja-btn') /// Id Przycisku
        .setLabel('⁣⁣⁣⁣⁣⁣      ZWERYFIKUJ!     ') /// Napis na przycisku
        .setStyle('PRIMARY'), //// Styl przycisku
    );
    message.delete()
    message.channel.send({embeds: [embed], components: [row]})
    }

}