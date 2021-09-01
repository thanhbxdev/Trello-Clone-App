import React, { useEffect, useRef, useState } from 'react'
import './Column.scss'
import Card from '../Card/Card'
import { mapOrder } from '../../untilities/sort'
import { Container, Draggable } from 'react-smooth-dnd'
import { Button, Dropdown, Form } from 'react-bootstrap'
import ConfirmModal from '../Common/ConfirmModal'
import { MODAL_ACTION_CONFIRM } from '../../untilities/constants'
import { saveContentEnter, selectAllInlineText } from '../../untilities/contentEditable'
import { cloneDeep } from 'lodash'


function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props

  const [openNewCard, setOpenNewCard] = useState(false)
  const toggleOpenNewCard = () => {setOpenNewCard(!openNewCard)}

  const cards = mapOrder(column.card, column.cardOrder, 'id')

  const [showConfirm, setShowConfirm] = useState(false)

  const toggleConfirm = () => setShowConfirm(!showConfirm)

  const [columnTitle, setColumnTitle] = useState('')
  const handleTitleChange = (e) => setColumnTitle(e.target.value)

  const newCardRef = useRef(null)

  const [newCardTitle, setNewCardTitle] = useState('')
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value)

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  useEffect(() => {
    if (newCardRef && newCardRef.current) {
      newCardRef.current.focus()
      newCardRef.current.select()
    }
  }, [openNewCard])

  const onConfirmModalAction = (type) => {
    if (type===MODAL_ACTION_CONFIRM) {
      const newColumn ={
        ...column,
        _destroy:true
      }
      onUpdateColumn(newColumn)
    }
    toggleConfirm()
  }

  const handleTitleBlur = () => {
    const newColumn ={
      ...column,
      title:columnTitle
    }
    onUpdateColumn(newColumn)
  }

  const addNewCard =() => {
    if (!newCardTitle) {
      newCardRef.current.focus()
      return
    }
    const newCardToAdd = {
      id: Math.random().toString(36).substr(2, 5),
      boardId: column.boardId,
      columnId: column.id,
      title: newCardTitle.trim(),
      cover: null
    }
    let newColumn = cloneDeep(column) //khong thay doi data goc
    newColumn.card.push(newCardToAdd)
    newColumn.cardOrder.push(newCardToAdd.id)
    onUpdateColumn(newColumn)
    setNewCardTitle('')
    toggleOpenNewCard()
  }
  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            size="sm"
            type="text"
            className="content-editable"
            value={columnTitle}
            onClick={selectAllInlineText}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={saveContentEnter}
            spellCheck="false"
            onMouseDown={e => e.preventDefault()}
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle size="sm" id="dropdown-basic" className="dropdown-btn"/>
            <Dropdown.Menu>
              <Dropdown.Item>Add card</Dropdown.Item>
              <Dropdown.Item onClick={toggleConfirm}>Remove column</Dropdown.Item>
              <Dropdown.Item>Move all card in this column(beta)...</Dropdown.Item>
              <Dropdown.Item>Archive all card in this column(beta)...</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          groupName="col"
          onDrop={dropResult => onCardDrop(column.id, dropResult)}
          getChildPayload={index => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card}/>
            </Draggable>
          ))}
        </Container>
        {openNewCard &&
        <div className="add-new-card-area">
          <Form.Control
            size="sm"
            as="textarea"
            rows="3"
            placeholder="Enter a title for this card."
            className="text-enter-new-card"
            ref={newCardRef}
            value={newCardTitle}
            onChange={onNewCardTitleChange}
            onKeyDown={event => (event.key === 'Enter') && addNewCard()}
            // onClick={addNewColumn}
          />
        </div>
        }
      </div>
      <footer>
        {openNewCard &&
        <div className="add-new-card-actions">
          <Button variant="success" size="sm" onClick={addNewCard}>Add Card</Button>
          <span className="cancel-icon" onClick={toggleOpenNewCard}>
            <i className="fa fa-times icon"/>
          </span>
        </div>
        }
        {!openNewCard &&
        <div className="footer-actions" onClick={toggleOpenNewCard}>
          <i className="fa fa-plus" /> Add another card
        </div>
        }
      </footer>
      <ConfirmModal
        show={showConfirm}
        onAction={onConfirmModalAction}
        title="Remove Column"
        content={`Do you want to remove <strong>${column.title}</strong>.<br/>  All related cards will be to remove !`}
      />
    </div>
  )
}

export default Column