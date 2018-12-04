import { Document, model, Schema, SchemaDefinition } from 'mongoose'

import { ETaskStatus, ITask } from '../../models'

import { BaseModel, schemaOptions } from './commonOptions'

class Task extends BaseModel implements ITask {
  public userId: string
  public name: string
  public description: string
  public status: ETaskStatus
}

type TaskDocument = Task & Document

const TaskSchemaDefinition: SchemaDefinition = {
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  status: String
}

const TaskSchema = new Schema(TaskSchemaDefinition, schemaOptions)

TaskSchema.loadClass(Task)

export default model<TaskDocument>('Task', TaskSchema)
