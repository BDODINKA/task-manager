import React, {useState} from 'react';
import './App.css';
import {PropsTaskType, TodoList} from "./components/Todolist";

export type FilterValuesType = 'all' | 'active' | 'completed'
export function App() {



    let [tasks, setTasks] = useState<Array<PropsTaskType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'REACT', isDone: true}
    ])

    let [filter, setFilter] = useState<FilterValuesType>("all")


    const removeTask = (taskID: number) => {
        const filteredTask = tasks.filter(task => task.id !== taskID)
        setTasks(filteredTask)
    }
    const changeFilter = (filter:FilterValuesType)=>{
        setFilter(filter)
    }

    let filteredTask = tasks

    if (filter === 'active') {
        filteredTask = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTask = tasks.filter(task => task.isDone)
    }


    return (
        <div className="App">
            <TodoList title="What to do?"
                      tasks={filteredTask}
                      removeTask={removeTask}
                      change={changeFilter}
            />
        </div>

    )
}