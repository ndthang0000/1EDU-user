const moment = require('moment')

const formatTime = (date) => {
  if (date) {
    return moment(date).format('LL')
  }
}

module.exports = {
  formatTime
}
