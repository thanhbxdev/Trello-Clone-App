import React, { useEffect, useState } from 'react'
import './BoardContent.scss'
import Column from '../Column/Column'
import { initialData } from '../../actions/initialData'
import { isEmpty } from 'lodash'
import { mapOrder } from '../../untilities/sort'
import { Container, Draggable } from 'react-smooth-dnd'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const boardDB = initialData.boards.find(board => board.id==='board-1')
    if (boardDB) {
      setBoard(boardDB)

      mapOrder(boardDB.columns, boardDB.columnOrder, 'id')

      setColumns(boardDB.columns)
    }
  }, [])
  if (isEmpty(board)) {
    return <div className="not-found">Board Not Found</div>
  }
  const onColumnDrop = (dropResult) => {
    console.log(dropResult)
  }

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        dragHandleSelector=".column-drag-handle"
        getChildPayload={index => columns[index]}
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column column={column}/>
          </Draggable>
        ))}
      </Container>
    </div>
  )
}

export default BoardContent