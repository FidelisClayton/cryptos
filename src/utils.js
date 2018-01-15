import _ from 'lodash'

export const removeEmptyFields = object => {
  return Object.keys(object).reduce((previous, current) => {
    if (!_.isEmpty(object[current])) {
      return {
        ...previous,
        [current]: object[current]
      }
    } else {
      return previous
    }
  }, {})
}
