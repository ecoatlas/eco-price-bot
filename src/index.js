import { Client, ActivityType } from 'discord.js'
import config from './config.js'
import getPrice from './price.js'
import getGasPrice from './gas.js'
import currency from './utils/formatter.js'

for (const token of config.tokens) {
  const client = new Client({
    intents: [
      'Guilds'
    ]
  })

  client.on('ready', () => {
    console.log('We ready!')
 
    client.guilds.cache.forEach((guild) => {
      const bot = client.guilds.cache.get(guild.id).members.cache
      const botEco = bot.get(config.botEco.id)
      const botEcoX = bot.get(config.botEcoX.id)
      const botGas = bot.get(config.botGas.id)

      // immediately invoked function expression which creates the function
      // then calls itself again and automatically starts the loop subsequently
      // setTimeout guarantees that there's at least an interval of delay between calls
      // makes it easier to cancel the loop if required
      if (botEco) {
        (async function getEco() {
          const price = await getPrice()
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
          const price = await getPrice()
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

  client.login(token)
}
