import React, { useState, useEffect } from 'react';
import { StatusBar, TextInput, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../style';
import ActionButton from '../components/ActionButton';
import useStore from '../store';
import Icon from 'react-native-vector-icons/Ionicons'; 


type RootStackParamList = {
  Home: undefined;
  TodoDetails: { itemId: number };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const App: React.FC<Props> = ({ navigation }) => {
  const [text, setText] = useState<string>('');
  const { dataStore, getTodos, deleteTodo, createTodo } = useStore();

  useEffect(() => {
    getTodos();
  }, []);

  const showInfoAlert = () => {
    createTodo({ name: 'default', task: text, isComplete: false });
    setText(''); // очищаем текстовое поле после добавления
  };

  const handleDelete = (id: number) => {
    deleteTodo(id);
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

      <Text style={styles.title}>Картегории:</Text>
      <ScrollView style={styles.scroll}>
        {dataStore.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => navigation.navigate('TodoDetails', { itemId: item.id })}>
            <View style={[styles.universeContainer, styles.itemContainer]}>
              <View style={styles.items}>
                <Text style={styles.text}>{item.task}</Text>
              </View>
              <ActionButton onPress={() => handleDelete(item.id)} action={'x'} />
              <ActionButton onPress={() => handleDelete(item.id)} action={'ed'} />
              <Icon name="pencil" size={30}color="#4F8EF7" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

export default App;