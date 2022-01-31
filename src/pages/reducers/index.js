import { combineReducers } from 'redux'
import { cartReducer } from './cartReducer.js'
import { CODReducer } from './CODReducer.js'
import { couponReducer } from './couponReducer.js'
import { drawerReducer } from './drawerReducer.js'
import { searchReducer } from './searchReducer.js'
import { userReducer } from './userReducer.js'
const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
  COD: CODReducer,
})
export default rootReducer
