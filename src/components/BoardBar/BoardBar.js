import React from 'react'
import './BoardBar.scss'
function BoardBar() {
  return (
    <nav className="navbar-board">
      <div>
        <button><i className="fa fa-star"></i></button>
        <button>
          <span>Dự Án</span>
        </button>
        <button>
          <span className="text-light">Trello Clone</span>
        </button>
      </div>
      <div className="right-button">
        <button>
          <i className="fa fa-bolt"></i>
          <span className="">Tự động hóa</span>
        </button>
        <button>
          <i className="fa fa-ellipsis-h"></i>
          <span className="">Hiện menu</span>
        </button>
      </div>
    </nav>
  )
}

export default BoardBar