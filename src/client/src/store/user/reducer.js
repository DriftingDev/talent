export const defaultStateShape = {
  users: null,
  loaded: false
}

export const usersReducer = (state, action) => {
  switch (action.type) {
    case "setUsers":
      return {
        ...state,
        users: action.payload,
        loaded: true
      };
    case "clearUsers":
      return {
        ...state, 
        users: {}, 
        loaded: false
      }
    case "updateUsers":
      return {
        ...state,
        users: action.payload
      }
    default: 
      throw new Error("Unknown action in Users Reducer")
  }
}