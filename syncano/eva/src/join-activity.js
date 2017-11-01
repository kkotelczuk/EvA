import Syncano from 'syncano-server'
import Policy from './utils/policy'

export default async ctx => {
  const attempt = new Policy(ctx)
  const {data, response} = new Syncano(ctx)

  attempt([getActivity, checkIfAlreadyJoined, joinActivity], ctx.args.uuid)
    .then(response.success)
    .catch(err => response.fail({message: err.message}))

  /* ======================================================================== */

  async function getActivity(uuid) {
    return data.activity.where('uuid', uuid).value('id')
  }

  async function checkIfAlreadyJoined(activity) {
    const user = ctx.meta.user.id
    const joined = await data.activity_user
      .where([
        ['user', user],
        ['activity', activity]
      ]).first()

    if (joined) {
      throw new Error('Already joined this activity.')
    }

    return activity
  }

  async function joinActivity(activity) {
    return data.activity_user.fields('joined_at', 'user', 'activity').create({
      user: ctx.meta.user.id,
      activity,
      joined_at: new Date().toISOString()
    })
  }
}
