const {
  createShow
} = require('../utils/show_utils')

const createNewShow = async (req,res) => {
  try {
    const show = await createShow(req)
    res.json(show)
  } catch (err) {
    res.status(500)
    res.json(err)
  }  
}

module.exports = {
  createNewShow
}