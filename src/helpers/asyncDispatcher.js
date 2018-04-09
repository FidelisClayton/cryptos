function Dispatcher(dispatch) {
  this.dispatch = dispatch

  this.handle = ({
    type,
    action,
    onSuccess,
    onFailure
  },
    params
  ) => {
    dispatch({
      type: `${type}_REQUEST`,
      payload: params
    })

    return action(params)
      .then(data => {
        onSuccess && onSuccess(data)
        return this.dispatch({
          type: `${type}_SUCCESS`,
          payload: data
        })
      })
      .catch(error => {
        onFailure && onFailure(error)

        return this.dispatch({
          type: `${type}_FAIL`,
          payload: error
        })
      })
  }
}

export default Dispatcher
