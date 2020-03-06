export const recipeReducer = (state, action) => {
  switch (action.type) {
    case "ADD_RECIPE":
      return [
        ...state,
        {
          id: Date.now(),
          title: action.recipe.title,
          description: action.recipe.description
        }
      ];
    case "EDIT_RECIPE":
      return state.map(r => {
        if (r.id === action.recipe.id) {
          return {
            ...action.recipe
          };
        }
        return r;
      });
    default:
      return state;
  }
};
