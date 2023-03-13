# Eco Price Bot
 
Suite of Discord bots for tracking the Eco Currency and Ethereum Gas prices. It automatically updates the bots' nickname every minute with the most recent prices.

**Features:**
- Simple: tickers for ECO, ECOx, and Ethereum Gas
- Efficient: combines three bots into a single app to make maintenance and code repetition as simple as feasible
- Secure: only one Discord permission is necessary



## Invite to Your Discord Server

You can add these bots to your server. You don't have to add them all; you can just choose the ones you like most.

**Invites:**
- <a href="https://discord.com/api/oauth2/authorize?client_id=1077820281701277788&permissions=67108864&scope=bot" target="_blank">ECO Price bot invite</a>
- <a href="https://discord.com/api/oauth2/authorize?client_id=1077820544919023727&permissions=67108864&scope=bot" target="_blank">ECOx Price bot invite</a>
- <a href="https://discord.com/api/oauth2/authorize?client_id=1077786551385333950&permissions=67108864&scope=bot" target="_blank">Ethereum Gas Price bot invite</a>

**Suggested method:**
- Create a role for the bots and enable the option `Display role members separately from online members`
- Add the bots to the role
- Allow only `Change Nickname` permission so that the bot can update its username with pricing



## Setup Your Own Bots

Follow the guidelines below if you'd rather host and control your own bots.

1. Create your bots in the [Discord Developer Portal](https://discord.com/developers/applications 'Discord Portal') by following this [guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html)
2. Add your bots to the Discord server by following this [guide](https://discordjs.guide/preparations/adding-your-bot-to-servers.html)
3. Clone this repo:
   ```
   git clone https://github.com/ecoatlas/eco-price-bot
   ```
4. Make a copy of the `.env.example` file, rename it to `.env`, and then update it with your keys:
    ```
    BOT_ID...=discord_client_id
    BOT_TOKEN...=discord_bot_token
    BOT_API...=coingecko_or_etherscan_api
    ```
5. Install dependencies:
   ```
   npm install
   ```
6. Run the process:
   - for development:
   ```
   npm run dev
   ```
   - for production:
   ```
   npm install pm2 -g
   npm start
   ```



## Bugs & Features

You are welcome to create a Github issue if you have any suggestions, feature requests, or found a bug.
