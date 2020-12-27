export const defaultStateShape = {
  users: null,
  loaded: false
}

export const usersReducer = (state, action) => {
  switch (action.type) {
    case "setUsers":
      return {
        ...state,
        user: action.payload,
        loaded: true
      };
    case "clearUsers":
      return {
        ...state, 
        user: {}, 
        loaded: false
      }
    case "updateUsers":
      return {
        ...state,
        user: action.payload
      }
    default: 
      throw new Error("Unknown action in User Reducer")
  }
}