import constants from '../../constants'
import { ISwaggerConfiguration } from '../../plugins/swagger.plugin'
import tags from '../../tags'
import { IRouteCreator } from '../../utils'
import Routes from '../Routes'

import { IUserController } from './users.controller'
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema
} from './users.validator'

interface IOptions {
  controller: IUserController
}

const UserRoutesCreator: IRouteCreator<IOptions> = ({ controller }) => [
  {
    method: 'GET',
    path: Routes.users.info,
    options: {
      handler: controller.getUser,
      auth: constants.AUTH_STRATEGIES.JWT,
      tags: [tags.API, tags.USERS],
      description: 'Get user info.',
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'User founded.'
            },
            '401': {
              description: 'Please login.'
            }
          }
        }
      } as ISwaggerConfiguration
    }
  },
  {
    method: 'POST',
    path: Routes.users._,
    options: {
      handler: controller.createUser,
      auth: false,
      tags: [tags.API, tags.USERS],
      description: 'Create a user.',
      validate: createUserSchema,
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              description: 'User created.'
            }
          }
        }
      } as ISwaggerConfiguration
    }
  },
  {
    method: 'POST',
    path: Routes.users.login,
    options: {
      handler: controller.loginUser,
      auth: false,
      tags: [tags.API, tags.USERS],
      description: 'Login a user.',
      validate: loginUserSchema,
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'User logged in.'
            }
          }
        }
      } as ISwaggerConfiguration
    }
  },
  {
    method: 'DELETE',
    path: Routes.users._,
    handler: controller.deleteUser,
    options: {
      auth: constants.AUTH_STRATEGIES.JWT,
      tags: [tags.API, tags.USERS],
      description: 'Delete current user.',
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'User deleted.'
            },
            '401': {
              description: 'User does not have authorization.'
            }
          }
        }
      } as ISwaggerConfiguration
    }
  },
  {
    method: 'PUT',
    path: Routes.users._,
    handler: controller.updateUser,
    options: {
      auth: constants.AUTH_STRATEGIES.JWT,
      tags: [tags.API, tags.USERS],
      description: 'Update current user info.',
      validate: updateUserSchema,
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Updated info.'
            },
            '401': {
              description: 'User does not have authorization.'
            }
          }
        }
      } as ISwaggerConfiguration
    }
  }
]

export default UserRoutesCreator
