import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native'
import RootNavigation from './RootNavigation.js'

export default function HomeScreen() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

