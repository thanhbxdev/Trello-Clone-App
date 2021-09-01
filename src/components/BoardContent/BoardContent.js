import React, { useCallback, useEffect, useRef, useState } from 'react'
import './BoardContent.scss'
import Column from '../Column/Column'
import { initialData } from '../../actions/initialData'
import { isEmpty } from 'lodash'
import { mapOrder } from '../../untilities/sort'
import { Container, Draggable } from 'react-smooth-dnd'
import {
  Container as BootstrapContainer,
  Row, Col, Form, Button
} from 'react-bootstrap'
import { applyDrag } from '../../untilities/dragDrop'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [openNewColumn, setOpenNewColumn] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const newColumnRef = useRef(null)

  const onNewColumnTitleChange = useCallback((e) => setNewColumnTitle(e.target.value), [])

  useEffect(() => {
    const boardDB = initialData.boards.find(board => board.id === 'board-1')
    if (boardDB) {
      setBoard(boardDB)

      mapOrder(boardDB.columns, boardDB.columnOrder, 'id')

      setColumns(boardDB.columns)
    }
  }, [])
  useEffect(() => {
    if (newColumnRef && newColumnRef.current) {
      newColumnRef.current.focus()
      newColumnRef.current.select()
    }
  }, [openNewColumn])
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
  const toggleOpenNewColumn = () => {
    setOpenNewColumn(!openNewColumn)
  }
  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnRef.current.focus()
      return
    }
    const newColumnToAdd = {
      id: Math.random().toString(36).substr(2, 5),
      boardId: 'board-1',
      title: newColumnTitle.trim(),
      cardOrder: [],
      card: []
    }
    let newColumns = [...columns]
    newColumns.push(newColumnToAdd)
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
    setNewColumnTitle('')
    toggleOpenNewColumn()
  }
  const onUpdateColumn = (newTitleColumnUpdate) => {
    const columnIdtoUpdate = newTitleColumnUpdate.id

    const newColumns = [...columns]
    const columnIndexToUpdate = newColumns.findIndex(i => i.id===columnIdtoUpdate)
    if (newTitleColumnUpdate._destroy) {
      newColumns.splice(columnIndexToUpdate, 1)
    } else {
      newColumns.splice(columnIndexToUpdate, 1, newTitleColumnUpdate)
    }
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
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
            <Column column={column} onCardDrop={onCardDrop} onUpdateColumn={onUpdateColumn}/>
          </Draggable>
        ))}
      </Container>
      <BootstrapContainer className="trello-container">
        {!openNewColumn &&
                <Row>
                  <Col className="add-row-column" onClick={toggleOpenNewColumn}>
                    <i className="fa fa-plus icon"/> Add another column
                  </Col>
                </Row>
        }
        {openNewColumn &&
                <Row>
                  <Col className="enter-new-column">
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Enter column title..."
                      className="input-enter-new-column"
                      ref={newColumnRef}
                      value={newColumnTitle}
                      onChange={onNewColumnTitleChange}
                      onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
                    />
                    <Button variant="success" size="sm" onClick={addNewColumn}>Add Column</Button>
                    <span className="cancel-new-column" onClick={toggleOpenNewColumn}><i
                      className="fa fa-times icon"/></span>
                  </Col>
                </Row>
        }
      </BootstrapContainer>
    </div>
  )
}

export default BoardContent