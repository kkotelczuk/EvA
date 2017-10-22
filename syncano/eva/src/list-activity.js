import Syncano from 'syncano-server'

export default async ctx => {
  const {response, data} = new Syncano(ctx)

  const activities = await data.activity.list()
  // TODO: Handle private activities, add filters
  response.success(activities)
}
