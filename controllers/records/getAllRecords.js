const { Record } = require('../../models')

const getAllRecords = async (req, res, next) => {
  try {
    const records = await Record.find({})
    console.log(records)
    res.json({
      status: '✔️ Success',
      code: 200,
      records,
    })
  } catch (error) {
    next(error)
  }
}
module.exports = getAllRecords
