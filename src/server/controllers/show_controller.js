const {
  createShow
} = require('../utils/show_utils')

const createNewShow = async (req,res) => {
  try {
    const show = await createShow(req)
    show.populate('company', (err,show) => {
      if (err) {
        res.status(500),
        res.json(err)
      }
      show.company.shows.push(show._id)
      res.json(show)
    })
  } catch (err) {
    res.status(500)
    res.json(err)
  }  
}

module.exports = {
  createNewShow
}