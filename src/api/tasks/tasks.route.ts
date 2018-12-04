import constants from '../../constants'
import { ISwaggerConfiguration } from '../../plugins/swagger.plugin'
import tags from '../../tags'
import { IRouteCreator } from '../../utils'
import Routes from '../Routes'
import { ITaskController } from './tasks.controller'

import {
  createTaskSchema,
  getTaskByIdSchema,
  getTasksSchema,
  patchTaskSchema,
  updateTaskSchema
} from './tasks.validator'

interface IOptions {
  controller: ITaskController
}

const UserRoutesCreator: IRouteCreator<IOptions> = ({ controller }) => [
  {
    method: 'GET',
    path: Routes.tasks['{id}'],
    options: {
      handler: controller.getTaskById,
      auth: constants.AUTH_STRATEGIES.JWT,
      tags: [tags.API, tags.TASKS],
      description: 'Get task by id.',
      validate: getTaskByIdSchema,
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Task founded.'
            },
            '404': {
              description: 'Task does not exists.'
            }
          }
        }
      } as ISwaggerConfiguration
    }
  },
  {
    method: 'GET',
    path: Routes.tasks._,
    options: {
      handler: controller.getTasks,
      auth: constants.AUTH_STRATEGIES.JWT,
      tags: [tags.API, tags.TASKS],
      description: 'Get all tasks.',
      validate: getTasksSchema
    }
  },
  {
    method: 'DELETE',
    path: Routes.tasks['{id}'],
    options: {
      handler: controller.deleteTask,
      auth: constants.AUTH_STRATEGIES.JWT,
      tags: [tags.API, tags.TASKS],
      description: 'Delete task by id.',
      validate: getTaskByIdSchema,
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Deleted Task.'
            },
            '404': {
              description: 'Task does not exists.'
            }
          }
        }
      } as ISwaggerConfiguration
    }
  },
  {
    method: 'PUT',
    path: Routes.tasks['{id}'],
    options: {
      handler: controller.patchTask,
      auth: constants.AUTH_STRATEGIES.JWT,
      tags: [tags.API, tags.TASKS],
      description: 'Update task by id.',
      validate: updateTaskSchema,
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Updated Task.'
            },
            '404': {
              description: 'Task does not exists.'
            }
          }
        }
      } as ISwaggerConfiguration
    }
  },
  {
    method: 'PATCH',
    path: Routes.tasks['{id}'],
    options: {
      handler: controller.patchTask,
      auth: constants.AUTH_STRATEGIES.JWT,
      tags: [tags.API, tags.TASKS],
      description: 'Update task by id.',
      validate: patchTaskSchema,
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Updated Task.'
            },
            '404': {
              description: 'Task does not exists.'
            }
          }
        }
      } as ISwaggerConfiguration
    }
  },
  {
    method: 'POST',
    path: Routes.tasks._,
    options: {
      handler: controller.createTask,
      auth: constants.AUTH_STRATEGIES.JWT,
      tags: [tags.API, tags.TASKS],
      description: 'Create a task.',
      validate: createTaskSchema,
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              description: 'Created Task.'
            }
          }
        }
      } as ISwaggerConfiguration
    }
  }
]

export default UserRoutesCreator
