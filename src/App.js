import React from "react";
import './App.scss';
import BoardBar from "./components/BoardBar/BoardBar";
import AppBar from "./components/AppBar/AppBar";
import BoardContent from "./components/BoardContent/BoardContent";

function App() {
    return (
        <div className="trello-master">
            <AppBar/>
            <BoardBar/>
            <BoardContent/>
        </div>
    );
}

export default App;
