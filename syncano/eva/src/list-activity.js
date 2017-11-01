import Syncano from 'syncano-server'
import Policy from './utils/policy'

export default async ctx => {
  const attempt = new Policy(ctx)
  const {data, response} = new Syncano(ctx)

  attempt(listActivity)
    .then(response.success)
    .catch(err => response.fail({message: err.message}))

  /* ======================================================================== */

  async function listActivity(uuid) {
    return data.activity.list()
  }
}
