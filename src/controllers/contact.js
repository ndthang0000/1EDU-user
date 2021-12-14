const { UserModel } = require('../models')

const home = async (req, res) => {
  return res.render('contact')
}
const signInTeacher = async (req, res) => {
  try {
    const findUser = await UserModel.findByIdAndUpdate(req.user._id, { role: 1 })
    if (findUser) {
      return res.status(200).json({ success: true })
    }
    res.status(400).json({ success: false })
  } catch (e) {
    res.status(400).json({ success: false })
  }
}
module.exports = {
  home,
  signInTeacher
}
