import Syncano from 'syncano-server'

export default async ctx => {
  const {response, data} = new Syncano(ctx)

  try {
    const user = ctx.user.id
    const activity = ctx.args.id
    const realation = await data.activity_user.create({
      activity,
      user,
      joined_at: new Date().toISOString,
    })
    response.success(relation)
  }
  catch (err) {
    response.fail({
      message: 'Can not join activity',
    })
  }
}
