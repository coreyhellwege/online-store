import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload,
                  itemExists = state.cartItems.find(i => i === item.product)

            if (itemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === itemExists.product ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        default:
            return state
    }
}