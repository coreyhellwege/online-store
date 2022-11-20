import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Import reducer functions
import { productListReducer, productDetailsReducer, productCreateReducer, productUpdateReducer, productDeleteReducer, productReviewCreateReducer, productTopRatedReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderDeliverReducer, listMyOrdersReducer, orderListReducer } from './reducers/orderReducers'

const rootReducer = combineReducers({
    productList        : productListReducer,
    productDetails     : productDetailsReducer,
    productCreate      : productCreateReducer,
    productUpdate      : productUpdateReducer,
    productDelete      : productDeleteReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated    : productTopRatedReducer,
    cart               : cartReducer,
    userLogin          : userLoginReducer,
    userRegister       : userRegisterReducer,
    userDetails        : userDetailsReducer,
    userUpdateProfile  : userUpdateProfileReducer,
    userList           : userListReducer,
    userDelete         : userDeleteReducer,
    userUpdate         : userUpdateReducer,
    orderCreate        : orderCreateReducer,
    orderDetails       : orderDetailsReducer,
    orderPay           : orderPayReducer,
    orderDeliver       : orderDeliverReducer,
    myOrders           : listMyOrdersReducer,
    orderList          : orderListReducer
})

const cartItemsFromStorage       = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage        = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store