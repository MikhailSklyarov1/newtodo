import { create } from 'zustand';
import axios from 'axios';

interface TodoItem {
    name?: string;
    task: string;
    id?: number;
    isComplete?: boolean;
}

interface Store {
    dataStore: TodoItem[];
    dataStoreSubTasks: TodoItem[];
    getTodos: () => void;
    deleteTodo: (id: number) => void;
    createTodo: (newTodo: { name: string, task: string, isComplete: boolean }) => void;
    getSubTodos: (idTodo: number | undefined) => void;
    deleteSubTodo: (id: number, idSub: number) => void;
    createSubTodo: (newTodo: TodoItem, id: number | undefined) => void;
}

const useStore = create<Store>((set) => ({
    dataStore: [],
    dataStoreSubTasks: [],

    getTodos: () => {
        axios.get<TodoItem[]>('http://unit-vlg.ru:9000/api/actions/getAll')
            .then(res => {
                const todos = res.data;
                const mainData = todos.map(item => ({
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
        axios.post<TodoItem[]>('http://unit-vlg.ru:9000/api/actions/create', newTodo)
            .then(res => {
                const todos = res.data;
                const nameAndIdList = todos.map(item => ({
                    id: item.id,
                    task: item.task
                }));
                set((state) => {
                    return { dataStore: nameAndIdList };
                });
            })
            .catch(error => {
                console.error('Error creating todo:', error);
            });
    },


    // Для подзадач

    getSubTodos: (idTodo: number | undefined) => {
        axios.get<TodoItem[]>(`http://unit-vlg.ru:9000/api/actionsSubTodos/getAll?id=${idTodo}`)
            .then(res => {
                const todos = res.data;
                const mainData = todos.map(item => ({
                    task: item.task,
                    id: item.id
                }));
                set(() => ({ dataStoreSubTasks: mainData }));
            })
            .catch(error => {
                console.error('Error fetching todos:', error);
            });
    },

    deleteSubTodo: (id: number, idSub: number) => {
        axios.delete<TodoItem[]>(`http://unit-vlg.ru:9000/api/actionsSubTodos/delete?id=${id}&id_sub=${idSub}`)
            .then(res => {
                const todos = res.data;
                const mainData = todos.map(item => ({
                    task: item.task,
                    id: item.id
                }));
                set(() => ({ dataStoreSubTasks: mainData }));
            })
            .catch(error => {
                console.error('Error deleting todo:', error);
            });
    },

    createSubTodo: (newTodo: TodoItem, id: number | undefined) => {
        axios.post<TodoItem[]>(`http://unit-vlg.ru:9000/api/actionsSubTodos/create?id=${id}`, newTodo)
            .then(res => {
                const todos = res.data;
                const nameAndIdList = todos.map(item => ({
                    id: item.id,
                    task: item.task
                }));
                set((state) => {
                    return { dataStoreSubTasks: nameAndIdList };
                });
            })
            .catch(error => {
                console.error('Error creating todo:', error);
            });
    },
}));

export default useStore;
