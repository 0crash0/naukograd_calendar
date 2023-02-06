import '../css/WeekView.css';
import moment from "moment";
import React from "react";
import styled from 'styled-components';



function WeekView(props) {
    let startDay=props.startDay.clone()
    startDay.add(props.calShift,"week")
    startDay=startDay.startOf('week')
    const endDay=startDay.clone().add(6,'day')




    const arrHours=getColumnOfHours('kk:mm ', props.startHour, props.endHour,props.HalfHour,props.Allday)
    const HourRowsNum=(props.endHour-props.startHour)*(props.HalfHour?2:1) +(props.Allday?1:0)


    let days = [];
    for (let i = 0; i < 7; ++i) {
        let day = new Date();
        let diff = i - day.getDay();
        day.setDate(day.getDate() + diff);
        days[i] = day.getFullYear() + "-" + day.getMonth()+1 + "-" + day.getDate()

    }

    let WeekView = props.WeekView
    
    // Generate Week days
    let daysA = [];

    if(WeekView==='ResourceView'){
        daysA = props.resourcesA

    }

    else {

        let day = startDay;

        while (day <= endDay) {
            daysA.push([day.format('D'),day.format('ddd')]);
            day = day.clone().add(1, 'd');
        }
    }


    const DaysRowsNum=daysA.length
    console.log(DaysRowsNum)
    const Timeline= styled.div`
      display: grid;
      grid-template-rows: repeat(${HourRowsNum}, var(--timeHeight));`;
    const Days= styled.div`
        display: grid;
        grid-template-columns: repeat(${DaysRowsNum},1fr);
        grid-template-rows: repeat(${HourRowsNum}, var(--timeHeight));

    `;
    const Events= styled.div`
      display: grid;
      grid-template-rows: repeat(${HourRowsNum}, var(--timeHeight));

    `;
    return(

        <div className="calendar">
            <Timeline className="timeline">
                <div className="spacer"></div>
                {arrHours.map(value => {
                    return(<div className="time-marker">{value}</div>)
                })}

            </Timeline>
            <Days className="days">
                {daysA.map(value => {
                    return(
                        <div className="day" >
                            <div className="date">
                                {console.log(value)}
                                <p className="date-num">{(WeekView === 'ResourceView') ? value.title : value[0]}</p>
                                {
                                /*(WeekView !== 'ResourceView') ? (
                                    <p className="date-day">{value[1]}</p>
                                ) : ( '')*/

                                (WeekView !== 'ResourceView') && (
                                    <p className="date-day">{value[1]}</p>
                                    )

                                }



                            </div>
                            <Events className="events">
                               {/* <div className="event"  style={{gridRowStart:2,gridRowEnd:7,gridColumnStart:2,gridColumnEnd:3}}>
                                    <p className="title">Securities Regulation</p>
                                    <p className="time">2 PM - 5 PM</p>
                                </div>*/}
                            </Events>
                        </div>)
                })}


                { /*                    gridColumns
                    gridROW 1 - days                    1-firstDay
                    gridROW 2 - All_day

                */
                 }
                {daysA.map((value,idx) => {
                    return(


                                <div className="event"  style={{gridRowStart:2  +idx,gridRowEnd:3+idx,gridColumnStart:1+idx,gridColumnEnd:3+idx}}>
                                    <p className="title">Securities Regulation</p>
                                    <p className="time">2 PM - 5 PM</p>
                                </div>

                        )
                })}

            </Days>
        </div>

    )
}


function getColumnOfHours(format='hh:mm A', startHour=9, endHour=19,halfHour=false,AllDay=true,AlldayName="AllDay"){

    const arrHours = []
    if(AllDay){
        arrHours.push(AlldayName)
    }
    for (let hour = startHour; hour <= endHour; hour++) {
        arrHours.push(moment({ hour }).format(format))
        if(halfHour){arrHours.push(moment({ hour, minute: 30 }).format(format))}

    }
    return arrHours;

}

export default WeekView