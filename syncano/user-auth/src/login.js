/* global META, ARGS */
import fetch from 'axios'
import Syncano from 'syncano-server'

export default async ctx => {
  const {users, response} = new Syncano(ctx)
  const {username, password} = ctx.args
  const AUTH_URL = `https://api.syncano.io/v2/instances/${ctx.meta.instance}/users/auth/`

  users
    .where('username', 'eq', username)
    .firstOrFail()
    .then(authorizeUser)
    .catch(respondWithInvalidCredentials)

  function authorizeUser () {
    fetch({
      url: AUTH_URL,
      method: 'POST',
      data: JSON.stringify({username, password}),
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': ctx.meta.token
      }
    })
      .then(respondWithValidCredentials)
      .catch(respondWithInvalidCredentials)
  }

  function respondWithValidCredentials ({data}) {
    response.json({user_key: data.user_key, username: data.username})
  }

  function respondWithInvalidCredentials () {
    response.json({message: 'Given credentials are invalid.'}, 400)
  }
}