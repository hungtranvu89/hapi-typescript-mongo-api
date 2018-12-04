import { connectDatabase } from './db'
import { createRepository } from './repositories'
import { createServer } from './server'

const startApp = async () => {
  const { database } = await connectDatabase()

  const repository = createRepository({ database })

  const server = await createServer({
    repository
  })

  await server.start()

  console.info('Server started at:', server.info)
}

startApp().catch(console.error)
