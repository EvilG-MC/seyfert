# biscuit

## A brand new bleeding edge non bloated Discord library

<img align="right" src="https://raw.githubusercontent.com/oasisjs/biscuit/main/assets/icon.svg" alt="biscuit"/>

## Install (for [node18](https://nodejs.org/en/download/))

```sh-session
npm install @biscuitland/core
yarn add @biscuitland/core
```

for further reading join our [Discord](https://discord.gg/zqtPgyaFpV)

## Most importantly, biscuit is:

- A wrapper to interface the Discord API
- A bleeding edge library

Biscuit is primarily inspired by Discord.js and Discordeno but it does not include a cache layer by default, we believe
that you should not make software that does things it is not supposed to do.

## Why biscuit?:

- [Minimal](https://en.wikipedia.org/wiki/Unix_philosophy), non feature-rich!
- Scalable

## Example bot (TS/JS)

```js
import { ChatInputApplicationCommandBuilder, Session } from '@biscuitland/core';
import { GatewayIntents } from '@biscuitland/api-types';

const session = new Session({ token: 'your token', intents: GatewayIntents.Guilds });

const commands = [
    new ChatInputApplicationCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!')
        .toJSON()
]

session.events.on('ready', async ({ user }) => {
    console.log('Logged in as:', user.username);
    await session.upsertApplicationCommands(commands, 'GUILD_ID');
});

session.events.on('interactionCreate', (interaction) => {
    if (interaction.isCommand()) {
        if (interaction.commandName === 'ping') {
            interaction.respond({ with: { content: 'pong!' } });
        }
    }
});

session.start();
```

## Links
* [Website](https://biscuitjs.com/)
* [Documentation](https://docs.biscuitjs.com/)
* [Discord](https://discord.gg/evqgTQYqn7)
* [core](https://www.npmjs.com/package/@biscuitland/core) | [api-types](https://www.npmjs.com/package/@biscuitland/api-types) | [cache](https://www.npmjs.com/package/@biscuitland/cache) | [rest](https://www.npmjs.com/package/@biscuitland/rest) | [ws](https://www.npmjs.com/package/@biscuitland/ws)

## Known issues:
- node18 is required to run the library, however --experimental-fetch flag should work on node16+
- redis cache (wip)
- no optimal way to deliver a webspec bun version to the registry (#50)
