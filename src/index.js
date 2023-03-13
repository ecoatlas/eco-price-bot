import { Client, ActivityType } from 'discord.js'
import config from './config.js'
import { getTokenPrice, getGasPrice } from './price.js'
import currency from './utils/formatter.js'

// Iterate over auth tokens for all clients
for (const token of config.auth) {

  // Declare intent so that bots can update the nickname
  const client = new Client({
    intents: [
      'Guilds'
    ]
  })

  // Execute functions when the client is ready to start
  client.on('ready', () => {
    console.log('We ready!')

    // Discord.js relies heavily on caching to provide its functionality
    // Access the cache to get all guilds the clients are part of
    client.guilds.cache.forEach((guild) => {

      // Get the cache for all clients' ids
      const bot = client.guilds.cache.get(guild.id).members.cache
      const botEco = bot.get(config.botEco.id)
      const botEcoX = bot.get(config.botEcoX.id)
      const botGas = bot.get(config.botGas.id)

      // IIFE (Immediately Invoked Function Expression)
      // Create the function, run the moment it's invoked, and auto start the loop subsequently
      // Get price and update nickname
      // setTimeout is less accurate than setInterval but guarantees at least an interval of delay so calls don't overlap
      // Update client status to inform which asset the client is watching
      if (botEco) {
        (async function getEco() {
          const price = await getTokenPrice()
          botEco.setNickname(`💸 ${currency(price.eco.usd)}`)
          setTimeout(getEco, 60 * 1000)
        })()

        client.user.setPresence({
          activities: [{
            name: `ECO price`,
            type: ActivityType.Watching
          }]
        })
      }

      if (botEcoX) {
        (async function getEcoX() {
          const price = await getTokenPrice()
          botEcoX.setNickname(`💸 ${currency(price.ecox.usd)}`)
          setTimeout(getEcoX, 60 * 1000)
        })()

        client.user.setPresence({
          activities: [{
            name: `ECOx price`,
            type: ActivityType.Watching
          }]
        })
      }

      if (botGas) {
        (async function getGas() {
          const price = await getGasPrice()
          botGas.setNickname(`⚡️${price.result.ProposeGasPrice} Gwei`)
          setTimeout(getGas, 60 * 1000)
        })()

        client.user.setPresence({
          activities: [{
            name: `Ethereum Gas`,
            type: ActivityType.Watching
          }]
        })
      }
    })
  })

  // Log in all clients
  client.login(token)
}
