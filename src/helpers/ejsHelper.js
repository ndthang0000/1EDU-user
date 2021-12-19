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
const newLine = (a) => {
  if (a) return a.replace(/\n/g, '<br /><i class="bi bi-check-lg" style="color:#d744f5; font-size: 20px;font-weight: 650;margin-left: 10px;"></i>')
}
const newLinee = (a) => {
  if (a) return a.replace(/\n/g, '<br />')
}
const sum = (arr) => {
  return arr.reduce((total, item) => { return total + item.feeDiscount }, 0)
}
const sumCartDiscount = (arr) => {
  return arr.reduce((total, item) => { return total + (item.courseId.fee - item.courseId.feeDiscount) * item.quantity }, 0)
}
const sumCart = (arr) => {
  return arr.reduce((total, item) => { return total + item.courseId.feeDiscount * item.quantity }, 0)
}
module.exports = {
  formatTime,
  formatTimeType2,
  formatMoney,
  newLine,
  sum,
  sumCartDiscount,
  sumCart,
  newLinee
}
