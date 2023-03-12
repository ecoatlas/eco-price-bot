import { Client, ActivityType } from 'discord.js'
import * as dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const config = {
  ids: [
    process.env.BOT_ID_ECO,
    process.env.BOT_ID_ECOX,
    process.env.BOT_ID_GAS,
  ],
  tokens: [
    process.env.BOT_TOKEN_ECO,
    process.env.BOT_TOKEN_ECOX,
    process.env.BOT_TOKEN_GAS,
  ],
  botEco: {
    id: process.env.BOT_ID_ECO,
    token: process.env.BOT_TOKEN_ECO,
    api: process.env.BOT_API_ECO,
  },
  botEcoX: {
    id: process.env.BOT_ID_ECOX,
    token: process.env.BOT_TOKEN_ECOX,
    api: process.env.BOT_API_ECOX,
  },
  botGas: {
    id: process.env.BOT_ID_GAS,
    token: process.env.BOT_TOKEN_GAS,
    api: process.env.BOT_API_GAS,
  },
  coins: [
    'eco',
    'ecox',
  ],
  currencies: [
    'usd',
  ],
}

const coingeckoQueryParams = {
  ids: config.coins,
  vs_currencies: config.currencies
}

async function getPrice() {
  const url = 'https://api.coingecko.com/api/v3/simple/price?'
  const queryParams = new URLSearchParams(coingeckoQueryParams)
  try {
    const response = await axios.get(url + queryParams)
    return response.data
  } catch (error) {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }
  }
}

async function getGasPrice() {
  const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${config.botGas.api}`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }
  }
}

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

      if (botEco) {
        (async function getEco() {
          const price = await getPrice()
          botEco.setNickname(`💸 ${price.eco.usd}`)
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
          botEcoX.setNickname(`💸 ${price.ecox.usd}`)
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
