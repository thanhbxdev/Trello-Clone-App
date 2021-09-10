import React from 'react'
import shark from '../../assets/img/shark.png'

import './AppBar.scss'

function AppBar() {
  return (
    <nav className="navbar-app">
      <div>
        <button><i className="fa fa-navicon"></i></button>
        <button><i className="fa fa-home"></i></button>
        <button>
          <i className="fa fa-columns"></i>
          <span>Bảng</span>
        </button>
        <button>
          <span className="text-light">Chuyển đến...</span>
          <i className="fa fa-search"></i>
        </button>
      </div>
      <span>
        <img src={shark} alt=""/>
      </span>
      <div className="right-button">
        <button>
          <span className="">Tạo mới</span>
        </button>
        <button><i className="fa fa-info-circle"></i></button>
        <button>
          <i className="fa fa-bell"></i>
        </button>
      </div>
    </nav>
  )
}

export default AppBar