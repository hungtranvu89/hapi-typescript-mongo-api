import { Request } from 'hapi'
import * as Joi from 'joi'
import { ETaskStatus, taskStatusArray } from '../../models'

export const getTaskByIdSchema = {
  params: {
    id: Joi.string().required()
  }
}

export interface IGetTaskByIdRequest extends Request {
  params: {
    id: string
  }
}

export const getTasksSchema = {
  query: {
    top: Joi.number().default(5),
    skip: Joi.number().default(0)
  }
}

export interface IGetTasksRequest extends Request {
  query: {
    top: string
    skip: string
  }
}

export const updateTaskSchema = {
  ...getTaskByIdSchema,
  payload: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string()
      .required()
      .allow(taskStatusArray) // take advantage of enum
  })
}

export interface IPatchTaskRequest extends IGetTaskByIdRequest {
  payload: {
    name?: string
    description?: string
    status?: ETaskStatus
  }
}

export const patchTaskSchema = {
  ...getTaskByIdSchema,
  payload: Joi.object().keys({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string()
      .optional()
      .allow(taskStatusArray) // take advantage of enum
  })
}

export const createTaskSchema = {
  payload: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required()
  })
}

export interface ICreateTaskRequest extends IGetTaskByIdRequest {
  payload: {
    name: string
    description: string
  }
}
