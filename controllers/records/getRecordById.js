const { Record } = require('../../models')

const getRecordById = async (req, res, next) => {
  try {
    const { recordId } = req.params

    const record = { recordId }
    const result = await Record.findById(record.recordId)
    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: ` Record with ID=${record.recordId} not found`,
      })
      return
    }
    res.json({
      status: 'Success',
      code: 200,
      result,
    })
  } catch (error) {
    next(error)
  }
}
module.exports = getRecordById
