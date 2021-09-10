import React from 'react'
import './Card.scss'

function Card(props) {
  const { card } = props
  return (
    <div className="card-item">
      {card.cover &&
            <img
              src={card.cover}
              alt="thanh-alt-img"
              className="card-cover"
              onMouseDown={e => e.preventDefault()}
            />
      }

      <span>{card.title}</span>
      <div className="date">
        <span>
          <i className="fa fa-calendar"></i> 11 tháng 9
        </span>
      </div>
    </div>
  )
}

export default Card