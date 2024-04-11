import { create } from 'zustand';
import axios from 'axios';

interface TodoItem {
    task: string;
    id: number;
}

interface Store {
    dataStore: TodoItem[];
    getTodos: () => void;
    deleteTodo: (id: number) => void;
    createTodo: (newTodo: { name: string, task: string, isComplete: boolean }) => void;
}

const useStore = create<Store>((set) => ({
    dataStore: [{ task: "", id: 0 }],

    getTodos: () => {
        axios.get<TodoItem[]>('http://unit-vlg.ru:9000/api/actions/getAll')
            .then(res => {
                const todo = res.data;
                const mainData = todo.map(item => ({
                    task: item.task,
                    id: item.id
                }));
                set(() => ({ dataStore: mainData }));
            })
            .catch(error => {
                console.error('Error fetching todos:', error);
            });
    },

    deleteTodo: (id: number) => {
        axios.delete(`http://unit-vlg.ru:9000/api/actions/delete?id=${id}`)
            .then(() => {
                // Если удаление успешно, можно вызвать getTodos() для обновления данных
                set((state) => {
                    const updatedDataStore = state.dataStore.filter(todo => todo.id !== id);
                    return { dataStore: updatedDataStore };
                });
            })
            .catch(error => {
                console.error('Error deleting todo:', error);
            });
    },

    createTodo: (newTodo) => {
        axios.post<TodoItem>('http://unit-vlg.ru:9000/api/actions/create', newTodo)
            .then(res => {
                const todo = res.data;
                set((state) => {
                    const updatedDataStore = [...state.dataStore, { task: todo.task, id: todo.id }];
                    return { dataStore: updatedDataStore };
                });
            })
            .catch(error => {
                console.error('Error creating todo:', error);
            });
    },
}));

export default useStore;
