import { Server } from 'hapi'
import { Connection } from 'mongoose'

import { PORT, HOST } from '../configs'
import { createServer } from '../server'
import { connectDatabase } from '../db'
import { createRepository } from '../repositories'
import { generateToken } from '../utils'
import { pick } from 'rambda'

const baseUrl = `${HOST}:${PORT}`

describe('USERS endpoint', () => {
  let connection: Connection
  let server: Server
  let headers: {}
  const taskUser = {
    email: 'taskdemo@mail.com',
    name: 'taskUser',
    password: 'taskUser',
    id: ''
  }

  const task = {
    name: 'task',
    description: 'new task',
    id: ''
  }

  beforeAll(async done => {
    const connected = await connectDatabase()
    const repository = createRepository({ database: connected.database })
    connection = connected.connection
    server = await createServer({ repository })

    const newUser = await repository.createUser(
      pick(['email', 'name', 'password'])(taskUser)
    )
    taskUser.id = newUser.id

    const token = generateToken({
      id: taskUser.id,
      email: 'taskdemo@mail.com',
      name: 'taskUser'
    })

    headers = {
      authorization: `bearer ${token}`
    }

    done()
  })

  afterAll(async done => {
    await connection.close()
    done()
  })

  describe('POST /tasks', () => {
    test('should create new task', async () => {
      const res = await server.inject({
        method: 'POST',
        url: `${baseUrl}/tasks`,
        payload: task,
        headers
      })

      expect(res.result.id.length).toBeGreaterThan(1)
      task.id = res.result.id
    })
  })

  describe('GET /tasks', () => {
    test('should return task list of current user', async () => {
      const res = await server.inject({
        method: 'GET',
        url: `${baseUrl}/tasks`,
        headers
      })

      expect(res.result.data.length).toBeGreaterThan(0)
    })
  })

  describe('GET /tasks/{id}', () => {
    test('should return task list of current user', async () => {
      const res = await server.inject({
        method: 'GET',
        url: `${baseUrl}/tasks/${task.id}`,
        headers
      })

      expect(res.result.name).toEqual('task')
    })
  })
})
