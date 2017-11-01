import snakecase from 'lodash.snakecase'
import Actions from './actions'

export default function Can(ctx) {
  const user = ctx.meta.user

  const can = new Proxy(new Actions(ctx, user), {
    get(actions, name) {
      return actions[name] || (() => true)
    }
  })

  return async (queue, ...props) => {
    let result = props

    queue = Array.isArray(queue) ? queue : [queue]

    for (let action of queue) {
      if (can[action.name](...result)) {
        result = [await action(...result)]
      } else {
        throw new Error(`You are not allowed to ${snakecase(action.name).replace('_', ' ')}`)
      }
    }

    return result[0]
  }
}
