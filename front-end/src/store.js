import {createStore, combineReducers, applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer } from './reducers/productRedcers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
})

const userInfoFromStorage = localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):[]

const cartItemsFromStorage = localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):null

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")?JSON.parse(localStorage.getItem("shippingAddress")):{}

const initialState = {
    cart:{cartItems:cartItemsFromStorage, 
    shippingAddress:shippingAddressFromStorage
    },
    userLogin:{userInfo:userInfoFromStorage},

}

// const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store
