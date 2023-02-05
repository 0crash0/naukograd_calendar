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
            daysA.push([day.format('D'),day.format('ddd')]);
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
                        <div className="day" >
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