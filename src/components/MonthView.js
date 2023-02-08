import '../css/MonthVIew.css';
import styled from 'styled-components';
import DayOfMonth from './MonthView/DayOfMonth'
import moment, {months} from "moment";

function MonthView({startDay,calShift,isWeekDaysShort,firstDayMon,totalDays,events}) {

    const daysArray=[...Array(totalDays)]

    startDay.add(calShift,"month")
    let selectedMonth = startDay.clone()
    startDay=startDay.startOf('month').startOf('week')

    const endDay=startDay.clone().add(totalDays,'day')


    const calendar =[]

    let weekArray = []
/*
* Similarly, moment.monthsShort returns abbreviated month names,
* and moment.weekdays, moment.weekdaysShort, moment.weekdaysMin return lists of weekdays.

You can pass an integer into each of those functions to get a specific month or weekday.
* */
    if(isWeekDaysShort){
        weekArray = moment.weekdaysShort();
    }
    else{
        weekArray = moment.weekdays();
    }

    if(firstDayMon) {
        weekArray=weekArray.splice(1).concat(weekArray);
    }
    for (let i = 0; i < weekArray.length; i++) {
        weekArray[i] = weekArray[i].charAt(0).toUpperCase() + weekArray[i].slice(1)
    }


    const day = startDay.clone()

    while(day.isBefore(endDay)){  //isBefore(end)
        calendar.push(day.clone())
        day.add(1,'day')
    }

    let todayEvents =[]


    return (
        <div className="Calendar">

            <div className="MonthView" >
                {
                    weekArray.map((dayOfWeek,idx)=>(
                        <DayOfMonth  day={dayOfWeek} key={idx} isHeader/>
                    ))
                }
                {

                }
                {calendar.map(dayItem => (


                    <DayOfMonth events={
                        events.filter(
                            event => (
                                    dayItem.isBetween(moment(event.start),moment(event.end)) ||
                                    dayItem.isSame(moment(event.start), "day") ||
                                    dayItem.isSame(moment(event.end),"day")
                            )
                        )
                    }
                                day={dayItem.format('D')}
                                isToDay={moment().isSame(dayItem,'day')}
                                isWeekend={(dayItem.day()===6||dayItem.day()===0)}
                                isOtherMonth={!selectedMonth.isSame(dayItem,'month')}
                                key={dayItem.format('DDMMYY')}
                    />
                    ))
                }

            </div>
        </div>
    );
}


export default MonthView