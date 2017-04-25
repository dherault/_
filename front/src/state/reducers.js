import { Map } from 'immutable'

export default {
  bar(s = Map(), a) {
    if (a.type === 'foo') return Map({ some: 'new state' })

    return s
  },
}
