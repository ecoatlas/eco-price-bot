import axios from 'axios'
import config from './config.js'

// Asynchronous requests are better/cleaner handling promises as pauses until the promise is resolved
export async function getTokenPrice() {

  // Variables whose values are passed in the URL in the form of key-value pair
  const coingeckoQueryParams = {
    ids: config.coins,
    vs_currencies: config.currencies
  }

  // Interface the URL to allow trivial manipulation of the query string
  // Coingecko API endpoint
  const queryParams = new URLSearchParams(coingeckoQueryParams)
  const url = 'https://api.coingecko.com/api/v3/simple/price?'

  // Handle errors with a try...catch block
  try {
    // Await until the promise is resolved and return results
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
  // Etherscan API endpoint
  // The API key is optional, will work without it in the environment variables
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
