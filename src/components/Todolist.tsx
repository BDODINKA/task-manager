import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {FilterValuesType} from "../App";


export type PropsTaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<PropsTaskType>
    removeTask: (taskID: string) => void
    change: (filter: FilterValuesType) => void
    addTasks: (title: string) => void

}


export function TodoList(props: TodoListPropsType) {

    const tasksJSX = props.tasks.map(task => {
        return (
            <li key={task.id}><input type="checkbox" checked={task.isDone}/><span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>
        )
    })

    let [title, setTitle] = useState('');

    const addTasks = () => {
        props.addTasks(title)
        setTitle('')
    }
    const onChangeInputHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        setTitle(event.currentTarget.value)
    }
    const OnKeyInputHandler =(event:KeyboardEvent<HTMLInputElement>)=>{
        event.ctrlKey && event.key === 'Enter' && addTasks()
    }
    const onAllClickHandler = () => {
        props.change('all')
    }
    const onActiveClickHandler = () => {
        props.change('active')
    }
    const onCompletedClickHandler = () => {
        props.change('completed')
    }


    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title}
                           onChange={onChangeInputHandler}
                           onKeyDown={OnKeyInputHandler}
                    />
                    <button onClick={addTasks}>+</button>
                </div>
                <ul>
                    {tasksJSX}
                </ul>
                <div>
                    <button onClick={onAllClickHandler}>All</button>
                    <button onClick={onActiveClickHandler}>Active</button>
                    <button onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    );
}

