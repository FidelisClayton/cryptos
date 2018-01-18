import _ from 'lodash'

export const removeEmptyFields = object => {
  return Object.keys(object).reduce((previous, current) => {
    const value = object[current]

    if (!_.isNull(value) && !_.isUndefined(value)) {
      return {
        ...previous,
        [current]: value
      }
    } else {
      return previous
    }
  }, {})
}
