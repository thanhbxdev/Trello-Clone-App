import React, { useEffect, useState } from 'react'
import './BoardContent.scss'
import Column from '../Column/Column'
import { initialData } from '../../actions/initialData'
import { isEmpty } from 'lodash'
import { mapOrder } from '../../untilities/sort'
import { Container, Draggable } from 'react-smooth-dnd'
import { applyDrag } from '../../untilities/dragDrop'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const boardDB = initialData.boards.find(board => board.id === 'board-1')
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
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  }
  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns]
      let currentColumn = newColumns.find(c => c.id === columnId)

      currentColumn.card = applyDrag(currentColumn.card, dropResult)
      currentColumn.cardOrder = currentColumn.card.map(i => i.id)

      setColumns(newColumns)
    }

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
            <Column column={column} onCardDrop={onCardDrop}/>
          </Draggable>
        ))}
      </Container>
      <div className="add-row-column">
        <i className="fa fa-plus"/> Add another column
      </div>
    </div>
  )
}

export default BoardContent