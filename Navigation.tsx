import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from './pages/App';
import TodoDetails from './pages/TodoDetails';

type RootStackParamList = {
  Home: undefined;
  TodoDetails: { itemId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={App} options={{ title: 'Todo List' }} />
        <Stack.Screen name="TodoDetails" component={TodoDetails} options={{ title: 'Todo Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
