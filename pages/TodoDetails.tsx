import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import useStore from '../store';

type RootStackParamList = {
  Home: undefined;
  TodoDetails: { itemId: number };
};

type TodoDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TodoDetails'>;
type TodoDetailsScreenRouteProp = RouteProp<RootStackParamList, 'TodoDetails'>;

interface Props {
  navigation: TodoDetailsScreenNavigationProp;
  route: TodoDetailsScreenRouteProp;
}

const TodoDetails: React.FC<Props> = ({ route, navigation }) => {
  const { itemId } = route.params;
  const { dataStore, deleteTodo } = useStore();
  const todoItem = dataStore.find(item => item.id === itemId);

  const handleDelete = () => {
    deleteTodo(itemId);
    navigation.goBack();
  };

  if (!todoItem) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Задача не найдена</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Задача: {todoItem.task}</Text>
      <Button title="Удалить" onPress={handleDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 20,
    marginBottom: 20,
  },
});

export default TodoDetails;
