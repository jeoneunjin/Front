import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {SearchContextProvider} from './contexts/SearchContext';
import {RecipeContextProvider} from './contexts/RecipeContext';

function App() {
  return (
    <NavigationContainer>
      <SearchContextProvider>
        <RecipeContextProvider>
          <RootStack />
        </RecipeContextProvider>
      </SearchContextProvider>
    </NavigationContainer>
  );
}
export default App;
