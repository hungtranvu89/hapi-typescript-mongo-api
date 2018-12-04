import { Server } from 'hapi'
import { Connection } from 'mongoose'
import jwtDecode from 'jwt-decode'

import { PORT, HOST } from '../configs'
import { createServer } from '../server'
import { connectDatabase } from '../db'
import { createRepository } from '../repositories'

const baseUrl = `${HOST}:${PORT}`

describe('USERS endpoint', () => {
  let connection: Connection
  let server: Server
  beforeAll(async done => {
    const connected = await connectDatabase()
    const repository = createRepository({ database: connected.database })
    connection = connected.connection
    server = await createServer({ repository })
    done()
  })

  afterAll(async done => {
    await connection.close()
    done()
  })

  describe('POST /users', () => {
    test('should return created user info', async () => {
      const newUser = {
        name: 'name',
        email: 'mail@mail.com',
        password: 'password'
      }
      const res = await server.inject({
        method: 'POST',
        url: `${baseUrl}/users`,
        payload: newUser
      })
      expect(res.result.id).toBeDefined()
      expect(res.result.name).toEqual(newUser.name)
      expect(res.result.email).toEqual(newUser.email)
    })
  })

  describe('POST /users/login', () => {
    test('should return a valid token', async () => {
      const user = {
        email: 'mail@mail.com',
        password: 'password'
      }
      const res = await server.inject({
        method: 'POST',
        url: `${baseUrl}/users/login`,
        payload: user
      })
      const decoded = jwtDecode(res.result.token)
      expect(decoded.email).toEqual(user.email)
    })
  })

  describe('Authenticated endpoints', () => {
    const user = {
      email: 'mail@mail.com',
      password: 'password'
    }

    let headers = {}

    beforeAll(async done => {
      const resWithToken = await server.inject({
        method: 'POST',
        url: `${baseUrl}/users/login`,
        payload: user
      })

      headers = {
        authorization: `bearer ${resWithToken.result.token}`
      }
      done()
    })

    describe('GET /users/info', () => {
      test('should return current user info', async () => {
        const res = await server.inject({
          method: 'GET',
          url: `${baseUrl}/users/info`,
          headers
        })
        expect(res.result.email).toEqual(user.email)
      })
    })

    describe('PUT /users', () => {
      test('should update current user info', async () => {
        const res = await server.inject({
          method: 'PUT',
          url: `${baseUrl}/users`,
          headers,
          payload: {
            name: 'new name',
            email: 'newmail@mail.com',
            password: 'new password'
          }
        })
        expect(res.result.email).toEqual('newmail@mail.com')
        expect(res.result.name).toEqual('new name')
      })
    })

    describe('DELETE /users', () => {
      test('should delete current user', async () => {
        await server.inject({
          method: 'DELETE',
          url: `${baseUrl}/users`,
          headers
        })

        const res = await server.inject({
          method: 'GET',
          url: `${baseUrl}/users/info`,
          headers
        })
        expect(res.result.statusCode).toEqual(401)
      })
    })
  })
})
