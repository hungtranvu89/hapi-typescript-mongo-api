import { Server } from 'hapi'

import { TasksRoute, UsersRoute } from '../api'
import { IRepository } from '../repositories'

interface IOptions {
  server: Server
  repository: IRepository
}

export default ({ server, repository }: IOptions) => {
  server.realm.modifiers.route.prefix = '/'
  server.route(UsersRoute({ repository }).concat(TasksRoute({ repository })))
}
