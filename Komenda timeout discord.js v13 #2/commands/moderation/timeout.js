const { Client, Message, MessageEmbed, Permissions, MessageActionRow, MessageButton} = require('discord.js');
const parseTime = require('parse-duration').default
const prettyMs = require('pretty-ms')
const ms = require('ms')
module.exports = {
    name: 'timeout',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        if(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) { // wymagana permisja do użycia rangi
        const user = message.mentions.members.first(); /// Pobiera oznaczoną osobe
        if (user) { // Jesli użytkownik został oznaczony
            if (user.roles.highest.position >= message.member.roles.highest.position) { /// Sprawdza czy oznaczona osoba ma  taką samą/wyższą range niż my 
                return message.reply('Nie możesz wyciszyć wyższej rangi od siebie') /// Blokuje nadawanie timeout'a dla rangi wyższej/równej sobie
            }
            if(user.id === message.author.id) { /// sprawdza czy oznaczona osoba to autor
             return message.reply("Nie możesz sam siebie wyiszyć") /// Blokuje nadanie timeout'a samemu sobie
            }
            const time = args.slice(1).join(' ') /// pobiera informacje o czasie
            if(!time) return message.reply('Nie podałeś czasu') /// Wysyła wiadomość jeśli użytkownik nie podał czasu
            const prasedTime = parseTime(time) /// Zamienia czas na liczbe całkowitą w milisekundach
            if(prasedTime < ms('1m') || prasedTime > ms('28d')) return message.reply('Podaj odpowiedni czas') /// Sprawdza czy użytkownik podał czas większy niż 1 minuta a mniejszty niż 28dni 
                                                                                                             ///  (JavaScript nie zapisuje większej liczby niż 28 dni w milisekundach dlatego takie ograniczenie)
            await user.timeout(prasedTime) /// Nadaje timeout'a
            return message.reply(`${user} został wyciszony na **${prettyMs(prasedTime, {verbose: true})}**`) /// Wysyła wiadomość na kanał z informacją o timeoucie
        } else { // Sprawdza czy użytkownik został oznaczony
            message.channel.send('Błąd!') /// Wysyła wiadomość jeśli użytkownik nie zostanie oznaczony
        }
    }
}
}