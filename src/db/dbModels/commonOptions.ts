import { ObjectID } from 'bson'
import { SchemaOptions } from 'mongoose'

export const schemaOptions: SchemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false
  },
  toObject: {
    virtuals: true,
    versionKey: false
  }
}

export class BaseModel {
  private _id: ObjectID
  public get id() {
    return this._id.toHexString()
  }
  public createdAt: Date
  public updateAt: Date
}
