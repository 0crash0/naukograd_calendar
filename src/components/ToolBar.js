import React from 'react';
import '../css/ToolBar.css'
function ToolBar(props) {
    return(
        <div className="ToolBar">
            <div className="GO">
                <div onClick={props.prevHandler} key="keyleft">&lt;</div>
                <div onClick={props.todayHandler} key="keytoday">today</div>
                <div onClick={props.nextHandler}  key="keyright">&gt;</div>
            </div>
            <div className="ViewSet">
                <div onClick={props.setViewWeek}  key="keyweek">week</div>
                <div onClick={props.setViewMonth}  key="keymonth">month</div>
            </div>

        </div>
    )
}

export default ToolBar