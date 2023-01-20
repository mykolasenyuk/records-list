const express = require('express')
const { validation } = require('../../middlewares')
const { joiSchema } = require('../../models/record')
const { records: ctrl } = require('../../controllers')

const router = express.Router()
const recordsValidation = validation(joiSchema)

router.get('/', ctrl.getAllRecords)
router.post('/', recordsValidation, ctrl.addRecord)
router.get('/:recordId', ctrl.getRecordById)
router.delete('/:recordId', ctrl.dltRecordById)
// router.put('/:bookId', booksValidation, ctrl.updBook)
// router.get('/:bookId', ctrl.getBookById)

module.exports = router
