import * as actionTypes from "./actions";

const initialState = {
  cartProducts: [],
  idToken: null,
  userId: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      return { ...state, cartProducts: [...state.cartProducts, action.product] };
    case actionTypes.ADD_HALF:
      // halvedProduct = {}
      // for (let key in action.product) {
      //   console.log(key, action.product[key])
      //   if(typeof(action.product[key]) == 'number') {
      //     action.product[key] /= 2
      //   }
      return { ...state, cartProducts: [...state.cartProducts, action.product] };
    case actionTypes.REMOVE_ONE:
      const findIndex = state.cartProducts.findIndex((el) => el.id === action.productId);
      const splicedArray = [...state.cartProducts];
      splicedArray.splice(findIndex, 1);
      return {
        ...state,
        cartProducts: splicedArray,
      };
    case actionTypes.REMOVE_ALL:
      return {
        ...state,
        cartProducts: [...state.cartProducts.filter((el) => el.id !== action.productId)],
      };
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        idToken: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
      case actionTypes.AUTH_LOGOUT: 
      return {
        ...state,
        idToken: null,
        userId: null
      }
    default:
      return state;
  }
};

export default reducer;
