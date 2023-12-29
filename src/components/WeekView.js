    import '../css/WeekView.css';
import moment from "moment";
import React from "react";
import styled from 'styled-components';

//TODO change AllDay height?

function WeekView(props) {
    let startDay=props.startDay.clone()
    startDay.add(props.calShift,"week")
    startDay=startDay.startOf('week')
    const endDay=startDay.clone().add(6,'day')

    const arrHours=getColumnOfHours('kk:mm ', props.startHour, props.endHour,props.halfHour,props.allDay)
    let HourRowsNum = (props.endHour - props.startHour + 1) * (props.halfHour ? 2 : 1) + (props.allDay ? 1 : 0) + 1;

    let days = [];

    let day = startDay.clone();
    while (day <= endDay) {
        if((day.day()===0 && !props.isShowSun) || (day.day()===6 && !props.isShowSat) ){
            /*console.log("ВС", day)*/
        }
        else{
            days.push(day.clone());
        }
        day = day.clone().add(1, 'd');
    }
    /*console.log(days)*/
    let WeekView = props.weekView

    // Generate Week days
    let daysA = [];

    if(WeekView==='ResourceView'){
        daysA = props.resourcesA
    }
    else {
        days.map((day)=>{
            daysA.push([day.format('D'),day.format('ddd')]);
            day = day.clone().add(1, 'd');
        });
        let day = startDay;
        /*while (day <= endDay) {
            daysA.push([day.format('D'),day.format('ddd')]);
            day = day.clone().add(1, 'd');
        }*/
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
                <div className="time-marker time-free"
                     key="time-maker-free"><p></p></div>
                {arrHours.map(value => {
                    return (<div
                        className={"time-marker " + (value.slice(0, 2) === moment().format("HH") ? "time-now" : "")}
                        key={"time-maker-"+value}><p>{value}</p></div>)
                })}

            </Timeline>
            <Days className="days">

                {daysA.map((value, idx) => {
                    return (

                        <div className="day" key={(WeekView === 'ResourceView') ? value.title : value[0]}>
                            <div className={
                                ((WeekView !== 'ResourceView')   && (days[idx].day() ===0 || days[idx].day() ===6) ?
                                        "date-off" :(
                                                (WeekView !== 'ResourceView')   &&
                                                                                    (moment().isSame(days[idx],"day"))?
                                                "date-today" : "date"
                                            )
                                )
                            }>

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
                { /////////////////////////////HOUR MARKS
                    (props.hourMarks)&&(
                    arrHours.map((val,idx)=>{
                        return(
                            <div className="hourMarks"  style={{gridRowStart:idx+2,gridRowEnd:idx+2,gridColumnStart:1,gridColumnEnd:8}}>

                            </div>
                        )
                    })
                    )}


                {/////////////////////////////DAYS MARKS

                    daysA.map((val,idx)=>{
                            return(
                                <div className="daysMarks"  style={{gridRowStart:2,gridRowEnd:HourRowsNum+1,gridColumnStart:1+idx,gridColumnEnd:1+idx}}></div>
                            )
                        })


                }
                { ///////////////// NOW indicator
                    (props.nowIndicator && insideClocks(props.startHour, props.endHour))&&(
                        <div className="currentHour"  style={
                            {
                                gridRowStart:getHourRow(props.startHour, props.endHour,props.halfHour,props.allDay),
                                gridRowEnd:getHourRow(props.startHour, props.endHour,props.halfHour,props.allDay),
                                gridColumnStart:getNowHourCol(days,(props.isNowIndicatorWhole? days[0]:moment())),
                                gridColumnEnd:getNowHourCol(days,(props.isNowIndicatorWhole? days[days.length-1]:moment()))+1
                            }
                        }>
                            <p>{moment().format("kk:mm")}</p>
                        </div>
                    )
                }


                {
                   days.map(val => {
                        let eventstoday= props.events.filter(
                            event => (
                                val.isBetween(moment(event.start),moment(event.end)) ||
                                val.isSame(moment(event.start), "day") ||
                                val.isSame(moment(event.end),"day")
                            )
                        )
                        return eventstoday.map(vall=>{
                            return(<div key={vall.start} className="event"  style={{gridRowStart:getHourRow(props.startHour, props.endHour,props.halfHour,props.allDay, moment(vall.start)),gridRowEnd:getHourRow(props.startHour, props.endHour,props.halfHour,props.allDay, moment(vall.end)),gridColumnStart:getNowHourCol(days,moment(vall.start)),gridColumnEnd:getNowHourCol(days,moment(vall.end))+1}}>
                                <p className="title">{vall.title}</p>
                                <p className="title">{moment(vall.start).format("DD")}</p>
                                <p className="title">{moment(vall.end).format("DD")}</p>
                            </div>)
                        })
                    })
                   /* daysA.map((value,idx) => {
                            return(
                                <div className="event"  style={{gridRowStart:2  +idx,gridRowEnd:3+idx,gridColumnStart:1+idx,gridColumnEnd:3+idx+1}}>
                                    <p className="title">Securities Regulation</p>
                                    <p className="time">2 PM - 5 PM</p>
                                </div>
                            )
                        })*/

                }
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

function getHourRow( startHour=9, endHour=19,halfHour=false,AllDay=true, testHour = moment()){
    let NowHour= Number(testHour.format("kk"))
    let NowMinute= Number(testHour.format("mm"))
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

function getNowHourCol(days,dayTest=moment()) {
    let i=0
    //isBefore
    if(dayTest.isBefore(days[0],"day")){
        return 1;
    }
    if(dayTest.isAfter(days[days.length-1],"day")){
        return days.length;
    }
    for(i;i<=days.length-1;i++){

        if(dayTest.isSame(days[i],"day")){
            /*console.log(days[i].format("DD-MM-YY"),dayTest.format("DD-MM-YY"),i)*/
            return i+1;

        }

    }


}



export default WeekView

