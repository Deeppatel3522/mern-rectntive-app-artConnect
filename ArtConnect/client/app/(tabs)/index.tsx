import { Image, StyleSheet, Platform, View } from 'react-native';
import Home from '../../screens/Auth/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native'
import Login from '../../screens/Auth/Login'
import SignUp from '../../screens/Auth/SignUp'
import Profile from '../../screens/Auth/Profile'
import EventList from '../../screens/Event/EventList'
import EventDetail from '../../screens/Event/EventDetail'
import ArtList from '../../screens/Art/ArtList'
import ArtDetail from '../../screens/Art/ArtDetails'

export default function HomeScreen() {
  const stack = createNativeStackNavigator()
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <stack.Navigator initialRouteName='Home'>
          <stack.Screen name='Home' component={Home} />
          <stack.Screen name='Login' component={Login} />
          <stack.Screen name='SignUp' component={SignUp} />
          <stack.Screen name='Profile' component={Profile} />
          <stack.Screen name='EventList' component={EventList} />
          <stack.Screen name='ArtList' component={ArtList} />
          <stack.Screen name='EventDetail' component={EventDetail} />
          <stack.Screen name='ArtDetail' component={ArtDetail} />
        </stack.Navigator>

      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
