let initialState = [];

// load cart items from local storage
if (typeof window !== "undefined") {
  if (localStorage.getItem("done")) {
    initialState = JSON.parse(localStorage.getItem("done"));
  } else {
    initialState = [];
  }
}

export const doneReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_DONE":
      return action.payload;
    default:
      return state;
  }
};