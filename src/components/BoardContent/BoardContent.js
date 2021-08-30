import React, {useEffect, useState} from "react";
import "./BoardContent.scss"
import Column from "../Column/Column";
import {initialData} from "../../actions/initialData";
import {isEmpty} from "lodash";
import {mapOrder} from "../../untilities/sort";

function BoardContent(){
    const [board,setBoard] = useState({})
    const [columns,setColumns] = useState([])

    useEffect(()=>{
        const boardDB = initialData.boards.find(board=>board.id==='board-1')
        if(boardDB){
            setBoard(boardDB)

            mapOrder(boardDB.columns,boardDB.columnOrder,'id')

            setColumns(boardDB.columns)
        }
    },[])
    console.log(board)
    if(isEmpty(board)){
        return <div className="not-found">Board Not Found</div>
    }

    return(
        <div className="board-content">
            {columns.map((column,index)=><Column key={index} column={column}/>)}
        </div>
    )
}

export default BoardContent