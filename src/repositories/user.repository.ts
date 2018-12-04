import { IDatabase } from '../db'
import { IUser } from '../models'

export interface IUserRepository {
  findUserById(id: string): Promise<IUser>
  checkUserById(id: string): Promise<boolean>
  findUserByEmail(email: string): Promise<IUser>
  createUser(newInfo: {
    email: string
    name: string
    password: string
  }): Promise<IUser>
  updateUser(
    id: string,
    newInfo: {
      email: string
      name: string
      password: string
    }
  ): Promise<IUser>
  deleteUser(id: string): Promise<IUser>
}

interface IOptions {
  database: IDatabase
}

export default ({ database }: IOptions): IUserRepository => ({
  findUserById: id => database.userModel.findById(id).exec(),
  checkUserById: id =>
    database.userModel
      .findById(id)
      .select('_id')
      .lean(true)
      .exec()
      .then(Boolean),
  findUserByEmail: email => database.userModel.findOne({ email }).exec(),
  createUser: newInfo => database.userModel.create(newInfo),
  updateUser: (id, newInfo) =>
    database.userModel
      .findByIdAndUpdate(id, { $set: newInfo }, { new: true })
      .exec(),
  deleteUser: id => database.userModel.findByIdAndRemove(id).exec()
})
