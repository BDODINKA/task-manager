import React, {useState} from 'react';
import './App.css';
import {PropsTaskType, TodoList} from "./components/Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
export function App() {



let [tasks, setTasks] = useState<Array<PropsTaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'REACT', isDone: true}
    ])

    let [filter, setFilter] = useState<FilterValuesType>("all")


    const removeTask = (taskID: string) => {
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

    const addTasks = (title:string) => {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }


    return (
        <div className="App">
            <TodoList title="What to do?"
                      tasks={filteredTask}
                      removeTask={removeTask}
                      change={changeFilter}
                      addTasks={addTasks }
            />
        </div>

    )
}