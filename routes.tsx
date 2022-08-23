import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeLayout from './app/layouts/HomeLayout';
import Profile from './app/pages/Profile'
import History from './app/pages/History';


const Stack = createNativeStackNavigator()

export function AppRoutes(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                name='HomeLayout' 
                component={HomeLayout} 
                options={{headerShown: false}}/>

                <Stack.Screen name='Profile' 
                component={Profile} 
                options={{headerShown: false}}/>

                <Stack.Screen 
                name='Histórico'
                component={History}
                options={{
                    headerTitleStyle:{
                        fontSize: 22,
                        fontWeight: 'bold',
                        fontFamily: 'OpenSans',
                    }
                }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}