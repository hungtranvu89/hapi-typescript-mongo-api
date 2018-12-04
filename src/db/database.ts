import { connect, connection, Connection, set } from 'mongoose'

import { DB_NAME, MONGO_URL } from '../configs'

import taskModel from './dbModels/task.model'
import userModel from './dbModels/user.model'

interface IDatabase {
  userModel: typeof userModel
  taskModel: typeof taskModel
}

interface IConnectedDatabase {
  connection: Connection
  database: IDatabase
}

const connectDatabase = (): Promise<IConnectedDatabase> =>
  new Promise((resolve, reject) => {
    connection.on('error', () => {
      return reject('Unable to connect to database')
    })

    connection.once('open', () => {
      console.log('Connected to database')

      return resolve({
        connection,
        database: {
          userModel,
          taskModel
        }
      })
    })

    connect(
      MONGO_URL,
      {
        useNewUrlParser: true,
        dbName: DB_NAME,
        useFindAndModify: false
      }
    )
    set('useCreateIndex', true)
  })

export { connectDatabase, IDatabase }
