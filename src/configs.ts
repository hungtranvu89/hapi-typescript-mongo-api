import * as joi from 'joi'

const configsSchema = joi.object().keys({
  PORT: joi.number().required(),
  HOST: joi.string().required(),
  MONGO_URL: joi.string().required(),
  DB_NAME: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  JWT_EXP: joi.number().required()
})

const PORT = Number(process.env.PORT)
const HOST = String(process.env.HOST)
const MONGO_URL = String(process.env.MONGO_URL)
const DB_NAME = String(process.env.DB_NAME)
const JWT_SECRET = String(process.env.JWT_SECRET)
const JWT_EXP = Number(process.env.JWT_EXP)

try {
  joi.assert(
    { PORT, HOST, MONGO_URL, DB_NAME, JWT_SECRET, JWT_EXP },
    configsSchema
  )
} catch (e) {
  console.error('Configuration error:', e.message)
  process.exit(1)
}

export { PORT, HOST, MONGO_URL, DB_NAME, JWT_SECRET, JWT_EXP }
export default { PORT, HOST, MONGO_URL, DB_NAME, JWT_SECRET, JWT_EXP }
