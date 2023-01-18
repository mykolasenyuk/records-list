const { Record } = require('../../models')
const { Conflict } = require('http-errors')

const addRecord = async (req, res, next) => {
  try {
    const { text } = req.body

    const existRecord = await Record.findOne({ text })
    if (existRecord) {
      throw new Conflict(`Record already exist`)
    }

    const newRecord = { ...req.body }
    console.log(req.body)
    const result = await Record.create(newRecord)
    res.json({
      status: 'Success',
      code: 201,
      message: `✔️ Record '${req.body.text}' added`,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}
module.exports = addRecord
