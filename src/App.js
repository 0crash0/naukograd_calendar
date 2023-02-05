//import './App.css';
import {useEffect, useState} from "react";
import MonthView from './components/MonthView'
import WeekView from "./components/WeekView";
import ToolBar from './components/ToolBar';
import moment from "moment/moment";

import 'moment/locale/ru'
moment.locale('ru');
function App() {
    ///////////////////////////////////////////////////////       переключение позиции отображения месяц неделя и тд
    const [calShift,setCalShift]=useState(0)
    const [viewSelected,setViewSelected]=useState("month")
    const [events,setEvents]=useState()

    const totalDays=42

    useEffect(()=>{
        fetch('http://localhost:3004/events')//http://localhost:3004/events?start_gte=2023-02-05%2018:00
            .then(res=>res.json)
            .then(res=>console.log('response',res))
    },[calShift,viewSelected]);



    let startDay=moment()
    const prevHandler=()=>{setCalShift(calShift-1)}
    const todayHandler=()=>{setCalShift(0)}
    const nextHandler=()=>{setCalShift(calShift+1)}
    ////////////////////////////////////////////////////////

    const setViewWeek=() =>{
        setViewSelected("week")
    }
    const setViewMonth=() =>{
        setViewSelected("month")
    }

  return (

    <div className="App">

        <ToolBar prevHandler={prevHandler} nextHandler={nextHandler} todayHandler={todayHandler} setViewWeek={setViewWeek} setViewMonth={setViewMonth} />


        {
            {
                "month": (<MonthView startDay={startDay} firstDayMon={true} calShift={calShift}  isWeekDaysShort={true} totalDays={totalDays} />),
                "week" :(<WeekView startDay={startDay} firstDayMon={true} calShift={calShift}  isWeekDaysShort={true} />)
            }[viewSelected]

        }

    </div>
  );
}

export default App;
