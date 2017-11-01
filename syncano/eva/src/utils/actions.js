export default class {
  constructor(ctx, user = {}) {
    this.user = user
  }

  _isUser() {
    if (Boolean(this.user.id)) {
      return true
    }

    throw new Error('You must be logged in.')
  }

  _isAuthor(authorId) {
    if (this._isUser() && this.user.id === authorId) {
      return true
    }

    throw new Error('Unauthorized request.')
  }

  _exists(resource) {
    if (resource !== null) {
      return true
    }

    throw new Error('Given resource was not found.')
  }

  /* = ACTIVITY
  /* ======================================================================== */

  listActivity() {
    return this._isUser()
  }

  getActivity() {
    return this._isUser()
  }

  createActivity() {
    return this._isUser()
  }

  joinActivity() {
    return this._isUser()
  }

  leaveActivity() {
    return this._isUser()
  }

  updateActivity(activity) {
    return this._exists(activity) && this._isAuthor(activity.author)
  }

  cancelActivity(activity) {
    return this._exists(activity) && this._isAuthor(activity.author)
  }

  /* = Profile
  /* ======================================================================== */
}
