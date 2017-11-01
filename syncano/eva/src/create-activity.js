import Syncano from 'syncano-server'
import Policy from './utils/policy'
import crypto from 'crypto'

export default async ctx => {
  const attempt = new Policy(ctx)
  const {data, response} = new Syncano(ctx)
  const {title, location, category, visibility, seats, date} = ctx.args

  attempt(createActivity, {
    uuid: crypto.randomBytes(16).toString('hex'),
    title, location, category, visibility, seats, date
  })
    .then(response.success)
    .catch(err => response.fail({message: err.message}))

  /* ======================================================================== */

  async function createActivity(props) {
    return data.activity.create(props)
  }
}
