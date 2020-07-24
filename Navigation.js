import { createStackNavigator } from '@react-navigation/stack';
import Search from '../Components/Search'

export const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Rechercher" component={Search}/>
    </Stack.Navigator>
  );
}
