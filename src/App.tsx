import React from 'react';
import './App.css';
import {TodoList} from "./components/Todolist";


export function App() {

    const tasks_1 = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'REACT', isDone: true}
    ]
    const tasks_2 = [
        {id: 1, title: 'Meet', isDone: false},
        {id: 2, title: 'Chicken', isDone: true},
        {id: 3, title: 'Whisky', isDone: true}
    ]
    const tasks_3 = [
        {id: 1, title: 'MORBIUS', isDone: true},
        {id: 2, title: 'SPIDER MAN', isDone: true},
        {id: 3, title: 'HALO', isDone: false}
    ]
    const tasks_4 = [
        {id: 1, title: 'Rumba', isDone: false},
        {id: 2, title: 'Salsa', isDone: false},
        {id: 3, title: 'Tango', isDone: false}
    ]


    return (
        <div className="App">
            <TodoList title="What to do?" tasks={tasks_1}/>
            <TodoList title="What to Buy?" tasks={tasks_2}/>
            <TodoList title="What to Watch?" tasks={tasks_3}/>
            <TodoList title="What to dance?" tasks={tasks_4}/>
        </div>

    )
}