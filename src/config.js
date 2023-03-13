export default {
  auth: [
    process.env.BOT_TOKEN_ECO,
    process.env.BOT_TOKEN_ECOX,
    process.env.BOT_TOKEN_GAS,
  ],
  botEco: {
    id: process.env.BOT_ID_ECO,
    api: process.env.BOT_API_ECO,
  },
  botEcoX: {
    id: process.env.BOT_ID_ECOX,
    api: process.env.BOT_API_ECOX,
  },
  botGas: {
    id: process.env.BOT_ID_GAS,
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
