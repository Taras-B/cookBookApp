import React, { createContext, useReducer, useEffect } from "react";

import { recipeReducer } from "./recipeReducer";

export const RecipeContext = createContext();

const RecipeContextProvider = props => {
  const [recipes, dispatch] = useReducer(recipeReducer, [], () => {
    const localData = localStorage.getItem("recipes");
    return localData ? JSON.parse(localData) : [];
  });
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = recipe => {
    dispatch({
      type: "ADD_RECIPE",
      recipe
    });
  };

  const editRecipe = recipe => {
    dispatch({
      type: "EDIT_RECIPE",
      recipe
    });
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, editRecipe }}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeContextProvider;
