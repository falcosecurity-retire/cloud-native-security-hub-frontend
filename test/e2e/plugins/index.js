const envConfig = require('dotenv').config()

module.exports = (on, config) => {
  return { env: envConfig.parsed }
}
