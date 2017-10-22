import Syncano from 'syncano-server'

export default async ctx => {
  const {response, data} = new Syncano(ctx)

  try {
    const {title,location,category,visibility,seats,date} = ctx.args
    const activity = await data.activity.create({
      title,
      location,
      category,
      visibility,
      seats,
      date,
    })
    response.success(activity)
  }
  catch (err) {
    response.fail({
      message: 'Can not create activity',
    })
  }
}
