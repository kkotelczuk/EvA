import Syncano from 'syncano-server'
import {isEmail} from './helpers'

export default (ctx) => {
  const {users, response} = Syncano(ctx)
  const {username, password, national_id} = ctx.args

  function createUser () {
    const user = {
      username,
      password,
      national_id
    }

    users.create(user)
      .then(respondWithUser)
      .catch(respondWithError)
  }

  const respondWithUser = (res) => {
    response.json({
      id: res.id,
      user_key: res.user_key,
      email: res.email
    })
  }

  const respondWithError = (err) => {
    if (err.data) {
      response.json({response: err.data}, 400)
    } else {
      response.json({response: err.message}, 400)
    }
  }

  const respondWithUserAlreadyExists = () => {
    response.json({username: 'User already exists.'}, 400)
  }

  const respondWithInvalidEmail = () => {
    response.json({username: 'Given email is invalid.'}, 400)
  }

  if (isEmail(username)) {
    users
      .where('username', 'eq', username)
      .firstOrFail()
      .then(respondWithUserAlreadyExists)
      .catch(createUser)
  } else {
    respondWithInvalidEmail()
  }
}
