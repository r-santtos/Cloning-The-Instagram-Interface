import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import logo from './assets/instagram.png';

function LogoInstagram() {
    return (
        <Image source={logo} />
    );
}

const AppStack = createStackNavigator();

import Feed from './pages/Feed';

function Routes() {
    return (
        <NavigationContainer>
        
            <AppStack.Navigator>
                <AppStack.Screen
                 name="Feed" 
                 component={Feed} 
                 options={{ 
                    headerTitle: props => <LogoInstagram {...props} />,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#f5f5f5'
                    }
                 }}
                />
            </AppStack.Navigator>

        </NavigationContainer>
    );
}

export default Routes;