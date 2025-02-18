import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native'
import RootNavigation from './RootNavigation.js'
import { StatusBar } from 'react-native';

export default function HomeScreen() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#121212"  translucent />
        <RootNavigation />
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

