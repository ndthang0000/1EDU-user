const moment = require('moment')

function format2 (n, currency) {
  return n.toFixed(0).replace(/./g, function (c, i, a) {
    return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c
  }) + currency
}
const formatTime = (date) => {
  if (date) {
    return moment(date).format('LL')
  }
}
const formatTimeType2 = (date) => {
  if (date) {
    return moment(date).format('YYYY-MM-DD')
  }
}
const formatMoney = (m) => {
  if (m) {
    return format2(m, 'đ')
  }
}
module.exports = {
  formatTime,
  formatTimeType2,
  formatMoney
}
