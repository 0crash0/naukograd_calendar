//import './App.css';
import {useState} from "react";
import MonthView from './components/MonthView'
import WeekView from "./components/WeekView";
import ToolBar from './components/ToolBar';
import moment from "moment/moment";

import 'moment/locale/ru'
moment.locale('ru');
function App() {
    ///////////////////////////////////////////////////////       переключение позиции отображения месяц неделя и тд
    const [calShift,setCalShift]=useState(0)
    let startDay=moment()
    const prevHandler=()=>{setCalShift(calShift-1)}
    const todayHandler=()=>{setCalShift(0)}
    const nextHandler=()=>{setCalShift(calShift+1)}
    ////////////////////////////////////////////////////////


  return (

    <div className="App">

        <ToolBar prevHandler={prevHandler} nextHandler={nextHandler} todayHandler={todayHandler}/>


        <WeekView startDay={startDay} firstDayMon={true} calShift={calShift} />

        <MonthView startDay={startDay} firstDayMon={true} calShift={calShift}/>

    </div>
  );
}

export default App;
