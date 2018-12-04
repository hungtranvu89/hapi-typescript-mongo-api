import { Document, model, Query, Schema, SchemaDefinition } from 'mongoose'
import { pathOr } from 'rambda'

import { IUser } from '../../models'
import { compareToHash, createHash } from '../../utils'

import { BaseModel, schemaOptions } from './commonOptions'

class User extends BaseModel implements IUser {
  public name: string
  public email
  public password

  public validatePassword(requestPassword) {
    return compareToHash(requestPassword, this.password)
  }
}

type UserDocument = IUser & Document

const UserSchemaDefinition: SchemaDefinition = {
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true }
}

const UserSchema = new Schema(UserSchemaDefinition, schemaOptions)

UserSchema.loadClass(User)

UserSchema.pre<UserDocument>('save', function(next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = createHash(this.password)

  return next()
})

const getSetPassword = pathOr('', ['$set', 'password'])

UserSchema.pre<Query<UserDocument>>('findOneAndUpdate', function() {
  const newPass = getSetPassword(this.getUpdate())

  if (!newPass) {
    return
  }

  this.findOneAndUpdate({}, { password: createHash(newPass) })
})

export default model<UserDocument>('User', UserSchema)
