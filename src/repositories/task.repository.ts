import { IDatabase } from '../db'
import { ETaskStatus, IPageOf, IPagingOptions, ITask } from '../models'

export interface ITaskRepository {
  findUserTasks(
    userId: string,
    options: IPagingOptions
  ): Promise<IPageOf<ITask>>
  findUserTaskById(userId: string, id: string): Promise<ITask>
  createUserTask(
    userId: string,
    newInfo: {
      name: string
      description: string
    }
  ): Promise<ITask>
  updateUserTask(
    userId: string,
    id: string,
    newInfo: {
      name?: string
      description?: string
      status?: ETaskStatus
    }
  ): Promise<ITask>
  deleteUserTask(userId: string, id: string): Promise<ITask>
}

interface IOptions {
  database: IDatabase
}

export default ({ database }: IOptions): ITaskRepository => ({
  findUserTasks: async (userId, options) => {
    const query = { userId }
    const [total, data] = await Promise.all([
      database.taskModel.countDocuments(query).exec(),
      database.taskModel
        .find(query)
        .skip(options.skip)
        .limit(options.top)
        .exec()
    ])

    return {
      total,
      data
    }
  },
  findUserTaskById: (userId, id) =>
    database.taskModel.findOne({ userId, _id: id }).exec(),
  createUserTask: (userId, newInfo) =>
    database.taskModel.create({
      ...newInfo,
      userId,
      status: ETaskStatus.TODO
    }),
  updateUserTask: (userId, id, newInfo) =>
    database.taskModel
      .findOneAndUpdate({ userId, _id: id }, { $set: newInfo }, { new: true })
      .exec(),
  deleteUserTask: (userId, id) =>
    database.taskModel.findOneAndDelete({ userId, _id: id }).exec()
})
