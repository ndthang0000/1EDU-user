const { UserModel } = require('../models')

const home = async (req, res) => {
  return res.render('contact')
}
const signInTeacher = async (req, res) => {
  const findUser = await UserModel.findById(req.user._id)
  if (findUser) {
    findUser.role = 1
    await findUser.save()
    return res.status(200).json({ success: true })
  }
  res.status(400).json({ success: false })
}
module.exports = {
  home,
  signInTeacher
}
