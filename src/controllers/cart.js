const { CartModel } = require('../models')
const { helper } = require('../helpers')
const home = async (req, res) => {
  if (req.user) {
    const allCart = await CartModel.find({ studentId: req.user._id }).populate('courseId')
    return res.render('cart', { allCart, formatMoney: helper.formatMoney, sumCart: helper.sumCart, sumCartDiscount: helper.sumCartDiscount })
  }
  console.log('vo day')
  return res.render('cart', { allCart: [] })
}
const cart = async (req, res) => {
  console.log(req.params)
  const quantity = await CartModel.count({ studentId: req.params.id })
  res.status(200).json({ success: true, quantity: quantity })
}
const add = async (req, res) => {
  const { courseId, studentId } = req.body
  const oldCart = await CartModel.findOne({ courseId, studentId })
  if (oldCart) {
    return res.status(400).json({ success: false })
  }
  const newCart = new CartModel({
    courseId,
    studentId
  })
  await newCart.save()
  res.status(201).json({ success: true })
}
const deletee = async (req, res) => {
  try {
    const { courseId, studentId } = req.body
    console.log(courseId, studentId)
    const result = await CartModel.deleteOne({ courseId: courseId, studentId: studentId })
    console.log(result)
    res.status(200).json({ success: true })
  } catch (e) {
    res.status(500).json({ success: false })
  }
}
module.exports = {
  home,
  cart,
  add,
  deletee
}
