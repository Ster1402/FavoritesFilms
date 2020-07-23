import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../Components/Search';

const StackNavigator = createStackNavigator();

class Navigation extends React.Component {
    render() {
        return (
            <NavigationContainer>
			<StackNavigator.Navigator>
				<StackNavigator.Screen name="Search" component={Search} />
			</StackNavigator.Navigator>
		</NavigationContainer>
        )
    }
}

export default Navigation;
