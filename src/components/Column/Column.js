import React from "react";
import "./Column.scss"
import Card from "../Card/Card";
import {mapOrder} from "../../untilities/sort";


function Column(props) {
    const {column} = props
    const cards =mapOrder(column.card,column.cardOrder,'id')
    return (
        <div className="column">
            <header>
                {column.title}
            </header>
            <ul className="task-list">
                {cards.map((card,index)=><Card key={index} card={card}/>)}
            </ul>
            <footer>
                Add another card
            </footer>
        </div>
    )
}

export default Column