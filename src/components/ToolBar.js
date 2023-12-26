import React from 'react';
import '../css/ToolBar.css'
import logo from '../img/header-logo1.png'
function ToolBar(props) {
    return(
        <div className="ToolBar">
            <div className="GO">
                <div className={"left"} onClick={props.prevHandler} key="keyleft">&lt;</div>
                <div onClick={props.todayHandler} key="keytoday">today</div>
                <div className={"right"}  onClick={props.nextHandler}  key="keyright">&gt;</div>
            </div>
            <div className="logo"><img src={logo} width="30%" alt=""/></div>
            <div className="ViewSet">
                <div onClick={props.setViewWeek}  key="keyweek">week</div>
                <div onClick={props.setViewResource}  key="resource">resource</div>
                <div onClick={props.setViewMonth}  key="keymonth">month</div>
            </div>

        </div>
    )
}

export default ToolBar