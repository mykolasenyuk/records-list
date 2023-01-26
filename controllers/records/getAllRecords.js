const { Record } = require('../../models')

const getAllRecords = async (req, res, next) => {
  try {
    const { limit = 2, page = 1} = req.query
    const { docs: records, ...rest } = await Record.paginate({},{limit,page})

    res.json({
      status: '✔️ Success',
      code: 200,
      data: { records, ...rest },
    })
  } catch (error) {
    next(error)
  }
}
module.exports = getAllRecords
