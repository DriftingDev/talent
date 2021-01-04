export const defaultStateShape = {
  shows: null,
  loaded: false
}

export const showReducer = (state, action) => {
  switch (action.type) {
    case "setShows":
      return {
        ...state,
        shows: action.payload,
        loaded: true
      };
    case "clearShows":
      return {
        ...state, 
        shows: null, 
        loaded: false
      }
    case "updateShows":
      return {
        ...state,
        shows: action.payload
      }
    default: 
      throw new Error("Unknown action in Shows Reducer")
  }
}