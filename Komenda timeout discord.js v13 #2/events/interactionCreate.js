const client = require("../index");

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
    /// Buttons
    if (interaction.isButton()){
        /// weryfikacja
        if(interaction.customId === "weryfikacja-btn") {
            if(interaction.member.roles.cache.has("ID")){ // ID twojej roli z weryfikacja
                try {
                    await interaction.reply({ content: 'Już się zweryfikowałeś', components: [], ephemeral: true })
                } catch (err) {
                    console.log(err)
                }
            }else { 
                interaction.member.roles.add("ID")  // ID twojej roli z weryfikacja
                await interaction.reply({ content: 'Zweryfikowano pomyślnie!', components: [], ephemeral: true })
            }
        }
    }
    /// Select menu
    if (interaction.isSelectMenu()) {

    }
});
