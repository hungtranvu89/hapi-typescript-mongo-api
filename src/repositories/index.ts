import { IDatabase } from '../db'

import taskRepository, { ITaskRepository } from './task.repository'
import userRepository, { IUserRepository } from './user.repository'

export { IUserRepository, ITaskRepository }

export interface IRepository extends IUserRepository, ITaskRepository {}

export const createRepository = ({
  database
}: {
  database: IDatabase
}): IRepository => ({
  ...userRepository({ database }),
  ...taskRepository({ database })
})
