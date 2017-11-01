import Syncano from 'syncano-server'
import Policy from './utils/policy'

export default async ctx => {
  const attempt = new Policy(ctx)
  const {data, response} = new Syncano(ctx)

  attempt(updateActivity, ctx.args)
    .then(response.success)
    .catch(err => response.fail({message: err.message}))

  /* ======================================================================== */

  async function updateActivity(args) {
    const {uuid, title, location, category, visibility, seats, date} = args

    return data.activity.where('uuid', uuid).update({
      uuid, title, location, category, visibility, seats, date
    })
  }
}
