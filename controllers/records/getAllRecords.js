const { Record } = require('../../models')

const getAllRecords = async (req, res, next) => {
  try {
    const { limit = 15, page = 1} = req.query
    const { docs: records, ...rest } = await Record.paginate({},{limit,page})
    const totalDuration = await Record.aggregate([
      {
        $group: { _id: " ", total: { $sum: "$duration" } },
      },
    ])

    res.status(200).json({totalDuration:totalDuration[0],records, ...rest})
  } catch (error) {
    next(error)
  }
}
module.exports = getAllRecords
