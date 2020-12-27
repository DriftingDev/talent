export const defaultStateShape = {
  venues: null,
  loaded: false
}

export const venueReducer = (state, action) => {
  switch (action.type) {
    case "setVenues":
      return {
        ...state,
        venues: action.payload,
        loaded: true
      };
    case "clearVenues":
      return {
        ...state, 
        venues: {}, 
        loaded: false
      }
    case "updateVenues":
      return {
        ...state,
        venues: action.payload
      }
    default: 
      throw new Error("Unknown action in Current User Reducer")
  }
}