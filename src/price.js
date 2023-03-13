import axios from 'axios'
import config from './config.js'

export async function getTokenPrice() {
  const coingeckoQueryParams = {
    ids: config.coins,
    vs_currencies: config.currencies
  }
  const queryParams = new URLSearchParams(coingeckoQueryParams)
  const url = 'https://api.coingecko.com/api/v3/simple/price?'

  try {
    const response = await axios.get(url + queryParams)
    return response.data
  } catch (error) {
    if (error.response) {
      // Request made but the server responded with an error
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      // Request made but no response is received from the server
      console.log(error.request)
    } else {
      // Error occured while setting up the request
      console.log('Error', error.message)
    }
  }
}

export async function getGasPrice() {
  const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${config.botGas.api}`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    if (error.response) {
      // Request made but the server responded with an error
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      // Request made but no response is received from the server
      console.log(error.request)
    } else {
      // Error occured while setting up the request
      console.log('Error', error.message)
    }
  }
}
