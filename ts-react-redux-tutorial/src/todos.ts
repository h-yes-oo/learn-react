//기존 modules 폴더에 들어있던 파일로, 지금은 todos 폴더가 대체하고 있음

import {
    createAction,
    ActionType,
    createReducer
} from 'typesafe-actions'

// createAction 아래와 같이 사용
// export const addTodo = createAction(ADD_TODO, (text: string) => ({
//     id: nextId++,
//     text: text,
//   }))<Todo>();


const ADD_TODO = 'todos/ADD_TODO' as const;
const TOGGLE_TODO = 'todos/TOGGLE_TODO' as const;
const REMOVE_TODO = 'todos/REMOVE_TODO' as const;

let nextId = 1;

export const addTodo = createAction(ADD_TODO, (text: string) =>({
        id: nextId++,
        text
    }))<Todo>();

export const toggleTodo = createAction(TOGGLE_TODO)<number>();
export const removeTodo = createAction(REMOVE_TODO)<number>();

const actions = {
    addTodo,
    toggleTodo,
    removeTodo
}

type TodosAction = ActionType<typeof actions>

export type Todo = {
    id: number;
    text: string;
    done: boolean;
}

export type TodosState = Todo[];

const initialState : TodosState = [];

const todos = createReducer<TodosState, TodosAction>(initialState,{
    [ADD_TODO]: (state, action) => 
        state.concat({
            ...action.payload,
            done: false
        }),
    [TOGGLE_TODO]: (state, { payload: id}) =>
        state.map(todo => (todo.id === id? {...todo, done: !todo.done} : todo)),
    [REMOVE_TODO]: (state, { payload: id }) => 
        state.filter(todo => todo.id !== id)
});

export default todos;