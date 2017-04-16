import { Map } from 'immutable'

export default {
  user(s = Map(), a) {
    if (a.type === 'GET_USER') return Map(a.payload)

    return s
  },
}
