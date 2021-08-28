import React from "react";
import "./Column.scss"
import Task from "../Task/Task";


function Column(){
    return(
        <div className="column">
            <header>
                Add List
            </header>
            <ul className="task-list">
                <Task/>
                <Task/>
                <Task/>
                <Task/>
            </ul>
            <footer>
                Add another card
            </footer>
        </div>
    )
}

export default Column