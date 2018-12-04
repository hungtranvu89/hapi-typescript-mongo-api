import { Server } from 'hapi'

import { jwtAuth, log, swagger } from '../plugins'
import { IRepository } from '../repositories'

interface IOptions {
  server: Server
  repository: IRepository
}

export default ({ server, repository }: IOptions) =>
  server.register([swagger(), log({}), jwtAuth({ repository })])
