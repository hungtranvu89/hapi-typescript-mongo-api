import keyMirror from 'key-mirror-nested'
import { dropLast } from 'rambda'

const constants = {
  users: {
    info: '',
    login: '',
    _: '_'
  },
  tasks: {
    '{id}': '',
    _: '_'
  }
}

const drop2 = dropLast(2) // drop /_

const routes = keyMirror(constants, {
  connChar: '/',
  custFunc: (oldVal: string, newVal: string) =>
    oldVal !== '_' ? newVal : drop2(newVal)
})

export default routes as typeof constants // set the shape
