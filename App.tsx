import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, TextInput, Text, View, Button, TouchableOpacity, Alert, ScrollView  } from 'react-native';
import styles from './style';
import ActionButton from './components/ActionButton';
import useStore from './store';

export default function App() {
  const [text, setText] = useState<string>('');
  const [trigger, setTrigger] = useState(true);
  const { dataStore, getTodos, deleteTodo, createTodo } = useStore();

  useEffect(() => {
    getTodos();
  }, [trigger]);

  const showInfoAlert = () => {
    createTodo({ name: 'default', task: text, isComplete: false });
    setTrigger(!trigger)
    // Alert.alert(
    //   'Информация',
    //   data.toString(),
    //   [{ text: 'OK' }],
    //   { cancelable: false }
    // );
  };

  const handleDelete = (index: number) => {
    deleteTodo(index);
  };

  return (
    <View style={styles.container}>
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
      {dataStore.map((item, index) => (
        <View style={[styles.universeContainer, styles.itemContainer]} key={index}>
          <View style={styles.items}>
            <Text style={styles.text}>{item.task}</Text>
          </View>
          <ActionButton onPress={() => handleDelete(item.id)} action={'x'} />
        </View>
      ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
