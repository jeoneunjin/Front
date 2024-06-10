import React, {createContext, useState} from 'react';

const RecipeContext = createContext();

export function RecipeContextProvider({children}) {
  const [recipe, onChangeRecipe] = useState([]);
  return (
    <RecipeContext.Provider value={{recipe, onChangeRecipe}}>
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeContext;
