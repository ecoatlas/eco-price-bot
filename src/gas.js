import axios from 'axios'
import config from './config.js'

const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${config.botGas.api}`

async function getGasPrice() {
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

export default getGasPrice
