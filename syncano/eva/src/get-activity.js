import Syncano from 'syncano-server'
import Policy from './utils/policy'

export default async ctx => {
  const attempt = new Policy(ctx)
  const {data, response} = new Syncano(ctx)

  attempt(getActivity, ctx.args.uuid)
    .then(response.success)
    .catch(err => response.fail({message: err.message}))

  /* ======================================================================== */

  async function getActivity(uuid) {
    return data.activity.where('uuid', uuid).first()
  }
}
