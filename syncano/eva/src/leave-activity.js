export default (ctx) => {
  if (ctx.args.firstname && ctx.args.lastname) {
    ctx.setResponse(new ctx.HttpResponse(200, `Hello ${ctx.args.firstname} ${ctx.args.lastname}!`, 'text/plain'))
  } else {
    ctx.setResponse(new ctx.HttpResponse(400, 'Hello stranger!', 'text/plain'))
  }
}
