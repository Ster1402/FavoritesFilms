import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Search from '../Components/Search';

const StackNavigator = createStackNavigator();

const Navigation = () => {
   return (<NavigationContainer>
        <StackNavigator.Navigator>
            <StackNavigator.Screen name="Rechercher" component={Search}/>
        </StackNavigator.Navigator>
    </NavigationContainer>)
}

export default Navigation
