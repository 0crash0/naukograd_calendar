import React from 'react';
import '../css/ToolBar.css'
function ToolBar(props) {
    return(
        <div className="ToolBar">
            <button onClick={props.prevHandler}>&lt;</button>
            <button onClick={props.todayHandler}>today</button>
            <button onClick={props.nextHandler}>&gt;</button>
        </div>
    )
}

export default ToolBar