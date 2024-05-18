import React, { useState, useEffect } from 'react';
import { StatusBar, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import useStore from '../store';
import ActionButton from '../components/ActionButton';
import styles from '../style';



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

  const handleDeleteBtn = () => {
    deleteTodo(itemId);
    navigation.goBack();
  };



  const [text, setText] = useState<string>('');
  const { dataStore, dataStoreSubTasks, getSubTodos, deleteSubTodo, createSubTodo, deleteTodo, getTodos } = useStore();
  const todoItem = dataStore.find(item => item.id === itemId);

  useEffect(() => {
    getSubTodos(todoItem?.id);
  }, []);

  const showInfoAlert = () => {
    createSubTodo({ name: 'default', task: text, isComplete: false }, todoItem?.id);
    setText(''); // очищаем текстовое поле после добавления
  };

  const handleDelete = (id: number, idSub: number) => {
    deleteSubTodo(id, idSub);
  };

  if (!todoItem) {
    return (
      <View style={stylesLocal.container}>
        <Text style={stylesLocal.title}>Задача не найдена</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Категория {todoItem.task}</Text>
      <Button title="Удалить категорию" onPress={handleDeleteBtn} />
      <View style={[styles.inputContainer, styles.universeContainer]}>
        <TextInput
          style={styles.input}
          placeholder="Введите текст"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <ActionButton onPress={showInfoAlert} action={'+'} />
      </View>

      <Text style={styles.title}>Дела на день:</Text>
      <ScrollView style={styles.scroll}>
        {dataStoreSubTasks.map((item) => (

            <View style={[styles.universeContainer, styles.itemContainer]}>
              <View style={styles.items}>
                <Text style={styles.text}>{item.task}</Text>
              </View>
              <ActionButton onPress={() => handleDelete(todoItem.id, item.id)} action={'x'} />
            </View>

        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};

const stylesLocal = StyleSheet.create({
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
