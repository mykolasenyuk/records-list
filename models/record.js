const { Schema, model } = require('mongoose')
const Joi = require('joi')
const mongoosePaginate = require('mongoose-paginate-v2')

const recordSchema = Schema(
  {
    text: {
      type: String,
      required: [true, 'text is required'],
    },
      duration:{
          type:Number,
          required:[true, 'duration is required'],
      },
    voice_record: {
      type: String,
      required: [true, 'voice_record is required'],
    },

  },

  { versionKey: false, timestamps: true },
)

const joiSchema = Joi.object({
    text: Joi.string().min(3),
    voice_record: Joi.string(),
    duration:Joi.number(),
})

recordSchema.plugin(mongoosePaginate)

const Record = model('record', recordSchema)

module.exports = {
  Record,
  joiSchema,
}
