export interface IUser {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
  updateAt: Date

  validatePassword(requestPassword: string): boolean
}

export enum ETaskStatus {
  TODO = 'todo',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export const taskStatusArray = [
  ETaskStatus.TODO,
  ETaskStatus.ONGOING,
  ETaskStatus.COMPLETED,
  ETaskStatus.CANCELLED
]

export interface ITask {
  id: string
  userId: string
  name: string
  description: string
  status: ETaskStatus
  createdAt: Date
  updateAt: Date
}

export interface IPagingOptions {
  skip: number
  top: number
}

export interface IPageOf<T> {
  data: T[]
  total: number
}
