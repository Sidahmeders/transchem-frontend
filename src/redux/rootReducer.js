// ** Reducers Imports
import layout from './layout'
import navbar from './navbar'

import permissions from './roles&permissions'
import users from './user'

const rootReducer = {
  navbar,
  layout,
  users,
  permissions
}

export default rootReducer
