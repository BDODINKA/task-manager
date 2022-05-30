import React from "react";
import {FilterValuesType} from "../App";



export type PropsTaskType = {
    id: number
    title: string
    isDone: boolean

}

type TodoListPropsType = {
    title: string
    tasks: Array<PropsTaskType>
    removeTask:(taskID:number)=>void
    change:(filter:FilterValuesType)=>void
}


export function TodoList(props: TodoListPropsType) {

    const tasksJSX = props.tasks.map(task => {
        return (
            <li key={task.id}><input type="checkbox" checked={task.isDone}/><span>{task.title}</span>
            <button onClick={()=>props.removeTask(task.id)}>x</button>
            </li>

        )
    })


    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksJSX}
                </ul>
                <div>
                    <button onClick={()=>props.change('all')}>All</button>
                    <button onClick={()=>props.change('active')}>Active</button>
                    <button onClick={()=>props.change('completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
}

