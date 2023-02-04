import '../css/WeekView.css';
import moment from "moment";
import React from "react";

function WeekView(props) {
    let startDay=props.startDay.clone()
    startDay.add(props.calShift,"week")
    startDay=startDay.startOf('week')
    const endDay=startDay.clone()
    endDay.add(6,'day')




    let arrHours=getColumnOfHours('hh:mm A', 9, 19,false,true)
    let resources = [
        {id: 1, title: 'Самолет'},
        {id: 2, title: 'Робототехника'},
        {id: 3, title: 'IT'},
        {id: 4, title: 'Графдизайн'},
        {id: 5, title: 'Архитектура'},
        {id: 6, title: 'Медиазал'}
    ]
    let days = [];
    for (let i = 0; i < 7; ++i) {
        let day = new Date();
        let diff = i - day.getDay();
        day.setDate(day.getDate() + diff);
        days[i] = day.getFullYear() + "-" + day.getMonth()+1 + "-" + day.getDate()

    }
    let events =[{start: days[1] + " 09:00", end: days[1] + " 10:00", resourceId: 1, display: "background"},
        {start: days[1] + " 12:00", end: days[1] + " 14:00", resourceId: 2, display: "background"},
    {start: days[2] + " 17:00", end: days[2] + " 24:00", resourceId: 1, display: "background"},
    {start: days[0] + " 10:00", end: days[0] + " 14:00", resourceId: 1, title: "Test event1 IF YOU SEEN THIS CALL THE ADMINISTRATOR", color: "#FE6B64"},
    {start: days[1] + " 16:00", end: days[2] + " 08:00", resourceId: 2, title: "Test event2 IF YOU SEEN THIS CALL THE ADMINISTRATOR", color: "#B29DD9"},
    {start: days[2] + " 09:00", end: days[2] + " 13:00", resourceId: 2, title: "Test event3 IF YOU SEEN THIS CALL THE ADMINISTRATOR", color: "#779ECB"},
    {start: days[3] + " 14:00", end: days[3] + " 20:00", resourceId: 1, title: "Test event4 IF YOU SEEN THIS CALL THE ADMINISTRATOR", color: "#FE6B64"},
    {start: days[3] + " 15:00", end: days[3] + " 18:00", resourceId: 1, title: "Test event5 IF YOU SEEN THIS CALL THE ADMINISTRATOR", color: "#779ECB"},
    {start: days[5] + " 10:00", end: days[5] + " 16:00", resourceId: 2, title: "Test event6  <i><b>IF YOU SEEN THIS</b></i> <b>CALL THE ADMINISTRATOR</b>", color: "#779ECB"},
    {start: days[5] + " 14:00", end: days[5] + " 19:00", resourceId: 2, title: "Test event7 IF YOU SEEN THIS CALL THE ADMINISTRATOR", color: "#FE6B64"},
    {start: days[5] + " 18:00", end: days[5] + " 21:00", resourceId: 2, title: "Test event8 IF YOU SEEN THIS CALL THE ADMINISTRATOR", color: "#B29DD9"},
    {start: days[1], end: days[1], resourceId: 1, title: "IF YOU SEEN THIS CALL THE ADMINISTRATOR", color: "#B29DD9", allDay: true}]


    let WeekView//='ResourceView'
    let AllDay=true
    // Generate Week days
    var daysA = [];
    if(WeekView==='ResourceView'){
        daysA = [
            ["Самолет","airp"],
            ["Робототехника","robo"],
            ["IT","it"],
            ["Граф. дизайн","graf"],
            ["Архитектура","arh"],
            ["Медиа зал","media"],
            ["Черная комната","black"]
        ];
    }
    else {

        var day = startDay;

        while (day <= endDay) {
            daysA.push([day.format('DD'),day.format('ddd')]);
            day = day.clone().add(1, 'd');
        }
    }




    return(

        <div className="calendar">
            <div className="timeline">
                <div className="spacer"></div>
                {arrHours.map(value => {
                    return(<div className="time-marker">{value}</div>)
                })}

            </div>
            <div className="days">
                {daysA.map(value => {
                    return(
                        <div className="day">
                            <div className="date">
                                <p className="date-num">{value[0]}</p>
                                {
                                /*(WeekView !== 'ResourceView') ? (
                                    <p className="date-day">{value[1]}</p>
                                ) : ( '')*/

                                (WeekView !== 'ResourceView') && (
                                    <p className="date-day">{value[1]}</p>
                                    )

                                }



                            </div>
                            <div className="events">
                                <div className="event start-6 end-12 securities">
                                    <p className="title">Securities Regulation</p>
                                    <p className="time">2 PM - 5 PM</p>
                                </div>
                            </div>
                        </div>)
                })}

            </div>
        </div>

    )
}


function getColumnOfHours(formta='hh:mm A', startHour=9, endHour=19,halfHour=false,AllDay=true){

    const arrHours = []
    if(AllDay){
        arrHours.push("AllDay")
    }
    for (let hour = startHour; hour < endHour; hour++) {
        arrHours.push(moment({ hour }).format(formta))
        if(halfHour){arrHours.push(moment({ hour, minute: 30 }).format(formta))}

    }
    return arrHours;
}

export default WeekView