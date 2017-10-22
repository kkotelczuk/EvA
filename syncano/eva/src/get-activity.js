import Syncano from 'syncano-server'

export default async ctx => {
  const {response, data} = new Syncano(ctx)

  try {
    const activity = await data.activity.findOrFail(ctx.args.id)
    // TODO: Handle private activities
    response.success(activity)
  }
  catch (err) {
    response.fail({
      message: 'Activity was not found',
    })
  }
}
