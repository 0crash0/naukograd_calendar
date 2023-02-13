import '../css/WeekView.css';
import moment from "moment";
import React from "react";
import styled from 'styled-components';


function WeekView(props) {
    let startDay=props.startDay.clone()
    startDay.add(props.calShift,"week")
    startDay=startDay.startOf('week')
    const endDay=startDay.clone().add(6,'day')

    const arrHours=getColumnOfHours('kk:mm ', props.startHour, props.endHour,props.halfHour,props.allDay)
    const HourRowsNum=(props.endHour-props.startHour+1)*(props.halfHour?2:1) +(props.allDay?1:0)+1

    console.log(HourRowsNum)
    let days = [];
    for (let i = 0; i < 7; ++i) {
        let day = new Date();
        let diff = i - day.getDay();
        day.setDate(day.getDate() + diff);
        days[i] = day.getFullYear() + "-" + day.getMonth()+1 + "-" + day.getDate()

    }

    let WeekView = props.weekView

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
                <div className="spacer" key={"spacer"}></div>
                {arrHours.map(value => {
                    return(<div className="time-marker" key={value}><p>{value}</p></div>)
                })}

            </Timeline>
            <Days className="days">
                {daysA.map(value => {
                    return(
                        <div className="day" key={(WeekView === 'ResourceView') ? value.title : value[0]}>
                            <div className="date">

                                <p className="date-num">{(WeekView === 'ResourceView') ? value.title : value[0]}</p>
                                {

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

                { insideClocks(props.startHour, props.endHour)&&(
                    <div className="currentHour"  style={{gridRowStart:getNowHourRow(props.startHour, props.endHour,props.halfHour,props.allDay),gridRowEnd:getNowHourRow(props.startHour, props.endHour,props.halfHour,props.allDay),gridColumnStart:1,gridColumnEnd:8}}>
                        <p>{moment().format("kk:mm")}</p>
                    </div>)
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

function getNowHourRow( startHour=9, endHour=19,halfHour=false,AllDay=true){
    let NowHour= Number(moment().format("kk"))
    let NowMinute= Number(moment().format("mm"))
    let RowNum =(endHour-startHour)*(halfHour?2:1) +(AllDay?1:0)+1


    if(NowHour>=startHour && NowHour<=endHour){
        RowNum=(NowHour-startHour+1)*(halfHour?2:1)+(AllDay?1:0)+1
        if(halfHour && NowMinute<30){
            RowNum--
        }

    }
    return RowNum
}
function insideClocks(startHour=9, endHour=19) {
    let NowHour= Number(moment().format("kk"))
    return(NowHour>=startHour && NowHour<=endHour)
}
export default WeekView