import { path } from 'rambda'

export const getCredentialId = path<string>(['auth', 'credentials', 'id'])
