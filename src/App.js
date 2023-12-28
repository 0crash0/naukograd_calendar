//import './App.css';
import {useEffect, useState} from "react";
import MonthView from './components/MonthView'
import WeekView from "./components/WeekView";
import ToolBar from './components/ToolBar';
import moment from "moment/moment";
import axios from "axios";
import 'moment/locale/ru'

import eventsDB from "./db.json"

moment.locale('ru');
function App() {
    ///////////////////////////////////////////////////////       переключение позиции отображения месяц неделя и тд
    const [calShift,setCalShift]=useState(0)
    const [viewSelected,setViewSelected]=useState("month")
    const [events,setEvents]=useState([])
    const stEvents = (ress) => { setEvents(ress)}
    const totalDays=42

    useEffect(()=>{
       /* axios({
            url: 'http://localhost:3004/events',
            method: 'get'
        },)
            .then(res => stEvents(res.data))
            .catch (err => console.error(err))*/

        stEvents(eventsDB.events)

/*
        fetch('http://localhost:3004/events')//http://localhost:3004/events?start_gte=2023-02-05%2018:00
            .then(res=>res.json)
            .then(res=>stEvents(res))*/
    },[calShift,viewSelected]);



    let startDay=moment()
    const prevHandler=()=>{setCalShift(calShift-1)}
    const todayHandler=()=>{setCalShift(0)}
    const nextHandler=()=>{setCalShift(calShift+1)}
    ////////////////////////////////////////////////////////

    const setViewWeek=() =>{
        setViewSelected("week")
    }
    const setViewResource=() =>{
        setViewSelected("resource")
    }
    const setViewMonth=() =>{
        setViewSelected("month")
    }


    const resourcesA = [
        {id: 1, title: 'Самолет'},
        {id: 2, title: 'Робототехника'},
        {id: 3, title: 'IT'},
        {id: 4, title: 'Графдизайн'},
        {id: 5, title: 'Архитектура'},
        {id: 6, title: 'Медиазал'}
    ]

  return (

    <div className="App">

        <ToolBar prevHandler={prevHandler} nextHandler={nextHandler} todayHandler={todayHandler} setViewWeek={setViewWeek} setViewResource={setViewResource} setViewMonth={setViewMonth} />


        {
            {
                "month": (<MonthView events={events} startDay={startDay} firstDayMon={true} calShift={calShift}  isWeekDaysShort={true} totalDays={totalDays} />),
                "week" :(<WeekView events={events} startDay={startDay.clone()} firstDayMon={true} calShift={calShift}  isWeekDaysShort={true} weekView="WeekView" startHour={9} endHour={18} halfHour={false} allDay={true} hourMarks nowIndicator/>),
                "resource" :(<WeekView events={events} startDay={startDay.clone()} firstDayMon={true} calShift={calShift}  isWeekDaysShort={true} startHour={9} endHour={18} halfHour={false} allDay={true} weekView="ResourceView" resourcesA={resourcesA}/>)
            }[viewSelected]

        }

    </div>
  );
}

export default App;
