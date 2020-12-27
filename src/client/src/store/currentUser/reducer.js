export const defaultStateShape = {
  user: null,
  token: null,
  loaded: false
}

export const userReducer = (state, action) => {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        user: action.payload,
        loaded: true
      };
    case "clearUser":
      return {
        ...state, 
        user: {}, 
        loaded: false
      }
    case "updateUser":
      return {
        ...state,
        user: action.payload
      }
    case "setToken":
      return {
        ...state,
        token: action.payload
      }
      case "clearToken":
      return {
        ...state,
        token: {}
      }
    default: 
      throw new Error("Unknown action in User Reducer")
  }
}