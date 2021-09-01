import React, { useCallback, useEffect, useState } from 'react'
import './Column.scss'
import Card from '../Card/Card'
import { mapOrder } from '../../untilities/sort'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form } from 'react-bootstrap'
import ConfirmModal from '../Common/ConfirmModal'
import { MODAL_ACTION_CONFIRM } from '../../untilities/constants'
import { saveContentEnter, selectAllInlineText } from '../../untilities/contentEditable'


function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props

  const cards = mapOrder(column.card, column.cardOrder, 'id')

  const [showConfirm, setShowConfirm] = useState(false)

  const toggleConfirm = () => setShowConfirm(!showConfirm)

  const [columnTitle, setColumnTitle] = useState('')
  const handleTitleChange = useCallback((e) => setColumnTitle(e.target.value), [])

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

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
      </div>
      <footer>
        <div className="footer-actions">
          <i className="fa fa-plus"/> Add another card
        </div>
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