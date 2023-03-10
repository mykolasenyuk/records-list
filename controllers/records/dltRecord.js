const { Record } = require('../../models')

const dltRecordById = async (req, res, next) => {
  try {
    const { recordId } = req.params

    const record = { recordId }
    const result = await Record.findByIdAndDelete(record.recordId)
    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: ` Record with ID=${record.recordId} not found`,
      })
      return
    }
    res.json({
      code: 200,
    })
  } catch (error) {
    next(error)
  }
}
module.exports = dltRecordById
