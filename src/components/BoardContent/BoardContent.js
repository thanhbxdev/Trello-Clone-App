import React, { useEffect, useRef, useState } from 'react'
import './BoardContent.scss'
import Column from '../Column/Column'
import { cloneDeep, isEmpty } from 'lodash'
import { mapOrder } from '../../untilities/sort'
import { Container, Draggable } from 'react-smooth-dnd'
import { Button, Col, Container as BootstrapContainer, Form, Row } from 'react-bootstrap'
import { applyDrag } from '../../untilities/dragDrop'
import { createNewColumn, fetchFullBoard, updateBoard, updateCardAPI, updateColumnAPI } from '../../actions/ApiCall'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([]
  )
  const [openNewColumn, setOpenNewColumn] = useState(false)
  const toggleOpenNewColumn = () => {
    setOpenNewColumn(!openNewColumn)
  }

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const newColumnRef = useRef(null)

  const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value)
  useEffect(() => {
    // const boardDB = initialData.boards.find(board => board.id === 'board-1')
    const boardID = '6135cb836c17ac8174d3241d'
    fetchFullBoard(boardID).then(board => {
      setBoard(board)
      setColumns(mapOrder(board.columns, board.columnOrder, '_id'))
    })
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
    let newColumns = cloneDeep(columns)
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = cloneDeep(board)
    newBoard.columnOrder = newColumns.map(c => c._id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
    //Call API update ColumnOrder in Board
    updateBoard(newBoard._id, newBoard).catch((error) => {
      setColumns(columns)
      setBoard(board)
    })
  }
  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = cloneDeep(columns)
      let currentColumn = newColumns.find(c => c._id === columnId)

      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(i => i._id)
      setColumns(newColumns)

      if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
        /**
         * Action :move card inside  its column
         * Call API update cardOrder
         */
        updateColumnAPI(currentColumn._id, currentColumn).catch(() => {
          setColumns(columns)
        })
      } else {
        /**
         * Action :move card beetween  two columns
         * Call API update cardOrder
         * Call API update column in card
         */
        updateColumnAPI(currentColumn._id, currentColumn).catch(() => {
          setColumns(columns)
        })
        if (dropResult.addedIndex !== null) {
          let currentCard = cloneDeep(dropResult.payload)
          currentCard.columnId = currentColumn._id
          updateCardAPI(currentCard._id, currentCard)
        }
      }
    }

  }

  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnRef.current.focus()
      return
    }
    const newColumnToAdd = {
      boardId: board._id,
      title: newColumnTitle.trim()
    }
    createNewColumn(newColumnToAdd).then(column => {
      let newColumns = [...columns]
      newColumns.push(column)
      let newBoard = { ...board }
      newBoard.columnOrder = newColumns.map(c => c._id)
      newBoard.columns = newColumns

      setColumns(newColumns)
      setBoard(newBoard)
      setNewColumnTitle('')
      toggleOpenNewColumn()
    })
  }
  const onUpdateColumn = (newTitleColumnUpdate) => {
    const columnIdtoUpdate = newTitleColumnUpdate._id

    const newColumns = [...columns]
    const columnIndexToUpdate = newColumns.findIndex(i => i._id === columnIdtoUpdate)
    if (newTitleColumnUpdate._destroy) {
      newColumns.splice(columnIndexToUpdate, 1)
    } else {
      newColumns.splice(columnIndexToUpdate, 1, newTitleColumnUpdate)
    }
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c._id)
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
            <Column
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumn={onUpdateColumn}
            />
          </Draggable>
        ))}
      </Container>
      <BootstrapContainer className="trello-container">
        {!openNewColumn &&
                <Row>
                  <Col className="add-row-column" onClick={toggleOpenNewColumn}>
                    <i className="fa fa-plus icon"/> Thêm danh sách khác
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
                    <span className="cancel-icon" onClick={toggleOpenNewColumn}><i
                      className="fa fa-times icon"/>
                    </span>
                  </Col>
                </Row>
        }
      </BootstrapContainer>
    </div>
  )
}

export default BoardContent